export interface Game {
  _id: string;
  systemGameName: string;
  commonGameName: string;
  gameDescription: string;
  gameLaunchers: string[];
  gameImage: string;
  gameClass: string;
  genre: string;
  inTop: boolean;
  releaseDate: string;
  publisher: string;
  gameVideoUrl: string;
  gameImages: string[];
  exactingness: string;
  createdAt: string;
  updatedAt: string;
  gameBoxArt: string;
  gameLogo: string;
  gameVideoLauncherUrl: string;
  gameHero: string;
}

export interface FormData {
  email: string;
  password: string;
}

export interface LoadMoreButtonProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export interface GenreSelectorProps {
  genre: string;
  setGenre: (genre: string) => void;
  gameGenres: string[];
}