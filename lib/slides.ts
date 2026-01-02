import { Slide } from './types';
import {
  BootSlide,
  ProfileSlide,
  ContributionsSlide,
  ArchetypeSlide,
  RepositoriesSlide,
  LanguagesSlide,
  RhythmSlide,
  CollaborationSlide,
  ImpactSlide,
  SummarySlide,
} from '@/components/slides';

export const SLIDE_DECK: Slide[] = [
  {
    id: 'boot',
    component: BootSlide,
  },
  {
    id: 'profile',
    component: ProfileSlide,
    file: 'github-wrapped-2025.pr',
  },
  {
    id: 'contributions',
    component: ContributionsSlide,
    file: 'contributions-summary.md',
  },
  {
    id: 'archetype',
    component: ArchetypeSlide,
    file: 'developer-archetype.ts',
  },
  {
    id: 'repositories',
    component: RepositoriesSlide,
    file: 'top-repositories.md',
  },
  {
    id: 'languages',
    component: LanguagesSlide,
    file: 'language-distribution.json',
  },
  {
    id: 'rhythm',
    component: RhythmSlide,
    file: 'activity-rhythm.log',
  },
  {
    id: 'collaboration',
    component: CollaborationSlide,
    file: 'collaboration-network.yml',
  },
  {
    id: 'impact',
    component: ImpactSlide,
    file: 'impact-metrics.md',
  },
  {
    id: 'summary',
    component: SummarySlide,
    file: 'year-review-summary.md',
  },
];
