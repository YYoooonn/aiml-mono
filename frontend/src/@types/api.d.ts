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

interface ObjectConstructor {
  geometry: string;
  material: string;
  matrix: number[];
}

interface ObjectInfo extends ObjectConstructor {
  objectId: string;
  // to be fixed
  createdAt?: string;
  lastModifiedAt?: string;
}

interface Project {
  projectId: string;
  title: string;
  subtitle: string?;
  objects: ObjectInfo[];
  isPublic: boolean;

  // TODO: not implemented yet
  participants: []; // FIXME
  lastModifiedAt: string;
  createdAt: string;
  createdBy: string;
  objects: ObjectInfo[];
}

// GET user/profile
interface UserInfo {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastModifiedAt: string; // 안보내도 됨
  email?: string | undefined; // <==== 없어도 되지 않나?
  projects: Project[];
}
