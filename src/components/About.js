import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/About.css";
import "../styles/Types.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

function About(pokemon) {
  const [weaknesses, setWeaknesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pokemon.pokemon && getWeaknesses();
  }, [getWeaknesses]);

  function upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function mask(string) {
    if (string) {
      if (string.toString().length === 1) return `00${string}`;
      if (string.toString().length === 2) return `0${string}`;
      if (string.toString().length === 3) return `${string}`;
    }
  }

  function getWeaknesses() {
    if (pokemon && pokemon.pokemon && pokemon.pokemon.types) {
      const type = pokemon.pokemon.types[0];
      axios
        .get(`${process.env.REACT_APP_API_URL}/weaknesses/${type}`)
        .then((results) => {
          let arr = results.data.map((elem) => {
            return elem.name;
          });
          setWeaknesses(arr);
          setLoading(false);
        });
    }
  }

  return (
    <div className="About">
      {pokemon && pokemon.pokemon ? (
        <>
          <div className="container">
            <img
              alt={pokemon.pokemon && pokemon.pokemon.types}
              src={pokemon.pokemon && pokemon.pokemon.image}
            />
            <div className="pokemoninfo">
              <h5>#{pokemon.pokemon && mask(pokemon.pokemon.id)}</h5>
              <h1>
                {pokemon.pokemon &&
                  pokemon.pokemon.name &&
                  pokemon.pokemon.name.toUpperCase()}
              </h1>
              <div className="types">
                {pokemon.pokemon &&
                  pokemon.pokemon.types &&
                  pokemon.pokemon.types.map((type) => {
                    return (
                      <p className={`p-${type}`}>{upperFirstChar(type)}</p>
                    );
                  })}
              </div>
            </div>
            <div className="more">
              <span id="more-title">
                Height:{" "}
                <span>{pokemon.pokemon && pokemon.pokemon.height / 10}m</span>
              </span>
              <span id="more-title">
                Weight:{" "}
                <span>{pokemon.pokemon && pokemon.pokemon.weight / 10}kg</span>
              </span>
              <span id="more-title">
                Weaknesses:
                {loading ? (
                  <ReactBootStrap.Spinner
                    id="spinner"
                    animation="border"
                    variant="gray"
                    size="sm"
                    style={{marginLeft: "10px"}}
                  />
                ) : (
                  <span id="more-data">
                    {weaknesses.map((elem) => {
                      return (
                        <p className={`p-${elem}`}>{upperFirstChar(elem)}</p>
                      );
                    })}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="container cont-stat">
            <div className="stats">
              <p className="stats-title">HP</p>
              <p className="stats-title">Attack</p>
              <p className="stats-title">Defense</p>
              <p className="stats-title">Speed</p>
            </div>
            <div className="stats number">
              <p className="stats-number">
                {pokemon.pokemon &&
                  pokemon.pokemon.stats &&
                  pokemon.pokemon.stats
                    .filter((i) => {
                      return i.stat === "hp";
                    })
                    .map((i) => {
                      return i.lvl;
                    })}
              </p>
              <p className="stats-number">
                {pokemon.pokemon &&
                  pokemon.pokemon.stats &&
                  pokemon.pokemon.stats
                    .filter((i) => {
                      return i.stat === "attack";
                    })
                    .map((i) => {
                      return i.lvl;
                    })}
              </p>
              <p className="stats-number">
                {pokemon.pokemon &&
                  pokemon.pokemon.stats &&
                  pokemon.pokemon.stats
                    .filter((i) => {
                      return i.stat === "defense";
                    })
                    .map((i) => {
                      return i.lvl;
                    })}
              </p>
              <p className="stats-number">
                {pokemon.pokemon &&
                  pokemon.pokemon.stats &&
                  pokemon.pokemon.stats
                    .filter((i) => {
                      return i.stat === "speed";
                    })
                    .map((i) => {
                      return i.lvl;
                    })}
              </p>
            </div>
            <div className="stats progr">
              <p className="stats-progress">
                <p
                  className="stats-bar"
                  style={{
                    width:
                      pokemon.pokemon &&
                      pokemon.pokemon.stats &&
                      pokemon.pokemon.stats
                        .filter((i) => {
                          return i.stat === "hp";
                        })
                        .map((i) => {
                          return `${i.lvl * 5}px`;
                        }),
                  }}
                ></p>
              </p>
              <p className="stats-progress">
                <p
                  className="stats-bar"
                  style={{
                    width:
                      pokemon.pokemon &&
                      pokemon.pokemon.stats &&
                      pokemon.pokemon.stats
                        .filter((i) => {
                          return i.stat === "attack";
                        })
                        .map((i) => {
                          return `${i.lvl * 5}px`;
                        }),
                  }}
                ></p>
              </p>
              <p className="stats-progress">
                <p
                  className="stats-bar"
                  style={{
                    width:
                      pokemon.pokemon &&
                      pokemon.pokemon.stats &&
                      pokemon.pokemon.stats
                        .filter((i) => {
                          return i.stat === "defense";
                        })
                        .map((i) => {
                          return `${i.lvl * 5}px`;
                        }),
                  }}
                ></p>
              </p>
              <p className="stats-progress">
                <p
                  className="stats-bar"
                  style={{
                    width:
                      pokemon.pokemon &&
                      pokemon.pokemon.stats &&
                      pokemon.pokemon.stats
                        .filter((i) => {
                          return i.stat === "speed";
                        })
                        .map((i) => {
                          return `${i.lvl * 5}px`;
                        }),
                  }}
                ></p>
              </p>
            </div>
            <div className="stats number">
              <p className="stats-number">100</p>
              <p className="stats-number">100</p>
              <p className="stats-number">100</p>
              <p className="stats-number">100</p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default About;
