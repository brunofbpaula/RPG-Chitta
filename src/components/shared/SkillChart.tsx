import React, { useEffect, useState } from 'react';
import PolarAreaChart from '../charts/Polar';
import { useUserContext } from '@/context/AuthContext';
import Loader from './Loader';
import { Dialog, TextField } from '@mui/material';
import { MdModeEdit } from 'react-icons/md';
import { updateUser } from '@/lib/appwrite/api';


const SkillChart = () => {
  const { user, isLoading } = useUserContext();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [attributes, setAttributes] = useState({
    strength: 0,
    stealthiness: 0,
    intelligence: 0,
    moral: 0,
    resilience: 0,
  });

  const attributeLabels = {
    strength: "Força",
    stealthiness: "Furtividade",
    intelligence: "Inteligência",
    moral: "Moral",
    resilience: "Resiliência",
  };

  useEffect(() => {
    if (user) {
      setAttributes({
        strength: user.strength,
        stealthiness: user.stealthiness,
        intelligence: user.intelligence,
        moral: user.moral,
        resilience: user.resilience,
      });
    }
  }, [user]);

  const handleOpenEditor = () => {
    setAttributes({
      strength: user?.strength || 0,
      stealthiness: user?.stealthiness || 0,
      intelligence: user?.intelligence || 0,
      moral: user?.moral || 0,
      resilience: user?.resilience || 0,
    });
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttributes((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(100, Number(value))) // clamp entre 0 e 100
    }));
  };

  const handleSave = async () => {
    if (!user) return; // segurança: só salva se tiver usuário

    setSaving(true);
    try {
      await updateUser(user.id, {
        strength: attributes.strength,
        stealthiness: attributes.stealthiness,
        intelligence: attributes.intelligence,
        moral: attributes.moral,
        resilience: attributes.resilience,
      });

      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar atributos:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='skill-chart'>
      {isLoading ? (
        <div className='flex items-center justify-center h-full'>
          <Loader size={80} />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <div className="flex items-center gap-5">
            <h1 className='skill-chart-title'>Atributos</h1>
            <MdModeEdit
              size={20}
              className="cursor-pointer text-red-600 hover:text-red-400 transition"
              onClick={handleOpenEditor}
              title="Editar atributos"
            />
          </div>

          <div style={{ width: '100%', maxWidth: '250px' }}>
            <PolarAreaChart data={attributes} title="" />
          </div>
        </div>
      )}

      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        maxWidth="sm"
        fullWidth
        BackdropProps={{
          style: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <div className="modal-content" style={{ padding: '20px', backgroundColor: '#000', color: '#fff', border: "2px solid red" }}>
          <h2 style={{ marginBottom: '18px', fontWeight: 'bold' }}>Atributos</h2>

          <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
            {Object.entries(attributes).map(([key, value]) => (
              <TextField
                key={key}
                label={attributeLabels[key as keyof typeof attributeLabels]}
                name={key}
                type="number"
                inputProps={{ min: 0, max: 100 }}
                value={value}
                onChange={handleChange}
                fullWidth
                disabled={saving}
                InputLabelProps={{
                  style: { color: '#fff' }
                }}
                InputProps={{
                  style: { color: '#fff' }
                }}
                sx={{
                  '& .MuiInputBase-input': { color: "#fff",  WebkitTextFillColor: "#fff" },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff4d4d',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff0000',
                      color: "#fff"
                    },
                  },
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              className="btn-modal-anotacao salvar"
              onClick={handleSave}
              disabled={saving}
              style={{
                backgroundColor: '#ff0000',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: saving ? 'default' : 'pointer',
              }}
            >
              {saving ? <Loader size={20} /> : 'Salvar'}
            </button>
            <button
              className="btn-modal-anotacao fechar"
              onClick={() => setOpen(false)}
              disabled={saving}
              style={{
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: saving ? 'default' : 'pointer',
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SkillChart;
