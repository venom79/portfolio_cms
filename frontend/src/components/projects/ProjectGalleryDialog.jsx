import { useState, useRef } from "react";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { EmptyState } from "../shared/EmptyState";
import { projectsApi } from "../../api/projectsApi";
import { useToast } from "../ui/toast";

/** Manages the gallery[] sub-array on a project — add and remove images one at a time. */
export function ProjectGalleryDialog({ open, onOpenChange, project, onChange }) {
  const toast = useToast();
  const inputRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);
  const gallery = project?.gallery || [];

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !project?._id) return;
    setIsBusy(true);
    try {
      const data = await projectsApi.addGalleryImage(project._id, file);
      onChange(data.data || data);
      toast({ title: "Gallery image added" });
    } catch (err) {
      toast({ title: "Upload failed", description: err?.response?.data?.message, variant: "destructive" });
    } finally {
      setIsBusy(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (imageId) => {
    setIsBusy(true);
    try {
      const data = await projectsApi.deleteGalleryImage(project._id, imageId);
      onChange(data.data || data);
      toast({ title: "Gallery image removed" });
    } catch (err) {
      toast({ title: "Removal failed", description: err?.response?.data?.message, variant: "destructive" });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gallery — {project?.title}</DialogTitle>
          <DialogDescription>Additional field photos shown in the project's expanded view.</DialogDescription>
        </DialogHeader>

        <DialogBody>
          {gallery.length === 0 ? (
            <EmptyState title="No gallery images" description="Add photos to build out this project's story." />
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((img) => (
                <div key={img._id || img.publicId} className="relative aspect-square border border-canvas-dim/40 group overflow-hidden">
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDelete(img._id)}
                    disabled={isBusy}
                    className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Trash2 className="h-5 w-5 text-rust-bright" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={isBusy}>
            {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Add Photo
          </Button>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
