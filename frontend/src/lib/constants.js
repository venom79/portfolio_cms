// Central place for enums and display copy so wording stays consistent
// across the whole command center.

export const PROJECT_STATUS = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  ARCHIVED: "Archived",
};

export const PROJECT_STATUS_OPTIONS = Object.values(PROJECT_STATUS);

export const MILESTONE_TYPES = [
  "Achievement",
  "Education",
  "Career",
  "Project",
  "Personal",
  "Other",
];

// Sidebar / route registry — expedition-coded section names.
export const NAV_ITEMS = [
  { label: "Operations Log", path: "/", key: "dashboard" },
  { label: "Base Profile", path: "/profile", key: "profile" },
  { label: "Arsenal", path: "/projects", key: "projects" },
  { label: "Trail Markers", path: "/milestones", key: "milestones" },
];

export const TOKEN_STORAGE_KEY = "basecamp_hq_token";
