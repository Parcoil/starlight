// Games.js

import React, { useState, useEffect } from "react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [serverUrl, setServerUrl] = useState("");

  useEffect(() => {
    // Fetch data from JSON file
    fetch("/games.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched games:", data); // Log fetched games to console
        setGames(data);
      })
      .catch((error) => console.error("Error fetching games:", error));

    // Get serverUrl from localStorage
    const savedServerUrl = localStorage.getItem("serverUrl");
    if (savedServerUrl) {
      setServerUrl(savedServerUrl);
    }
  }, []);

  return (
    <div id="games-container">
      {games.map((game, index) => (
        <a key={index} href={`${serverUrl}/${game.url}/`}>
          <div className="game">
            <img
              loading="lazy"
              src={`${serverUrl}/${game.url}/${game.image}`}
              alt={game.name}
              width="100"
            />
            <h3>{game.name}</h3>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Games;
