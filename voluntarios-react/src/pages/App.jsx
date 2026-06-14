import { useMemo, useState } from "react";

import {
  Header,
  Hero,
  HowItWorks,
  ImpactAside,
  SearchPanel,
  ServiceModal,
  ServicesSection,
} from "../components";

import Footer from "../components/Footer/Footer";
import LoginPage from "../pages/LoginPages/LoginPage";
import { DEFAULT_SERVICE_FORM } from "../constants/serviceOptions";
import { servicesSeed } from "../data/services";
import { createService } from "../utils/createService";

import { filterServices } from "../utils/filterServices";

import "./App.css";
import UserRegisterPage from "../pages/UserRegisterPage/UserRegisterPage";

export default function App() {
  const [page, setPage] = useState("home");

  const [services, setServices] = useState(servicesSeed);

  const [filters, setFilters] = useState({
    search: "",
    category: "Todas",
    modality: "Todos",
  });

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const filteredServices = useMemo(
    () => filterServices(services, filters),
    [services, filters],
  );

  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }

  function handleServiceSubmit(serviceForm) {
    const newService = createService(serviceForm);

    setServices((currentServices) => [newService, ...currentServices]);
    setIsServiceModalOpen(false);
  }

  if (page === "login") {
    return <LoginPage onBackHome={() => setPage("home")} />;
  } else if (page === "Create") {
    return <UserRegisterPage onBackHome={() => setPage("home")} />;
  }

  return (
    <main className="app-shell">
      <Header
        onCreateUser={() => setPage("Create")}
        onOpenLogin={() => setPage("login")}
      />

      <Hero onOpenServiceModal={() => setIsServiceModalOpen(true)} />

      <SearchPanel filters={filters} onFilterChange={handleFilterChange} />

      <section className="app-content-grid">
        <ServicesSection services={filteredServices} />
      </section>

      <div className="home-info-row" style={{ gap: "10px" }}>
        <HowItWorks />
        <ImpactAside onOpenServiceModal={() => setIsServiceModalOpen(true)} />
      </div>

      <Footer />

      {isServiceModalOpen && (
        <ServiceModal
          initialForm={DEFAULT_SERVICE_FORM}
          onClose={() => setIsServiceModalOpen(false)}
          onSubmit={handleServiceSubmit}
        />
      )}
    </main>
  );
}
