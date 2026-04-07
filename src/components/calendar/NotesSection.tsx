import { useState } from "react";
import { NoteEntry, DateRange } from "@/hooks/useCalendar";
import { Trash2, Plus, StickyNote } from "lucide-react";

interface NotesSectionProps {
  notes: NoteEntry[];
  range: DateRange;
  onAddNote: (text: string, date?: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesSection({ notes, range, onAddNote, onDeleteNote }: NotesSectionProps) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    const dateKey = range.start
      ? `${range.start.getFullYear()}-${String(range.start.getMonth() + 1).padStart(2, "0")}-${String(range.start.getDate()).padStart(2, "0")}`
      : undefined;
    onAddNote(text.trim(), dateKey);
    setText("");
  };

  return (
    <div className="border-t border-border pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
      </div>
      {/* Add note input */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={range.start ? `Note for ${range.start.toLocaleDateString()}…` : "Add a note for this month…"}
          className="flex-1 bg-secondary text-foreground px-3 py-2 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="bg-calendar-accent text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
          aria-label="Add note"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {/* Notes list */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">No notes yet. Select a date range or type a memo.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between gap-2 bg-secondary rounded-lg px-3 py-2 animate-fade-up group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{note.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {note.date.length > 7
                    ? new Date(note.date + "T00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })
                    : "General"}
                </p>
              </div>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0 mt-0.5"
                aria-label="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
