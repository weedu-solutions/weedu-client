import { Api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IAction } from "../interfaces/actions";
import moment from "moment";
import { useMemo } from "react";

export function useActions() {
  const queryClient = useQueryClient();
  const { user, infoCompany } = useAuth();

  // Buscar todas as ações (para usuário comum)
  const { data: actions, isLoading: isLoadingActions } = useQuery({
    queryKey: ['actions'],
    queryFn: async () => {
      const { data } = await Api.get('/auth/plan');
      return data?.data || [];
    },
    enabled: user?.user_type_id !== 3
  });

  // Buscar ações do cliente (para consultora)
  const { data: customerActions, isLoading: isLoadingCustomerActions } = useQuery({
    queryKey: ['customerActions', infoCompany?.id],
    queryFn: async () => {
      const { data } = await Api.get(`/auth/plan-customer/${infoCompany?.id}`);
      return data?.data || [];
    },
    enabled: user?.user_type_id === 3
  });

  // Buscar dados do gráfico
  const { data: graphicData, isLoading: isLoadingGraphic } = useQuery({
    queryKey: ['graphicUsers', user?.id],
    queryFn: async () => {
      const { data } = await Api.get(`/auth/dashboard/${user?.id}`);
      return data;
    },
    enabled: !!user?.id
  });

   // Buscar dados do gráfico
   const { data: graphicDataCustomer, isLoading: isLoadingGraphicCustomer } = useQuery({
    queryKey: ['graphicDataCustomer', infoCompany?.id],
    queryFn: async () => {
      const { data } = await Api.get(`/auth/dashboard-customer/${infoCompany?.id}`);
      return data;
    },
    enabled: !!infoCompany?.id
  });


  // Função auxiliar para atualizar todos os dados
  const refreshAllData = () => {
    queryClient.invalidateQueries({ queryKey: ['actions'] });
    queryClient.invalidateQueries({ queryKey: ['customerActions'] });
    queryClient.invalidateQueries({ queryKey: ['graphicUsers'] });
    queryClient.refetchQueries({ queryKey: ['actions'] });
    queryClient.refetchQueries({ queryKey: ['customerActions'] });
    queryClient.refetchQueries({ queryKey: ['graphicUsers'] });
  };

  // Mutations
  const createAction = useMutation({
    mutationFn: (data: any) => Api.post('/auth/plan', data),
    onSuccess: refreshAllData
  });

  const updateAction = useMutation({
    mutationFn: (data: any) => Api.post(`/auth/plan/${data.id}`, data),
    onSuccess: refreshAllData
  });

  const executeAction = useMutation({
    mutationFn: (data: any) => Api.post(`/auth/plan/${data.id}`, data),
    onSuccess: refreshAllData
  });

  const startOrFinishAction = useMutation({
    mutationFn: (data: any) => Api.post(`/auth/plan/${data.id}`, data),
    onSuccess: refreshAllData
  });

  const mapActionStatus = (action: any): number => {
    const now = moment().format("DD/MM/YYYY");
    const startDate = action.init_date;
    const endDate = action.end_date;
    const expectedStartDate = action.preview_init_date;
    const expectedEndDate = action.preview_end_date;

    // Verifica ações finalizadas
    if (endDate) {
      // Se terminou depois da data prevista de fim OU começou depois da data prevista de início
      if ((expectedEndDate && endDate > expectedEndDate) ||
          (expectedStartDate && startDate > expectedStartDate)) {
        return 7; // Executada com atraso
      }
      return 3; // Executada no prazo
    }

    // Ação não iniciada e atrasada
    if (!startDate && expectedStartDate && now > expectedStartDate) return 4;

    // Ação em execução e atrasada
    if (startDate && !endDate && expectedEndDate && now > expectedEndDate) return 5;

    // Ação em execução dentro do prazo
    if (startDate && !endDate) return 2;

    // Ação a iniciar (não começou mas está no prazo)
    return 1;
  };

  // No seu useQuery ou onde processa as ações
  const processActions = (data: IAction[]) => {
    return data?.map(action => ({
      ...action,
      status: mapActionStatus(action)
    }));
  };

  const actionsFormattedStatus = useMemo(() => {
    const rawActions = user?.user_type_id === 3 ? customerActions : actions;
    if (!rawActions) return [];
    return processActions(rawActions);
  }, [user?.user_type_id, customerActions, processActions]);;

  return {
    actions: actionsFormattedStatus,
    isLoading: isLoadingActions || isLoadingCustomerActions || isLoadingGraphicCustomer || isLoadingGraphic,
    graphicData,
    createAction,
    updateAction,
    executeAction,
    startOrFinishAction,
    graphicDataCustomer
  };
}
