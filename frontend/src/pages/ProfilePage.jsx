import { PageHeader } from "../components/shared/PageHeader";
import { LoadingState } from "../components/shared/LoadingState";
import { ErrorBanner } from "../components/shared/ErrorBanner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { ProfileGeneralForm } from "../components/profile/ProfileGeneralForm";
import { ProfileContactsForm } from "../components/profile/ProfileContactsForm";
import { ProfileStatsForm } from "../components/profile/ProfileStatsForm";
import { ProfileSkillsForm } from "../components/profile/ProfileSkillsForm";
import { ProfileExperienceForm } from "../components/profile/ProfileExperienceForm";
import { ProfileImageResume } from "../components/profile/ProfileImageResume";
import { useProfile } from "../hooks/useProfile";

export function ProfilePage() {
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadImage,
    deleteImage,
    uploadResume,
    deleteResume,
  } = useProfile();

  return (
    <div>
      <PageHeader
        eyebrow="Base Camp"
        title="Base Profile"
        description="The identity, stats, and story that power your live portfolio."
      />

      <ErrorBanner message={error} />

      {isLoading ? (
        <LoadingState rows={5} />
      ) : (
        <Tabs defaultValue="identity">
          <TabsList>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="portrait">Portrait & Dossier</TabsTrigger>
            <TabsTrigger value="stats">Field Stats</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Timeline</TabsTrigger>
            <TabsTrigger value="contacts">Comms</TabsTrigger>
          </TabsList>

          <TabsContent value="identity">
            <ProfileGeneralForm profile={profile} onSave={updateProfile} />
          </TabsContent>
          <TabsContent value="portrait">
            <ProfileImageResume
              profile={profile}
              uploadImage={uploadImage}
              deleteImage={deleteImage}
              uploadResume={uploadResume}
              deleteResume={deleteResume}
            />
          </TabsContent>
          <TabsContent value="stats">
            <ProfileStatsForm profile={profile} onSave={updateProfile} />
          </TabsContent>
          <TabsContent value="skills">
            <ProfileSkillsForm profile={profile} onSave={updateProfile} />
          </TabsContent>
          <TabsContent value="experience">
            <ProfileExperienceForm profile={profile} onSave={updateProfile} />
          </TabsContent>
          <TabsContent value="contacts">
            <ProfileContactsForm profile={profile} onSave={updateProfile} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
