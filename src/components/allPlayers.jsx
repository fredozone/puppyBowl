// AllPlayers.js
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AddPlayer from "./addPlayer";

function AllPlayers() {
  const playerContainer = document.getElementById("all-players-container");

  const cohortName = "FredZone99";
  // Use the APIURL variable for fetch requests
  const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchNames, setSearchNames] = useState([]);
  const [messageSearch, setMessageSearch] = useState("");
  // const [selectedPlayer, setSelectedPlayer] = useState(null);
  useEffect(() => {
    async function fetchAllPlayers() {
      try {
        const response = await fetch(`${APIURL}players`);
        const result = await response.json();
        setPlayers(result.data.players);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllPlayers();
  }, [APIURL]);

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}players/${playerId}`, {
        method: "DELETE",
      });
      //getting the id from the card div
      const cardId = document.getElementById(playerId);
      //removing the the child from playerContainer
      playerContainer.removeChild(cardId);
      await response.json();
    } catch (error) {
      console.error(
        `Whoops, trouble removing player #${playerId} from the roster!`,
        error
      );
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${APIURL}players`);
      const result = await response.json();
      setSearchNames(result.data.players);

      if (searchQuery != "") {
        const playerSameNames = result.data.players.filter(
          (namePlayer) =>
            namePlayer.name.toLowerCase() == searchQuery.toLowerCase()
        );
        setSearchQuery("");
        if (playerSameNames != "") {
          setPlayers(playerSameNames);
          setMessageSearch(
            <button className="ResetSearch" onClick={handlePlayerAdded}>
              Reset Search
            </button>
          );
        } else {
          setPlayers(result.data.players);
          setMessageSearch("Player not found");
        }
      } else {
        setPlayers(result.data.players);
        setMessageSearch(
          <button className="ResetSearch" onClick={handlePlayerAdded}>
            Reset Search
          </button>
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerAdded = async () => {
    try {
      const response = await fetch(`${APIURL}players`);
      const result = await response.json();
      setPlayers(result.data.players);
      setMessageSearch("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearInput = () => {
    setSearchQuery("");
  };
  return (
    <>
      <div className="inputAndSearchBar">
        <AddPlayer onPlayerAdded={handlePlayerAdded} />

        <div className="searchBar">
          <div id="searchInput">
            <input
              type="text"
              placeholder="Search by name"
              className="inputSearchBar"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <button
              className="button-search"
              onClick={() => {
                handleSearch(searchQuery);
                handleClearInput();
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1.3em"
                width="1.3em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </button>
          </div>

          <p id="errorSearch">{messageSearch}</p>
        </div>
      </div>

      <div id="all-players-container">
        {players.map((player) => (
          <>
            <div className="card-style" key={player.id} id={player.id}>
              <div className="imgDiv">
                <img
                  src={player.imageUrl}
                  alt="puppy picture"
                  className="imagenPlayer"
                />
              </div>
              <div className="namePlayer">
                <p className="playerName">
                  {player.name}
                  <span className="little-text">( ID: {player.id})</span>
                </p>
              </div>
              <div className="infoPet" id={player.id}>
                <Link
                  to={`/players/${player.id}`}
                  className="button-see button-style"
                  id={"see-" + player.id}
                  name="see"
                >
                  See Details
                </Link>
                <input
                  type="button"
                  value="Remove Player"
                  className="button-delete button-style"
                  name="delete"
                  onClick={() => removePlayer(player.id)}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default AllPlayers;
