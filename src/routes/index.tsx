import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from '../pages/Login';
import { AdminPage } from '../pages/Customers';

import '../styles.css'
import { RequireAuth } from "./components/RequireAuth";
import { InactivePage } from "../pages/Inactive";
import { RecoverMessagePage } from "../pages/RecoverMessage";
import { AppProvider } from "../contexts";
import { ROUTES } from "../constants/routes";
import { Register } from "../pages/Register";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.INACTIVE}
            element={
              <RequireAuth>
                <InactivePage />
              </RequireAuth>
            }
          />
          <Route path={ROUTES.RECOVER} element={<RecoverMessagePage />} />
          <Route path={ROUTES.CUSTOMERS}
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />
          <Route path={ROUTES.REGISTER}
            element={
              <RequireAuth>
                <Register />
              </RequireAuth>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}