// DEPRECIATED

import * as styles from "./editor.css";
import {
  ChangeEvent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { DEFAULT_MATRIX } from "@/utils/constants";
import { useSelected } from "@/hook/useSelected";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { socket } from "@/sockets/project";

const GEOCONSTRUCTOR = [
  { id: "BoxGeometry", label: "BOX" },
  { id: "SphereGeometry", label: "SPHERE" },
  { id: "ConeGeometry", label: "CONE" },
];

const EDITVALUES = [
  { id: "ROTATION", detail: ["x", "y", "z"] },
  { id: "SCALE", detail: ["x", "y", "z"] },
  { id: "POSITION", detail: ["x", "y", "z"] },
];

const MAPDETAIL: Record<string, number> = {
  x: 0,
  y: 1,
  z: 2,
};

export function EditorModal() {
  const selected = useSelected((state) => state.selected);
  const prjId = useProjectInfo((state) => state.projectId);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected ? true : false);
  }, [selected]);

  return (
    <div className={styles.editorContainer}>
      {isSelected ? (
        <ObjectEditor prjId={prjId} />
      ) : (
        <ObjectCreator prjId={prjId} />
      )}
    </div>
  );
}

function ObjectCreator({ prjId }: { prjId: string }) {
  const addObject = useProjectInfo((state) => state.createObject);
  const setSelected = useSelected((state) => state.setSelected);
  const getObjects = useProjectInfo((state) => state.getObjects);
  const handleClick = (id: string) => {
    addObject({
      geometry: id,
      material: "#575757",
      matrix: DEFAULT_MATRIX,
    }).then(() => getObjects());
    socket.emit("updatePRJT");
  };
  return (
    <div className={styles.editorContents}>
      {GEOCONSTRUCTOR.map((key) => (
        <div key={key.id} className={styles.editorItemContainer}>
          <div
            className={styles.editorSelector}
            onClick={() => handleClick(key.id)}
          >
            {key.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ObjectEditor({ prjId }: { prjId: string }) {
  const [value, setValue] = useState("");
  const [detail, setDetail] = useState("");

  return value && detail ? (
    <SliderEditor
      value={value}
      detail={detail}
      setValue={setValue}
      setDetail={setDetail}
    />
  ) : (
    <ButtonEditor prjId={prjId} setValue={setValue} setDetail={setDetail} />
  );
}

function ButtonEditor({
  prjId,
  setValue,
  setDetail,
}: {
  prjId: string;
  setValue: Dispatch<SetStateAction<string>>;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const getObjects = useProjectInfo((state) => state.getObjects);
  const removeSelected = useSelected((state) => state.removeSelected);
  const updateMatrix = useSelected((state) => state.updateMatrix);
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    removeSelected(prjId).then(() => getObjects());
    socket.emit("updatePRJT");
  };

  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    updateMatrix(prjId).then(() => getObjects());
    socket.emit("updatePRJT");
  };

  return (
    <div className={styles.editorContents5}>
      {<ValueEditors setValue={setValue} setDetail={setDetail} />}
      <div className={styles.editorItemContainer}>
        <div className={styles.editorSelector} onClick={handleRemove}>
          REMOVE
        </div>
      </div>
      <div className={styles.editorItemContainer}>
        <div className={styles.editorSelector} onClick={handleUpdate}>
          UPDATE
        </div>
      </div>
    </div>
  );
}

function SliderEditor({
  value,
  detail,
  setValue,
  setDetail,
}: {
  value: string;
  detail: string;
  setValue: Dispatch<SetStateAction<string>>;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const [start, setStart] = useState(0);
  const position = useSelected((state) => state.position);
  const setPosition = useSelected((state) => state.setPosition);
  const rotation = useSelected((state) => state.rotation);
  const setRotation = useSelected((state) => state.setRotation);
  const scale = useSelected((state) => state.scale);
  const setScale = useSelected((state) => state.setScale);

  useEffect(() => {
    const valStart =
      value === "POSITION"
        ? position[MAPDETAIL[detail]]
        : value === "ROTATION"
          ? 0
          : scale[MAPDETAIL[detail]];
    setStart(valStart);
  }, [detail]);
  const [slide, setSlide] = useState(start); // Default value is 50

  const setter =
    value === "SCALE"
      ? setScale
      : value === "ROTATION"
        ? setRotation
        : setPosition;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlide(Number(e.target.value));
    setter({ detail: detail, value: slide / 10 - start });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue("");
    setDetail("");
  };

  return (
    <div className={styles.editorContentSlider}>
      <div className={styles.editorLabel}>
        {value} : {detail}
      </div>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={start - 50}
          max={start + 50}
          value={slide}
          onChange={handleChange}
          className={styles.sliderInput}
        />
      </div>
      <div className={styles.editorItemContainer}>
        <div className={styles.editorSelector} onClick={handleClick}>
          DONE
        </div>
      </div>
    </div>
  );
}

function ValueEditors({
  setValue,
  setDetail,
}: {
  setValue: Dispatch<SetStateAction<string>>;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const [editVal, setEditVal] = useState("");
  const handleSelector = (id: string) => {
    setEditVal(id);
    setValue(id);
  };
  return (
    <>
      {EDITVALUES.map((key, i) => {
        if (editVal === key.id) {
          return (
            <DetailValueEditor
              key={i}
              details={key.detail}
              setDetail={setDetail}
            />
          );
        }
        return (
          <div
            className={styles.editorItemContainer}
            key={i}
            onClick={() => handleSelector(key.id)}
          >
            <div className={styles.editorSelector}> {key.id} </div>
          </div>
        );
      })}
    </>
  );
}

function DetailValueEditor({
  details,
  setDetail,
}: {
  details: string[];
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const handleClick = (d: string) => {
    setDetail(d);
  };
  return (
    <div className={styles.editorContents}>
      {details.map((d, i) => {
        return (
          <div
            key={i}
            className={styles.editorSelector}
            onClick={() => handleClick(d)}
          >
            {d}
          </div>
        );
      })}
    </div>
  );
}
