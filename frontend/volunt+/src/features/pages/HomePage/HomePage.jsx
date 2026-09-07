import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";
import Hero from "../../../components/Hero/Hero";
import SearchPanel from "../../../components/SearchPanel/SearchPanel";
import ServicesSection from "../../../components/ServicesSection/ServicesSection";

import { filterServices } from "../../../utils/filterServices";
import { getServices } from "api/servicesApi";

import "./HomePage.css";

const INITIAL_FILTERS = {
  search: "",
  location: [],
  category: [],
  modality: [],
  genero: [],
  diaDaSemana: [],
  turno: [],
  avaliacao: [],
};

export default function HomePage() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    const data = getServices();

    setServices(data);
  }, []);

  const filteredServices = useMemo(() => {
    return filterServices(services, filters);
  }, [services, filters]);

  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }

  function handleApplyFilters(newFilters) {
    setFilters(newFilters);
  }

  return (
    <main className="app-shell">
      <Header
        onCreateUser={() => navigate("/cadastro")}
        onOpenLogin={() => navigate("/login")}
      />

      <Hero />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          data={services}
        />
      </div>

      <section className="app-content-grid">
        <ServicesSection services={filteredServices} />
      </section>

      <Footer />
    </main>
  );
}
