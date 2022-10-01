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

  RecoverMessagePage,
  InactivePage,
  Actions
} from '../pages'

import '../styles.css'
import { CreateAction } from "../pages/Actions/CreateAction"
import { ChakraProvider } from '@chakra-ui/react'
import { CreateConsultant } from "../pages/Consultants/CreateConsultant"
import { UpdateConsultant } from "../pages/Consultants/UpdateConsultant"
import { ConsultantCompanies } from "../pages/Consultants/ConsultantCompanies"


export function MyRoutes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ChakraProvider>
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

            <Route path={`${ROUTES.UPDATE_USER_COMPANY}/:id`}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<UpdateUserCompany />} />}
            />
            <Route path={ROUTES.REGISTER_COMPANY}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterCompany />} />}
            />
            <Route path={`${ROUTES.REGISTER_USER_COMPANY}/:id`}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<RegisterUserCompany />} />}
            />

            <Route path={ROUTES.REGISTER_CONSULTANT}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<CreateConsultant />} />}
            />
            <Route path={ROUTES.UPDATE_CONSULTANT}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['ADMINISTRADOR']} element={<UpdateConsultant />} />}
            />

            <Route path={ROUTES.CREATE_ACTION}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['COLABORADOR', 'GESTORES', 'CONSULTORES']} element={<CreateAction />} />}
            />

            <Route path={ROUTES.CONSULTANT_COMPANIES}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['CONSULTORES']} element={<ConsultantCompanies />} />}
            />

            <Route path={`${ROUTES.ACTIONS}`}
              element={<RequireAuth fallbackAuth={<LoginPage />} roles={['COLABORADOR', 'GESTORES', 'CONSULTORES']} element={<Actions />} />}
            />

            <Route path="*" element={<h1>Página não encontrada!</h1>} />
          </Routes>
        </ChakraProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
