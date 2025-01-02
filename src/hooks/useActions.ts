import { Api } from '../services/api';
import { useAuth } from '../hooks/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
    enabled: user?.user_type_id !== 3 // Só executa se não for consultora
  });

  // Buscar ações do cliente (para consultora)
  const { data: customerActions, isLoading: isLoadingCustomerActions } = useQuery({
    queryKey: ['customerActions', infoCompany?.id],
    queryFn: async () => {
      const { data } = await Api.get(`/auth/plan-customer/${infoCompany?.id}`);
      return data?.data || [];
    },
    enabled: user?.user_type_id === 3 && !!infoCompany?.id // Só executa se for consultora
  });

  // Criar ação
  const createAction = useMutation({
    mutationFn: (data: any) => Api.post('/auth/plan', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      queryClient.invalidateQueries({ queryKey: ['customerActions'] });
      queryClient.refetchQueries({ queryKey: ['actions'] });
      queryClient.refetchQueries({ queryKey: ['customerActions'] });
    }
  });

  const updateAction = useMutation({
    mutationFn: (data: any) => Api.post(`/auth/plan/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      queryClient.invalidateQueries({ queryKey: ['customerActions'] });
      queryClient.refetchQueries({ queryKey: ['actions'] });
      queryClient.refetchQueries({ queryKey: ['customerActions'] });
    }
  });

  return {
    actions: user?.user_type_id === 3 ? customerActions : actions,
    isLoading: isLoadingActions || isLoadingCustomerActions,
    createAction,
    updateAction,
  };
} 