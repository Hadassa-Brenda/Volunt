import { useMemo, useState } from "react";

import {
  CategoryList,
  Header,
  Hero,
  HowItWorks,
  ImpactAside,
  SearchPanel,
  ServiceModal,
  ServicesSection,
} from "../components";
import { DEFAULT_SERVICE_FORM } from "../constants/serviceOptions";
import { servicesSeed } from "../data/services";
import { createService } from "../utils/createService";
import { filterServices } from "../utils/filterServices";
import "./App.css";

export default function App() {
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

  return (
    <main className="app-shell">
      <Header onOpenServiceModal={() => setIsServiceModalOpen(true)} />

      <Hero onOpenServiceModal={() => setIsServiceModalOpen(true)} />

      <SearchPanel filters={filters} onFilterChange={handleFilterChange} />

      <section className="app-content-grid">
        <ServicesSection services={filteredServices} />
      </section>
      <div className="home-info-row" style={{ gap: "10px" }}>
        <HowItWorks style={{ padding: "10px" }} />
        <ImpactAside onOpenServiceModal={() => setIsServiceModalOpen(true)} />
      </div>
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
