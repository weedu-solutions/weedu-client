import { ROUTES } from "../constants/routes"

export function loginRedirect(roleId: number) {
  switch (roleId) {
    case 1:
      return '/'
    case 2:
      return '/'
    case 3:
      return '/'
    case 4:
      return ROUTES.CUSTOMERS
    default:
      return '/'
  }
}