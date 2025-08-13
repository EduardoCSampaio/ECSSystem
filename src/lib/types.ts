export interface Website {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  hint: string;
}

export interface PortfolioContent {
  header?: {
    title: string;
  };
  introduction: {
    name: string;
    profession: string;
    about: string;
    avatar: string;
  };
  websites: {
    title: string;
    items: Website[];
  };
  gallery: {
    title: string;
    photos: Photo[];
  };
  contact: {
    title: string;
  };
}
