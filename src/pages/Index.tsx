import { useState } from "react";
import Balloon from "@/components/Balloon";
import WordDisplay from "@/components/WordDisplay";

// Import all images
import appleImg from "@/assets/apple.jpg";
import ballImg from "@/assets/ball.jpg";
import catImg from "@/assets/cat.jpg";
import dogImg from "@/assets/dog.jpg";
import elephantImg from "@/assets/elephant.jpg";
import fishImg from "@/assets/fish.jpg";
import grapesImg from "@/assets/grapes.jpg";
import hatImg from "@/assets/hat.jpg";
import icecreamImg from "@/assets/icecream.jpg";
import jellyfishImg from "@/assets/jellyfish.jpg";
import kiteImg from "@/assets/kite.jpg";
import lionImg from "@/assets/lion.jpg";
import monkeyImg from "@/assets/monkey.jpg";
import nestImg from "@/assets/nest.jpg";
import orangeImg from "@/assets/orange.jpg";
import penguinImg from "@/assets/penguin.jpg";
import queenImg from "@/assets/queen.jpg";
import rainbowImg from "@/assets/rainbow.jpg";
import sunImg from "@/assets/sun.jpg";
import treeImg from "@/assets/tree.jpg";
import umbrellaImg from "@/assets/umbrella.jpg";
import violinImg from "@/assets/violin.jpg";
import whaleImg from "@/assets/whale.jpg";
import xylophoneImg from "@/assets/xylophone.jpg";
import yachtImg from "@/assets/yacht.jpg";
import zebraImg from "@/assets/zebra.jpg";

const alphabetData = [
  { letter: "A", word: "Apple", color: "hsl(var(--balloon-red))", image: appleImg },
  { letter: "B", word: "Ball", color: "hsl(var(--balloon-blue))", image: ballImg },
  { letter: "C", word: "Cat", color: "hsl(var(--balloon-orange))", image: catImg },
  { letter: "D", word: "Dog", color: "hsl(var(--balloon-green))", image: dogImg },
  { letter: "E", word: "Elephant", color: "hsl(var(--balloon-purple))", image: elephantImg },
  { letter: "F", word: "Fish", color: "hsl(var(--balloon-pink))", image: fishImg },
  { letter: "G", word: "Grapes", color: "hsl(var(--balloon-yellow))", image: grapesImg },
  { letter: "H", word: "Hat", color: "hsl(var(--balloon-red))", image: hatImg },
  { letter: "I", word: "Ice Cream", color: "hsl(var(--balloon-blue))", image: icecreamImg },
  { letter: "J", word: "Jellyfish", color: "hsl(var(--balloon-orange))", image: jellyfishImg },
  { letter: "K", word: "Kite", color: "hsl(var(--balloon-green))", image: kiteImg },
  { letter: "L", word: "Lion", color: "hsl(var(--balloon-purple))", image: lionImg },
  { letter: "M", word: "Monkey", color: "hsl(var(--balloon-pink))", image: monkeyImg },
  { letter: "N", word: "Nest", color: "hsl(var(--balloon-yellow))", image: nestImg },
  { letter: "O", word: "Orange", color: "hsl(var(--balloon-red))", image: orangeImg },
  { letter: "P", word: "Penguin", color: "hsl(var(--balloon-blue))", image: penguinImg },
  { letter: "Q", word: "Queen", color: "hsl(var(--balloon-orange))", image: queenImg },
  { letter: "R", word: "Rainbow", color: "hsl(var(--balloon-green))", image: rainbowImg },
  { letter: "S", word: "Sun", color: "hsl(var(--balloon-purple))", image: sunImg },
  { letter: "T", word: "Tree", color: "hsl(var(--balloon-pink))", image: treeImg },
  { letter: "U", word: "Umbrella", color: "hsl(var(--balloon-yellow))", image: umbrellaImg },
  { letter: "V", word: "Violin", color: "hsl(var(--balloon-red))", image: violinImg },
  { letter: "W", word: "Whale", color: "hsl(var(--balloon-blue))", image: whaleImg },
  { letter: "X", word: "Xylophone", color: "hsl(var(--balloon-orange))", image: xylophoneImg },
  { letter: "Y", word: "Yacht", color: "hsl(var(--balloon-green))", image: yachtImg },
  { letter: "Z", word: "Zebra", color: "hsl(var(--balloon-purple))", image: zebraImg },
];

const Index = () => {
  const [selectedLetter, setSelectedLetter] = useState<typeof alphabetData[0] | null>(null);
  const [hiddenBalloons, setHiddenBalloons] = useState<Set<string>>(new Set());

  const speakLetter = (letter: string) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleBalloonClick = (item: typeof alphabetData[0]) => {
    speakLetter(item.letter);
    setSelectedLetter(item);
  };

  const handleDisplayComplete = () => {
    if (selectedLetter) {
      setHiddenBalloons(prev => new Set(prev).add(selectedLetter.letter));
      setSelectedLetter(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8 relative overflow-hidden">
      {/* Decorative clouds */}
      <div className="absolute top-10 left-10 w-32 h-20 bg-white/60 rounded-full blur-sm"></div>
      <div className="absolute top-20 right-20 w-40 h-24 bg-white/50 rounded-full blur-sm"></div>
      <div className="absolute bottom-32 left-1/4 w-36 h-22 bg-white/40 rounded-full blur-sm"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold text-center mb-4 text-foreground drop-shadow-lg">
          🎈 ABC Learning Adventure! 🎈
        </h1>
        <p className="text-2xl text-center mb-12 text-muted-foreground">
          Click on a balloon to learn!
        </p>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-8 justify-items-center">
          {alphabetData.map((item) => (
            !hiddenBalloons.has(item.letter) && (
              <Balloon
                key={item.letter}
                letter={item.letter}
                color={item.color}
                onClick={() => handleBalloonClick(item)}
              />
            )
          ))}
        </div>

        <p className="mt-12 text-center text-muted-foreground text-sm">
          Made with love by ❤️ <span className="font-semibold">Abhishek Gogna</span>
        </p>
      </div>

      {selectedLetter && (
        <WordDisplay
          word={selectedLetter.word}
          imageUrl={selectedLetter.image}
          onComplete={handleDisplayComplete}
        />
      )}
    </div>
  );
};

export default Index;
