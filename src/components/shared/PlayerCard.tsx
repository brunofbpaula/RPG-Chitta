import React from 'react';
import aaron from '@/assets/players/aaron.png';
import SanityBar from './SanityBar';
import { useUserContext } from '@/context/AuthContext';

const PlayerCard = () => {
  const { user } = useUserContext();

  return (
    <div className="player-card"> 
      <div className="card-content">
        <div className="card-header">
          <h1 className="player-name">{user?.name}</h1>
          <h2 className="player-age">{user?.age}</h2>
        </div>
        <p className="player-quote">
          "{user.goal}"
        </p>
      </div>

      <div className="card-image">
        <img src={user.imageUrl} alt="Aaron" className="player-card-img" />
      </div>
      <SanityBar sanity={user.sanity}/>
    </div>
  );
};



export default PlayerCard