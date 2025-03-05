import { useProjectInfo } from "@/hook/useProjectInfo";
import { navigateArchive } from "@/app/_actions/navigate";
import * as styles from "./card.css";
import { useModals } from "@/hook/useModals";
import { useState } from "react";
import { createProject } from "@/app/_actions/project";
import { Project } from "@/@types/api";

export function CardModule({props} : {props : ProjectProps}){
  const fetchProjectInfo = useProjectInfo((state) => state.fetch);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // XXX ADD ENTERING PROJECT

    console.log(props.projectId);
    fetchProjectInfo(props.projectId).then(() => navigateArchive(props.projectId))
    
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
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
}){

  const {open, close} = useModals()

  const handleClick = () => {
    if (valid) {
      open(NewProjectForm, {addProject: addProject})
    } else {
      // project limitation 3
      alert("Currently Project Limited to 3");
    }
  }

  return(
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.cardImage}></div>
      <div className={styles.cardText}>
        CREATE NEW PROJECT
        <div className={styles.cardSubtitle}></div>
      </div>
    </div>
  )
}

export function NewProjectForm({
  addProject
}: {
  addProject: (project: Project) => void;
}){

  const {close} = useModals()
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      await createProject({
        title: title,
        subtitle: subtitle,
        isPublic: isPublic
      }).then((d) => {
        d.error? alert(error) : close(); addProject(d)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <div className={styles.formModalContainer}>
        <div className={styles.formInputBlock}>
          <div className={styles.formTag}>Title</div>
          <input className={styles.formInput} onChange={e => setTitle(e.target.value)}></input>
        </div>
        <div className={styles.formInputBlock}>
          <div className={styles.formTag}>Subtitle</div>
          <input className={styles.formInput} onChange={e => setSubtitle(e.target.value)}></input>
        </div>
        <div className={styles.boolButtonBlock}> 
          <div className={isPublic? styles.buttonSelected: styles.buttonUnselected} onClick={() => setIsPublic(true)}>Public</div>
          <div className={isPublic? styles.buttonUnselected: styles.buttonSelected} onClick={() => setIsPublic(false)}>Private</div> 
        </div>
        <div className={styles.submitButton} onClick={handleSubmit}> Create </div>
    </div>
  )
}