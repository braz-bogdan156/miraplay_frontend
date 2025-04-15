import styles from "./GameDetails.module.css";
import { Game } from "../../types/interfaces";

const GameDetails = ({ selectedGame }: { selectedGame: Game | null }) => {
  return (
    selectedGame && (
      <div className={styles.gameDetails}>
        <h3>{selectedGame.commonGameName}</h3>
        <p>{selectedGame.gameDescription}</p>
        <p>Жанр: {selectedGame.genre}</p>
        <p>Дата випуску: {selectedGame.releaseDate}</p>
        <p>Видавець: {selectedGame.publisher}</p>
      </div>
    )
  );
};
export default GameDetails;