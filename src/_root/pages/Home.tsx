import Inventary from '@/components/shared/Inventary'
import InventarioPainel from '@/components/shared/AI-Generated';
import PlayerCard from '@/components/shared/PlayerCard';
import SkillChart from '@/components/shared/SkillChart';
import React from 'react';

const Home = () => {
  return (
    <>
      <div className='utility-box'>
        <Inventary/>
        {/* <InventarioPainel/> */}
        <div></div>
      </div>
      <div className='player-box'>
        <PlayerCard/>
        <SkillChart/>
      </div>
    </>
  )
}

export default Home