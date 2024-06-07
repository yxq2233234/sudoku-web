import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fillNumber, loadGame } from "./api";
import "./Game.css";

function Game() {
  const location = useLocation();
  const [gameId, setGameId] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [question, setQuestion] = useState(Array(81).fill(0));
  const [answer, setAnswer] = useState(Array(81).fill(0));
  const [result, setResult] = useState(Array(81).fill(0));
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let id = new URLSearchParams(location.search).get("id");
    setGameId(Number(id));
    loadGame(id).then((response) => {
      console.log(response);
      setQuestion(response.question);
      setAnswer(response.playerAnswer);
      setResult(response.result);
      setIsWin(response.isWin);
    });
  }, [location]);

  const itemClicked = (index) => {
    setActiveIndex(index);
  };

  const keyDown = async (event) => {
    console.log(event.key);
    if (question[activeIndex] !== 0) {
      return;
    }
    if (event.key === "Backspace") {
      const res = await fillNumber(gameId, activeIndex, 0);
      setAnswer(
        answer.map((value, index) => (index === activeIndex ? 0 : value)),
      );
      setResult(
        result.map((value, index) => (index === activeIndex ? 0 : value)),
      );
      setIsWin(res.isWin);
    } else if (event.key >= "1" && event.key <= "9") {
      const res = await fillNumber(gameId, activeIndex, Number(event.key));
      console.log(res);
      setAnswer(
        answer.map((value, index) =>
          index === activeIndex ? Number(event.key) : value,
        ),
      );
      setResult(
        result.map((value, index) =>
          index === activeIndex ? (res.correct ? 1 : -1) : value,
        ),
      );
      setIsWin(res.isWin);
    }
  };

  return (
    <div>
      <h1>游戏 {gameId}</h1>
      <p>选择单元格直接输入数字或 backspace</p>
      <h2>获胜 {isWin ? "是" : "否"}</h2>

      <div className="table" tabIndex={0} onKeyDown={keyDown}>
        {Array.from({ length: 9 }, (_, rowIndex) => (
          <div
            className={`row ${(rowIndex + 1) % 3 === 0 && "borderBottom"}`}
            key={rowIndex}
          >
            {Array.from({ length: 9 }, (_, colIndex) => {
              const index = Number(rowIndex * 9 + colIndex);
              const isAnswer = question[index] === 0;
              const isCorrect = result[index] === 1;
              const value = isAnswer
                ? answer[index] === 0
                  ? ""
                  : answer[index]
                : question[index];
              return (
                <div
                  key={index}
                  className={`cell ${(colIndex + 1) % 3 === 0 && "borderRight"} ${isAnswer ? (isCorrect ? "black" : "red") : ""} ${activeIndex === index ? "active" : ""}`}
                  onClick={() => itemClicked(index)}
                >
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
