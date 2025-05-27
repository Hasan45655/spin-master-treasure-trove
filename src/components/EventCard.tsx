
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartyPopper, CalendarClock } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  dateRange: string;
  imageUrl?: string; // Optional image for the event
  detailsLink?: string;
}

const EventCard = ({ title, description, dateRange, imageUrl, detailsLink }: EventCardProps) => {
  return (
    <Card className="bg-card/70 border-border hover:shadow-xl transition-shadow duration-300">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-primary flex items-center">
          <PartyPopper className="mr-2 h-7 w-7 text-secondary" />
          {title}
        </CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground pt-1">
          <CalendarClock className="mr-2 h-4 w-4" />
          {dateRange}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90">{description}</p>
      </CardContent>
      {detailsLink && (
        <CardFooter>
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10" asChild>
            <a href={detailsLink} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;
