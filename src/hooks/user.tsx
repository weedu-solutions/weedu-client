import { useContext } from 'react';
import { UserContext, IAuthContextState } from '../contexts/user';

export function useUser(): IAuthContextState {
  const context = useContext(UserContext);
  return context;
}