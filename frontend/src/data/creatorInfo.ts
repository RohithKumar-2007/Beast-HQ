export interface CreatorInfo {
  name: string;
  creatorName: string;
  summary: string;
  officialChannels: {
    name: string;
    handle: string;
    url: string;
    type: 'Main' | 'Philanthropy';
  }[];
  pillars: {
    title: string;
    description: string;
    tag: string;
  }[];
}

export const CREATOR_INFO: CreatorInfo = {
  name: 'Jimmy Donaldson',
  creatorName: 'MrBeast',
  summary: 'Jimmy Donaldson (known online as MrBeast) is an American digital content creator, entrepreneur, and philanthropist pioneer known for high-budget YouTube challenges, large-scale stunt productions, and global humanitarian projects.',
  officialChannels: [
    {
      name: 'MrBeast',
      handle: '@MrBeast',
      url: 'https://www.youtube.com/@MrBeast',
      type: 'Main',
    },
    {
      name: 'Beast Philanthropy',
      handle: '@BeastPhilanthropy',
      url: 'https://www.youtube.com/@BeastPhilanthropy',
      type: 'Philanthropy',
    },
  ],
  pillars: [
    {
      title: 'High-Stakes Challenges & Comparisons',
      description: 'Engaging comparison videos and endurance challenges with massive set designs and high-energy pacing.',
      tag: 'Entertainment',
    },
    {
      title: 'Large-Scale Productions',
      description: 'Complex logistical operations featuring custom builds, massive participant games, and record-setting spectacles.',
      tag: 'Production',
    },
    {
      title: 'Beast Philanthropy & Impact',
      description: 'Dedicated humanitarian initiatives funding clean water wells, food relief operations, and environmental campaigns.',
      tag: 'Philanthropy',
    },
  ],
};
