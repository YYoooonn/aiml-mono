import { NextResponse } from "next/server";

interface RegisterResponse extends NextResponse {
  // encoded password response
  body: { password: string };
}

interface LoginResponse {
  // jwt token
  body: { token: string };
}

interface Object {
  objectId: string;
  data: {
    geometry: string;
    material: string;
  };
}

interface Project {
  projectId: string;
  title: string;
  subtitle: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  objects: Object[];
}

// GET user/profile
interface UserInfo {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  projects: Project[];
}
