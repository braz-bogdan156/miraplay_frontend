import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "../../types/interfaces";
import api from "../../api/api";
import GamesList from "../../components/GamesList";
import MyButton from "../../components/UI/button/MyButton";
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
    fetchNextPage,
    hasNextPage,
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
      <ul className={styles.genreList}>
        {gameGenres.map((g) => (
          <li
            className={styles.genreItem}
            key={g}
            onClick={() => setGenre(g)}
            style={{ cursor: "pointer", 
              fontWeight: genre === g ? "bold" : "normal",
              backgroundColor: genre === g ? "var(--main-green-color)" : "transparent", }}
          >
            {g}
          </li>
        ))}
      </ul>
      <ul className= {styles.gameList}> 
        {data?.pages.flatMap((page) =>
          page.games.map((game: Game,  index: number) => (
            <div key={`${game._id}-${index}`}>
              <li>
              <img
                className={styles.gameImage}
                src={game.gameImage}
                alt={game.systemGameName}
                onClick={ () => handleGameClick(game)} />
              <h3 className={styles.gameTitl}>{game.systemGameName}</h3>
              </li>
            </div>
          ))
        )}
      </ul>
      {hasNextPage && (
        <div className= {styles.buttonContainer}>
        <MyButton
          
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
        </MyButton>
        </div>
      )}
      {selectedGame && (
        <div className={styles.gameDetails}>
          <h3>{selectedGame.commonGameName}</h3>
          <p>{selectedGame.gameDescription}</p>
          <p>Жанр: {selectedGame.genre}</p>
          <p>Дата випуску: {selectedGame.releaseDate}</p>
          <p>Видавець: {selectedGame.publisher}</p>
        </div>
      )}
      <GamesList/>
    </div>
    
  );
};

export default GamesPage;