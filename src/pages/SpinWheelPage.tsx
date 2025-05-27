
import { RollerCoaster } from "lucide-react"; // Placeholder icon

const SpinWheelPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <RollerCoaster className="mx-auto h-16 w-16 text-primary mb-4" />
      <h1 className="text-5xl font-heading text-primary tracking-wide mb-4">Spin the Wheel!</h1>
      <p className="text-xl text-muted-foreground mt-2 mb-8">
        Get ready for exciting prizes! Our interactive spin wheel is coming soon.
      </p>
      
      <div className="bg-card p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-heading text-secondary mb-6">Spin Wheel - Under Construction</h2>
        <div className="aspect-square bg-muted rounded-full flex items-center justify-center mb-6 animate-pulse">
          <p className="text-lg text-muted-foreground">Wheel Animation Here</p>
        </div>
        <button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-3 rounded-md cursor-not-allowed opacity-50"
          disabled
        >
          Spin Now (Coming Soon!)
        </button>
        <p className="text-xs text-muted-foreground mt-4">
          Check back later to try your luck and win amazing rewards!
        </p>
      </div>
    </div>
  );
};

export default SpinWheelPage;
