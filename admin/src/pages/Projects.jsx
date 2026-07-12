import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { toast } from "sonner";

import ProjectForm from "@/components/projects/ProjectForm";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  uploadGallery,
  uploadThumbnail,
} from "@/services/project.service";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteDialog from "@/components/common/DeleteDialog";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [savingProject, setSavingProject] = useState(false);

  const [sheetOpen, setSheetOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);

      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to fetch projects.");
    } finally {
      setLoadingProjects(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        (project.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (project.tag || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleNewProject = () => {
    setEditingProject(null);
    setSheetOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);

      toast.success("Project deleted successfully.");

      fetchProjects();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete project.");
    }
  };

  const handleSaveProject = async (form) => {
    try {
      setSavingProject(true);

      const { thumbnailFile, galleryFiles, ...projectData } = form;

      let savedProject;

      if (editingProject) {
        await updateProject(editingProject._id, projectData);

        savedProject = {
          ...editingProject,
          ...projectData,
        };
      } else {
        savedProject = await createProject(projectData);
      }

      if (thumbnailFile) {
        const thumbnail = await uploadThumbnail(
          savedProject.slug,
          thumbnailFile,
        );

        await updateProject(savedProject._id, {
          thumbnail,
        });
      }

      if (galleryFiles && galleryFiles.length > 0) {
        const gallery = await uploadGallery(savedProject.slug, galleryFiles);

        await updateProject(savedProject._id, {
          gallery,
        });
      }

      toast.success(
        editingProject
          ? "Project updated successfully."
          : "Project created successfully.",
      );

      handleCloseSheet();

      fetchProjects();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSavingProject(false);
    }
  };
  return (
    <>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>

            <p className="text-muted-foreground">
              Manage your portfolio projects.
            </p>
          </div>

          <Button onClick={handleNewProject}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="Completed">Completed</SelectItem>

              <SelectItem value="Active">Active</SelectItem>

              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}

        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>

                <TableHead>Title</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Published</TableHead>

                <TableHead>Featured</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loadingProjects ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    Loading projects...
                  </TableCell>
                </TableRow>
              ) : filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No projects found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>
                      {project.thumbnail?.url ? (
                        <img
                          src={project.thumbnail.url}
                          alt={project.title}
                          className="h-12 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>

                    <TableCell>
                      <Badge>{project.status}</Badge>
                    </TableCell>

                    <TableCell>{project.isPublished ? "Yes" : "No"}</TableCell>

                    <TableCell>{project.featured ? "⭐" : "-"}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProject(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <DeleteDialog
                        title="Delete Project"
                        description="This project will be permanently deleted."
                        onConfirm={() => handleDeleteProject(project._id)}
                      >
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </DeleteDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Sheet */}

      <Sheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);

          if (!open) {
            setEditingProject(null);
          }
        }}
      >
        <SheetContent className="!w-[60vw] !max-w-[80vw] overflow-y-auto p-8">
          <SheetHeader>
            <SheetTitle>
              {editingProject ? "Edit Project" : "Create Project"}
            </SheetTitle>

            <SheetDescription>
              {editingProject
                ? "Update your project details."
                : "Add a new project to your portfolio."}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            <ProjectForm
              project={editingProject}
              loading={savingProject}
              onCancel={handleCloseSheet}
              onSave={handleSaveProject}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Projects;
