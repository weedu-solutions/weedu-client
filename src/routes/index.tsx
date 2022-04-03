import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

import '../styles.css'
import { RequireAuth } from "./components/RequireAuth";
import { InactivePage } from "../pages/Inactive";
import { RecoverMessagePage } from "../pages/RecoverMessage";
import { AppProvider } from "../contexts";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inactive"
            element={
              <RequireAuth>
                <InactivePage />
              </RequireAuth>
            }
          />
          <Route path="/recovermessage" element={<RecoverMessagePage />} />
          <Route path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}