import SanityBar from './SanityBar';
import { useUserContext } from '@/context/AuthContext';
import Loader from './Loader';
import HealthBar from './HealthBar';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from "lodash";
import { updateUser } from '@/lib/appwrite/api';

const PlayerCard = () => {
  const { user, isLoading } = useUserContext();

  // --- ESTADOS LOCAIS ---
  const [cyberpsychosis, setCyberpsychosis] = useState(0);
  const [currentHealth, setCurrentHealth] = useState(0);
  const [maxHealth, setMaxHealth] = useState(0);

  // Carrega valores do usuário quando ele estiver disponível
  useEffect(() => {
    if (!isLoading && user) {
      setCyberpsychosis(user.cyberpsychosis);
      setCurrentHealth(user.currentHealth);
      setMaxHealth(user.maxHealth);
    }
  }, [isLoading, user]);

  // --- FUNÇÃO DE SALVAR DEBOUNCED ---
  const debouncedSave = useCallback(
    debounce(async (data) => {
      if (!user?.id) return;
      await updateUser(user.id, data);
      console.log("Salvou:", data);
    }, 400),
    [user?.id]
  );

  // Salva cyberpsychosis
  useEffect(() => {
    if (!user?.id) return;
    debouncedSave({ cyberpsychosis });
  }, [cyberpsychosis]);

  // Salva currentHealth
  useEffect(() => {
    if (!user?.id) return;
    debouncedSave({ currentHealth });
  }, [currentHealth]);

  // Salva maxHealth
  useEffect(() => {
    if (!user?.id) return;
    debouncedSave({ maxHealth });
  }, [maxHealth]);

  return (
    <div className="player-card">
      {isLoading ? (
        <div className="flex flex-center items-center justify-center h-full">
          <Loader size={100} />
        </div>
      ) : (
        <>
          <div className="card-content">
            <div className="card-header">
              <h1 className="player-name">{user?.name}</h1>
              <h2 className="player-age">{user?.age}</h2>
            </div>
            <p className="player-quote">"{user.goal}"</p>
          </div>

          <div className="card-image">
            <img
              src={user?.imageUrl || undefined}
              alt="player"
              className="player-card-img"
            />
          </div>

          {/* Barra de vida com valores editáveis */}
          <HealthBar
            currentHealth={currentHealth}
            maxHealth={maxHealth}
            onIncrease={() => setCurrentHealth((v) => Math.min(maxHealth, v + 1))}
            onDecrease={() => setCurrentHealth((v) => Math.max(0, v - 1))}
            onIncreaseMax={() => setMaxHealth((v) => v + 1)}
            onDecreaseMax={() => setMaxHealth((v) => Math.max(1, v - 1))}
          />

          {/* Barra de Sanidade com controles */}
          <SanityBar 
            cyberpsychosis={cyberpsychosis}
            onIncrease={() => setCyberpsychosis((v) => Math.min(100, v + 1))}
            onDecrease={() => setCyberpsychosis((v) => Math.max(0, v - 1))}
          />
        </>
      )}
    </div>
  );
};

export default PlayerCard;
