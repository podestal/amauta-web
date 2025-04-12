interface Props {
  firstName: string;
  lastName: string;
  size?: number; 
}

const Avatar = ({ firstName, lastName, size = 50 }: Props) => {

  const initials = `${firstName ? firstName[0].toUpperCase() : ''}${lastName ? lastName[0].toUpperCase(): ''}`;

  const randomGradient = () => {
    const colors = [
      "#FF9A8B, #FF6A88",
      "#A18CD1, #FBC2EB",
      "#FAD961, #F76B1C",
      "#43E97B, #38F9D7",
      "#667EEA, #764BA2",
      "#30CFFD, #330867",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `linear-gradient(to right, ${colors[randomIndex]})`;
  };

  return (
    <div
      className="flex items-center justify-center text-white font-bold"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: randomGradient(),
        fontSize: `${size / 2.5}px`,
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
