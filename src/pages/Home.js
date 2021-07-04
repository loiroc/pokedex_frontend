import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokeball from "../components/Pokeball";
import Card from "../components/Card";
import About from "../components/About";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [selected, setSelected] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupLoading, setPopupLoading] = useState(true);
  const [seeing, setSeeing] = useState(9);

  function fetchData() {
    axios.get(`${process.env.REACT_APP_API_URL}/pokemon`).then((results) => {
      setPokemonData(results.data);
      setSearchData(results.data.slice(0, 9));
      setLoading(false);
    });
  }

  function seeMore() {
    if (seeing <= 150) {
      setSearchData(pokemonData.slice(seeing, seeing + 9));
      setSeeing(seeing + 9);
    }
  }

  function seeLess() {
    console.log(seeing);
    if (seeing >= 10) {
      setSearchData(pokemonData.slice(seeing - 18, seeing - 9));
      setSeeing(seeing - 9);
    }
  }

  return (
    <div className="Home">
      <Nav
        style={{
          backgroundColor: "#FFFAFA",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <Nav.Item>
          <img
            alt="Pokemon"
            src="images/logo.png"
            style={{ width: "100px", marginLeft: "20px", marginRight: "20px" }}
          />
        </Nav.Item>
        <Nav.Item style={{ marginTop: "10px" }}>
          <Nav.Link style={{ fontWeight: "bold" }} href="/home">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginTop: "10px" }}>
          <Nav.Link href="author">About the Developer</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginTop: "10px" }}>
          <Nav.Link>Sair</Nav.Link>
        </Nav.Item>
      </Nav>
      {showPopup ? (
        popupLoading ? (
          <>
            <Pokeball />
            <div style={{ display: "none" }}>
              {setTimeout(() => {
                setPopupLoading(false);
              }, 500)}
            </div>
          </>
        ) : (
          <div id="about">
            <About pokemon={selected} />
            <div className="btn">
              <Button
                variant="dark"
                onClick={() => {
                  setSelected([]);
                  setShowPopup(false);
                  setPopupLoading(true);
                  setSearchData(pokemonData.slice(0, 9));
                }}
              >
                <ArrowBackIcon /> Voltar
              </Button>
            </div>
          </div>
        )
      ) : (
        <div id="home">
          {!loading && (
            <div className="top">
              <ArrowBackIcon
                onClick={() => {
                  seeLess();
                }}
                style={{ marginRight: "10px", cursor: "pointer" }}
              />
              <Form.Control
                style={{ width: "50%" }}
                type="text"
                placeholder="Pesquise por um Pokemon"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setSearchData(
                      pokemonData.filter((pokemon) => {
                        return pokemon.name.includes(e.target.value);
                      })
                    );
                  } else {
                    setSearchData(pokemonData.slice(0, 9));
                  }
                }}
              />
              <ArrowForwardIcon
                onClick={() => {
                  seeMore();
                }}
                style={{ marginLeft: "10px", cursor: "pointer" }}
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
