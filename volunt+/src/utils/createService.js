import { heroImages } from "../assets/imgs/heroImages";

export function createService(serviceForm) {
  return {
    id: Date.now(),
    ...serviceForm,
    image: heroImages.defaultService,
  };
}
