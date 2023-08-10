// SinglePlayers.js
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function SinglePlayers() {
  const [singlePlayer, setSinglePlayer] = useState("");
  const cohortName = "FredZone99";
  // Use the APIURL variable for fetch requests
  const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
  //get the params from the URL
  const { playerId } = useParams();
  useEffect(() => {
    async function FecthSinglePlayer(playerId) {
      try {
        const response = await fetch(`${APIURL}players/${playerId}`);
        const result = await response.json();
        const player = result.data.player;
        setSinglePlayer(player);
        console.log(player);
      } catch (error) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, error);
      }
    }
    FecthSinglePlayer(playerId);
  }, [playerId]);

  return (
    <>
      <h2 id="SinglePlayerTitle">Single Player Information</h2>
      <div className="containerInformation" key={playerId}>
        <div className="bodyCard">
          <div className="singleCard">
            <div className="imagenSinglePlayer">
              <img
                src={singlePlayer.imageUrl}
                alt={singlePlayer.name + " Photo"}
                width="100%"
                id="singlePlayerPhoto"
              />
            </div>
          </div>
          <div className="singleCard">
            <h2 className="titleSinglePlayer">Player Information</h2>

            <p>
              <span className="PlayerInformationTag">Name: </span>{" "}
              {singlePlayer.name}
            </p>
            <p>
              <span className="PlayerInformationTag">Breed: </span>{" "}
              {singlePlayer.breed}
            </p>
            <p>
              <span className="PlayerInformationTag">Status: </span>{" "}
              {singlePlayer.status}
            </p>
            <p>
              <span className="PlayerInformationTag">Id: </span>{" "}
              {singlePlayer.id}
            </p>

            <h2 className="titleSinglePlayer">Team Information</h2>

            <p>
              <span className="PlayerInformationTag">Cohort Number: </span>{" "}
              {singlePlayer.cohortId}
            </p>
            <h3 id="OtherTeamMembers">Other Team Members</h3>
            {singlePlayer && singlePlayer.team && singlePlayer.team.players && (
              <ul id="ULstyle">
                {singlePlayer.team.players
                  .filter((teamName) => teamName.id !== singlePlayer.id)
                  .map((teamName) => (
                    <Link
                      to={`/players/${teamName.id}`}
                      key={teamName.id}
                      className="linkSinglePlayer"
                    >
                      <li key={teamName.id}>{teamName.name}</li>
                    </Link>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePlayers;
