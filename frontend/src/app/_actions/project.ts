import { ObjectConstructor, Project } from "@/@types/api";

// POST object
export async function createObject(
  input: ObjectConstructor,
  projectId: string,
) {
  try {
    const res = await fetch(`/api/projects/${projectId}/objects`, {
      method: "POST",
      body: JSON.stringify(input),
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

//PUT object
export async function updateObject(
  objectId: string,
  projectId: string,
  updateInfo: { matrix: ObjectConstructor["matrix"] },
) {
  try {
    const res = await fetch(`/api/projects/${projectId}/objects/${objectId}`, {
      method: "PUT",
      body: JSON.stringify(updateInfo),
    });
    const data = await res.json();
    console.debug("UPDATE OBJECT:", data);
    return data;
  } catch (e) {
    //console.debug("Error from fetching project :");
    //console.debug(e);
    return { error: "error from fetching project process" };
  }
}

//DELETE object
export async function deleteObject(objectId: string, projectId: string) {
  try {
    const res = await fetch(`/api/projects/${projectId}/objects/${objectId}`, {
      method: "DELETE",
    });
    console.log("deletion complete");
  } catch (e) {
    console.debug("Error from deletion :");
    console.debug(e);
  }
}

// GET project
export async function fetchProject(projectId: string) {
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
      method: "GET",
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
    console.debug(props);
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(props),
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    return { error: "error from creating project process" };
  }
}
