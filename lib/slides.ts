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
    file: `${new Date().getFullYear()}-year-in-review.pr`,
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
    id: 'collaboration',
    component: CollaborationSlide,
    file: 'collaboration-signal.md',
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
