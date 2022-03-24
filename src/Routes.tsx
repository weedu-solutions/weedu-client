import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from './pages/Login'
import './styles.css'

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}