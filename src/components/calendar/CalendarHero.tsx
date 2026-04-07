import { ChevronLeft, ChevronRight } from "lucide-react";
import imgJan from "@/assets/month-january.jpg";
import imgFeb from "@/assets/month-february.jpg";
import imgMar from "@/assets/month-march.jpg";
import imgApr from "@/assets/month-april.jpg";
import imgMay from "@/assets/month-may.jpg";
import imgJun from "@/assets/month-june.jpg";
import imgJul from "@/assets/month-july.jpg";
import imgAug from "@/assets/month-august.jpg";
import imgSep from "@/assets/month-september.jpg";
import imgOct from "@/assets/month-october.jpg";
import imgNov from "@/assets/month-november.jpg";
import imgDec from "@/assets/month-december.jpg";

const MONTH_IMAGES = [imgJan, imgFeb, imgMar, imgApr, imgMay, imgJun, imgJul, imgAug, imgSep, imgOct, imgNov, imgDec];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarHeroProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  isFlipping: boolean;
}

export default function CalendarHero({ currentDate, onPrev, onNext, isFlipping }: CalendarHeroProps) {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img
        src={MONTH_IMAGES[month]}
        alt={`${MONTH_NAMES[month]} ${year}`}
        className={`w-full h-full object-cover transition-all duration-500 ${isFlipping ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
        width={1920}
        height={1080}
      />
      {/* Diagonal overlay */}
      <div className="absolute bottom-0 right-0 w-3/5 h-2/5">
        <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="w-full h-full">
          <polygon
            points="100,0 500,0 500,200 0,200"
            fill="hsl(var(--calendar-hero-overlay))"
            opacity="0.85"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-end pr-6 md:pr-10">
          <div className="text-right">
            <p className="text-primary-foreground text-lg md:text-2xl font-light tracking-wider">{year}</p>
            <h2 className="text-primary-foreground font-display text-2xl md:text-4xl font-bold tracking-wide uppercase">
              {MONTH_NAMES[month]}
            </h2>
          </div>
        </div>
      </div>
      {/* Navigation arrows */}
      <button
        onClick={onPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/70 hover:bg-card backdrop-blur-sm rounded-full p-2 transition-colors shadow-md"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/70 hover:bg-card backdrop-blur-sm rounded-full p-2 transition-colors shadow-md"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
}
