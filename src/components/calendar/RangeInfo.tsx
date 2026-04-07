import { DateRange } from "@/hooks/useCalendar";
import { CalendarDays, X } from "lucide-react";

interface RangeInfoProps {
  range: DateRange;
  onClear: () => void;
}

export default function RangeInfo({ range, onClear }: RangeInfoProps) {
  if (!range.start) return null;

  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  const dayCount =
    range.start && range.end
      ? Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1
      : 1;

  return (
    <div className="flex items-center justify-between bg-calendar-range rounded-lg px-3 py-2 mt-3 animate-fade-up">
      <div className="flex items-center gap-2 text-sm">
        <CalendarDays className="w-4 h-4 text-calendar-accent" />
        <span className="text-foreground font-medium">
          {fmt(range.start)}
          {range.end && !isSame(range.start, range.end) && ` → ${fmt(range.end)}`}
        </span>
        <span className="text-muted-foreground">
          ({dayCount} day{dayCount > 1 ? "s" : ""})
        </span>
      </div>
      <button
        onClick={onClear}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Clear selection"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function isSame(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
