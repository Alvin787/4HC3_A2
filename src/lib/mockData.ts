
export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
}

export interface StudySpot {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  crowdStatus: 'Quiet' | 'Moderate' | 'Busy';
  image: string;
  description: string;
  amenities: string[];
  reviews: Review[];
  occupancyData: { time: string; level: number }[];
}

export const STUDY_SPOTS: StudySpot[] = [
  {
    id: '1',
    name: 'Mills Memorial Library - Learning Commons',
    category: 'Libraries',
    rating: 4.7,
    distance: 'Central Campus',
    crowdStatus: 'Busy',
    image: 'https://images.unsplash.com/photo-1596405713139-229f821372c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY01hc3RlciUyMFVuaXZlcnNpdHklMjBNaWxscyUyMExpYnJhcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM3Njc1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'The main library on campus. The Learning Commons on the 2nd floor is great for group work, while upper floors offer silent study areas.',
    amenities: ['Printers', 'Computers', 'Group Tables', 'WiFi'],
    reviews: [
      { id: 'r1', user: 'Jessica T.', rating: 5, text: 'Love the collaborative vibe in the commons!', date: '2 days ago' },
      { id: 'r2', user: 'Mark D.', rating: 3, text: 'Can get too loud during exam season.', date: '1 week ago' },
    ],
    occupancyData: [
      { time: '8am', level: 30 },
      { time: '10am', level: 60 },
      { time: '12pm', level: 90 },
      { time: '2pm', level: 95 },
      { time: '4pm', level: 80 },
      { time: '6pm', level: 50 },
    ]
  },
  {
    id: '2',
    name: 'H.G. Thode Library',
    category: 'Libraries',
    rating: 4.5,
    distance: 'West Campus',
    crowdStatus: 'Moderate',
    image: 'https://images.unsplash.com/photo-1669348849154-25e23e2ccf05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY01hc3RlciUyMFVuaXZlcnNpdHklMjBUaG9kZSUyMExpYnJhcnklMjBzdHVkeSUyMGFyZWF8ZW58MXx8fHwxNzYzNzY3NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'A popular spot for science and engineering students. The lower level features the "Reactor" collaborative space.',
    amenities: ['Whiteboards', 'Power Outlets', 'Cafe', 'Late Night'],
    reviews: [
      { id: 'r3', user: 'Ryan K.', rating: 4, text: 'Good for late night grinding.', date: 'Yesterday' },
    ],
    occupancyData: [
      { time: '8am', level: 20 },
      { time: '10am', level: 50 },
      { time: '12pm', level: 70 },
      { time: '2pm', level: 75 },
      { time: '4pm', level: 60 },
      { time: '6pm', level: 40 },
    ]
  },
  {
    id: '3',
    name: 'Health Sciences Library (HSL)',
    category: 'Libraries',
    rating: 4.8,
    distance: 'Medical Centre',
    crowdStatus: 'Quiet',
    image: 'https://images.unsplash.com/photo-1722312770687-22efc78343d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY01hc3RlciUyMFVuaXZlcnNpdHklMjBIZWFsdGglMjBTY2llbmNlcyUyMExpYnJhcnl8ZW58MXx8fHwxNzYzNzY3NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Located in the McMaster University Medical Centre. A very quiet and professional atmosphere perfect for intense focus.',
    amenities: ['Silence', 'Comfy Chairs', 'Power Outlets'],
    reviews: [
      { id: 'r4', user: 'Emily C.', rating: 5, text: 'The quietest place on campus. Hands down.', date: '3 days ago' },
    ],
    occupancyData: [
      { time: '8am', level: 40 },
      { time: '10am', level: 65 },
      { time: '12pm', level: 75 },
      { time: '2pm', level: 70 },
      { time: '4pm', level: 50 },
      { time: '6pm', level: 30 },
    ]
  },
  {
    id: '4',
    name: 'MUSC Atrium',
    category: 'Lounges',
    rating: 4.2,
    distance: 'Central Campus',
    crowdStatus: 'Busy',
    image: 'https://images.unsplash.com/photo-1746862373852-dd6f6f9a0973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY01hc3RlciUyMFVuaXZlcnNpdHklMjBTdHVkZW50JTIwQ2VudHJlJTIwYXRyaXVtfGVufDF8fHx8MTc2Mzc2NzU5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'The heart of campus life. High ceilings and natural light, but can be noisy with events and foot traffic. Great for casual study.',
    amenities: ['Food Nearby', 'Social', 'WiFi', 'Starbucks'],
    reviews: [],
    occupancyData: [
      { time: '8am', level: 10 },
      { time: '10am', level: 50 },
      { time: '12pm', level: 90 },
      { time: '2pm', level: 80 },
      { time: '4pm', level: 60 },
      { time: '6pm', level: 40 },
    ]
  },
  {
    id: '5',
    name: 'MDCL Atrium',
    category: 'Study Halls',
    rating: 4.6,
    distance: 'Medical Centre',
    crowdStatus: 'Moderate',
    image: 'https://images.unsplash.com/photo-1741638511444-4fff9a62053d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY01hc3RlciUyMFVuaXZlcnNpdHklMjBNRENMJTIwYXRyaXVtfGVufDF8fHx8MTc2Mzc2NzU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Michael G. DeGroote Centre for Learning. Modern building with a beautiful atrium, waterfalls, and plenty of natural light.',
    amenities: ['Natural Light', 'Cafe', 'Power Outlets'],
    reviews: [
      { id: 'r5', user: 'Sam W.', rating: 5, text: 'My favorite hidden gem. The waterfalls are relaxing.', date: '1 week ago' },
    ],
    occupancyData: [
      { time: '8am', level: 15 },
      { time: '10am', level: 40 },
      { time: '12pm', level: 60 },
      { time: '2pm', level: 55 },
      { time: '4pm', level: 35 },
      { time: '6pm', level: 20 },
    ]
  },
  {
    id: '6',
    name: 'L.R. Wilson Hall',
    category: 'Study Halls',
    rating: 4.7,
    distance: 'East Campus',
    crowdStatus: 'Quiet',
    image: 'https://images.unsplash.com/photo-1655800466797-8ab2598b4274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNY01hc3RlciUyMFVuaXZlcnNpdHklMjBMUiUyMFdpbHNvbiUyMEhhbGwlMjBzdHVkeSUyMGxvdW5nZXxlbnwxfHx8fDE3NjM3Njc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Home to Humanities and Social Sciences. Features modern study lounges with comfortable seating and large windows.',
    amenities: ['Modern', 'Comfy Seating', 'Quiet Areas'],
    reviews: [],
    occupancyData: [
      { time: '8am', level: 10 },
      { time: '10am', level: 35 },
      { time: '12pm', level: 65 },
      { time: '2pm', level: 50 },
      { time: '4pm', level: 30 },
      { time: '6pm', level: 15 },
    ]
  }
];
