
import RewardCard from "@/components/RewardCard";
import { Gift } from "lucide-react";

const sampleRewards = [
  {
    id: "reward1",
    type: "spins" as "spins" | "coins",
    amount: 25,
    description: "Get 25 free spins to boost your game!",
    date: "May 27, 2025",
    link: "https://coinmaster.com/collect/reward123" 
  },
  {
    id: "reward2",
    type: "coins" as "spins" | "coins",
    amount: "1M",
    description: "A hefty bag of 1 million coins!",
    date: "May 27, 2025",
    link: "https://coinmaster.com/collect/reward456"
  },
  {
    id: "reward3",
    type: "spins" as "spins" | "coins",
    amount: 10,
    date: "May 26, 2025",
    link: "https://coinmaster.com/collect/reward789"
  },
  {
    id: "reward4",
    type: "coins" as "spins" | "coins",
    amount: "2M",
    description: "Massive 2 million coins for your village!",
    date: "May 26, 2025",
    link: "https://coinmaster.com/collect/rewardABC"
  },
  {
    id: "reward5",
    type: "spins" as "spins" | "coins",
    amount: 50,
    description: "Super spin bonus! 50 Free Spins.",
    date: "May 25, 2025",
    link: "https://coinmaster.com/collect/rewardDEF"
  },
];

const IndexPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-6xl font-heading text-primary tracking-wider drop-shadow-lg">Daily Rewards</h1>
        <p className="text-2xl text-muted-foreground mt-3">Your daily bounty of Coin Master Free Spins and Coins!</p>
        <p className="text-md text-foreground/70 mt-1">Click "Collect Now" to claim your rewards.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {sampleRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            id={reward.id}
            type={reward.type}
            amount={reward.amount}
            description={reward.description}
            date={reward.date}
            link={reward.link}
          />
        ))}
      </div>

      <footer className="text-center mt-16 py-8 border-t border-border/50">
        <p className="text-muted-foreground">Spin Master Rewards - Your #1 source for Coin Master rewards.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          All trademarks are property of their respective owners. This site is not affiliated with Coin Master.
        </p>
      </footer>
    </div>
  );
};

export default IndexPage;
