
import EventCard from "@/components/EventCard";
import { PartyPopper } from "lucide-react";

const sampleEvents = [
  {
    id: "event1",
    title: "Viking Quest",
    description: "Complete Viking missions to win huge rewards, including Gold Cards!",
    dateRange: "May 25, 2025 - May 28, 2025",
    imageUrl: "https://via.placeholder.com/400x200/FFD700/000000?Text=Viking+Quest",
    detailsLink: "#"
  },
  {
    id: "event2",
    title: "Tournament Treasures",
    description: "Compete against other players to climb the leaderboard and win amazing prizes.",
    dateRange: "Ongoing",
    imageUrl: "https://via.placeholder.com/400x200/4ABDAC/000000?Text=Tournament",
  },
  {
    id: "event3",
    title: "Set Blast",
    description: "Get more rewards for completing Card Sets during this special event!",
    dateRange: "June 1, 2025 - June 3, 2025",
    detailsLink: "#"
  },
];

const EventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <PartyPopper className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-5xl font-heading text-primary tracking-wide">Coin Master Events</h1>
        <p className="text-xl text-muted-foreground mt-2">Stay updated with the latest in-game events and maximize your rewards!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
