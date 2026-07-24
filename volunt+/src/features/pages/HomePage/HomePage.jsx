import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header"
import Hero  from "../../../components/Hero/Hero";
import  SearchPanel from "../../../components/SearchPanel/SearchPanel";
import ServiceModal from "../../../components/ServiceModal/ServiceModal";
import ServicesSection  from "../../../components/ServicesSection/ServicesSection";
import {
  DEFAULT_SERVICE_FORM,
  DEFAULT_FORM,
} from "../../../constants/serviceOptions";
import { serviceMock } from "../../../types/DTOs/serviceMock";
import { createService } from "../../../utils/createService";
import { filterServices } from "../../../utils/filterServices";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [services, setServices] = useState(serviceMock);

  const [filters, setFilters] = useState({ ...DEFAULT_FORM });

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
      <Header
        onCreateUser={() => navigate("/cadastro")}
        onOpenLogin={() => navigate("/login")}
      />

      <Hero onOpenServiceModal={() => setIsServiceModalOpen(true)} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchPanel filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <section className="app-content-grid">
        <ServicesSection services={filteredServices} />
      </section>
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
