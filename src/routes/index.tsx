import { Routes, Route, BrowserRouter } from "react-router-dom"

import '../styles.css'
import { RequireAuth } from "./components/RequireAuth"
import { InactivePage } from "../pages/Inactive"
import { RecoverMessagePage } from "../pages/RecoverMessage"
import { AppProvider } from "../contexts"
import { ROUTES } from "../constants/routes"
import { RegisterCompany } from "../pages/RegisterCompany"
import { LoginPage, Customers } from '../pages'

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
          <Route path={ROUTES.REGISTER}
            element={<RequireAuth fallbackAuth={<LoginPage />} element={<RegisterCompany />} />}
          />
          <Route path="*" element={<h1>Página não encontrada!</h1>} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}