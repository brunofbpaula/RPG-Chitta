type AvatarProps = {
  img: string | null;
};

const Avatar = ({ img }: AvatarProps) => {
  return (
    <div className="avatar">
      {img && (
        <img className="img" src={img} alt="Imagem de avatar" />
      )}

      <span className="bd-avatar tl"></span>
      <span className="bd-avatar tr"></span>
      <span className="bd-avatar bl"></span>
      <span className="bd-avatar br"></span>
    </div>
  );
};

export default Avatar;