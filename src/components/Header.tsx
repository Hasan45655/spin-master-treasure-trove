
import React from "react";
import { Link } from "react-router-dom";
import { Gem, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const Header = () => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const commonLinkClasses = "text-lg text-foreground hover:text-primary transition-colors font-medium";
  const mobileLinkClasses = `${commonLinkClasses} py-3 px-4 block w-full text-left rounded-md hover:bg-accent`;

  const navItems = [
    { to: "/", label: "Rewards" },
    { to: "/events", label: "Events" },
    { to: "/stickers", label: "Stickers" },
    { to: "/spin-wheel", label: "Spin Wheel" },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          onClick={() => isMobile && isSheetOpen && setIsSheetOpen(false)} // Close sheet if logo clicked while open
        >
          <Gem size={isMobile ? 30 : 36} className="transform -rotate-12" />
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-heading tracking-wider`}>
            Spin Master Rewards
          </h1>
        </Link>

        {isMobile ? (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className="p-2 -mr-2 text-foreground hover:text-primary transition-colors"
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-0 pt-8">
              {/* Optional: Add a close button inside the sheet if needed, though SheetClose on links is good */}
              {/* <SheetClose asChild>
                <Button variant="ghost" className="absolute top-4 right-4 px-2">
                  <X size={24} />
                </Button>
              </SheetClose> */}
              <div className="flex flex-col space-y-1 p-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link to={item.to} className={mobileLinkClasses}>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="space-x-6">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={commonLinkClasses}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
