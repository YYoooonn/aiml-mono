import * as styles from "./user.css";
import { useUserInfo } from "@/hook/useUserInfo";
import { WorkspaceCard, NewCardModule } from "@/components/card/CardModule";

export function Projects() {
  const { username, projects, addProject } = useUserInfo();
  const props = projects.map((p) => {
    return {
      createdAt: p.createdAt,
      isPublic: p.isPublic,
      lastModifiedAt: p.lastModifiedAt,
      projectId: p.projectId,
      subtitle: p.subtitle,
      title: p.title,
    };
  });
  return (
    <div className={styles.projectContainer}>
      {props?.map((p, i) => {
        return <WorkspaceCard key={i} props={p} />;
      })}
      <NewCardModule addProject={addProject} valid={projects?.length < 3} />
    </div>
  );
}
