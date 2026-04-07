import { useMemo } from "react";
import {
  DateRange,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isInRange,
  formatDateKey,
  getHolidays,
} from "@/hooks/useCalendar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  currentDate: Date;
  range: DateRange;
  onDayClick: (day: Date) => void;
  isFlipping: boolean;
}

export default function CalendarGrid({ currentDate, range, onDayClick, isFlipping }: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  // Convert Sunday=0 to Monday-based: Mon=0..Sun=6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const holidays = useMemo(() => getHolidays(year), [year]);

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const trailingDays = Array.from({ length: startOffset }, (_, i) => prevMonthDays - startOffset + 1 + i);

  const today = new Date();

  return (
    <div className={`transition-all duration-300 ${isFlipping ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold py-2 tracking-wider ${
              i >= 5 ? "text-calendar-weekend" : "text-muted-foreground"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Days grid */}
      <div className="grid grid-cols-7">
        {/* Trailing from previous month */}
        {trailingDays.map((d) => (
          <div key={`prev-${d}`} className="text-center py-2 md:py-3 text-muted-foreground/40 text-sm">
            {d}
          </div>
        ))}
        {/* Current month days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNum = i + 1;
          const date = new Date(year, month, dayNum);
          const dayOfWeek = (startOffset + i) % 7; // 0=Mon..6=Sun
          const isWeekend = dayOfWeek >= 5;
          const isStart = range.start ? isSameDay(date, range.start) : false;
          const isEnd = range.end ? isSameDay(date, range.end) : false;
          const inRange = isInRange(date, range);
          const isToday = isSameDay(date, today);
          const dateKey = formatDateKey(date);
          const holiday = holidays.get(dateKey);

          const dayContent = (
            <button
              key={dayNum}
              onClick={() => onDayClick(date)}
              className={`
                relative text-center py-2 md:py-3 text-sm md:text-base font-medium transition-all duration-150
                cursor-pointer select-none
                ${isStart || isEnd
                  ? "bg-calendar-accent text-primary-foreground rounded-lg scale-110 shadow-md z-10"
                  : inRange
                  ? "bg-calendar-range"
                  : "hover:bg-secondary rounded-lg"
                }
                ${isWeekend && !isStart && !isEnd ? "text-calendar-weekend" : ""}
                ${isToday && !isStart && !isEnd ? "font-bold" : ""}
              `}
              style={{
                animationDelay: `${i * 15}ms`,
              }}
            >
              {dayNum}
              {isToday && !isStart && !isEnd && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-calendar-accent" />
              )}
              {holiday && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-calendar-weekend" />
              )}
            </button>
          );

          if (holiday) {
            return (
              <Tooltip key={dayNum}>
                <TooltipTrigger asChild>{dayContent}</TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {holiday}
                </TooltipContent>
              </Tooltip>
            );
          }

          return dayContent;
        })}
      </div>
    </div>
  );
}
