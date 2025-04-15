import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "../../types/interfaces";
import api from "../../api/api";
import GamesListSocket from "../../components/GamesListSocket";
import GenreSelector from "../../components/GenreSelector/GenreSelector";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import GameDetails from "../../components/GameDetails/GameDetails"; 
import styles from "./GamesPage.module.css";



const fetchGames = async ({ pageParam = 1, queryKey }: { pageParam?: number; queryKey: string[] }) => {
  const genre = queryKey[1];
  const genreParam = genre !== "ALL" ? `&genre=${genre}` : "";
  const res = await api.get(`/games/findAll?page=${pageParam}&limit=9${genreParam}`);
  return {
    games: res.data.games,
    totalGames: res.data.totalGames,
    nextPage: res.data.games.length < res.data.totalGames ? pageParam + 1 : undefined,
  };
};

const gameGenres = [
  "ALL",
  "FREE",
  "MOBA",
  "SHOOTERS",
  "LAUNCHERS",
  "MMORPG",
  "STRATEGY",
  "FIGHTING",
  "RACING",
  "SURVIVAL",
  "ONLINE"
];

const GamesPage = () => {
  const [genre, setGenre] = useState("ALL");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["games", genre],
    queryFn: fetchGames,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((page) => page.games).length;
      return totalLoaded < lastPage.totalGames ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });
  const handleGameClick = (game: Game) => {
    setSelectedGame(game); // Встановлення вибраної гри
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.gameTitle}>Список ігор</h2>
     <GenreSelector genre={genre} setGenre={setGenre} gameGenres={gameGenres}/>
      <ul className={styles.gameList}>
  {(() => {
    const seenIds = new Set<string>();
    const uniqueGames: Game[] = [];

    data?.pages.forEach((page) => {
      page.games.forEach((game: Game) => {
        if (!seenIds.has(game._id)) {
          seenIds.add(game._id);
          uniqueGames.push(game);
        }
      });
    });

    return uniqueGames.map((game) => (
      <li key={game._id}>
        <img
          className={styles.gameImage}
          src={game.gameImage}
          alt={game.systemGameName}
          onClick={() => handleGameClick(game)}
        />
        <h3 className={styles.gameTitl}>{game.systemGameName}</h3>
      </li>
    ));
  })()}
</ul>
      <LoadMoreButton hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
      <GameDetails selectedGame={selectedGame}/>
      <GamesListSocket/>
    </div>
    
  );
};

export default GamesPage;