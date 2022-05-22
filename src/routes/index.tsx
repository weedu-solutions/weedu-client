import { Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import { RequireAuth } from "./components/RequireAuth"
import { AppProvider } from "../contexts"
import { ROUTES } from "../constants/routes"
import {
  LoginPage,
  Companies,
  RegisterUserCompany,
  UpdateUserCompany,
  Consultants,
  RegisterCompany,
  RegisterAction,
  RecoverMessagePage,
  InactivePage,
  Actions
} from '../pages'

import '../styles.css'

export function MyRoutes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer closeButton={false} />
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.INACTIVE} element={<InactivePage />} />
          <Route path={ROUTES.RECOVER} element={<RecoverMessagePage />} />
          <Route path={ROUTES.CUSTOMERS}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<Companies />} />}
          />
          <Route path={ROUTES.CONSULTANTS}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<Consultants />} />}
          />
          <Route path={ROUTES.REGISTER_COMPANY}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterCompany />} />}
          />
          <Route path={ROUTES.REGISTER_ACTION}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterAction />} />}
          />
          <Route path={`${ROUTES.REGISTER_USER_COMPANY}/:id`}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterUserCompany />} />}
          />
          <Route path={`${ROUTES.UPDATE_USER_COMPANY}/:id`}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<UpdateUserCompany />} />}
          />
          <Route path={ROUTES.ACTIONS}
            element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<Actions />} />}
          />
          <Route path="*" element={<h1>Página não encontrada!</h1>} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
