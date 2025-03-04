import { Project, UserInfo } from "@/@types/api";
import * as styles from "./user.css";
import { MouseEvent } from "react";
import { navigate } from "@/app/_actions/navigate";
import Modal from "@/components/modal/Modal";
import Form from "@/components/form/BaseForm";
import { useState, useEffect } from "react";
import { useUserInfo } from "@/hook/useUserInfo";
import { createProject } from "@/app/_actions/project";

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
  valid,
}: {
  addProject: (project: Project) => void;
  username: string;
  valid: boolean;
}) {
  const [isOpened, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    //console.debug("handle click");
    if (valid) {
      setOpen(!isOpened);
    } else {
      // project limitation 3
      alert("Currently Project Limited to 3");
    }
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
        isPublic: !isPrivate,
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
      <div
        className={valid ? styles.newProjectItem : styles.disabledProjectItem}
        onClick={handleClick}
      >
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
  const { username, projects, addProject } = useUserInfo();

  return (
    <div className={styles.projectContainer}>
      {projects?.map((project, i) => {
        return (
          <ProjectModule
            key={i}
            index={i}
            project={project}
            userId={username}
          />
        );
      })}
      <NewProjectModule
        addProject={addProject}
        username={username}
        valid={projects?.length < 3}
      />
    </div>
  );
}
