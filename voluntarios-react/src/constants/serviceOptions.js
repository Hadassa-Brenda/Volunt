export const MODALITY_OPTIONS = ['Todos', 'Presencial', 'Online', 'Híbrido'];

export const SERVICE_MODALITIES = MODALITY_OPTIONS.filter(
  (modality) => modality !== 'Todos'
);

export const LOCATION_OPTIONS = [
  'Belo Horizonte, MG',
  'Online',
  'Contagem, MG',
  'Betim, MG',
];

export const DEFAULT_SERVICE_FORM = {
  title: '',
  category: 'Educação',
  modality: 'Presencial',
  city: 'Belo Horizonte, MG',
  neighborhood: '',
  description: '',
};
