import { useState } from "react";

export function useServiceDetails(service) {
  const [isFavorite, setIsFavorite] = useState(false);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportSent, setReportSent] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: service.title,
      text: service.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência.");
    } catch (error) {
      console.error("Não foi possível compartilhar o serviço:", error);
    }
  };

  const handleReportSubmit = (event) => {
    event.preventDefault();

    if (!reportReason) {
      return;
    }

    setReportSent(true);

    setTimeout(() => {
      setReportModalOpen(false);
      setReportSent(false);
      setReportReason("");
      setReportDescription("");
    }, 1800);
  };

  return {
    isFavorite,
    setIsFavorite,

    reportModalOpen,
    setReportModalOpen,

    reportReason,
    setReportReason,

    reportDescription,
    setReportDescription,

    reportSent,

    handleShare,
    handleReportSubmit,
  };
}
