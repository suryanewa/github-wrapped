import { Slide } from './types';
import {
  BootSlide,
  ContributionsSlide,
  ArchetypeSlide,
  RepositoriesSlide,
  LanguagesSlide,
  RhythmSlide,
  ImpactSlide,
  SummarySlide,
} from '@/components/slides';

export const SLIDE_DECK: Slide[] = [
  {
    id: 'boot',
    component: BootSlide,
  },
  {
    id: 'contributions',
    component: ContributionsSlide,
    file: 'year-in-review.md',
  },
  {
    id: 'archetype',
    component: ArchetypeSlide,
    file: 'developer-identity.ts',
  },
  {
    id: 'repositories',
    component: RepositoriesSlide,
    file: 'top-projects.diff',
  },
  {
    id: 'languages',
    component: LanguagesSlide,
    file: 'tech-stack.md',
  },
  {
    id: 'rhythm',
    component: RhythmSlide,
    file: 'coding-patterns.log',
  },
  {
    id: 'impact',
    component: ImpactSlide,
    file: 'community-reach.diff',
  },
  {
    id: 'summary',
    component: SummarySlide,
    file: 'pull-request-summary.md',
  },
];
