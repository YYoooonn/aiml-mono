import * as styles from "./workspace.css";

// XXX WORKSPACE PROPS
const DEFAULT = {
  ambientLight: {
    intensity: 1,
  },
  directionalLight: {
    intensity: 5,
    position: [5, 10, 10],
  },
  background: {
    color: "#000000",
  },
  orbit: {
    enableZoom: true,
  },
};

export default function Workspace({ id }: { id: string }) {
  return <div className={styles.WorkspaceContainer}></div>;
}
