
import RewardCard from "@/components/RewardCard";
import { Gift, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";

type Reward = Tables<'rewards'>;

const fetchRewards = async (): Promise<Reward[]> => {
  // Fetch rewards, order by reward_date desc, then created_at desc for same-day rewards
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('reward_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching rewards:", error);
    throw new Error(error.message);
  }
  return data || [];
};

const IndexPage = () => {
  const { data: rewards, isLoading, error } = useQuery<Reward[], Error>({
    queryKey: ['rewards'],
    queryFn: fetchRewards,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Gift className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-6xl font-heading text-primary tracking-wider drop-shadow-lg">Daily Rewards</h1>
        <p className="text-2xl text-muted-foreground mt-3">Your daily bounty of Coin Master Free Spins and Coins!</p>
        <p className="text-md text-foreground/70 mt-1">Click "Collect Now" to claim your rewards.</p>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-xl">Loading rewards...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">Failed to load rewards: {error.message}</p>
          <p className="text-muted-foreground mt-2">Please try again later.</p>
        </div>
      )}
      {!isLoading && !error && rewards && rewards.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No rewards available at the moment. Check back soon!</p>
        </div>
      )}
      {!isLoading && !error && rewards && rewards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              id={reward.id}
              type={reward.type as "spins" | "coins"} // Cast because SQL type is TEXT
              amount={reward.amount} // SQL amount is TEXT, fits RewardCard string | number
              description={reward.description ?? undefined} // Handle null description
              date={new Date(reward.reward_date).toLocaleDateString()} // Format date for display
              link={reward.link}
            />
          ))}
        </div>
      )}

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
