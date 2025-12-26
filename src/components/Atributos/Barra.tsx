type AtributoBarProps = {
  label: string;
  value: number;
  max: number;
};

const AtributoBar = ({ label, value, max }: AtributoBarProps) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="atributo">
      <p className="label-atributo">{label}</p>

      <div className="barra-atributo">
        <div className="progresso-barra">
          <span
            className="numero-progresso"
            style={{ width: `${percent}%` }}
          />
          <span className="texto-progresso">
            {value}/{max}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AtributoBar;
