import { useState, useEffect } from "react";
import { Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast";

/** Editor for profile.experience[] — a repeatable list of {year, title, description}. */
export function ProfileExperienceForm({ profile, onSave }) {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setRows(profile?.experience?.length ? profile.experience : []);
  }, [profile]);

  const updateRow = (index, field, value) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const addRow = () => setRows((prev) => [{ year: "", title: "", description: "" }, ...prev]);
  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ experience: rows });
      toast({ title: "Timeline updated" });
    } catch (err) {
      toast({ title: "Update failed", description: err?.response?.data?.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Expedition Timeline</CardTitle>
            <CardDescription>Career and experience entries, most recent first.</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addRow}>
            <Plus className="h-3.5 w-3.5" /> Add Entry
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {rows.length === 0 && (
            <p className="text-sm text-canvas-dim">No entries yet. Add your first waypoint.</p>
          )}
          {rows.map((row, index) => (
            <div key={index} className="border border-canvas-dim/30 p-4 relative">
              <div className="flex items-start gap-3">
                <GripVertical className="h-4 w-4 text-canvas-dim/40 mt-3 shrink-0" />
                <div className="flex-1 grid sm:grid-cols-[120px_1fr] gap-3">
                  <div>
                    <Label>Year</Label>
                    <Input value={row.year} onChange={(e) => updateRow(index, "year", e.target.value)} placeholder="2024" />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input value={row.title} onChange={(e) => updateRow(index, "title", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Description</Label>
                    <Textarea rows={2} value={row.description} onChange={(e) => updateRow(index, "description", e.target.value)} />
                  </div>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeRow(index)}>
                  <Trash2 className="h-4 w-4 text-rust-bright" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Timeline
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
