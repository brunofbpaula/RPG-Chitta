import React from 'react'
import PolarAreaChart from '../charts/Polar';
import { useUserContext } from '@/context/AuthContext';

const SkillChart = () => {
  const { user }  = useUserContext();

  const playerAttributes = {
    strength: user?.strength,
    stealth: user?.stealthiness,
    intelligence: user?.intelligence,
    moral: user?.moral,
    resilience: user?.resilience,
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