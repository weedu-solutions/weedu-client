/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useMemo } from 'react'
import decode from 'jwt-decode'

type PrivateRouteProps = {
  roles?: string[];
  exactRoles?: boolean;
  element: ReactElement;
  fallbackAuth: ReactElement;
  fallbackRole?: ReactElement;
};

export const RequireAuth = ({
  roles = [],
  exactRoles = false,
  element,
  fallbackAuth,
  fallbackRole = fallbackAuth,
}: PrivateRouteProps) => {
  const token = localStorage.getItem('token')

  let timestamp = new Date().getTime()
  let todayTimeStamp = timestamp.toString().slice(0, 10)
  const user = localStorage.getItem('user')
  const userRole = JSON.parse(String(user))

  function userRoles() {
    switch (userRole.user_type_id) {
      case 1:
        return ['COLABORADOR']
      case 2:
        return ['GESTORES']
      case 3:
        return ['CONSULTORES']
      case 4:
        return ['ADMINISTRADOR']
      default:
        return ['COLABORADOR']
    }
  }

  const hasPermission = useMemo(() => {
    const hasRoles = roles.length >= 1;

    if (!hasRoles) return true;

    if (!userRole) return ['COLABORADOR']

    if (exactRoles) {
      return roles.every(role => userRoles().includes(role));
    }

    return roles.some(role => userRoles().includes(role));

  }, [userRoles, exactRoles, roles]);

  if (!token) {
    return fallbackAuth;
  }

  const tokenDecoded = decode(token) as any
  const isTokenExpired = tokenDecoded.exp <= Number(todayTimeStamp) ? false : true

  if (!isTokenExpired) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return fallbackAuth;
  }

  if (!hasPermission) {
    return fallbackRole;
  }

  return element;
};
