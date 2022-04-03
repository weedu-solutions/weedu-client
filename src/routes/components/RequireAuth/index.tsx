import { Navigate, useLocation } from 'react-router-dom'

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!localStorage.getItem('user')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}