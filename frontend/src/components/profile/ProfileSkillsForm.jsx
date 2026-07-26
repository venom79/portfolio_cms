import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TagInput } from "../shared/TagInput";
import { useToast } from "../ui/toast";

/** Editor for profile.skills.{backend,frontend,tools} and beyondCode. */
export function ProfileSkillsForm({ profile, onSave }) {
  const toast = useToast();
  const [skills, setSkills] = useState({ backend: [], frontend: [], tools: [] });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.skills) setSkills(profile.skills);
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ skills });
      toast({ title: "Arsenal of skills updated" });
    } catch (err) {
      toast({ title: "Update failed", description: err?.response?.data?.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Backend, frontend, and tooling — shown as tags on the site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Backend</Label>
            <TagInput value={skills.backend || []} onChange={(v) => setSkills((s) => ({ ...s, backend: v }))} />
          </div>
          <div>
            <Label>Frontend</Label>
            <TagInput value={skills.frontend || []} onChange={(v) => setSkills((s) => ({ ...s, frontend: v }))} />
          </div>
          <div>
            <Label>Tools</Label>
            <TagInput value={skills.tools || []} onChange={(v) => setSkills((s) => ({ ...s, tools: v }))} />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Skills
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
