import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { ImageUploader } from "../shared/ImageUploader";
import { MILESTONE_TYPES } from "../../lib/constants";
import { milestonesApi } from "../../api/milestonesApi";
import { useToast } from "../ui/toast";

const EMPTY_FORM = {
  title: "",
  description: "",
  type: "Achievement",
  dateLabel: "",
  link: "",
  order: 0,
  isPublished: true,
};

/** Create/edit form for a single Milestone document, plus its image once saved. */
export function MilestoneDialog({ open, onOpenChange, milestone, onCreate, onUpdate }) {
  const toast = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [savedMilestone, setSavedMilestone] = useState(milestone || null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(milestone ? { ...EMPTY_FORM, ...milestone } : EMPTY_FORM);
      setSavedMilestone(milestone || null);
    }
  }, [open, milestone]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (savedMilestone?._id) {
        const data = await onUpdate(savedMilestone._id, payload);
        setSavedMilestone(data.data || data);
        toast({ title: "Milestone updated" });
      } else {
        const data = await onCreate(payload);
        setSavedMilestone(data.data || data);
        toast({ title: "Trail marker planted" });
      }
    } catch (err) {
      toast({ title: "Save failed", description: err?.response?.data?.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file) => {
    const data = await milestonesApi.uploadImage(savedMilestone._id, file);
    setSavedMilestone(data.data || data);
  };

  const handleImageDelete = async () => {
    const data = await milestonesApi.deleteImage(savedMilestone._id);
    setSavedMilestone(data.data || data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{savedMilestone ? "Edit Milestone" : "Plant New Marker"}</DialogTitle>
          <DialogDescription>
            {savedMilestone ? "Update this waypoint in the journey." : "Add a new milestone to the trail."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={handleChange("title")} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} value={form.description} onChange={handleChange("description")} required />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {MILESTONE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateLabel">Date Label</Label>
                <Input id="dateLabel" value={form.dateLabel} onChange={handleChange("dateLabel")} placeholder="March 2024" required />
              </div>
            </div>

            <div>
              <Label htmlFor="link">Link (optional)</Label>
              <Input id="link" value={form.link} onChange={handleChange("link")} placeholder="https://…" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 items-end">
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input id="order" type="number" value={form.order} onChange={handleChange("order")} />
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Switch checked={form.isPublished} onCheckedChange={(v) => setForm((f) => ({ ...f, isPublished: v }))} />
                <Label className="mb-0">Published</Label>
              </div>
            </div>

            {savedMilestone?._id && (
              <div className="field-divider pt-5">
                <ImageUploader
                  label="Milestone Image"
                  imageUrl={savedMilestone?.image?.url}
                  onUpload={handleImageUpload}
                  onDelete={handleImageDelete}
                />
              </div>
            )}
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {savedMilestone ? "Save Changes" : "Plant Marker"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
