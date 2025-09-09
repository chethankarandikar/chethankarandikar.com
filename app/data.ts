type Project = {
  name: string
  description: string
  link?: string
  video?: string
  thumbnail?: string
  youtube?: string
  id: string
  dateRange: string
  images?: { src: string; caption: string }[]
  note?: string
}

type Photo = {
  id: number
  url: string
  location: string
  date: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Rocket Live Video System',
    description: 'As part of the Illinois Space Society\'s Spaceshot project, I helped build and operate a 1.3 GHz live-video ground station that successfully transmitted video from 75,000+ feet during launch at the Friends of Amateur Rocketry site in California. For this live video system, I helped design and solder a custom ESP32-based camera interface PCB in KiCad, from schematic design to component selection and board layout. The PCB integrates with the video system to provide remote power control, camera switching, and battery monitoring through I²C communication with our custom flight computer.',
    thumbnail: '/project-photos/rocket.jpeg',
    youtube: '5BYeBV-nO4Y',
    dateRange: 'September 2024 - May 2025',
    id: 'project1',
    images: [
      { src: '/project-photos/soldering.JPG', caption: 'Soldering Video Amplifier' },
      { src: '/project-photos/CAM.jpg', caption: 'CAM Board' },
      { src: '/project-photos/videobox.jpg', caption: 'Video System' },
    ],
  },
  {
    name: 'Matrix Multiplier',
    description: 'Built a matrix multiplier using breadboards, digital logic, a finite state machine, and 7-segment displays that computes 2x2 matrix multiplication with 2-bit numbers as input in real time.',
    thumbnail: '/project-photos/matrix-multiplier-thumbnail.jpg',
    youtube: 'bYsS2kxaklU',
    dateRange: 'January 2025 - May 2025',
    id: 'project2',
    note: '(one of the 7-segment displays was a dud, that\'s why it\'s not on)',
  },
  {
    name: 'Scholar (HackIllinois)',
    description: 'Developed Scholar, a personalized scholarship-matching platform using a React front-end paired with an Express/Node.js backend and MongoDB. Used Puppeteer for live data scraping and OpenAI API for insights and matching based on user profile.',
    thumbnail: '/project-photos/scholar-thumbnail.jpg',
    youtube: '7ehgsasrK70',
    link: 'https://github.com/anshkaggarwal22/HackIllinois',
    dateRange: 'February 2025 - March 2025',
    id: 'project3',
  },
]

export const PHOTOS: Photo[] = [
  {
    id: 1,
    url: "/website-photos/fagradalsfjall.jpeg",
    location: "fagradalsfjall, iceland",
    date: "july 2025"
  },
  {
    id: 2,
    url: "/website-photos/diamond_beach.jpeg",
    location: "diamond beach, iceland",
    date: "july 2025"
  },
  {
    id: 3,
    url: "/website-photos/stokksnes.jpeg",
    location: "stokksnes, iceland",
    date: "july 2025"
  },
  {
    id: 4,
    url: "/website-photos/lake-tahoe.jpeg",
    location: "lake tahoe, california",
    date: "march 2025"
  },
  {
    id: 5,
    url: "/website-photos/mojave.jpg",
    location: "mojave desert, california",
    date: "2025"
  },
  {
    id: 6,
    url: "/website-photos/uiuc.jpg",
    location: "urbana, illinois",
    date: "2025"
  },
  {
    id: 7,
    url: "/website-photos/maya-beach.jpg",
    location: "maya beach, thailand",
    date: "2024"
  },
  {
    id: 8,
    url: "/website-photos/chiang-mai.jpeg",
    location: "chiang mai, thailand",
    date: "2024"
  },
  {
    id: 9,
    url: "/website-photos/chiang-mai.jpg",
    location: "chiang mai, thailand",
    date: "2024"
  },
  {
    id: 10,
    url: "/website-photos/bangkok.jpg",
    location: "bangkok, thailand",
    date: "2024"
  },
  {
    id: 11,
    url: "/website-photos/antelope-canyon.jpg",
    location: "antelope canyon, arizona",
    date: "2024"
  },
  {
    id: 12,
    url: "/website-photos/legacy-west.jpg",
    location: "plano, texas",
    date: "2024"
  },
  {
    id: 13,
    url: "/website-photos/lanikai-beach.JPG",
    location: "lanikai beach, hawaii",
    date: "2024"
  },
  {
    id: 14,
    url: "/website-photos/hiroshima.jpg",
    location: "itsukushima, japan",
    date: "2023"
  },
  {
    id: 15,
    url: "/website-photos/kyoto.jpg",
    location: "kyoto, japan",
    date: "2023"
  },
  {
    id: 16,
    url: "/website-photos/lajolla.jpg",
    location: "la jolla, california",
    date: "2023"
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/chethankarandikar',
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/chethankarandikar',
  },
]

