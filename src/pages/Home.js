import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokeball from "../components/Pokeball";
import Card from "../components/Card";

function Home() {

    useEffect(() => { fetchData() }, [])
    
    const [pokemonData, setPokemonData] = useState([])

    function fetchData() {
        axios.get("http://192.168.99.106:3002/pokemon").then((results) => { setPokemonData(results.data) })
    }

  return (
    <div className="Home">
        <div className="container">
        {pokemonData.length > 0 ? pokemonData.map((pokemon) => { return <Card id={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types} /> }) : <Pokeball/>} 
        </div>
    </div>
  );
}

export default Home;
