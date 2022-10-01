import { ROUTES } from "../constants/routes"

export function loginRedirect(roleId: number) {
  switch (roleId) {
    case 1:
      return ROUTES.ACTIONS
    case 2:
      return ROUTES.ACTIONS
    case 3:
      return ROUTES.CONSULTANT_COMPANIES
    case 4:
      return ROUTES.CUSTOMERS
    default:
      return '/'
  }
}