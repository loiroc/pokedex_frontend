import React from "react";
import "../styles/Card.css";
import "../styles/Types.css";

function Card({ id, name, image, types }) {
    
  function upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function mask(string) {
    if (string.toString().length === 1) return `00${string}`;
    if (string.toString().length === 2) return `0${string}`;
    if (string.toString().length === 3) return `${string}`;
  }

  return (
    <div className="Card" key={id}>
      <img id="pokemon" alt={`${name}`} src={image} />
      <div className={`card bg-${types[0]}`}>
        <h4>#{mask(id)}</h4>
        <h1>{upperFirstChar(name)}</h1>
        <div id="types">
          {types.map((type) => {
            return <p className={`p-${type}`}>{upperFirstChar(type)}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
