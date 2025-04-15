import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "../../types/interfaces";
import api from "../../api/api";
import styles from "./GamesPage.module.css";

import GenreSelector from "../../components/GenreSelector/GenreSelector";
import GamesList from "../../components/GameList/GameList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import GameDetails from "../../components/GameDetails/GameDetails";
import GamesListSocket from "../../sockets/GamesListSocket";

const fetchGames = async ({ pageParam = 1, queryKey }: { pageParam?: number; queryKey: string[] }) => {
  const genre = queryKey[1];
  const genreParam = genre !== "ALL" ? `&genre=${genre}` : "";
  const res = await api.get(`/games/findAll?page=${pageParam}&limit=9${genreParam}`);

  return [
    {
      games: res.data.games,
      totalGames: res.data.totalGames,
      nextPage: res.data.games.length < res.data.totalGames ? pageParam + 1 : undefined,
    },
  ];
};

const gameGenres = [
  "ALL", "FREE", "MOBA", "SHOOTERS", "LAUNCHERS", "MMORPG",
  "STRATEGY", "FIGHTING", "RACING", "SURVIVAL", "ONLINE"
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
    getNextPageParam: (lastPage) => lastPage[0]?.nextPage,
    initialPageParam: 1,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.gameTitle}>Список ігор</h2>
      <GenreSelector genre={genre} setGenre={setGenre} gameGenres={gameGenres} />
      <GamesList handleGameClick={setSelectedGame} data={data} />
      <LoadMoreButton hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
      <GameDetails selectedGame={selectedGame} />
      <GamesListSocket />
    </div>
  );
};

export default GamesPage;