import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { LoadingState } from "../components/shared/LoadingState";
import { ErrorBanner } from "../components/shared/ErrorBanner";
import { Button } from "../components/ui/button";
import { MilestonesTable } from "../components/milestones/MilestonesTable";
import { MilestoneDialog } from "../components/milestones/MilestoneDialog";
import { useMilestones } from "../hooks/useMilestones";

export function MilestonesPage() {
  const { milestones, isLoading, error, createMilestone, updateMilestone, removeMilestone, refresh } = useMilestones();
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openCreate = () => {
    setEditingMilestone(null);
    setIsDialogOpen(true);
  };

  const openEdit = (milestone) => {
    setEditingMilestone(milestone);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open) => {
    setIsDialogOpen(open);
    if (!open) refresh();
  };

  return (
    <div>
      <PageHeader
        eyebrow="The Journey"
        title="Trail Markers"
        description="Milestones charted along the way — achievements, education, and career waypoints."
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Plant Marker
          </Button>
        }
      />

      <ErrorBanner message={error} />

      {isLoading ? (
        <LoadingState />
      ) : (
        <MilestonesTable milestones={milestones} onEdit={openEdit} onDelete={removeMilestone} />
      )}

      <MilestoneDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        milestone={editingMilestone}
        onCreate={createMilestone}
        onUpdate={updateMilestone}
      />
    </div>
  );
}
