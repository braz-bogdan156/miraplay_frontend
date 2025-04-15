import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Game } from '../types/interfaces';

const socket = io(import.meta.env.VITE_SOCKET_URL); // Адреса бекенду

const GamesListSocket = () => {
  

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Отримуємо список ігор при завантаженні
    fetch('/api/games/create')
      .then((res) => res.json())
      .then((data) => setGames(data.games));

    // Підписуємося на подію `newGame`
    socket.on('newGame', (game) => {
      setGames((prevGames) => [...prevGames, game]);
    });

    return () => {
      socket.off('newGame'); // Відписка при розмонтаженні
    };
  }, []);

  return (
    <div>
      <h2>Список ігор</h2>
      <ul>
        {games.map((game) => (
          <li key={game._id}>{game.systemGameName}</li>
        ))}
      </ul>
    </div>
  );
};

export default GamesListSocket;