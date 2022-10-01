import { useContext } from 'react';
import { AuthContext, IAuthContextState } from '../contexts/auth';

export function useAuth(): IAuthContextState {
  const context = useContext(AuthContext);
  return context;
}
