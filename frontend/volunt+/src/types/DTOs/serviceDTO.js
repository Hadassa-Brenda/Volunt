import { SERVICE_CATEGORIES } from "types/enum/Categories";
import { SERVICE_MODALITIES } from "types/enum/Modalities";
import { PROFILE_TYPES } from "types/enum/ProfileTypes";
import { SERVICE_STATUS } from "types/enum/Status";

export const servicesDTO = [
  {
    id: 1,
    name: "Reforço escolar gratuito",
    description:
      "Aulas para alunos do ensino fundamental e médio com apoio em português e matemática.",
    category: SERVICE_CATEGORIES[0].value,
    modality: SERVICE_MODALITIES[0].value,
    city: "Belo Horizonte",
    providerType: PROFILE_TYPES[0].value,
    status: SERVICE_STATUS[0].value,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-07-12",
  },
]