import { Link } from "react-router-dom";
import { Swords, MapPin, UserRound, ArrowUpRight } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useProjects } from "../hooks/useProjects";
import { useMilestones } from "../hooks/useMilestones";
import { useProfile } from "../hooks/useProfile";

export function DashboardPage() {
  const { projects, isLoading: projectsLoading } = useProjects();
  const { milestones, isLoading: milestonesLoading } = useMilestones();
  const { profile, isLoading: profileLoading } = useProfile();

  const publishedProjects = projects.filter((p) => p.isPublished).length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  const stats = [
    {
      label: "Arsenal",
      icon: Swords,
      value: projectsLoading ? "—" : projects.length,
      sub: projectsLoading ? "" : `${publishedProjects} live · ${featuredProjects} featured`,
      link: "/projects",
    },
    {
      label: "Trail Markers",
      icon: MapPin,
      value: milestonesLoading ? "—" : milestones.length,
      sub: milestonesLoading ? "" : `${milestones.filter((m) => m.isPublished).length} live`,
      link: "/milestones",
    },
    {
      label: "Base Profile",
      icon: UserRound,
      value: profileLoading ? "—" : profile ? "Set" : "Empty",
      sub: profileLoading ? "" : profile?.stats?.role || "No current role logged",
      link: "/profile",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Field HQ"
        title="Operations Log"
        description="A snapshot of everything feeding the live portfolio site."
      />

      <div className="grid sm:grid-cols-3 gap-5">
        {stats.map((s) => (
          <Link key={s.label} to={s.link}>
            <Card className="hover:border-amber/60 transition-colors h-full">
              <CardContent className="pt-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-amber-bright" strokeWidth={1.5} />
                  <ArrowUpRight className="h-4 w-4 text-canvas-dim" />
                </div>
                <p className="stencil-label">{s.label}</p>
                <p className="font-display text-4xl text-canvas">{s.value}</p>
                <p className="text-xs text-canvas-dim">{s.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Dispatch Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-canvas-dim space-y-2">
          <p>This command center manages every field feeding your live portfolio site.</p>
          <p>Head to Base Profile to update your bio, stats, and skills, Arsenal to manage projects, or Trail Markers to log milestones.</p>
        </CardContent>
      </Card>
    </div>
  );
}
