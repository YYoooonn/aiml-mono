export const Object1 = {
  objectId: "objectid1",
  data: {
    geometry: "anygeometry",
    material: "anymaterial",
  },
};

export const Object2 = {
  objectId: "objectid2",
  data: {
    geometry: "anygeometry",
    material: "anymaterial",
  },
};

export const Object3 = {
  objectId: "objectid3",
  data: {
    geometry: "anygeometry",
    material: "anymaterial",
  },
};

export const Object4 = {
  objectId: "objectid4",
  data: {
    geometry: "anygeometry",
    material: "anymaterial",
  },
};

export const Project1 = {
  projectId: "projectId1",
  title: "sample project title 1",
  subtitle: "sample project subtitle 1",
  createdAt: "20240827",
  createdBy: "username",
  lastModifiedAt: "20241027",
  objects: [Object1, Object2, Object3],
};

export const Project2 = {
  projectId: "projectId2",
  title: "sample project title 2",
  subtitle: "sample project subtitle 2",
  createdAt: "20240827",
  createdBy: "username",
  lastModifiedAt: "20241027",
  objects: [Object4],
};

export const Project3 = {
  projectId: "projectId3",
  title: "sample project title 3",
  subtitle: "sample project subtitle 3",
  createdAt: "20240827",
  createdBy: "username",
  lastModifiedAt: "20241027",
  objects: [],
};
export const Project4 = {
  projectId: "projectId3",
  title: "sample project title 4",
  subtitle: "sample project subtitle 4",
  createdAt: "20240827",
  createdBy: "username",
  lastModifiedAt: "20241027",
  objects: [],
};

export const User1 = {
  userId: "userID",
  username: "username1",
  firstName: "firstname",
  lastName: "lastname",
  projects: [Project1, Project2, Project3, Project4],
};
