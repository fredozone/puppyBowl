import { react } from "react";
import { useState } from "react";
function AddPlayer({ onPlayerAdded }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");
  const cohortName = "FredZone99";
  // Use the APIURL variable for fetch requests
  const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${APIURL}players`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          breed: breed,
          status: status,
          imageUrl: photo,
          teamId: 505,
        }),
      });

      await response.json();
      onPlayerAdded();
    } catch (error) {
      console.error(
        "Oops, something went wrong with adding that player!",
        error
      );
    }
  };

  return (
    <>
      <div id="new-player-form">
        <h2 id="addNewPlayerTitle">Add New Player</h2>
        <form id="playerForm">
          <div className="group-div">
            <div className="info">
              <label className="label-style">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-style"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="info">
              <label className="label-style">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                className="input-style"
                onChange={(event) => setBreed(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="group-div">
            <div className="info">
              <label className="label-style">Status</label>
              <div id="radio-section">
                <input
                  type="radio"
                  id="field"
                  name="status"
                  value="field"
                  className="input-style"
                  onChange={(event) => setStatus(event.target.value)}
                />
                <label className="label-radio">Field</label>
                <input
                  type="radio"
                  id="bench"
                  name="status"
                  value="bench"
                  className="input-style"
                  onChange={(event) => setStatus(event.target.value)}
                />
                <label className="label-radio">Bench</label>
              </div>
            </div>
            <div className="info">
              <label className="label-style">URL Photo</label>
              <input
                type="text"
                id="photo"
                name="photo"
                className="input-style"
                onChange={(event) => setPhoto(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="group-div">
            <button
              type="submit"
              id="save"
              className="button-Save button-style"
              name="save"
              value="https://learndotresources.s3.amazonaws.com/workshop/60ad725bbe74cd0004a6cba0/puppybowl-default-dog.png"
              onClick={handleSubmit}
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPlayer;
