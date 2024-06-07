import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newGame } from "./api";

function Home() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");

  const onClickNewGame = async () => {
    const response = await newGame();
    console.log(response);
    navigate(`/game?id=${response.gameId}`);
  };

  const onClickLoadGame = async () => {
    if (Number(gameId)) {
      navigate(`/game?id=${gameId}`);
    }
  };

  return (
    <div>
      <h1>新的游戏</h1>
      <button onClick={onClickNewGame}>新建游戏</button>

      <h1>加载游戏</h1>
      <input
        type=""
        placeholder="输入游戏id"
        onInput={(event) => setGameId(event.currentTarget.value)}
        value={gameId}
      />
      <button onClick={onClickLoadGame}>加载游戏</button>
    </div>
  );
}

export default Home;
