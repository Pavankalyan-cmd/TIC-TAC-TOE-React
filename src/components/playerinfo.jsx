import React from "react";
import { useState } from "react";

const Player = ({ intialname, symbol, isActive, onChangeName, isWinner }) => {
  const [Playername, setPlayername] = useState(intialname); //to updateplayername
  const [Isediting, setIsediting] = useState(false); //to update input
  function handleclick() {
    setIsediting((editing) => !editing);
    if (Isediting) {
      onChangeName(symbol, Playername);
    }
  }
  function handlechange(event) {
    setPlayername(event.target.value);
  }
  let editableplayername = (
    <span className="player-name">
      {" "}
      {isWinner ? "🏆 " : ""} {Playername}{" "}
    </span>
  );
  if (Isediting) {
    editableplayername = (
      <input type="text" Value={Playername} onChange={handlechange}></input>
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editableplayername}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleclick}>{Isediting ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
};

export default Player;
