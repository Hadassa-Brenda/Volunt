import { useEffect, useState } from "react";
import { getServiceById } from "service/serviceService";

export function useService(id) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);
        setError(null);
        setService(null);

        const data = await getServiceById(id);

        setService(data);
      } catch (error) {
        console.error("Erro ao buscar serviço:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (!id) {
      setService(null);
      setLoading(false);
      return;
    }

    loadService();
  }, [id]);

  return {
    service,
    loading,
    error,
  };
}
