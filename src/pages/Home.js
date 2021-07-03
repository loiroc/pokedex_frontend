import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokeball from "../components/Pokeball";
import Card from "../components/Card";
import About from "../components/About";
import Form from "react-bootstrap/Form";
import SearchIcon from "@material-ui/icons/Search";
import Button from "react-bootstrap/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [selected, setSelected] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  function fetchData() {
    axios.get(`${process.env.REACT_APP_API_URL}/pokemon`).then((results) => {
      setPokemonData(results.data);
      setSearchData(results.data);
      setLoading(false);
    });
  }

  return (
    <div className="Home">
      {showPopup ? (
        <div id="about">
          <About pokemon={selected} />
          <div className="btn">
            <Button
              variant="dark"
              onClick={() => {
                setSelected([]);
                setShowPopup(false);
              }}
            >
              <ArrowBackIcon /> Voltar
            </Button>
          </div>
        </div>
      ) : (
        <div id="home">
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
                    onClick={() => {
                      setSelected(pokemon);
                      setShowPopup(true);
                    }}
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
      )}
    </div>
  );
}

export default Home;
