import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

/** Chip-style editor for string[] fields like skills.backend / techStack / features. */
export function TagInput({ value = [], onChange, placeholder = "Add and press Enter" }) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!value.includes(trimmed)) onChange([...value, trimmed]);
    setDraft("");
  };

  const removeTag = (tag) => onChange(value.filter((t) => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addTag}
          className="h-10 w-10 shrink-0 border border-canvas-dim/40 flex items-center justify-center text-canvas-dim hover:text-amber-bright hover:border-amber transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((tag) => (
            <Badge key={tag} className="gap-1.5 pr-1">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-rust-bright">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
