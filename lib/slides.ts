import { Slide } from './types';
import {
  BootSlide,
  ContributionsSlide,
  ArchetypeSlide,
  RepositoriesSlide,
  LanguagesSlide,
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
];
