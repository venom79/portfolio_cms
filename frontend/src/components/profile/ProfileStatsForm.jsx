import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast";

const FIELDS = [
  { key: "role", label: "Current Role" },
  { key: "learning", label: "Currently Learning" },
  { key: "stronghold", label: "Strongest Skill" },
  { key: "activeMission", label: "Active Mission" },
  { key: "preferredArms", label: "Preferred Technologies" },
  { key: "sideQuest", label: "Side Quest" },
];

/** Editor for profile.stats — the six field-report stat lines shown on the site. */
export function ProfileStatsForm({ profile, onSave }) {
  const toast = useToast();
  const [form, setForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.stats) setForm(profile.stats);
  }, [profile]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ stats: form });
      toast({ title: "Field stats updated" });
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
          <CardTitle>Field Stats</CardTitle>
          <CardDescription>The quick-glance status line shown on the portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-5">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input id={f.key} value={form[f.key] || ""} onChange={handleChange(f.key)} />
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Stats
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
