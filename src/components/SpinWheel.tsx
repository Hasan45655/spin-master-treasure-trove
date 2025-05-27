import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react'; // Pointer icon

interface Segment {
  id: string;
  text: string;
  color: string; // CSS color string for the segment background
}

const initialSegments: Segment[] = [
  { id: 's1', text: '25 Spins', color: 'hsl(45, 100%, 80%)' }, // Lighter primary
  { id: 's2', text: '1M Coins', color: 'hsl(175, 70%, 80%)' }, // Lighter secondary
  { id: 's3', text: '50 Spins', color: 'hsl(120, 70%, 80%)' }, // Lighter green
  { id: 's4', text: 'Shield', color: 'hsl(260, 70%, 85%)' },    // Lighter purple
  { id: 's5', text: '10 Spins', color: 'hsl(0, 84%, 85%)' },     // Lighter destructive
  { id: 's6', text: '500k Coins', color: 'hsl(210, 70%, 80%)' },// Lighter blue
  { id: 's7', text: 'Pet Food', color: 'hsl(100, 60%, 80%)' },  // Lighter green
  { id: 's8', text: 'Try Again', color: 'hsl(0, 0%, 85%)' },    // Lighter gray
];

const SpinWheel = () => {
  const [segments] = useState<Segment[]>(initialSegments);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [spinDuration, setSpinDuration] = useState(5); // seconds

  const segmentAngle = 360 / segments.length;

  const conicGradient = `conic-gradient(${segments
    .map(
      (segment, index) =>
        `${segment.color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`
    )
    .join(', ')})`;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    const winningSegmentIndex = Math.floor(Math.random() * segments.length);
    
    // Calculate the angle to the middle of the winning segment
    // The pointer is at the top (0 degrees effective for landing)
    // We want the middle of the winning segment to land under the pointer.
    // A positive rotation in CSS is clockwise.
    // To bring segment `i` (whose middle is at `(i + 0.5) * segmentAngle`) to the top,
    // the wheel must rotate such that this angle is at the 0 position.
    // If wheel's 0 is at top, and segment angles increase clockwise:
    // targetAngle is the angle (from 0, clockwise) of the middle of the winning segment.
    const targetAngle = (winningSegmentIndex + 0.5) * segmentAngle;
    
    // Add multiple full spins for visual effect.
    // The final rotation should make `targetAngle` align with the top pointer.
    // So, `currentRotation + X = desiredFinalVisualRotation`
    // `desiredFinalVisualRotation` is such that `targetAngle` is at top.
    // This means the wheel's internal 0 degree mark moves to `-targetAngle`.
    // So, new rotation = previous_rotation_modulo_360 - targetAngle + full_spins.
    // Or, more simply:
    const baseRotations = 5 * 360; // At least 5 full spins
    const randomJitter = (Math.random() - 0.5) * segmentAngle * 0.8; // Land slightly off-center in segment
    
    // The final rotation value for the 'rotate' CSS property.
    // We want the `targetAngle` (middle of segment) to effectively be at the 0-degree mark (top pointer).
    // If the wheel starts at 0 rotation (segment 0's start at top), 
    // and we want segment `winningSegmentIndex`'s middle to be at top,
    // the wheel needs to rotate by `-(middle_angle_of_winning_segment)` plus full spins.
    const finalWheelAngle = - ( (winningSegmentIndex * segmentAngle) + (segmentAngle / 2) + randomJitter );

    const newRotation = rotation + baseRotations + (finalWheelAngle - (rotation % 360));

    setRotation(newRotation);
    setSpinDuration(5); // Reset spin duration for CSS transition

    setTimeout(() => {
      setIsSpinning(false);
      setResult(segments[winningSegmentIndex].text);
      // Normalize rotation to keep it within a reasonable range for next spin, though not strictly necessary for CSS
      // setRotation(newRotation % 360); 
    }, spinDuration * 1000 + 200); // Wait for CSS transition to finish + small buffer
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <ChevronDown className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10 h-10 w-10 text-primary" strokeWidth={3} />
        <div
          className="w-full h-full rounded-full border-4 border-primary shadow-2xl overflow-hidden"
          style={{
            background: conicGradient,
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
          }}
        >
          {segments.map((segment, index) => {
            const angle = index * segmentAngle + segmentAngle / 2; // Angle to middle of segment
            return (
              <div
                key={segment.id}
                className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left flex items-center justify-start pl-4 transform"
                style={{
                  transform: `rotate(${angle}deg) translateY(-10%)`, // Adjust translateY to position text within segment
                  color: 'hsl(var(--card-foreground))', // Ensure text is readable
                }}
              >
                <span className="transform -rotate-90 whitespace-nowrap text-sm font-semibold drop-shadow-sm" 
                      style={{ transform: `rotate(${-angle + 90}deg) translateX(30%)`}}> 
                  {/* Complex text rotation to keep it upright relative to segment. Simplified for now. */}
                  {/* For now, let's not render text on segments as it's complex to align with conic-gradient dynamically */}
                </span>
              </div>
            );
          })}
        </div>
         {/* Central hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-card rounded-full border-2 border-primary shadow-inner flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/50 rounded-full"></div>
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl py-4 px-10 rounded-lg shadow-lg transform transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </Button>

      {result && (
        <div className="mt-6 p-4 bg-secondary text-secondary-foreground rounded-lg shadow-md text-center animate-fade-in">
          <p className="text-2xl font-heading">Congratulations!</p>
          <p className="text-3xl font-bold">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
