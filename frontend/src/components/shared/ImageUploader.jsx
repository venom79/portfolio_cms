import { useRef, useState } from "react";
import { Upload, Trash2, ImageOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

/**
 * Square image dropzone with upload/delete actions, used for the profile photo,
 * project thumbnails/gallery, and milestone photos alike.
 */
export function ImageUploader({ imageUrl, onUpload, onDelete, label = "Image", aspect = "aspect-square" }) {
  const inputRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsBusy(true);
    try {
      await onUpload(file);
    } finally {
      setIsBusy(false);
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    setIsBusy(true);
    try {
      await onDelete();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div>
      <p className="font-display tracking-wide2 uppercase text-xs text-canvas-dim mb-1.5">{label}</p>
      <div
        className={`relative ${aspect} w-full max-w-[220px] border border-canvas-dim/40 bg-ink-lighter flex items-center justify-center overflow-hidden group`}
      >
        {isBusy ? (
          <Loader2 className="h-6 w-6 animate-spin text-amber-bright" />
        ) : imageUrl ? (
          <img src={imageUrl} alt={label} className="h-full w-full object-cover" />
        ) : (
          <ImageOff className="h-8 w-8 text-canvas-dim/40" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={isBusy}>
          <Upload className="h-3.5 w-3.5" /> {imageUrl ? "Replace" : "Upload"}
        </Button>
        {imageUrl && (
          <Button type="button" variant="ghost" size="sm" onClick={handleDelete} disabled={isBusy}>
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </Button>
        )}
      </div>
    </div>
  );
}
