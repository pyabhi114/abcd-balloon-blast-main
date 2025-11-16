import { useMemo, useState } from "react";
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

type Item = { label: string; word: string; color: string; image?: string; colorSwatch?: string };

const alphabetData: Item[] = [
  { label: "A", word: "Apple", color: "hsl(var(--balloon-red))", image: appleImg },
  { label: "B", word: "Ball", color: "hsl(var(--balloon-blue))", image: ballImg },
  { label: "C", word: "Cat", color: "hsl(var(--balloon-orange))", image: catImg },
  { label: "D", word: "Dog", color: "hsl(var(--balloon-green))", image: dogImg },
  { label: "E", word: "Elephant", color: "hsl(var(--balloon-purple))", image: elephantImg },
  { label: "F", word: "Fish", color: "hsl(var(--balloon-pink))", image: fishImg },
  { label: "G", word: "Grapes", color: "hsl(var(--balloon-yellow))", image: grapesImg },
  { label: "H", word: "Hat", color: "hsl(var(--balloon-red))", image: hatImg },
  { label: "I", word: "Ice Cream", color: "hsl(var(--balloon-blue))", image: icecreamImg },
  { label: "J", word: "Jellyfish", color: "hsl(var(--balloon-orange))", image: jellyfishImg },
  { label: "K", word: "Kite", color: "hsl(var(--balloon-green))", image: kiteImg },
  { label: "L", word: "Lion", color: "hsl(var(--balloon-purple))", image: lionImg },
  { label: "M", word: "Monkey", color: "hsl(var(--balloon-pink))", image: monkeyImg },
  { label: "N", word: "Nest", color: "hsl(var(--balloon-yellow))", image: nestImg },
  { label: "O", word: "Orange", color: "hsl(var(--balloon-red))", image: orangeImg },
  { label: "P", word: "Penguin", color: "hsl(var(--balloon-blue))", image: penguinImg },
  { label: "Q", word: "Queen", color: "hsl(var(--balloon-orange))", image: queenImg },
  { label: "R", word: "Rainbow", color: "hsl(var(--balloon-green))", image: rainbowImg },
  { label: "S", word: "Sun", color: "hsl(var(--balloon-purple))", image: sunImg },
  { label: "T", word: "Tree", color: "hsl(var(--balloon-pink))", image: treeImg },
  { label: "U", word: "Umbrella", color: "hsl(var(--balloon-yellow))", image: umbrellaImg },
  { label: "V", word: "Violin", color: "hsl(var(--balloon-red))", image: violinImg },
  { label: "W", word: "Whale", color: "hsl(var(--balloon-blue))", image: whaleImg },
  { label: "X", word: "Xylophone", color: "hsl(var(--balloon-orange))", image: xylophoneImg },
  { label: "Y", word: "Yacht", color: "hsl(var(--balloon-green))", image: yachtImg },
  { label: "Z", word: "Zebra", color: "hsl(var(--balloon-purple))", image: zebraImg },
];

const fruitsData: Item[] = [
  { label: "A", word: "Apple", color: "hsl(var(--balloon-red))", image: appleImg },
  { label: "G", word: "Grapes", color: "hsl(var(--balloon-yellow))", image: grapesImg },
  { label: "O", word: "Orange", color: "hsl(var(--balloon-red))", image: orangeImg },
];

const animalsData: Item[] = [
  { label: "C", word: "Cat", color: "hsl(var(--balloon-orange))", image: catImg },
  { label: "D", word: "Dog", color: "hsl(var(--balloon-green))", image: dogImg },
  { label: "E", word: "Elephant", color: "hsl(var(--balloon-purple))", image: elephantImg },
  { label: "F", word: "Fish", color: "hsl(var(--balloon-pink))", image: fishImg },
  { label: "L", word: "Lion", color: "hsl(var(--balloon-purple))", image: lionImg },
  { label: "M", word: "Monkey", color: "hsl(var(--balloon-pink))", image: monkeyImg },
  { label: "P", word: "Penguin", color: "hsl(var(--balloon-blue))", image: penguinImg },
  { label: "W", word: "Whale", color: "hsl(var(--balloon-blue))", image: whaleImg },
  { label: "Z", word: "Zebra", color: "hsl(var(--balloon-purple))", image: zebraImg },
];

const colorsData: Item[] = [
  { label: "R", word: "Red", color: "hsl(var(--balloon-red))", colorSwatch: "hsl(var(--balloon-red))" },
  { label: "B", word: "Blue", color: "hsl(var(--balloon-blue))", colorSwatch: "hsl(var(--balloon-blue))" },
  { label: "G", word: "Green", color: "hsl(var(--balloon-green))", colorSwatch: "hsl(var(--balloon-green))" },
  { label: "Y", word: "Yellow", color: "hsl(var(--balloon-yellow))", colorSwatch: "hsl(var(--balloon-yellow))" },
  { label: "O", word: "Orange", color: "hsl(var(--balloon-orange))", colorSwatch: "hsl(var(--balloon-orange))" },
  { label: "P", word: "Purple", color: "hsl(var(--balloon-purple))", colorSwatch: "hsl(var(--balloon-purple))" },
  { label: "P", word: "Pink", color: "hsl(var(--balloon-pink))", colorSwatch: "hsl(var(--balloon-pink))" },
];

const Index = () => {
  const [category, setCategory] = useState<"Alphabet" | "Fruits" | "Animals" | "Colors">("Alphabet");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [hiddenBalloons, setHiddenBalloons] = useState<Set<string>>(new Set());

  const currentData = useMemo(() => {
    switch (category) {
      case "Fruits":
        return fruitsData;
      case "Animals":
        return animalsData;
      case "Colors":
        return colorsData;
      default:
        return alphabetData;
    }
  }, [category]);

  const speakOut = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleBalloonClick = (item: Item) => {
    // Wait briefly so the pop animation and sound are visible/audible before overlay appears
    window.setTimeout(() => setSelectedItem(item), 550);
  };

  const handleDisplayComplete = () => {
    if (selectedItem) {
      setHiddenBalloons(prev => new Set(prev).add(selectedItem.word));
      setSelectedItem(null);
    }
  };

  const changeCategory = (next: typeof category) => {
    setCategory(next);
    setHiddenBalloons(new Set());
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8 relative overflow-hidden">
      {/* Decorative clouds */}
      <div className="absolute top-10 left-10 w-32 h-20 bg-white/60 rounded-full blur-sm"></div>
      <div className="absolute top-20 right-20 w-40 h-24 bg-white/50 rounded-full blur-sm"></div>
      <div className="absolute bottom-32 left-1/4 w-36 h-22 bg-white/40 rounded-full blur-sm"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-foreground drop-shadow-lg">
          🎈 {category} Learning Adventure! 🎈
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 text-muted-foreground">
          Click on a balloon to learn!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {(["Alphabet", "Fruits", "Animals", "Colors"] as const).map((c) => (
            <button
              key={c}
              onClick={() => changeCategory(c)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow ${
                category === c ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-8 justify-items-center">
          {currentData.map((item) => (
            !hiddenBalloons.has(item.word) && (
              <Balloon
                key={item.word}
                letter={item.label}
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

      {selectedItem && (
        <WordDisplay
          word={selectedItem.word}
          imageUrl={selectedItem.image}
          colorSwatch={selectedItem.colorSwatch}
          onComplete={handleDisplayComplete}
        />
      )}
    </div>
  );
};

export default Index;
