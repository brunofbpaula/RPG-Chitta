import React from 'react';
import aaron from '@/assets/players/aaron.png';
import HealthBar from './HealthBar';

const PlayerCard = () => {
  return (
    <div className="player-card">
      <div className="card-content">
        <div className="card-header">
          <h1 className="player-name">Aaron</h1>
          <h2 className="player-age">22</h2>
        </div>
        <p className="player-quote">
          "Vou tornar uma lenda com a maior quantidade de implantes"
        </p>
      </div>

      <div className="card-image">
        <img src={aaron} alt="Aaron" className="player-card-img" />
      </div>
      <HealthBar health={85} />
    </div>
  );
};



export default PlayerCard