import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { AppProvider } from '../contexts';

import '../styles.css'
import { RequireAuth } from "../components/RequireAuth";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test"
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