import { useState } from "react";

interface BalloonProps {
  letter: string;
  color: string;
  onClick: () => void;
}

const Balloon = ({ letter, color, onClick }: BalloonProps) => {
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => {
    setIsPopping(true);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative group ${isPopping ? "pointer-events-none" : ""}`}
      disabled={isPopping}
    >
      <div
        className={`
          w-24 h-28 rounded-full shadow-lg 
          flex items-center justify-center
          transition-transform duration-300
          ${isPopping ? "animate-pop" : "animate-float hover:scale-110"}
          cursor-pointer
        `}
        style={{ backgroundColor: color }}
      >
        <span className="text-5xl font-bold text-white drop-shadow-lg">
          {letter}
        </span>
      </div>
      {/* Balloon string */}
      <div className="w-0.5 h-8 bg-foreground/30 mx-auto"></div>
    </button>
  );
};

export default Balloon;
