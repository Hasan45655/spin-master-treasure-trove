
import EventCard from "@/components/EventCard";
import { PartyPopper } from "lucide-react";

const sampleEvents = [
  {
    id: "event1",
    title: "Viking Quest Saga",
    description: "Embark on the legendary Viking Quest! Complete challenging missions across multiple stages to earn monumental rewards. Gather unique items, battle fierce foes, and prove your warrior spirit. Successful Vikings can win exclusive Gold Cards, mountains of coins, and chests brimming with spins. This is your chance to etch your name in the annals of Coin Master history!",
    dateRange: "May 25, 2025 - May 30, 2025",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", // Placeholder: woman on laptop (planning)
    detailsLink: "#viking-details"
  },
  {
    id: "event2",
    title: "Tournament of Champions",
    description: "The grand Tournament of Champions is now live! Compete head-to-head against players from around the globe. Raid villages, attack your rivals, and defend your treasures to climb the leaderboard. Each tier brings greater glory and even more amazing prizes, including rare stickers, pet food, and massive coin hauls. Are you ready to be crowned the champion?",
    dateRange: "Ongoing Weekly",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", // Placeholder: group around screens (competition)
  },
  {
    id: "event3",
    title: "Set Blast Bonanza",
    description: "It's a Set Blast Bonanza! During this special event, completing your Card Sets yields even more fantastic rewards than usual. Get extra spins, coins, and even pet XP for every set you finish. This is the perfect time to trade with friends and hunt for those elusive cards to complete your collection and reap the boosted benefits!",
    dateRange: "June 1, 2025 - June 5, 2025",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", // Placeholder: code on screen (collecting)
    detailsLink: "#setblast-info"
  },
  {
    id: "event4",
    title: "Village Master Challenge",
    description: "Prove your mastery in village building! The Village Master Challenge rewards you for upgrading and completing your villages. Reach new village levels during the event to unlock special chests filled with spins, coins, and builder potions. The faster you build, the more you earn. Show everyone your architectural prowess!",
    dateRange: "June 7, 2025 - June 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", // Placeholder: blue starry night (achievement)
    detailsLink: "#village-master-learn-more"
  }
];

const EventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <PartyPopper className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-5xl font-heading text-primary tracking-wide">Coin Master Events</h1>
        <p className="text-xl text-muted-foreground mt-2">Stay updated with the latest in-game events and maximize your rewards! Each event offers unique challenges and opportunities to win big.</p>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-12 text-foreground">
        <h2 className="text-3xl font-heading text-primary">Understanding Coin Master Events</h2>
        <p>
          Coin Master events are special time-limited occurrences within the game that offer players unique opportunities to earn extra rewards, such as spins, coins, cards, pet food, and more. These events often involve specific tasks, challenges, or mini-games.
        </p>
        <p>
          Popular event types include:
        </p>
        <ul>
          <li><strong>Tournaments:</strong> Compete against other players by earning points through actions like attacking and raiding. Higher ranks on the leaderboard yield better prizes.</li>
          <li><strong>Special Events (e.g., Viking Quest, Sea of Fortune):</strong> These often involve mini-games where you progress through stages, collecting rewards along the way. They might require spending coins or spins to participate.</li>
          <li><strong>Gift Master:</strong> Receive bonus rewards for sending and receiving gifts from friends.</li>
          <li><strong>Card Boom:</strong> Increased chances of getting rarer cards from chests.</li>
          <li><strong>Set Blast:</strong> Extra rewards for completing card sets.</li>
        </ul>
        <p>
          Participating actively in events is a key strategy to progress faster in Coin Master. Always check the event timers and understand the objectives to make the most out of them!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sampleEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            dateRange={event.dateRange}
            imageUrl={event.imageUrl}
            detailsLink={event.detailsLink}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
