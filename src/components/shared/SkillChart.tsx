import React from 'react'
import PolarAreaChart from '../charts/Polar';

const SkillChart = () => {
  const playerAttributes = {
    intelligence: 65,
    strength: 40,
    stealth: 40,
    resilience: 25,
    agility: 70,
    moral: 50
  };

  return (
    <div className='skill-chart'>
        <h1 className='skill-chart-title'>
            <PolarAreaChart data={playerAttributes} title="Atributos" />
        </h1>
    </div>
  )
}

export default SkillChart