export const QUERY_KEYS = {
  // Actions
  ACTIONS_CUSTOMER: 'actions-costumer',
  ACTIONS_USER_SIMPLE: 'all-actions',
  ACTION_DETAILS: 'action-details',
  
  // Outros grupos de queries (se necessário)
  USERS: 'users',
  COMPANIES: 'companies',
  
  // Função helper para criar keys com parâmetros
  actionDetails: (id: number) => ['action-details', id],
  actionsCustomer: (companyId?: number) => ['actions-costumer', companyId],
} as const;