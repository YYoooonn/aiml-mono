import { Project, UserInfo } from "@/@types/api";
import * as styles from "./user.css";
import { MouseEvent } from "react";
import { navigate } from "@/app/_actions/navigate";
import Modal from "@/components/modal/Modal";
import Form from "@/components/form/BaseForm";
import { useState, useEffect } from "react";
import { useUserInfo } from "@/hook/useUserInfo";
import { createProject } from "@/app/_actions/project";
import { Dispatch, SetStateAction } from "react";

interface ProjectPropValid {
  index: number;
  project: Project;
  userId: string;
}

function ProjectModule({ index, project, userId }: ProjectPropValid) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(`/user/${userId}/projects/${project.projectId}`);
  };
  return (
    <div key={index} className={styles.projectItem} onClick={handleClick}>
      <div className={styles.projectData}>
        {project.title}
        <div className={styles.projectDataSubtitle}>{project.subtitle}</div>
        {/* <div className={styles.projectDataSubtitle}>
          created by: {project.createdBy}
        </div> */}
      </div>
    </div>
  );
}

function NewProjectModule({
  addProject,
  username,
}: {
  addProject: (project: Project) => void;
  username: string;
}) {
  const [isOpened, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    //console.debug("handle click");
    setOpen(!isOpened);
  };

  const formProps = {
    props: [
      {
        form: { label: "title", type: "text" },
        dispatcher: setTitle,
      },
      {
        form: { label: "subtitle", type: "text" },
        dispatcher: setSubtitle,
      },
      {
        form: { label: "private", type: "checkbox" },
        dispatcher: setIsPrivate,
      },
    ],
    error: error,
    buttonMessage: "create new project",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const creationData = {
        title: title,
        subtitle: subtitle,
        public: !isPrivate,
      };
      const data = await createProject(username, creationData);

      if (data.hasOwnProperty("error")) {
        // ERROR : handle error - alert
        alert(data["error"]);
        setError("Error: ".concat(data["error"]));
      } else {
        console.debug("submission complete");
        addProject(data);
        setOpen(false);
        setTitle("");
        setSubtitle("");
      }
    } catch (err) {
      //console.debug(err);
      setError("Unprecedented error, please try again");
    }
  };

  return (
    <>
      <div className={styles.newProjectItem} onClick={handleClick}>
        <div className={styles.newProjectData}>CREATE NEW PROJECT</div>
      </div>
      <Modal
        selector="newProjectModal"
        isOpened={isOpened}
        handler={handleClick}
      >
        <Form propsWithDispatch={formProps} handleSubmit={handleSubmit} />
        {error ? <div style={{ color: "red" }}>{error}</div> : <></>}
      </Modal>
    </>
  );
}

export function Projects() {
  const projects = useUserInfo((state) => state.projects);
  const addProject = useUserInfo((state) => state.addProject);
  const username = useUserInfo((state) => state.username);

  return (
    <div className={styles.projectContainer}>
      {projects.map((project, i) => {
        return (
          <ProjectModule
            key={i}
            index={i}
            project={project}
            userId={username}
          />
        );
      })}
      <NewProjectModule addProject={addProject} username={username} />
    </div>
  );
}
