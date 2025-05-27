
import { Ticket } from "lucide-react"; // Changed icon to Ticket
import SpinWheel from "@/components/SpinWheel"; // Import the new component

const SpinWheelPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Ticket className="mx-auto h-16 w-16 text-primary mb-4 animate-bounce" />
      <h1 className="text-5xl font-heading text-primary tracking-wide mb-4 drop-shadow-md">Spin the Wheel!</h1>
      <p className="text-xl text-muted-foreground mt-2 mb-12">
        Try your luck and win amazing rewards! Click the button below to spin.
      </p>
      
      <SpinWheel />

      <p className="text-sm text-muted-foreground mt-12">
        Prizes are for illustrative purposes. Good luck!
      </p>
    </div>
  );
};

export default SpinWheelPage;
