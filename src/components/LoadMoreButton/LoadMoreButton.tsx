import MyButton from "../UI/button/MyButton";
import styles from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const LoadMoreButton = ({ hasNextPage, fetchNextPage, isFetchingNextPage }: LoadMoreButtonProps) => {
    
    return (
      hasNextPage && (
        <div className={styles.buttonContainer}>
          <MyButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </MyButton>
        </div>
      )
    );
  };
  export default LoadMoreButton;