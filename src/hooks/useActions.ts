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
    const now = moment();
    const startDate = action.init_date ? moment(action.init_date, "DD/MM/YYYY") : null;
    const endDate = action.end_date ? moment(action.end_date, "DD/MM/YYYY") : null;
    const expectedStartDate = action.preview_init_date ? moment(action.preview_init_date, "DD/MM/YYYY") : null;
    const expectedEndDate = action.preview_end_date ? moment(action.preview_end_date, "DD/MM/YYYY") : null;

    // Ação finalizada
    if (endDate) {
      // Verifica se terminou depois da data prevista OU começou depois da data prevista
      if ((expectedEndDate && endDate.isAfter(expectedEndDate)) ||
          (expectedStartDate && startDate && startDate.isAfter(expectedStartDate))) {
        return 7; // Executada com atraso
      }
      return 3; // Executada no prazo
    }

    // Ação não iniciada
    if (!startDate) {
      // Verifica se já passou da data prevista de início
      if (expectedStartDate && now.isAfter(expectedStartDate)) {
        return 4; // Não iniciada e atrasada
      }
      return 1; // A iniciar (dentro do prazo)
    }

    // Ação em execução
    if (startDate && !endDate) {
      // Verifica se já passou da data prevista de término
      if (expectedEndDate && now.isAfter(expectedEndDate)) {
        return 5; // Em execução e atrasada
      }
      return 2; // Em execução dentro do prazo
    }

    return 1; // Estado padrão: a iniciar
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
