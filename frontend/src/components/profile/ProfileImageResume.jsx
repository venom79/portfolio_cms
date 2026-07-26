import { FileText, Upload, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { ImageUploader } from "../shared/ImageUploader";
import { useToast } from "../ui/toast";
import { useRef, useState } from "react";

/** Profile photo + resume upload/replace/delete — separate binary-asset endpoints. */
export function ProfileImageResume({
  profile,
  uploadImage,
  deleteImage,
  uploadResume,
  deleteResume,
}) {
  const toast = useToast();
  const resumeInputRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);

  const handleImageUpload = async (file) => {
    try {
      await uploadImage(file);
      toast({ title: "Profile photo updated" });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleImageDelete = async () => {
    try {
      await deleteImage();
      toast({ title: "Profile photo removed" });
    } catch (err) {
      toast({
        title: "Removal failed",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleResumeFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsBusy(true);
    try {
      await uploadResume(file);
      toast({ title: "Resume updated" });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsBusy(false);
      e.target.value = "";
    }
  };

  const handleResumeDelete = async () => {
    setIsBusy(true);
    try {
      await deleteResume();
      toast({ title: "Resume removed" });
    } catch (err) {
      toast({
        title: "Removal failed",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portrait & Dossier</CardTitle>
        <CardDescription>
          Profile photo and downloadable resume shown on the site.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-8">
        <ImageUploader
          label="Profile Photo"
          imageUrl={profile?.profileImage?.url}
          onUpload={handleImageUpload}
          onDelete={handleImageDelete}
        />

        <div>
          <p className="font-display tracking-wide2 uppercase text-xs text-canvas-dim mb-1.5">
            Resume
          </p>
          <div className="border border-canvas-dim/40 bg-ink-lighter px-4 py-6 flex flex-col items-center justify-center gap-2 max-w-[260px]">
            <FileText
              className="h-8 w-8 text-canvas-dim/50"
              strokeWidth={1.5}
            />
            <p className="text-xs text-canvas-dim text-center">
              {profile?.resume?.url ? "Resume on file" : "No resume uploaded"}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleResumeFile}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => resumeInputRef.current?.click()}
              disabled={isBusy}
            >
              <Upload className="h-3.5 w-3.5" />{" "}
              {profile?.resume?.url ? "Replace" : "Upload"}
            </Button>
            {profile?.resume?.url && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResumeDelete}
                disabled={isBusy}
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
