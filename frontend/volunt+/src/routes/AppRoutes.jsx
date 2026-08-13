import { Navigate, Routes, Route } from "react-router-dom";

import HomePage from "../features/pages/HomePage/HomePage";
import LoginPage from "../features/pages/LoginPages/LoginPage";
import UserRegisterPage from "../features/pages/UserRegisterPage/UserRegisterPage";
import DetalhesServico from "features/pages/DetalhesServico/DetalhesServico";
import CadastrarServico from "../features/pages/CadastrarServico/CadastrarServico";
import AboutVolunteering from "features/pages/AboutVolunteering/AboutVolunteering";
import CatalogoServicos from "features/pages/CatalogoServicos/CatalogoServicos";
import UserProfilePage from "../features/pages/UserProfilePage/UserProfilePage";
import ReportPage from "../features/pages/ReportPage/ReportPage";
import MyServicesPage from "../features/pages/MyServicesPage/MyServicesPage";
import AdminReportsPage from "../features/pages/AdminReportsPage/AdminReportsPage";
import FavoritesPage from "../features/pages/FavoritesPage/FavoritesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<UserRegisterPage />} />
      <Route path="/detalhes-servico/:id" element={<DetalhesServico />} />
      <Route path="/cadastrar-servico" element={<CadastrarServico />} />
      <Route path="/about-volunteering" element={<AboutVolunteering />} />
      <Route path="/catalogo-servicos" element={<CatalogoServicos />} />
      <Route path="/explorar" element={<CatalogoServicos />} />
      <Route path="/servicos" element={<Navigate to="/explorar" replace />} />
      <Route path="/perfil" element={<UserProfilePage />} />
      <Route path="/perfil/:id" element={<UserProfilePage />} />
      <Route path="/meus-servicos" element={<MyServicesPage />} />
      <Route path="/denunciar/:id" element={<ReportPage />} />
      <Route path="/denuncias" element={<ReportPage history />} />
      <Route path="/admin/denuncias" element={<AdminReportsPage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
}
