import styles from "./GameList.module.css";
import { Game } from "../../types/interfaces";
import { InfiniteData } from "@tanstack/react-query";

interface GamesListProps {
  data?: InfiniteData<{ games: Game[]; totalGames: number; nextPage?: number }[], unknown>;
  handleGameClick: (game: Game) => void;
}

const GamesList: React.FC<GamesListProps> = ({ data, handleGameClick }) => {
  if (!data) return <p>Завантаження ігор...</p>;

  const seenIds = new Set<string>();
  const uniqueGames: Game[] = [];

  data.pages.forEach((page) => {
    page.forEach(({ games }) => {
      games.forEach((game: Game) => {
        if (!seenIds.has(game._id)) {
          seenIds.add(game._id);
          uniqueGames.push(game);
        }
      });
    });
  });

  return (
    <ul className={styles.gameList}>
      {uniqueGames.map((game) => (
        <li key={game._id}>
          <img
            className={styles.gameImage}
            src={game.gameImage}
            alt={game.systemGameName}
            onClick={() => handleGameClick(game)}
          />
          <h3 className={styles.gameTitl}>{game.systemGameName}</h3>
        </li>
      ))}
    </ul>
  );
};

export default GamesList;