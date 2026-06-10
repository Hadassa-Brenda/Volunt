import {
  BookOpen,
  Brain,
  Dumbbell,
  Gift,
  HeartPulse,
  Monitor,
  MoreHorizontal,
  Music,
  PawPrint,
  Utensils,
} from 'lucide-react';

export const SERVICE_CATEGORIES = [
  { name: 'Educação', icon: BookOpen, tone: 'green' },
  { name: 'Música', icon: Music, tone: 'pink' },
  { name: 'Esporte', icon: Dumbbell, tone: 'orange' },
  { name: 'Tecnologia', icon: Monitor, tone: 'blue' },
  { name: 'Doações', icon: Gift, tone: 'green' },
  { name: 'Alimentação', icon: Utensils, tone: 'blue' },
  { name: 'Saúde', icon: HeartPulse, tone: 'pink' },
  { name: 'Animais', icon: PawPrint, tone: 'orange' },
  { name: 'Apoio psicológico', icon: Brain, tone: 'purple' },
];

export const POPULAR_CATEGORIES = [
  ...SERVICE_CATEGORIES,
  { name: 'Ver todas', value: 'Todas', icon: MoreHorizontal, tone: 'blue' },
];

export const CATEGORY_FILTER_OPTIONS = [
  'Todas',
  ...SERVICE_CATEGORIES.map((category) => category.name),
];
