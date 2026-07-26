import { useState } from "react";
import { Pencil, Trash2, Star, ExternalLink, Images } from "lucide-react";
import { GithubMark } from "../shared/GithubMark";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { EmptyState } from "../shared/EmptyState";

const STATUS_VARIANT = {
  Completed: "moss",
  "In Progress": "default",
  Archived: "outline",
};

/** Lists all projects with quick actions: edit, manage gallery, soft-delete. */
export function ProjectsTable({ projects, onEdit, onManageGallery, onDelete }) {
  const [pendingDelete, setPendingDelete] = useState(null);

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects deployed"
        description="Add your first project to populate the Arsenal on your live site."
      />
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Live</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {project.featured && <Star className="h-3.5 w-3.5 text-amber-bright fill-amber-bright shrink-0" />}
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-xs text-canvas-dim">{project.shortDescription}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[project.status] || "outline"}>{project.status}</Badge>
              </TableCell>
              <TableCell className="text-canvas-dim text-xs">{project.tag}</TableCell>
              <TableCell>
                {project.isPublished ? (
                  <Badge variant="moss">Published</Badge>
                ) : (
                  <Badge variant="outline">Draft</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="p-1.5 text-canvas-dim hover:text-amber-bright">
                      <GithubMark className="h-4 w-4" />
                    </a>
                  )}
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noreferrer" className="p-1.5 text-canvas-dim hover:text-amber-bright">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => onManageGallery(project)} title="Manage gallery">
                    <Images className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(project)} title="Edit project">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setPendingDelete(project)} title="Delete project">
                    <Trash2 className="h-4 w-4 text-rust-bright" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Decommission this project?"
        description={`"${pendingDelete?.title}" will be soft-deleted and removed from the live site, along with its Cloudinary assets.`}
        confirmLabel="Decommission"
        onConfirm={() => {
          onDelete(pendingDelete._id);
          setPendingDelete(null);
        }}
      />
    </>
  );
}
