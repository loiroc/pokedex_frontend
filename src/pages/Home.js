import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokeball from "../components/Pokeball";
import Card from "../components/Card";
import Form from "react-bootstrap/Form";
import SearchIcon from "@material-ui/icons/Search";

function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  function fetchData() {
    axios.get(`${process.env.REACT_APP_API_URL}/pokemon`).then((results) => {
      setPokemonData(results.data);
      setSearchData(results.data);
      setLoading(false);
    });
  }

  return (
    <div className="Home">
      <div className="logo">
        <img alt="Pokemon" src="images/logo.png" />
      </div>
      {!loading && (
        <div className="top">
          <SearchIcon className="SearchIcon" />
          <Form.Control
            style={{ width: "50%" }}
            type="text"
            placeholder="Pesquise por um Pokemon"
            onChange={(e) => {
              setSearchData(
                pokemonData.filter((pokemon) => {
                  return pokemon.name.includes(e.target.value);
                })
              );
            }}
          />
        </div>
      )}
      {loading ? (
        <Pokeball />
      ) : searchData.length > 0 ? (
        <div className="container">
          {searchData.map((pokemon) => {
            return (
              <Card
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            );
          })}
        </div>
      ) : (
        <div id="center">
          <h2>Nenhum resultado encontrado</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
