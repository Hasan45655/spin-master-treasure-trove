
import StickerCard from "@/components/StickerCard";
import { Layers } from "lucide-react";

const sampleStickers = [
  {
    id: "sticker1",
    name: "Martian Lettuce",
    setName: "Space Travel",
    rarity: 4,
    imageUrl: "https://via.placeholder.com/150/2ECC71/FFFFFF?Text=Martian+Lettuce",
    description: "A rare sticker from the Space Travel set. Very crunchy!"
  },
  {
    id: "sticker2",
    name: "Golden Viking Helmet",
    setName: "Warriors",
    rarity: 5,
    imageUrl: "https://via.placeholder.com/150/F1C40F/000000?Text=Gold+Helmet",
    description: "The ultimate prize for any true Viking. A gold card!"
  },
  {
    id: "sticker3",
    name: "Common Piggy",
    setName: "Farm Life",
    rarity: 1,
    imageUrl: "https://via.placeholder.com/150/E9967A/FFFFFF?Text=Piggy",
  },
   {
    id: "sticker4",
    name: "Mystic Tree",
    setName: "Enchanted Forest",
    rarity: 3,
    description: "Whispers ancient secrets if you listen closely."
  },
];

const StickersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Layers className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-5xl font-heading text-primary tracking-wide">Sticker Collections</h1>
        <p className="text-xl text-muted-foreground mt-2">Discover rare stickers and complete your sets for epic rewards!</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sampleStickers.map((sticker) => (
          <StickerCard
            key={sticker.id}
            name={sticker.name}
            setName={sticker.setName}
            rarity={sticker.rarity}
            imageUrl={sticker.imageUrl}
            description={sticker.description}
          />
        ))}
      </div>
    </div>
  );
};

export default StickersPage;
