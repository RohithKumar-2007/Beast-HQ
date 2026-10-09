export type FanCategory = 'Challenge Beast' | 'Impact Beast' | 'Gaming Beast' | 'Adventure Beast';

export interface QuizOption {
  id: string;
  text: string;
  category: FanCategory;
  description: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface CategoryResultDetail {
  category: FanCategory;
  badge: string;
  title: string;
  summary: string;
  traits: string[];
  recommendedRoute: string;
  recommendedText: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'What type of MrBeast video gets you most excited to watch?',
    subtitle: 'Choose the format that captures your attention first.',
    options: [
      {
        id: 'q1-a',
        text: 'High-stakes challenges & extreme price comparisons ($1 vs $1,000,000,000)',
        category: 'Challenge Beast',
        description: 'You love intense competition, massive scale, and fast-paced pacing.',
      },
      {
        id: 'q1-b',
        text: 'Humanitarian projects (Building 100 wells, #TeamTrees, #TeamSeas)',
        category: 'Impact Beast',
        description: 'You are inspired by real-world positive change and philanthropic initiatives.',
      },
      {
        id: 'q1-c',
        text: 'Gaming challenges, custom arenas, and virtual tournaments',
        category: 'Gaming Beast',
        description: 'You enjoy creative gaming mechanics, gamer showdowns, and virtual events.',
      },
      {
        id: 'q1-d',
        text: 'Extreme survival stunts (7 Days Stranded at Sea, Buried Alive)',
        category: 'Adventure Beast',
        description: 'You are fascinated by physical endurance, outdoor survival, and extreme tests.',
      },
    ],
  },
  {
    id: 'q2',
    title: 'If you were invited to feature in a MrBeast video, what role would you pick?',
    subtitle: 'Imagine stepping into the production set.',
    options: [
      {
        id: 'q2-a',
        text: 'Competing in a massive obstacle arena for a grand cash prize',
        category: 'Challenge Beast',
        description: 'You thrive in competitive environments and high-reward games.',
      },
      {
        id: 'q2-b',
        text: 'Constructing clean drinking water wells or handing over keys to new homes',
        category: 'Impact Beast',
        description: 'You find deep satisfaction in helping communities and making an impact.',
      },
      {
        id: 'q2-c',
        text: 'Captain of a 100-player gaming squad in a custom virtual arena',
        category: 'Gaming Beast',
        description: 'You love strategic gameplay and multiplayer competition.',
      },
      {
        id: 'q2-d',
        text: 'Surviving 7 days on an ocean raft or inside an underground cave system',
        category: 'Adventure Beast',
        description: 'You love pushing limits and experiencing rare, extreme environments.',
      },
    ],
  },
  {
    id: 'q3',
    title: 'What quality do you admire most about MrBeast’s work?',
    subtitle: 'Select the core value that resonates with you most.',
    options: [
      {
        id: 'q3-a',
        text: 'The relentless drive to make every video bigger and more ambitious',
        category: 'Challenge Beast',
        description: 'Constant innovation and scaling production quality.',
      },
      {
        id: 'q3-b',
        text: 'Directing channel revenue and resources towards helping people in need',
        category: 'Impact Beast',
        description: 'Using media platforms to drive measurable real-world humanitarian good.',
      },
      {
        id: 'q3-c',
        text: 'The fun, energetic gaming spirit and interactive audience entertainment',
        category: 'Gaming Beast',
        description: 'Playful competition and engaging digital culture.',
      },
      {
        id: 'q3-d',
        text: 'Daring physical endurance, mental grit, and raw survival challenges',
        category: 'Adventure Beast',
        description: 'Authentic human perseverance and thrilling endurance feats.',
      },
    ],
  },
];

export const RESULT_DETAILS: Record<FanCategory, CategoryResultDetail> = {
  'Challenge Beast': {
    category: 'Challenge Beast',
    badge: 'HIGH-STAKES COMPETITOR',
    title: 'The Challenge Beast',
    summary: 'You are energized by fast-paced competition, high-stakes games, and massive set productions. You love watching creators push the boundaries of what is possible on YouTube!',
    traits: ['Enthusiastic about competition', 'Appreciates high production value', 'Loves dramatic showdowns'],
    recommendedRoute: '/content',
    recommendedText: 'Explore Challenge Videos in Content Explorer',
  },
  'Impact Beast': {
    category: 'Impact Beast',
    badge: 'HUMANITARIAN & GIVER',
    title: 'The Impact Beast',
    summary: 'You are deeply inspired by Beast Philanthropy, Team Trees, and Team Seas. For you, the best part of the MrBeast story is seeing media resources transformed into real-world help for communities in need.',
    traits: ['Driven by empathy and generosity', 'Supports global conservation', 'Inspires positive community action'],
    recommendedRoute: '/journey',
    recommendedText: 'Discover Philanthropic Milestones on Journey Page',
  },
  'Gaming Beast': {
    category: 'Gaming Beast',
    badge: 'VIRTUAL STRATEGIST',
    title: 'The Gaming Beast',
    summary: 'You love the playful, creative gaming origins of MrBeast content! Whether it is custom Minecraft arenas or massive multiplayer showdowns, you appreciate digital culture and strategic fun.',
    traits: ['Loves interactive gaming content', 'Appreciates creative challenge design', 'Enjoys squad competitions'],
    recommendedRoute: '/content',
    recommendedText: 'Check out Creator Highlights in Content Catalog',
  },
  'Adventure Beast': {
    category: 'Adventure Beast',
    badge: 'ENDURANCE EXPLORER',
    title: 'The Adventure Beast',
    summary: 'You are fascinated by raw human endurance, outdoor survival, and extreme physical tests. Videos like 7 Days Stranded at Sea or Buried Alive are your absolute favorite content style!',
    traits: ['Captivated by survival feats', 'Admires mental and physical grit', 'Loves wilderness exploration'],
    recommendedRoute: '/journey',
    recommendedText: 'Explore Content Evolution on Journey Page',
  },
};

/**
 * Deterministic scoring function for computing final FanCategory.
 * Ties are broken using a fixed priority: Challenge Beast > Impact Beast > Gaming Beast > Adventure Beast.
 */
export function calculateQuizResult(selectedOptionIds: string[]): FanCategory {
  const scores: Record<FanCategory, number> = {
    'Challenge Beast': 0,
    'Impact Beast': 0,
    'Gaming Beast': 0,
    'Adventure Beast': 0,
  };

  selectedOptionIds.forEach((optId) => {
    for (const q of QUIZ_QUESTIONS) {
      const foundOpt = q.options.find((o) => o.id === optId);
      if (foundOpt) {
        scores[foundOpt.category] += 1;
        break;
      }
    }
  });

  const priorityOrder: FanCategory[] = ['Challenge Beast', 'Impact Beast', 'Gaming Beast', 'Adventure Beast'];
  let highestCategory: FanCategory = priorityOrder[0];
  let maxScore = -1;

  for (const cat of priorityOrder) {
    if (scores[cat] > maxScore) {
      maxScore = scores[cat];
      highestCategory = cat;
    }
  }

  return highestCategory;
}
