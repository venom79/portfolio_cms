import { useState } from "react";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { EmptyState } from "../shared/EmptyState";

/** Lists all milestones with quick edit / soft-delete actions. */
export function MilestonesTable({ milestones, onEdit, onDelete }) {
  const [pendingDelete, setPendingDelete] = useState(null);

  if (milestones.length === 0) {
    return (
      <EmptyState
        title="No trail markers planted"
        description="Add your first milestone to start charting the journey."
      />
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Milestone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {milestones.map((m) => (
            <TableRow key={m._id}>
              <TableCell>
                <p className="font-medium">{m.title}</p>
                <p className="text-xs text-canvas-dim line-clamp-1 max-w-md">{m.description}</p>
              </TableCell>
              <TableCell><Badge variant="outline">{m.type}</Badge></TableCell>
              <TableCell className="text-canvas-dim text-xs">{m.dateLabel}</TableCell>
              <TableCell>
                {m.isPublished ? <Badge variant="moss">Published</Badge> : <Badge variant="outline">Draft</Badge>}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  {m.link && (
                    <a href={m.link} target="_blank" rel="noreferrer" className="p-1.5 text-canvas-dim hover:text-amber-bright">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => onEdit(m)} title="Edit milestone">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setPendingDelete(m)} title="Delete milestone">
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
        title="Remove this trail marker?"
        description={`"${pendingDelete?.title}" will be soft-deleted, along with its image.`}
        confirmLabel="Remove"
        onConfirm={() => {
          onDelete(pendingDelete._id);
          setPendingDelete(null);
        }}
      />
    </>
  );
}
