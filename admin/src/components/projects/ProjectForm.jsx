import { useEffect, useState } from "react";
import { ImagePlus, Plus, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

const initialProject = {
  title: "",
  tag: "",

  shortDescription: "",
  description: "",
  story: "",

  github: "",
  liveDemo: "",

  techStack: [],
  features: [],

  thumbnail: null,
  gallery: [],

  featured: false,
  isPublished: true,
  status: "Completed",
};

const ProjectForm = ({ project, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initialProject);

  const [techInput, setTechInput] = useState("");

  const [featureInput, setFeatureInput] = useState("");

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  useEffect(() => {
    if (project) {
      setForm(project);
    } else {
      setForm(initialProject);
      setThumbnailFile(null);
      setGalleryFiles([]);
      setTechInput("");
      setFeatureInput("");
    }
  }, [project]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const addTech = () => {
    const value = techInput.trim();

    if (!value) return;

    if (form.techStack.includes(value)) return;

    setForm((prev) => ({
      ...prev,
      techStack: [...prev.techStack, value],
    }));

    setTechInput("");
  };

  const removeTech = (value) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((item) => item !== value),
    }));
  };

  const addFeature = () => {
    const value = featureInput.trim();

    if (!value) return;

    if (form.features.includes(value)) return;

    setForm((prev) => ({
      ...prev,
      features: [...prev.features, value],
    }));

    setFeatureInput("");
  };

  const removeFeature = (value) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((item) => item !== value),
    }));
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      thumbnailFile,
      galleryFiles,
    });
  };
  return (
    <div className="space-y-8">
      <Tabs defaultValue="details" className="space-y-8">
        <TabsList className="grid h-12 w-full grid-cols-4">
          <TabsTrigger value="details" className="text-sm">
            Details
          </TabsTrigger>

          <TabsTrigger value="links" className="text-sm">
            Links
          </TabsTrigger>

          <TabsTrigger value="stack" className="text-sm">
            Tech Stack
          </TabsTrigger>

          <TabsTrigger value="media" className="text-sm">
            Media
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Project Title</Label>

              <Input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tag</Label>

              <Input
                value={form.tag}
                onChange={(e) => handleChange("tag", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={form.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>

                  <SelectItem value="In Progress">In Progress</SelectItem>

                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Published</p>

                <p className="text-sm text-muted-foreground">
                  Visible on portfolio
                </p>
              </div>

              <Switch
                checked={form.isPublished}
                onCheckedChange={(value) => handleChange("isPublished", value)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Featured</p>

                <p className="text-sm text-muted-foreground">
                  Highlight project
                </p>
              </div>

              <Switch
                checked={form.featured}
                onCheckedChange={(value) => handleChange("featured", value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Short Description</Label>

            <Textarea
              rows={4}
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={8}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Story</Label>

            <Textarea
              rows={12}
              value={form.story}
              onChange={(e) => handleChange("story", e.target.value)}
            />
          </div>
        </TabsContent>
        <TabsContent value="links" className="space-y-6">
          <div className="space-y-2">
            <Label>GitHub Repository</Label>

            <Input
              placeholder="https://github.com/username/project"
              value={form.github}
              onChange={(e) => handleChange("github", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Live Demo</Label>

            <Input
              placeholder="https://example.com"
              value={form.liveDemo}
              onChange={(e) => handleChange("liveDemo", e.target.value)}
            />
          </div>
        </TabsContent>
        <TabsContent value="stack" className="space-y-8">
          {/* Tech Stack */}

          <div className="space-y-4">
            <Label>Tech Stack</Label>

            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-sm"
                >
                  {tech}

                  <button type="button" onClick={() => removeTech(tech)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <Input
              placeholder="Press Enter to add..."
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech();
                }
              }}
            />
          </div>

          {/* Features */}

          <div className="space-y-4">
            <Label>Features</Label>

            <div className="flex flex-wrap gap-2">
              {form.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm"
                >
                  {feature}

                  <button type="button" onClick={() => removeFeature(feature)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <Input
              placeholder="Press Enter to add..."
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-8">
          {/* Github Preview */}

          <div className="space-y-2">
            <Label>Thumbnail</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />

            {thumbnailFile && (
              <img
                src={URL.createObjectURL(thumbnailFile)}
                alt="thumbnail"
                className="mt-4 h-44 rounded-xl object-cover"
              />
            )}

            {!thumbnailFile && form.thumbnail?.url && (
              <img
                src={form.thumbnail.url}
                alt=""
                className="mt-4 h-44 rounded-xl object-cover"
              />
            )}
          </div>

          {/* Gallery */}

          <div className="space-y-2">
            <Label>Gallery</Label>

            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
            />

            <div className="mt-6 grid grid-cols-4 gap-4">
              {/* Existing Gallery */}

              {form.gallery?.map((image, index) => (
                <div key={image._id || index} className="group relative">
                  <img
                    src={image.url}
                    alt=""
                    className="aspect-square w-full rounded-lg border object-cover"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        gallery: prev.gallery.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Newly Selected Images */}

              {galleryFiles.map((file, index) => (
                <div key={`new-${index}`} className="group relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="aspect-square w-full rounded-lg border object-cover"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => {
                      setGalleryFiles((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>

            <Button disabled={loading} onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />

              {loading
                ? "Saving..."
                : project
                  ? "Update Project"
                  : "Create Project"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectForm;
