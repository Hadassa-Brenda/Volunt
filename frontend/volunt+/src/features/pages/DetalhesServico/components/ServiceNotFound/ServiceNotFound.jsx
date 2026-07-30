import React from "react";
import { Link } from "react-router-dom";

import Header from "../../../../../layouts/Header/Header";
import Footer from "../../../../../layouts/Footer/Footer";
import "./ServiceNotFound.css";

export function ServiceNotFound() {
  return (
    <main className="service-details-page">
      <Header />

      <section className="service-not-found">
        <h1>Serviço não encontrado</h1>

        <p>
          O serviço pode ter sido removido, pausado ou o endereço está
          incorreto.
        </p>

        <Link to="/explorar">Voltar para os serviços</Link>
      </section>

      <Footer />
    </main>
  );
}
