import {
  FolderGit2,
  MapPinned,
  FileCheck2,
  FileClock,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back 👋</h1>
          <p className="text-muted-foreground">
            Here's an overview of your portfolio.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Projects</p>
              <h2 className="text-3xl font-bold">0</h2>
            </div>

            <FolderGit2 className="h-8 w-8 text-violet-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Trail Markers</p>
              <h2 className="text-3xl font-bold">0</h2>
            </div>

            <MapPinned className="h-8 w-8 text-emerald-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <h2 className="text-3xl font-bold">0</h2>
            </div>

            <FileCheck2 className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Drafts</p>
              <h2 className="text-3xl font-bold">0</h2>
            </div>

            <FileClock className="h-8 w-8 text-amber-500" />
          </CardContent>
        </Card>
      </div>

      {/* Recent */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">No projects found.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Trail Markers</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">No milestones found.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
