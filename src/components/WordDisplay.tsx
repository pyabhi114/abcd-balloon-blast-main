import { useEffect, useState } from "react";

interface WordDisplayProps {
  word: string;
  imageUrl: string;
  onComplete: () => void;
}

const WordDisplay = ({ word, imageUrl, onComplete }: WordDisplayProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Speak the word after a short delay
    const speakTimer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(`It's ${word}`);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }, 500);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 5000);

    return () => {
      clearTimeout(speakTimer);
      clearTimeout(timer);
    };
  }, [word, onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center bg-background/95
        transition-opacity duration-500
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="text-center animate-zoom-in">
        <img
          src={imageUrl}
          alt={word}
          className="w-80 h-80 object-cover rounded-3xl shadow-2xl mb-8 mx-auto"
        />
        <h2 className="text-6xl font-bold text-foreground drop-shadow-lg">
          {word}
        </h2>
      </div>
    </div>
  );
};

export default WordDisplay;
