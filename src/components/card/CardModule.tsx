import { useProjectInfo } from "@/hook/useProjectInfo";
import { navigateArchive, navigateWorkspace } from "@/app/_actions/navigate";
import * as styles from "./card.css";
import { useModals } from "@/hook/useModals";
import { Project } from "@/@types/api";
import NewProjectForm from "../form/NewProjectForm";

export function ArchiveCard({ props }: { props: ProjectProps }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateArchive(props.projectId);
  };
  return <CardModule props={props} handler={handleClick} />;
}

export function WorkspaceCard({ props }: { props: ProjectProps }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWorkspace(props.projectId);
  };
  return <CardModule props={props} handler={handleClick} />;
}

function CardModule({
  props,
  handler,
}: {
  props: ProjectProps;
  handler: (e: React.MouseEvent) => void;
}) {
  return (
    <div className={styles.cardContainer} onClick={handler}>
      <div className={styles.cardImage}></div>
      <div className={styles.cardText}>
        {props.title}
        <div className={styles.cardSubtitle}>{props.subtitle}</div>
      </div>
    </div>
  );
}

export function NewCardModule({
  addProject,
  valid,
}: {
  addProject: (project: Project) => void;
  valid: boolean;
}) {
  const { open, close } = useModals();

  const handleClick = () => {
    if (valid) {
      open(NewProjectForm, { addProject: addProject });
    } else {
      // project limitation 3
      alert("Currently Project Limited to 3");
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.cardImage}></div>
      <div className={styles.cardText}>
        CREATE NEW PROJECT
        <div className={styles.cardSubtitle}></div>
      </div>
    </div>
  );
}
