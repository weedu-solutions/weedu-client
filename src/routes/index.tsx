import { Routes, Route, BrowserRouter } from "react-router-dom"

import '../styles.css'
import { RequireAuth } from "./components/RequireAuth"
import { InactivePage } from "../pages/Inactive"
import { RecoverMessagePage } from "../pages/RecoverMessage"
import { AppProvider } from "../contexts"
import { ROUTES } from "../constants/routes"
import { RegisterCompany } from "../pages/RegisterCompany"
import { LoginPage, Customers } from '../pages'
import { RegisterUserCompany } from "../pages/RegisterUserCompany"
import { UpdateUserCompany } from "../pages/UpdateUserCompany"

export function MyRoutes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.INACTIVE} element={<InactivePage />} />
          <Route path={ROUTES.RECOVER} element={<RecoverMessagePage />} />
          <Route path={ROUTES.CUSTOMERS}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<Customers />} />}
          />
          {/* <Route path={ROUTES.CUSTOMERS} element={<Customers />} /> */}
          <Route path={ROUTES.REGISTER_COMPANY}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterCompany />} />}
          />
          <Route path={`${ROUTES.REGISTER_USER_COMPANY}/:id`}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterUserCompany />} />}
          />
          <Route path={`${ROUTES.UPDATE_USER_COMPANY}/:id`}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<UpdateUserCompany />} />}
          />
          <Route path="*" element={<h1>Página não encontrada!</h1>} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}