import { useEffect, useState } from "react";

interface WordDisplayProps {
  word: string;
  imageUrl?: string;
  colorSwatch?: string;
  onComplete: () => void;
}

const WordDisplay = ({ word, imageUrl, colorSwatch, onComplete }: WordDisplayProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Speak the word after a short delay, cancelling any previous speech
    const speakTimer = setTimeout(() => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`It's ${word}`);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
    }, 600);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 6000);

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
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={word}
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl mb-8 mx-auto"
          />
        ) : (
          <div
            className="w-80 h-80 rounded-3xl shadow-2xl mb-8 mx-auto border"
            style={{ backgroundColor: colorSwatch }}
          />
        )}
        <h2 className="text-6xl font-bold text-foreground drop-shadow-lg">
          {word}
        </h2>
      </div>
    </div>
  );
};

export default WordDisplay;
