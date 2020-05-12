import React, { useState, useCallBack } from 'react';
import './PokemonCard.css';
import PokemonDetail from './PokemonDetail';
import { getImageUrl, getId } from '../utils';

const PokemonCard = ({ name, url }) => {
  const [showPopup, setShowPopup] = useState(false);

  const id = getId(url);

  const imgUrl = getImageUrl(id);

  return (
    <div className="pokemon" onClick={() => setShowPopup(!showPopup)}>
      <div className="img-container">
        <img src={imgUrl} alt={name}></img>
      </div>
      <div className="info">
        <span className="number">#{id.toString().padStart(3, '0')}</span>
        <h2 className="name">{name}</h2>
      </div>
      {showPopup && (
        <div className="popup">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="popup__close"
          >
            &times;
          </button>
          <div className="popup__content">
            <PokemonDetail id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
