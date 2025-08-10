import React from 'react';
import aaron from '@/assets/players/aaron.png';
import SanityBar from './SanityBar';
import { useUserContext } from '@/context/AuthContext';
import Loader from './Loader';

const PlayerCard = () => {
  const { user, isLoading } = useUserContext();


  return (
    <div className="player-card"> 
    {
      isLoading ? (
        <div className='flex flex-center items-center justify-center h-full'>
          <Loader size={100}/>
        </div>
      ) : (
        <>
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
            <img src={user.imageUrl} alt="player" className="player-card-img" />
          </div>
          <SanityBar sanity={user.sanity}/>
        </>
      )
    }
    </div>
  );
};



export default PlayerCard