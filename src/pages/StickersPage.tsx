import StickerCard from "@/components/StickerCard";
import { Layers } from "lucide-react";

const sampleStickers = [
  {
    id: "sticker1",
    name: "Martian Lettuce",
    setName: "Space Travel",
    rarity: 4,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400", // Placeholder: circuit board
    description: "A rare and crunchy sticker from the 'Space Travel' set. Rumored to have been cultivated on a secret lunar base. Essential for completing your interstellar collection."
  },
  {
    id: "sticker2",
    name: "Golden Viking Helmet",
    setName: "Warriors",
    rarity: 5,
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400", // Placeholder: colorful code
    description: "The ultimate prize for any true Viking warrior. This golden card shines with the glory of countless battles. Extremely rare and highly sought after."
  },
  {
    id: "sticker3",
    name: "Common Piggy",
    setName: "Farm Life",
    rarity: 1,
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400", // Placeholder: cat
    description: "A familiar face from the farm. While common, this piggy sticker is a heartwarming addition to the 'Farm Life' set and easy to find."
  },
   {
    id: "sticker4",
    name: "Mystic Tree",
    setName: "Enchanted Forest",
    rarity: 3,
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400", // Placeholder: yellow lights in trees
    description: "This ancient tree from the 'Enchanted Forest' set is said to whisper secrets of old if you listen closely. A moderately rare find."
  },
  {
    id: "sticker5",
    name: "Cosmic Fox",
    setName: "Star Gazers",
    rarity: 4,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400", // Placeholder: body of water with trees (serene/cosmic)
    description: "A sly and ethereal fox from the 'Star Gazers' set. Its fur shimmers with the light of distant galaxies. A prized sticker for cosmic collectors."
  },
];

const StickersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Layers className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-5xl font-heading text-primary tracking-wide">Sticker Collections</h1>
        <p className="text-xl text-muted-foreground mt-2">Discover rare stickers, complete your sets for epic rewards, and become a master collector!</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-12 text-foreground">
        <h2 className="text-3xl font-heading text-primary">The World of Coin Master Stickers</h2>
        <p>
          Stickers are collectible items in Coin Master that are organized into various themed sets. Completing a set rewards you with valuable prizes like spins, coins, Pet XP, and sometimes even new pets or rare cards.
        </p>
        <h3 className="text-2xl font-heading text-secondary">How to Get Stickers:</h3>
        <ul>
          <li><strong>Chests:</strong> Stickers are primarily found in chests, which can be bought with coins or won in events. Different chests have varying chances of containing rare stickers.</li>
          <li><strong>Events:</strong> Many in-game events offer stickers as rewards for participation or achieving milestones.</li>
          <li><strong>Trading with Friends:</strong> You can trade duplicate stickers with your Facebook friends. However, Gold Cards can only be traded during special Gold Card Trading events.</li>
          <li><strong>Viking Quest:</strong> Completing missions in the Viking Quest event can also yield stickers, including Gold Cards.</li>
        </ul>
        <h3 className="text-2xl font-heading text-secondary">Sticker Rarity and Sets:</h3>
        <p>
          Stickers vary in rarity, typically indicated by the number of stars on the card (1 to 5 stars). Gold Cards are the rarest and most valuable. Each sticker belongs to a specific set (e.g., "Pets", "Statues", "Creatures"). Completing entire albums (collections of sets) provides even bigger rewards.
        </p>
        <p>
          Good luck collecting them all!
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
