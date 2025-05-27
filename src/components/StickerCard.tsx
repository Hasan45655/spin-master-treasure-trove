
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Layers, Star } from "lucide-react"; // Layers for set, Star for rarity

interface StickerCardProps {
  name: string;
  setName: string;
  rarity?: number; // 1-5 stars
  imageUrl?: string;
  description?: string;
}

const StickerCard = ({ name, setName, rarity, imageUrl, description }: StickerCardProps) => {
  return (
    <Card className="bg-card/70 border-border hover:shadow-xl transition-shadow duration-300">
      {imageUrl && (
         <div className="aspect-square overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
            <img src={imageUrl} alt={name} className="w-full h-full object-contain p-4" />
         </div>
      )}
      {!imageUrl && (
        <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
            <Layers className="h-24 w-24 text-foreground/30" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-heading text-primary">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Set: {setName}</CardDescription>
      </CardHeader>
      <CardContent>
        {rarity && (
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${index < rarity ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"}`}
              />
            ))}
          </div>
        )}
        {description && <p className="text-xs text-foreground/80">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default StickerCard;
