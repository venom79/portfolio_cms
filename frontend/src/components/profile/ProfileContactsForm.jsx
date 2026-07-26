import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast";

/** Editor for profile.contacts — github, linkedin, email. */
export function ProfileContactsForm({ profile, onSave }) {
  const toast = useToast();
  const [form, setForm] = useState({ github: "", linkedin: "", email: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.contacts) {
      setForm({
        github: profile.contacts.github || "",
        linkedin: profile.contacts.linkedin || "",
        email: profile.contacts.email || "",
      });
    }
  }, [profile]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ contacts: form });
      toast({ title: "Contacts updated" });
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
          <CardTitle>Comms Channels</CardTitle>
          <CardDescription>Where visitors can reach or find you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" value={form.github} onChange={handleChange("github")} placeholder="https://github.com/username" />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" value={form.linkedin} onChange={handleChange("linkedin")} placeholder="https://linkedin.com/in/username" />
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" type="email" value={form.email} onChange={handleChange("email")} placeholder="you@example.com" />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Comms
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
