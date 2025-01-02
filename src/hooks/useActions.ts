import { Api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
    enabled: user?.user_type_id === 3 && !!infoCompany?.id
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

  return {
    actions: user?.user_type_id === 3 ? customerActions : actions,
    isLoading: isLoadingActions || isLoadingCustomerActions || isLoadingGraphicCustomer || isLoadingGraphic,
    graphicData,
    createAction,
    updateAction,
    executeAction,
    startOrFinishAction,
    graphicDataCustomer
  };
}
