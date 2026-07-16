import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPages/LoginPage";
import UserRegisterPage from "../pages/UserRegisterPage/UserRegisterPage";
import DetalhesServico from "pages/DetalhesServico/DetalhesServico";
import CadastrarServico from "../pages/CadastrarServico/CadastrarServico";
import AboutVolunteering from "pages/AboutVolunteering/AboutVolunteering";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<UserRegisterPage />} />
      <Route path="/detalhes-servico/:id" element={<DetalhesServico />} />
      <Route path="/cadastrar-servico" element={<CadastrarServico />} />
      <Route path="/about-volunteering" element={<AboutVolunteering />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
}
