export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'Origin' | 'Format Shift' | 'Philanthropy' | 'Global Scale';
  sourceName: string;
  sourceUrl: string;
  keyHighlight?: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'ms-2012',
    year: '2012',
    title: 'First YouTube Uploads',
    description: 'Jimmy Donaldson registers his YouTube channel under the handle "@MrBeast6000" at age 13, initially uploading gaming footage and commentary.',
    category: 'Origin',
    sourceName: 'Official @MrBeast Channel About',
    sourceUrl: 'https://www.youtube.com/@MrBeast',
    keyHighlight: 'Channel founded in 2012',
  },
  {
    id: 'ms-2017',
    year: '2017',
    title: 'First Major Viral Endurance Challenge',
    description: 'Achieves widespread online recognition after uploading a 40-hour endurance video counting to 100,000, establishing a reputation for high-effort content.',
    category: 'Format Shift',
    sourceName: 'Official YouTube Publication',
    sourceUrl: 'https://www.youtube.com/@MrBeast',
    keyHighlight: 'Signature high-effort format',
  },
  {
    id: 'ms-2019',
    year: '2019',
    title: 'Launch of #TeamTrees Environmental Campaign',
    description: 'Partners with Mark Rober and the Arbor Day Foundation to launch #TeamTrees, rallying creators and donors to fund the planting of 20 million trees globally.',
    category: 'Philanthropy',
    sourceName: 'Official Team Trees Site',
    sourceUrl: 'https://teamtrees.org',
    keyHighlight: '20M+ trees planted globally',
  },
  {
    id: 'ms-2020',
    year: '2020',
    title: 'Formal Establishment of Beast Philanthropy',
    description: 'Founds Beast Philanthropy as an official 501(c)(3) non-profit organization, directing 100% of its channel revenue towards hunger relief and community aid.',
    category: 'Philanthropy',
    sourceName: 'Beast Philanthropy Official Portal',
    sourceUrl: 'https://www.beastphilanthropy.org',
    keyHighlight: 'Registered 501(c)(3) Non-Profit',
  },
  {
    id: 'ms-2021',
    year: '2021',
    title: 'Launch of #TeamSeas Ocean Cleanup',
    description: 'Co-launches #TeamSeas alongside Ocean Conservancy and The Ocean Cleanup, successfully raising funds to remove 30 million pounds of plastic and trash from ocean waters.',
    category: 'Philanthropy',
    sourceName: 'Official Team Seas Site',
    sourceUrl: 'https://teamseas.org',
    keyHighlight: '30M+ pounds of ocean trash removed',
  },
  {
    id: 'ms-2023',
    year: '2023–2024',
    title: 'Global Water Wells & Housing Initiatives',
    description: 'Expands direct humanitarian operations, funding and constructing 100 clean drinking water wells across Africa and building 100 homes for families in Latin America.',
    category: 'Global Scale',
    sourceName: 'Beast Philanthropy Verified Releases',
    sourceUrl: 'https://www.youtube.com/@BeastPhilanthropy',
    keyHighlight: '100 Water Wells & 100 Houses Built',
  },
];
