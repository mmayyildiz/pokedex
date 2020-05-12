import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pokedex.css';
import PokemonCard from './PokemonCard';
import { URL } from '../constants';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(URL.GET_POKEMONS);
        setPokemonList(res.data.results);
      } catch (error) {
        console.log('Error occured ' + error);
      }
    }
    fetchData();
  }, []);

  const getPokemonList = () => {
    const trimmedText = searchText.trim();
    if (trimmedText.length !== 0) {
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.startsWith(trimmedText)
      );
      return filteredList;
    } else {
      return pokemonList;
    }
  };

  return (
    <div>
      <h1 className="title">POKEDEX</h1>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="pokemon-container">
        {getPokemonList().map((pokemon, index) => (
          <PokemonCard key={index} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
