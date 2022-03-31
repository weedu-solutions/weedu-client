import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

import '../styles.css'
import { RequireAuth } from "../components/RequireAuth";
import { InactivePage } from "../pages/Inactive";

export function MyRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inactive" element={<InactivePage />} />
          <Route path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
    </BrowserRouter>
  );
}