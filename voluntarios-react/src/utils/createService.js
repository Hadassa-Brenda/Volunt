import { heroImages } from "../assets/heroImages";

export function createService(serviceForm) {
  return {
    id: Date.now(),
    ...serviceForm,
    image: heroImages.defaultService,
  };
}
