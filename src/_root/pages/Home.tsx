import PlayerCard from '@/components/shared/PlayerCard';
import SkillChart from '@/components/shared/SkillChart';
import SkillsModal from '@/components/shared/SkillsModal';

const Home = () => {
  return (
    <>
      <div className='utility-box'>
        <div></div>
        <SkillsModal/>
      </div>
      <div className='player-box'>
        <PlayerCard/>
        <SkillChart/>
      </div>
    </>
  )
}

export default Home