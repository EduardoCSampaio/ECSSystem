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

export interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: string; // Ex: "Tempo Integral", "Meio Período"
  description: string;
}


export interface PortfolioContent {
  home: {
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
  };
  projects: {
    websites: {
      title: string;
      items: Website[];
    };
  };
  about: {
    introduction: {
      name: string;
      profession: string;
      about: string;
      avatar: string;
    };
    gallery: {
      title: string;
      photos: Photo[];
    };
  };
  contact: {
    title: string;
  };
  vacancies: {
    title: string;
    items: Vacancy[];
  }
}
