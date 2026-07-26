import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast";

/** Editor for name, tagline, about, and quote — the front-facing identity fields. */
export function ProfileGeneralForm({ profile, onSave }) {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", tagline: "", about: "", quote: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        tagline: profile.tagline || "",
        about: profile.about || "",
        quote: profile.quote || "",
      });
    }
  }, [profile]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(form);
      toast({ title: "Profile updated" });
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
          <CardTitle>Identity</CardTitle>
          <CardDescription>Name, tagline, and the story behind the base camp.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={handleChange("name")} required />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={form.tagline} onChange={handleChange("tagline")} required />
            </div>
          </div>
          <div>
            <Label htmlFor="about">About</Label>
            <Textarea id="about" rows={5} value={form.about} onChange={handleChange("about")} required />
          </div>
          <div>
            <Label htmlFor="quote">Field Quote</Label>
            <Textarea id="quote" rows={2} value={form.quote} onChange={handleChange("quote")} required />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Identity
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
