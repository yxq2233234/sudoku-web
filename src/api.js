const HOST = "http://localhost:3000";

export async function newGame() {
  const response = await fetch(`${HOST}/new-game`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

export async function loadGame(id) {
  const response = await fetch(`${HOST}/load-game?id=${id}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

export async function fillNumber(gameId, index, number) {
  const response = await fetch(`${HOST}/fill-number`, {
    method: "POST",
    body: JSON.stringify({ gameId, index, number }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
