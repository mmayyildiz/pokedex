import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './PokemonDetail.css';
import { colors } from '../constants';
import { URL } from '../constants';
import { getImageUrl } from '../utils';

const PokemonDetail = ({ id }) => {
  const [pokemon, setPokemon] = useState({
    id: '',
    name: '',
    height: '',
    weight: '',
    types: [],
    moves: [],
  });

  const imgURL = getImageUrl(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Axios.get(URL.GET_POKEMONS + `/${id}`);
        const pokemon = (({ id, name, height, weight, types, moves }) => ({
          id,
          name,
          height,
          weight,
          types,
          moves,
        }))(res.data);
        setPokemon(pokemon);
      } catch (e) {
        console.log('Error occured ' + e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pokeDetail-container">
      <div className="poke-img">
        <img src={imgURL} alt={pokemon.name} />
      </div>
      <div className="poke-detail">
        <div className="poke-title">
          {pokemon.name} #{pokemon.id.toString().padStart(3, '0')}
        </div>
        <div className="poke-type">
          {pokemon.types.map((type, index) => {
            const typeName = type['type']['name'];
            return (
              <div
                style={{ backgroundColor: colors[typeName] }}
                key={index}
                className="type-bar"
              >
                {typeName}
              </div>
            );
          })}
        </div>
        <div className="poke-physic">
          <span className="physic-title">
            <span style={{ fontWeight: 'bold' }}>Height : </span>
            {pokemon.height}m
          </span>
          <span className="physic-title">
            <span style={{ fontWeight: 'bold' }}>Weight :</span>{' '}
            {pokemon.weight}
            kg
          </span>
        </div>
        <div className="poke-moves">
          {pokemon.moves.map((move) => ` | ${move['move']['name']} `)}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PokemonDetail);
