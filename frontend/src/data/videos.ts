export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: 'Challenge' | 'Survival' | 'Philanthropy' | 'Travel';
  youtubeUrl: string;
  thumbnailUrl: string;
  duration?: string;
  publishedYear?: string;
  verifiedSource: string;
  featured?: boolean;
}

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    youtubeId: 'kX3nB4UpJHY',
    title: '$1 vs $1,000,000,000 Hotel Room!',
    description: 'Jimmy compares accommodation price points across the globe, from a $1 room to a $1,000,000,000 underwater hotel suite.',
    category: 'Challenge',
    youtubeUrl: 'https://www.youtube.com/watch?v=kX3nB4UpJHY',
    thumbnailUrl: 'https://i.ytimg.com/vi/kX3nB4UpJHY/hqdefault.jpg',
    duration: '23 mins',
    publishedYear: '2023',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
    featured: true,
  },
  {
    id: 'vid-2',
    youtubeId: '0e3GPea1Tyg',
    title: '7 Days Stranded At Sea',
    description: 'MrBeast and his crew spend seven continuous days surviving on a wooden raft stranded in the open ocean.',
    category: 'Survival',
    youtubeUrl: 'https://www.youtube.com/watch?v=0e3GPea1Tyg',
    thumbnailUrl: 'https://i.ytimg.com/vi/0e3GPea1Tyg/hqdefault.jpg',
    duration: '26 mins',
    publishedYear: '2023',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
  },
  {
    id: 'vid-3',
    youtubeId: 'mwKJfNYwigM',
    title: 'We Built 100 Wells In Africa',
    description: 'Beast Philanthropy funds and constructs 100 clean drinking water wells across communities in Africa.',
    category: 'Philanthropy',
    youtubeUrl: 'https://www.youtube.com/watch?v=mwKJfNYwigM',
    thumbnailUrl: 'https://i.ytimg.com/vi/mwKJfNYwigM/hqdefault.jpg',
    duration: '10 mins',
    publishedYear: '2023',
    verifiedSource: 'https://www.youtube.com/@BeastPhilanthropy',
  },
  {
    id: 'vid-4',
    youtubeId: '1WEAJ-DFkHE',
    title: '$1 vs $500,000 Plane Ticket!',
    description: 'A comparison of flight experiences from the world’s cheapest commercial seats to a $500,000 luxury airline flight.',
    category: 'Travel',
    youtubeUrl: 'https://www.youtube.com/watch?v=1WEAJ-DFkHE',
    thumbnailUrl: 'https://i.ytimg.com/vi/1WEAJ-DFkHE/hqdefault.jpg',
    duration: '20 mins',
    publishedYear: '2023',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
  },
  {
    id: 'vid-5',
    youtubeId: '9bqk6ZUSZuA',
    title: '50 Hours Buried Alive',
    description: 'Jimmy spends 50 hours inside an underground coffin equipped with cameras, ventilation, and safety equipment.',
    category: 'Survival',
    youtubeUrl: 'https://www.youtube.com/watch?v=9bqk6ZUSZuA',
    thumbnailUrl: 'https://i.ytimg.com/vi/9bqk6ZUSZuA/hqdefault.jpg',
    duration: '18 mins',
    publishedYear: '2021',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
  },
  {
    id: 'vid-6',
    youtubeId: 'r7zJ8sr65jA',
    title: '$1,000,000 Hotel Room Vs $1 Hotel Room!',
    description: 'A high-budget price comparison showcasing extreme price points in accommodations across different countries.',
    category: 'Challenge',
    youtubeUrl: 'https://www.youtube.com/watch?v=r7zJ8sr65jA',
    thumbnailUrl: 'https://i.ytimg.com/vi/r7zJ8sr65jA/hqdefault.jpg',
    duration: '21 mins',
    publishedYear: '2022',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
  },
  {
    id: 'vid-7',
    youtubeId: 'iSuaaDtw37M',
    title: 'I Built 100 Houses And Gave Them Away!',
    description: 'Beast Philanthropy constructs and hands over 100 brand-new furnished homes to families across Latin America.',
    category: 'Philanthropy',
    youtubeUrl: 'https://www.youtube.com/watch?v=iSuaaDtw37M',
    thumbnailUrl: 'https://i.ytimg.com/vi/iSuaaDtw37M/hqdefault.jpg',
    duration: '15 mins',
    publishedYear: '2024',
    verifiedSource: 'https://www.youtube.com/@BeastPhilanthropy',
  },
  {
    id: 'vid-8',
    youtubeId: '7n25_uJb1wA',
    title: '7 Days Stranded In A Cave',
    description: 'Jimmy and his team attempt to survive seven continuous days inside pitch-black underground cave systems.',
    category: 'Survival',
    youtubeUrl: 'https://www.youtube.com/watch?v=7n25_uJb1wA',
    thumbnailUrl: 'https://i.ytimg.com/vi/7n25_uJb1wA/hqdefault.jpg',
    duration: '28 mins',
    publishedYear: '2024',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
  },
  {
    id: 'vid-9',
    youtubeId: 'fmf-GibFEDA',
    title: '100 Kids Vs 100 Adults For $500,000',
    description: 'A massive competitive game where 100 kids and 100 adults compete in an obstacle arena for a $500,000 grand prize.',
    category: 'Challenge',
    youtubeUrl: 'https://www.youtube.com/watch?v=fmf-GibFEDA',
    thumbnailUrl: 'https://i.ytimg.com/vi/fmf-GibFEDA/hqdefault.jpg',
    duration: '29 mins',
    publishedYear: '2022',
    verifiedSource: 'https://www.youtube.com/@MrBeast',
  },
  {
    id: 'vid-10',
    youtubeId: 'TJ2ifmgFBY0',
    title: 'I Rescued 100 Dogs!',
    description: 'Beast Philanthropy funds medical care, shelter, and permanent loving adoption homes for 100 rescue dogs.',
    category: 'Philanthropy',
    youtubeUrl: 'https://www.youtube.com/watch?v=TJ2ifmgFBY0',
    thumbnailUrl: 'https://i.ytimg.com/vi/TJ2ifmgFBY0/hqdefault.jpg',
    duration: '14 mins',
    publishedYear: '2023',
    verifiedSource: 'https://www.youtube.com/@BeastPhilanthropy',
  },
];

export const CATEGORIES = ['All', 'Challenge', 'Survival', 'Philanthropy', 'Travel'] as const;
export type VideoCategory = (typeof CATEGORIES)[number];
