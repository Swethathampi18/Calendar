import { useCalendar } from "@/hooks/useCalendar";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import RangeInfo from "./RangeInfo";

export default function WallCalendar() {
  const {
    currentDate,
    range,
    notes,
    isFlipping,
    navigateMonth,
    handleDayClick,
    addNote,
    deleteNote,
    clearRange,
  } = useCalendar();

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Calendar "page" with shadow & spiral binding illusion */}
      <div className="relative">
        {/* Spiral binding dots */}
        <div className="absolute -top-3 left-0 right-0 flex justify-center gap-4 z-10">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-border shadow-inner border border-muted-foreground/20"
            />
          ))}
        </div>

        <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
          {/* Hero image */}
          <CalendarHero
            currentDate={currentDate}
            onPrev={() => navigateMonth(-1)}
            onNext={() => navigateMonth(1)}
            isFlipping={isFlipping}
          />

          {/* Calendar body */}
          <div className="p-4 md:p-6">
            <CalendarGrid
              currentDate={currentDate}
              range={range}
              onDayClick={handleDayClick}
              isFlipping={isFlipping}
            />

            <RangeInfo range={range} onClear={clearRange} />

            <NotesSection
              notes={notes}
              range={range}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
