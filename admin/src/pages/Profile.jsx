import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/profile.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    tagline: "",
    quote: "",
    about: "",
    beyondCode: "",

    contacts: {
      github: "",
      linkedin: "",
      email: "",
    },

    stats: {
      role: "",
      learning: "",
      stronghold: "",
      activeMission: "",
      preferredArms: "",
      sideQuest: "",
    },

    skills: {
      frontend: [],
      backend: [],
      tools: [],
    },

    experience: [],

    profileImage: "",
    resume: "",
  });

  const [skillInput, setSkillInput] = useState({
    frontend: "",
    backend: "",
    tools: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      const { _id, __v, createdAt, updatedAt, ...cleanData } = data;

      setProfile(cleanData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateProfile(profile);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const addSkill = (category) => {
    const value = skillInput[category].trim();

    if (!value) return;

    if (profile.skills[category].includes(value)) return;

    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], value],
      },
    }));

    setSkillInput((prev) => ({
      ...prev,
      [category]: "",
    }));
  };

  const removeSkill = (category, skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((item) => item !== skill),
      },
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...profile.experience];

    updatedExperience[index][field] = value;

    setProfile((prev) => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          year: "",
          title: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>

          <p className="text-muted-foreground">
            Manage your portfolio information.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>

              <TabsTrigger value="contacts">Contacts</TabsTrigger>

              <TabsTrigger value="stats">Stats</TabsTrigger>

              <TabsTrigger value="skills">Skills</TabsTrigger>

              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-2">
                <Label>Name</Label>

                <Input
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tagline</Label>

                <Input
                  value={profile.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Quote</Label>

                <Input
                  value={profile.quote}
                  onChange={(e) => handleChange("quote", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>About</Label>

                <Textarea
                  rows={8}
                  value={profile.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Beyond Code</Label>

                <Textarea
                  rows={6}
                  value={profile.beyondCode}
                  onChange={(e) => handleChange("beyondCode", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <div className="space-y-2">
                <Label>GitHub</Label>

                <Input
                  value={profile.contacts.github}
                  onChange={(e) =>
                    handleNestedChange("contacts", "github", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>LinkedIn</Label>

                <Input
                  value={profile.contacts.linkedin}
                  onChange={(e) =>
                    handleNestedChange("contacts", "linkedin", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  value={profile.contacts.email}
                  onChange={(e) =>
                    handleNestedChange("contacts", "email", e.target.value)
                  }
                />
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Role</Label>

                  <Input
                    value={profile.stats.role}
                    onChange={(e) =>
                      handleNestedChange("stats", "role", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Learning</Label>

                  <Input
                    value={profile.stats.learning}
                    onChange={(e) =>
                      handleNestedChange("stats", "learning", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stronghold</Label>

                  <Input
                    value={profile.stats.stronghold}
                    onChange={(e) =>
                      handleNestedChange("stats", "stronghold", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Active Mission</Label>

                  <Input
                    value={profile.stats.activeMission}
                    onChange={(e) =>
                      handleNestedChange(
                        "stats",
                        "activeMission",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Arms</Label>

                  <Input
                    value={profile.stats.preferredArms}
                    onChange={(e) =>
                      handleNestedChange(
                        "stats",
                        "preferredArms",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Side Quest</Label>

                  <Input
                    value={profile.stats.sideQuest}
                    onChange={(e) =>
                      handleNestedChange("stats", "sideQuest", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="skills">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Frontend */}

                <div className="space-y-4">
                  <Label>Frontend</Label>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills.frontend.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1"
                      >
                        <span>{skill}</span>

                        <button
                          type="button"
                          onClick={() => removeSkill("frontend", skill)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="React"
                      value={skillInput.frontend}
                      onChange={(e) =>
                        setSkillInput((prev) => ({
                          ...prev,
                          frontend: e.target.value,
                        }))
                      }
                    />

                    <Button type="button" onClick={() => addSkill("frontend")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Backend */}

                <div className="space-y-4">
                  <Label>Backend</Label>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills.backend.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1"
                      >
                        <span>{skill}</span>

                        <button
                          type="button"
                          onClick={() => removeSkill("backend", skill)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Node.js"
                      value={skillInput.backend}
                      onChange={(e) =>
                        setSkillInput((prev) => ({
                          ...prev,
                          backend: e.target.value,
                        }))
                      }
                    />

                    <Button type="button" onClick={() => addSkill("backend")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tools */}

              <div className="mt-8 space-y-4">
                <Label>Tools</Label>

                <div className="flex flex-wrap gap-2">
                  {profile.skills.tools.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1"
                    >
                      <span>{skill}</span>

                      <button
                        type="button"
                        onClick={() => removeSkill("tools", skill)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Docker"
                    value={skillInput.tools}
                    onChange={(e) =>
                      setSkillInput((prev) => ({
                        ...prev,
                        tools: e.target.value,
                      }))
                    }
                  />

                  <Button type="button" onClick={() => addSkill("tools")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Experience</h3>

                <Button type="button" onClick={addExperience}>
                  Add Experience
                </Button>
              </div>

              {profile.experience.length === 0 && (
                <p className="text-muted-foreground">No experience added.</p>
              )}

              {profile.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label>Year</Label>

                      <Input
                        value={exp.year}
                        onChange={(e) =>
                          handleExperienceChange(index, "year", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Title</Label>

                      <Input
                        value={exp.title}
                        onChange={(e) =>
                          handleExperienceChange(index, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>

                      <Textarea
                        rows={4}
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => removeExperience(index)}
                    >
                      Remove Experience
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
