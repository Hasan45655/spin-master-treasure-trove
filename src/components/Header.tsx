
import { Link } from "react-router-dom";
import { Gem } from "lucide-react"; // Using Gem as a placeholder logo icon

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
          <Gem size={36} className="transform -rotate-12" />
          <h1 className="text-3xl font-heading tracking-wider">Spin Master Rewards</h1>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-lg text-foreground hover:text-primary transition-colors font-medium">
            Rewards
          </Link>
          <Link to="/events" className="text-lg text-foreground hover:text-primary transition-colors font-medium">
            Events
          </Link>
          <Link to="/stickers" className="text-lg text-foreground hover:text-primary transition-colors font-medium">
            Stickers
          </Link>
          <Link to="/spin-wheel" className="text-lg text-foreground hover:text-primary transition-colors font-medium">
            Spin Wheel
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
