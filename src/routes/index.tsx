import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from '../pages/Login';
import { Admin } from '../pages/Admin';

import '../styles.css'
import { RequireAuth } from "./components/RequireAuth";
import { InactivePage } from "../pages/Inactive";
import { RecoverMessagePage } from "../pages/RecoverMessage";
import { AppProvider } from "../contexts";
import { ROUTES } from "../constants/routes";

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
          <Route path={ROUTES.ADMIN_REGISTER}
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}