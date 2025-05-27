
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Gift, CalendarDays } from "lucide-react";

interface RewardCardProps {
  id: string;
  type: "spins" | "coins";
  amount: string | number;
  description?: string;
  date: string;
  link: string; // The actual reward link
}

const RewardCard = ({ type, amount, description, date, link }: RewardCardProps) => {
  const Icon = type === "spins" ? Gift : Coins;
  const title = type === "spins" ? `${amount} Free Spins` : `${amount} Coins`;

  return (
    <Card className="bg-card/70 border-border hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-heading text-primary">{title}</CardTitle>
        <Icon className="h-8 w-8 text-secondary" />
      </CardHeader>
      <CardContent>
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1 h-4 w-4" />
          <span>Posted: {date}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-3"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            Collect Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
