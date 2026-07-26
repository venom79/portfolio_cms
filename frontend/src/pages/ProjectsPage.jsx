import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { LoadingState } from "../components/shared/LoadingState";
import { ErrorBanner } from "../components/shared/ErrorBanner";
import { Button } from "../components/ui/button";
import { ProjectsTable } from "../components/projects/ProjectsTable";
import { ProjectDialog } from "../components/projects/ProjectDialog";
import { ProjectGalleryDialog } from "../components/projects/ProjectGalleryDialog";
import { useProjects } from "../hooks/useProjects";

export function ProjectsPage() {
  const { projects, isLoading, error, createProject, updateProject, removeProject, refresh } = useProjects();
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [galleryProject, setGalleryProject] = useState(null);

  const openCreate = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open) => {
    setIsDialogOpen(open);
    if (!open) refresh();
  };

  return (
    <div>
      <PageHeader
        eyebrow="Field Operations"
        title="Arsenal"
        description="The projects that make up the portfolio's live case studies."
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Deploy Project
          </Button>
        }
      />

      <ErrorBanner message={error} />

      {isLoading ? (
        <LoadingState />
      ) : (
        <ProjectsTable
          projects={projects}
          onEdit={openEdit}
          onManageGallery={setGalleryProject}
          onDelete={removeProject}
        />
      )}

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        project={editingProject}
        onCreate={createProject}
        onUpdate={updateProject}
      />

      <ProjectGalleryDialog
        open={!!galleryProject}
        onOpenChange={(open) => !open && setGalleryProject(null)}
        project={galleryProject}
        onChange={(updated) => {
          setGalleryProject(updated);
          refresh();
        }}
      />
    </div>
  );
}
