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
import { TagInput } from "../shared/TagInput";
import { ProjectThumbnailUploader } from "./ProjectThumbnailUploader";
import { PROJECT_STATUS_OPTIONS } from "../../lib/constants";
import { slugify } from "../../lib/utils";
import { useToast } from "../ui/toast";

const EMPTY_FORM = {
  title: "",
  slug: "",
  tag: "",
  shortDescription: "",
  description: "",
  story: "",
  techStack: [],
  features: [],
  github: "",
  liveDemo: "",
  featured: false,
  isPublished: true,
  status: "In Progress",
  order: 0,
};

/**
 * Create/edit form for a single Project document. Thumbnail upload only appears
 * once the project has an _id, since /projects/:id/thumbnail needs a saved record.
 */
export function ProjectDialog({ open, onOpenChange, project, onCreate, onUpdate }) {
  const toast = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [savedProject, setSavedProject] = useState(project || null);
  const [isSaving, setIsSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(project ? { ...EMPTY_FORM, ...project } : EMPTY_FORM);
      setSavedProject(project || null);
      setSlugTouched(!!project);
    }
  }, [open, project]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (savedProject?._id) {
        const data = await onUpdate(savedProject._id, payload);
        setSavedProject(data.data || data);
        toast({ title: "Project updated" });
      } else {
        const data = await onCreate(payload);
        setSavedProject(data.data || data);
        toast({ title: "Project deployed" });
      }
    } catch (err) {
      toast({ title: "Save failed", description: err?.response?.data?.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{savedProject ? "Edit Project" : "Deploy New Project"}</DialogTitle>
          <DialogDescription>
            {savedProject ? "Update the mission brief for this project." : "Add a new project to the Arsenal."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={handleTitleChange} required />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm((f) => ({ ...f, slug: e.target.value }));
                  }}
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="tag">Tag</Label>
                <Input id="tag" value={form.tag} onChange={handleChange("tag")} placeholder="Full-Stack, 3D Web…" required />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input id="shortDescription" value={form.shortDescription} onChange={handleChange("shortDescription")} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} value={form.description} onChange={handleChange("description")} required />
            </div>

            <div>
              <Label htmlFor="story">Story</Label>
              <Textarea id="story" rows={4} value={form.story} onChange={handleChange("story")} required />
            </div>

            <div>
              <Label>Tech Stack</Label>
              <TagInput value={form.techStack} onChange={(v) => setForm((f) => ({ ...f, techStack: v }))} placeholder="React, Node.js…" />
            </div>

            <div>
              <Label>Features</Label>
              <TagInput value={form.features} onChange={(v) => setForm((f) => ({ ...f, features: v }))} placeholder="Real-time sync…" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" value={form.github} onChange={handleChange("github")} />
              </div>
              <div>
                <Label htmlFor="liveDemo">Live Demo URL</Label>
                <Input id="liveDemo" value={form.liveDemo} onChange={handleChange("liveDemo")} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 items-end">
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input id="order" type="number" value={form.order} onChange={handleChange("order")} />
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm((f) => ({ ...f, featured: v }))} />
                <Label className="mb-0">Featured</Label>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Switch checked={form.isPublished} onCheckedChange={(v) => setForm((f) => ({ ...f, isPublished: v }))} />
                <Label className="mb-0">Published</Label>
              </div>
            </div>

            {savedProject?._id && (
              <div className="field-divider pt-5">
                <ProjectThumbnailUploader project={savedProject} onChange={setSavedProject} />
              </div>
            )}
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {savedProject ? "Save Changes" : "Deploy Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
