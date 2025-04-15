import styles from "./GenreSelector.module.css";
import { GenreSelectorProps } from "../../types/interfaces";

const GenreSelector = ({ genre, setGenre, gameGenres }: GenreSelectorProps) => {
  return (
    <ul className={styles.genreList}>
      {gameGenres.map((g) => (
        <li
          className={styles.genreItem}
          key={g}
          onClick={() => setGenre(g)}
          style={{
            cursor: "pointer",
            fontWeight: genre === g ? "bold" : "normal",
            backgroundColor: genre === g ? "var(--main-green-color)" : "transparent",
          }}
        >
          {g}
        </li>
      ))}
    </ul>
  );
};
export default GenreSelector;