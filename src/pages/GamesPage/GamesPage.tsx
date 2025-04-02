import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "../../types/interfaces";
import axios from "axios";
import GamesList from "../../components/GamesList";
import MyButton from "../../components/UI/button/MyButton";

const apiGame = axios.create({
  baseURL: "http://localhost:5000/api",
});

apiGame.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const fetchGames = async ({ pageParam = 1, queryKey }: { pageParam?: number; queryKey: string[] }) => {
  const genre = queryKey[1];
  const genreParam = genre !== "ALL" ? `&genre=${genre}` : "";
  const res = await apiGame.get(`/games/findAll?page=${pageParam}&limit=9${genreParam}`);
  return {
    games: res.data.games,
    totalGames: res.data.totalGames,
    nextPage: res.data.games.length < res.data.totalGames ? pageParam + 1 : undefined,
  };
};

const GamesPage = () => {
  const [genre, setGenre] = useState("ALL");

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

  return (
    <div >
      <h2 >Список ігор</h2>
      <select
        
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {["ALL", "FREE", "MOBA", "SHOOTERS", "LAUNCHERS", "MMORPG", "STRATEGY", "FIGHTING", "RACING", "SURVIVAL", "ONLINE"].map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <div >
        {data?.pages.flatMap((page) =>
          page.games.map((game: Game,  index: number) => (
            <div key={`${game._id}-${index}`}>
              <h3>{game.systemGameName}</h3>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <MyButton
          
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
        </MyButton>
      )}
      <GamesList/>
    </div>
    
  );
};

export default GamesPage;