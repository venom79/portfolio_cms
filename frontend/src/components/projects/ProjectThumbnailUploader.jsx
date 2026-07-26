import { ImageUploader } from "../shared/ImageUploader";
import { projectsApi } from "../../api/projectsApi";
import { useToast } from "../ui/toast";

/** Thumbnail upload wired directly to /projects/:id/thumbnail — only usable once a project exists. */
export function ProjectThumbnailUploader({ project, onChange }) {
  const toast = useToast();

  const handleUpload = async (file) => {
    try {
      const data = await projectsApi.uploadThumbnail(project._id, file);
      onChange(data.data || data);
      toast({ title: "Thumbnail updated" });
    } catch (err) {
      toast({ title: "Upload failed", description: err?.response?.data?.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    try {
      const data = await projectsApi.deleteThumbnail(project._id);
      onChange(data.data || data);
      toast({ title: "Thumbnail removed" });
    } catch (err) {
      toast({ title: "Removal failed", description: err?.response?.data?.message, variant: "destructive" });
    }
  };

  return (
    <ImageUploader
      label="Thumbnail"
      imageUrl={project?.thumbnail?.url}
      onUpload={handleUpload}
      onDelete={handleDelete}
    />
  );
}
