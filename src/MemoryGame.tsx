import { FC, useEffect } from "react";
import { create } from "zustand";
import MemoryCard from './MemoryCard';

interface MemoryGameProps {
  images: string[]
}

type StoreState = {
  clicks: number[];
  matchedPairs: number[];
  myImages: string[];
  setMyImages: (images: string[]) => void;
  onClick: (index: number) => void;
};

const useStore = create<StoreState>((set) => ({
  clicks: [],
  matchedPairs: [],
  myImages: [],
  onClick: (index: number) => {
    set((state) => {
      const newClicks = [...state.clicks, index];

      if (newClicks.length === 2) {
        const [click1, click2] = newClicks;

        // Map clicked indices to their original indices
        const originalIndex1 = state.myImages[click1];
        const originalIndex2 = state.myImages[click2];

        if (originalIndex1 === originalIndex2) {
          // If matched, keep the clicks and add to matchedPairs
          return { clicks: [], matchedPairs: [...state.matchedPairs, click1, click2] };
        } else {
          // If not matched, reset clicks after a delay (for showing the second image)
          setTimeout(() => {
            set((state) => ({ clicks: [], matchedPairs: state.matchedPairs }));
          }, 1000);
        }
      }

      return { clicks: newClicks, matchedPairs: state.matchedPairs };
    });
  },
  setMyImages: (images: string[]) => {
    set((state) => ({ ...state, myImages: images }));
  },
}));

// Fisher–Yates (aka Knuth) Shuffle.
function shuffle(array: string[]): string[] {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

const MemoryGame: FC<MemoryGameProps> = ({ images }: MemoryGameProps) => {
  const { clicks, matchedPairs, onClick, setMyImages, myImages } = useStore();

  useEffect(() => {
    const shuffledImages = shuffle([...images, ...images]);
    setMyImages(shuffledImages);
  }, []); // Call setMyImages only once when component mounts

  const handleClick = (index: number) => {
    if (clicks.includes(index) || matchedPairs.includes(index)) return;

    onClick(index);
  };

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      width: "320px"
    }}>
      {myImages.map((image, index) => (
        <MemoryCard
          key={index}
          image={image}
          onPicClick={() => handleClick(index)}
          isHidden={!clicks.includes(index) && !matchedPairs.includes(index)}
        />
      ))}

      {/* MAKE A RESET GAME COMPONENT */}
    </div>
  );
};

export default MemoryGame;