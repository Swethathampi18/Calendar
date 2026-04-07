import { useState, useCallback, useEffect } from "react";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface NoteEntry {
  id: string;
  text: string;
  date: string; // ISO date string for the day, or month key for general notes
  createdAt: string;
}

const NOTES_KEY = "wall-calendar-notes";
const RANGE_KEY = "wall-calendar-range";

function loadNotes(): NoteEntry[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: NoteEntry[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function loadRange(): DateRange {
  try {
    const raw = localStorage.getItem(RANGE_KEY);
    if (!raw) return { start: null, end: null };
    const parsed = JSON.parse(raw);
    return {
      start: parsed.start ? new Date(parsed.start) : null,
      end: parsed.end ? new Date(parsed.end) : null,
    };
  } catch {
    return { start: null, end: null };
  }
}

function saveRange(range: DateRange) {
  localStorage.setItem(
    RANGE_KEY,
    JSON.stringify({
      start: range.start?.toISOString() ?? null,
      end: range.end?.toISOString() ?? null,
    })
  );
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRangeState] = useState<DateRange>(loadRange);
  const [notes, setNotesState] = useState<NoteEntry[]>(loadNotes);
  const [isFlipping, setIsFlipping] = useState(false);

  const setRange = useCallback((r: DateRange) => {
    setRangeState(r);
    saveRange(r);
  }, []);

  const navigateMonth = useCallback((delta: number) => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setMonth(next.getMonth() + delta);
        return next;
      });
      setTimeout(() => setIsFlipping(false), 50);
    }, 200);
  }, []);

  const handleDayClick = useCallback(
    (day: Date) => {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: day, end: null });
      } else {
        if (day < range.start) {
          setRange({ start: day, end: range.start });
        } else {
          setRange({ start: range.start, end: day });
        }
      }
    },
    [range, setRange]
  );

  const addNote = useCallback(
    (text: string, date?: string) => {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
      const note: NoteEntry = {
        id: crypto.randomUUID(),
        text,
        date: date ?? monthKey,
        createdAt: new Date().toISOString(),
      };
      const updated = [...notes, note];
      setNotesState(updated);
      saveNotes(updated);
    },
    [notes, currentDate]
  );

  const deleteNote = useCallback(
    (id: string) => {
      const updated = notes.filter((n) => n.id !== id);
      setNotesState(updated);
      saveNotes(updated);
    },
    [notes]
  );

  const currentMonthNotes = notes.filter((n) => {
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
    return n.date === monthKey || n.date.startsWith(monthKey);
  });

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
  }, [setRange]);

  return {
    currentDate,
    range,
    notes: currentMonthNotes,
    isFlipping,
    navigateMonth,
    handleDayClick,
    addNote,
    deleteNote,
    clearRange,
  };
}

// US holidays
export function getHolidays(year: number): Map<string, string> {
  const holidays = new Map<string, string>();
  holidays.set(`${year}-01-01`, "New Year's Day");
  holidays.set(`${year}-07-04`, "Independence Day");
  holidays.set(`${year}-12-25`, "Christmas Day");
  holidays.set(`${year}-12-31`, "New Year's Eve");
  holidays.set(`${year}-02-14`, "Valentine's Day");
  holidays.set(`${year}-10-31`, "Halloween");
  // MLK Day - 3rd Monday of January
  const jan1 = new Date(year, 0, 1);
  const mlkDay = new Date(year, 0, 1 + ((1 - jan1.getDay() + 7) % 7) + 14);
  holidays.set(`${year}-01-${String(mlkDay.getDate()).padStart(2, "0")}`, "MLK Day");
  // Thanksgiving - 4th Thursday of November
  const nov1 = new Date(year, 10, 1);
  const thanksgiving = new Date(year, 10, 1 + ((4 - nov1.getDay() + 7) % 7) + 21);
  holidays.set(`${year}-11-${String(thanksgiving.getDate()).padStart(2, "0")}`, "Thanksgiving");
  return holidays;
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isInRange(day: Date, range: DateRange) {
  if (!range.start || !range.end) return false;
  return day > range.start && day < range.end;
}

export function formatDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
