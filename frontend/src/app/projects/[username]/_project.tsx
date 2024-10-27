import { Project } from "@/@types/api";
import * as styles from "./user.css";
import { MouseEvent } from "react";
import { getCookie } from "@/app/_actions/auth";
import { navigate } from "@/app/_actions/navigate";
import Modal from "@/components/modal/Modal";
import Form from "@/components/form/BaseForm";
import { Dispatch, SetStateAction, useState } from "react";
import { UserInfo } from "@/@types/api";
import { updateUserInfo } from "@/app/_actions/update";

interface ProjectProp {
  index?: number;
  project?: Project;
  userId?: string;
}

interface ProjectPropValid {
  index: number;
  project: Project;
  userId: string;
}

export function ProjectModule({ index, project, userId }: ProjectPropValid) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(`/projects/${userId}/${project.projectId}`);
  };
  return (
    <div key={index} className={styles.projectItem} onClick={handleClick}>
      <div className={styles.projectData}>
        {project.title}
        <div className={styles.projectDataSubtitle}>{project.subtitle}</div>
        <div className={styles.projectDataSubtitle}>
          created by: {project.createdBy}
        </div>
      </div>
    </div>
  );
}

export function NewProjectModule({
  dispatcher,
}: {
  dispatcher: Dispatch<SetStateAction<UserInfo | undefined>>;
}) {
  const [isOpened, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [error, setError] = useState("");

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    console.log("handle click");
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
    ],
    error: error,
    buttonMessage: "create new project",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getCookie();
      const loginData = { title: title, subtitle: subtitle };
      const response = await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        // ERROR : client - client server
        throw new Error(`client - client server status : ${response.status}`);
      }

      const data = await response.json();
      if (data.hasOwnProperty("error")) {
        // ERROR : handle error - alert
        // alert(data["error"]);
        setError("Error: ".concat(data["error"]));
      } else {
        console.log("submission complete");
        const userInfo = await updateUserInfo();
        if (!userInfo) {
          throw new Error("get user info failed");
        }
        dispatcher(userInfo);
        setOpen(false);

        setTitle("");
        setSubtitle("");
      }
    } catch (err) {
      console.log(err);
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
      </Modal>
    </>
  );
}
