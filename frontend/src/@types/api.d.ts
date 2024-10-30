import { NextResponse } from "next/server";
import { BoxGeometry, BufferGeometry, Material } from "three";

interface RegisterResponse extends NextResponse {
  // encoded password response
  body: { password: string };
}

interface LoginResponse {
  // jwt token
  body: { token: string };
}

interface ObjectInfo {
  objectId: string;
  // to be fixed
  geometry: BufferGeometry;
  material: Material;
  others: any;
}

interface Project {
  projectId: string;
  title: string;
  subtitle: string;
  objects: ObjectInfo[];
  // TODO: not implemented yet
  // lastModifiedAt: string;
  // createdAt: string;
  // createdBy: string;
}

// GET user/profile
interface UserInfo {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  projects: Project[];
}
