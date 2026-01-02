# GitHub Wrapped: Cinematic Developer Year-in-Review

**Date:** 2026-01-02
**Status:** Design Approved
**Implementation Strategy:** Option A - Core Experience First

## Overview

GitHub Wrapped is a web-based experience that generates a cinematic, developer-native year-in-review using only a GitHub username and public data. The product presents up to ten narrative slides that reinterpret GitHub activity as a git diff and pull request review of the user's year.

### Core Value Proposition

A GitHub year can be reviewed the same way code is reviewed: as a diff. Additions, deletions, comments, checks, and summaries are familiar metaphors that allow raw metrics to be reframed as narrative insight. Instead of charts-first analytics, the product leads with language and meaning, using data as supporting evidence.

### Target Users

- **Primary:** Individual developers seeking a fun, fast, visually striking recap without signing in or granting permissions
- **Secondary:** Recruiters, peers, and social media audiences who encounter shared output
- **Scope:** Works for hobbyists with low activity and highly active developers alike

## High-Level Architecture

The application has three main layers:

### Data Layer
Server-side API route (`/api/github/[username]`) that:
- Proxies requests to GitHub's public API
- Fetches user profile, events, repositories, and commit activity for the specified year
- Performs heavy computation server-side (burstiness scoring, language analysis, repository ranking)
- Returns a clean `WrappedData` object
- Keeps API tokens hidden and allows response caching

### Experience Layer
Client component (`ExperienceController`) that:
- Manages the entire flow from username input to final summary
- Fetches wrapped data from API
- Shows boot sequence animation
- Orchestrates the 10-slide narrative
- Maintains current slide index
- Handles keyboard navigation (Space/Arrow/Escape)
- Tracks progress through the review

### Presentation Layer
Individual slide components that:
- Receive their slice of wrapped data as props
- Render as "diff views" with file headers, line numbers, and review-style commentary
- Follow shared design tokens (colors, typography, spacing)
- Handle their own layout and animations

### User Flow
```
Username Input → API Fetch → Boot Animation → Slide 1...10 → Summary Card
```

All transitions happen client-side using Framer Motion. The experience is fully self-contained on a single page with no route changes.

## Data Structure

### WrappedData Interface

```typescript
interface WrappedData {
  username: string;
  year: number;
  profile: {
    name: string;
    avatarUrl: string;
    bio: string;
    followers: number;
  };
  contributions: {
    total: number;
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
  };
  archetype: {
    name: string;
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  };
  repositories: {
    name: string;
    commits: number;
    additions: number;
    deletions: number;
  }[];
  languages: {
    name: string;
    percentage: number;
    linesWritten: number;
  }[];
  rhythm: {
    peakHour: number;
    peakDay: string;
    weekendRatio: number;
    longestStreak: number;
  };
  impact: {
    starsEarned: number;
    forksEarned: number;
    topStarredRepo: string;
  };
}
```

### GitHub API Endpoints Used

All endpoints are public and require no authentication:

- `GET /users/{username}` - Profile data
- `GET /users/{username}/events/public` - Recent activity (paginated)
- `GET /users/{username}/repos` - Repository list
- `GET /repos/{owner}/{repo}/stats/contributors` - Commit stats per repo

### Server-Side Computation

The API route implements helper functions to avoid exposing logic and reduce client bundle:
- `calculateArchetype()` - Generates developer archetype from activity patterns
- `scoreRepositoriesByEffort()` - Ranks repos by commit volume and impact
- `detectCodingRhythm()` - Analyzes time-of-day and day-of-week patterns
- `analyzeLinguisticIdentity()` - Computes language distribution and switching behavior

## Slide System Architecture

### Declarative Slide Registry

```typescript
const SLIDE_DECK = [
  { id: 'boot', component: BootSlide },
  { id: 'contributions', component: ContributionsSlide, file: 'year-in-review.md' },
  { id: 'archetype', component: ArchetypeSlide, file: 'developer-identity.diff' },
  { id: 'rhythm', component: RhythmSlide, file: 'coding-patterns.log' },
  { id: 'repositories', component: RepositoriesSlide, file: 'top-projects.diff' },
  { id: 'languages', component: LanguagesSlide, file: 'tech-stack.md' },
  { id: 'collaboration', component: CollaborationSlide, file: 'team-activity.diff' },
  { id: 'impact', component: ImpactSlide, file: 'community-reach.md' },
  { id: 'summary', component: SummarySlide, file: 'pull-request-summary.md' }
];
```

### Slide Component Interface

Each slide component receives:
- `data: WrappedData` - Full wrapped data object
- `isActive: boolean` - Whether this slide is currently shown

### Transition Design

**Diff-style fade with layout shift** instead of traditional slide swipes:
- File header persists using Framer Motion's `layoutId` (shared layout animation)
- Content fades out then in
- Creates illusion of same review window updating to show a new file

**Persistent elements:**
- Progress bar styled as "Review checkpoints: 3/9"
- Subtle commit hash in corner
- Use `layout` prop to smoothly reposition rather than re-render

**Keyboard navigation:**
- Space / Right Arrow → Next slide
- Left Arrow → Previous slide
- Escape → Exit to input screen

### Animation Implementation

Uses Framer Motion's `AnimatePresence` with `mode="wait"` to ensure clean transitions between slides.

## Visual Design System: Cinematic Diff

### Color Palette

Defined in `globals.css` as CSS variables:

```css
--color-diff-bg: #1a1a1a;        /* Deep charcoal background */
--color-diff-surface: #242424;    /* Slightly lighter panels */
--color-diff-addition: #22c55e;   /* Green for additions/positive */
--color-diff-deletion: #ef4444;   /* Red for deletions/negative */
--color-diff-neutral: #71717a;    /* Gray for metadata */
--color-diff-comment: #3b82f6;    /* Blue for commentary */
--color-diff-highlight: #fbbf24;  /* Amber for emphasis */
```

### Typography System

- **Headline text:** Serif font (Fraunces or Crimson Pro) for narrative weight
- **Metrics/data:** `font-mono` for commit hashes, line numbers, stats - signals factual grounding
- **Body/labels:** `font-sans` for UI chrome and labels

### Structural Elements

Every slide includes:
- File header bar: `--- a/year-in-review.md` style notation
- Line numbers in the gutter (subtle gray, mono font)
- Subtle grain texture overlay on background
- Commit hash in bottom corner (generated deterministically from username + year)

### Component Primitives

- `<DiffLine>` - Renders a line with +/- prefix and appropriate color
- `<FileHeader>` - The file path notation at top of each slide
- `<ReviewComment>` - Blue-bordered callout boxes styled like PR comments
- `<MetricBadge>` - Mono font, pill-shaped badges for stats

## Key Slide Designs

### Boot Slide

**Purpose:** First impression that sets technical tone

Simulates terminal loading sequence with typewriter effect:
```
> Initializing review session...
> Fetching commits from 2025...
> Analyzing 1,247 contributions...
> Generating insights...
> Review ready.
```

Duration: 3-4 seconds, then auto-advances

### Contributions Slide

**Purpose:** The headline moment

Styled as a diff with massive addition count:
```diff
--- a/2024-summary.md
+++ b/2025-summary.md
@@ -1,1 +1,1 @@

+ 1,247 contributions made in 2025

This year, you added:
+ 847 commits across 23 repositories
+ 89 pull requests opened
+ 156 issues engaged with
```

Big green number, supporting breakdown below. Includes `<ReviewComment>` box: "Consistent momentum throughout the year."

### Archetype Slide

**Purpose:** The differentiator - unique insight

Rendered as a code block defining the archetype:
```typescript
const developer = {
  username: "suryanewa",
  archetype: "Night Owl Architect",
  rarity: "Uncommon",
  traits: {
    peakActivity: "23:00 - 02:00",
    consistency: "high",
    focus: "deep work on few projects"
  }
};
```

Shows archetype name prominently with rarity badge. Brief description explains the pattern detected.

### Other Slides

Follow similar patterns:
- One core insight per slide
- Clear visual hierarchy
- Diff/code styling
- Optional review comment for context

## Handling Low Activity & Missing Data

### Philosophy

Reframe scarcity as style, never shame. A user with 12 commits gets "Precision Contributor" not "Low Activity."

### Archetype Fallbacks

- **If total contributions < 50:** Use quality archetypes like "Surgical Contributor," "Strategic Committer," "Precision Builder"
- **If data too sparse for rhythm:** Use "The Experimenter" - "Exploring, learning, building when inspiration strikes"

### Slide Adaptations

- **Repositories slide:** If < 3 repos, show "Deep focus on [repo name]" instead of ranking table
- **Languages slide:** If only 1 language, reframe as "Laser-focused on [language]" with consistency badge
- **Collaboration slide:** If no PRs/reviews, highlight issues or discussions. If zero, show "Solo builder crafting in public"
- **Impact slide:** If no stars, focus on "foundations laid" or "learning in progress"

### API Error Handling

- **Rate limit hit:** "Try again in a few minutes" with explanation
- **User not found:** Clear message with example usernames
- **Network timeout:** Retry once, then show error state

**Empty states never feel empty** - they're reframed as intentional choices or narrative opportunities.

## Summary Card & Sharing

### Card Layout

Fixed 1200x630px for social media optimization:

```
┌─────────────────────────────────────┐
│ # Pull Request: 2025 Year in Review │
│                                      │
│ @suryanewa                          │
│ Night Owl Architect · Uncommon      │
│                                      │
│ + 1,247 contributions               │
│ + 23 repositories touched           │
│ + Top: my-awesome-project           │
│ + Primary: TypeScript (64%)         │
│                                      │
│ "Deep focus, late-night momentum"   │
│                                      │
│ ✓ Approved · github-wrapped.dev     │
└─────────────────────────────────────┐
```

### Export Functionality

- **Download Summary:** Uses `html2canvas` to capture card as PNG
- **Copy Link:** Creates shareable URL `github-wrapped.dev/suryanewa/2025` that replays full experience
- **Branding:** Subtle "github-wrapped.dev" in corner

### Implementation Details

Summary slide has two states:
- `fullscreen` - During experience
- `card` - Compact export view

When user clicks download:
1. Component switches to card layout
2. Captures via canvas
3. Switches back to fullscreen

### Sharing Flow

```
Experience ends → Summary card shown → "Download Summary" + "Copy Link" buttons →
User shares on social media → Link drives traffic back
```

## Performance & Optimization

### Data Fetching Strategy

- GitHub API calls happen server-side to avoid CORS and rate limits
- Response cached for 1 hour: `Cache-Control: public, s-maxage=3600`
- Client shows loading state: "Cloning repository..." with progress indicator
- All computation happens server-side; client receives clean JSON

### Animation Performance

- Use `transform` and `opacity` only (GPU-accelerated properties)
- Framer Motion's `layoutId` for shared element transitions minimizes repaints
- All slide components lazy-loaded: `const ArchetypeSlide = dynamic(() => import('./slides/Archetype'))`
- Preload next slide while current is showing

### Bundle Optimization

- Recharts is tree-shakeable - only import needed chart components
- Custom fonts subset to Latin characters only, preloaded in layout
- Images use Next.js Image component with proper sizing
- **Target:** Total JS bundle < 200KB gzipped

### Mobile Considerations

- Touch swipe gestures for navigation (left/right = prev/next)
- `prefers-reduced-motion` check: disables transitions, shows instant cuts
- Slides fully responsive, stacking elements vertically on mobile
- Font sizes scale down appropriately but remain readable

## Implementation Phases

### Phase 1: Foundation (Week 1)

- Set up design tokens and CSS variables for diff aesthetic
- Create basic component primitives: `<DiffLine>`, `<FileHeader>`, `<ReviewComment>`, `<MetricBadge>`
- Build `ExperienceController` shell with keyboard navigation
- Implement username input screen with basic validation

### Phase 2: API & Data (Week 1-2)

- Build `/api/github/[username]` route with GitHub API integration
- Implement data fetching for user profile, repos, and events
- Create initial `WrappedData` interface and basic computation functions
- Add error handling and rate limit detection

### Phase 3: Core Slides (Week 2-3)

- Build Boot slide with typewriter animation
- Implement Contributions slide with diff styling
- Create Repositories slide with ranking
- Add Languages slide with breakdown
- Wire up Framer Motion transitions between slides

### Phase 4: Advanced Features (Week 3-4)

- Implement archetype computation algorithm
- Build Archetype slide with rarity system
- Add Rhythm and Impact slides
- Create Summary card with export functionality

### Phase 5: Polish (Week 4)

- Mobile responsive adjustments
- Performance optimization and lazy loading
- Edge case handling for low activity users
- Social sharing and meta tags

## Success Criteria

- Completion rate of the experience
- Frequency of share or download actions
- Time spent per session (target: 1-2 minutes)
- Qualitative feedback indicating emotional resonance or recognition

The project is successful if users describe it as:
- Fun
- Accurate-feeling
- Uniquely "for developers"

## Non-Goals

- Leaderboards
- Long-term user accounts
- Persistent storage
- Monetization features
- Comprehensive GitHub analytics replacement
- Competing on data completeness with authenticated tools

## Guiding Principle

Every commit tells a story, and this product exists to review that story the way developers review code: with structure, clarity, and a little bit of personality.
