import { ObjectInfo, Project } from "@/@types/api";

export async function createObject(
  projectId: string,
  model: Omit<ObjectInfo, "objectId">,
) {
  try {
    const res = await fetch("/api/objects", {
      method: "POST",
      body: JSON.stringify({
        projectId: projectId,
        objectInfo: model,
      }),
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    //console.debug("Error from fetching project :");
    //console.debug(e);
    return { error: "error from fetching project process" };
  }
}

// GET project
export async function fetchProject(username: string, projectId: string) {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "GET",
    });
    const data = await res.json();
    console.debug(data);
    return data;
  } catch (e) {
    //console.debug("Error from fetching project :");
    //console.debug(e);
    return { error: "error from fetching project process" };
  }
}

// GET projects : not used
export async function fetchProjects(username: string) {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ username: username }),
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    //console.debug("Error from fetching projects :");
    //console.debug(e);
    return { error: "error from fetching projects process" };
  }
}

interface BaseProjectProp {
  title: string;
  subtitle: string;
  isPublic: boolean;
}

export async function createProject(username: string, props: BaseProjectProp) {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        projectInfo: props,
      }),
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    //console.debug("Error from creating project :");
    //console.debug(e);
    return { error: "error from creating project process" };
  }
}
