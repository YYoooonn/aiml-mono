import { LeftAisleLayout } from "./layout";
import { User, Archive, Editor, Workspace } from "./module/exports";
import LeftAisle from "./LeftAisle";
import RightAisle from "./RightAisle";

export { LeftAisle, RightAisle };

export function LeftUserAisle() {
  return (
    <LeftAisleLayout>
      <User />
    </LeftAisleLayout>
  );
}

export function LeftArchiveAisle() {
  return (
    <LeftAisleLayout>
      <Archive />
    </LeftAisleLayout>
  );
}

export function LeftWorkspaceAisle() {
  return (
    <LeftAisleLayout>
      <Workspace />
    </LeftAisleLayout>
  );
}

export function RightEditorAisle() {
  return (
    <LeftAisleLayout>
      <Editor />
    </LeftAisleLayout>
  );
}
