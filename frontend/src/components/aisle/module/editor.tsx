"use client";

import { useEditor } from "@/hook/useEditor";
import * as styles from "./editor.css";
import { useState } from "react";

export default function Editor() {
  return (
    <div className={styles.editorInnerWrapper}>
      <div className={styles.aisleHeader}>
        <div className={styles.aisleTitle}>Project Setting</div>
      </div>
      <p style={{ marginBottom: "8px" }} />
      <BackgroundEditor />
      <CameraEditor />
      <LightEditor />
    </div>
  );
}

function BackgroundEditor() {
  const { background, setBackground } = useEditor();
  const [color, setColor] = useState(background.color);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setBackground({ color: color });
  };

  return (
    <EditorBlock text={"Background"}>
      <TextSelector
        text="color"
        val={color}
        setVal={setColor}
        preset={background.color}
      />
      <SubmitButton handler={handleSubmit} />
    </EditorBlock>
  );
}

function CameraEditor() {
  const { cam, setCamera } = useEditor();
  const [pos, setPosition] = useState(cam.position.map((p) => p.toString()));
  const [zoom, setZoom] = useState(cam.zoom.toString());
  const [fov, setFov] = useState(cam.fov.toString());

  const position = pos.map((p) => p.toString());
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setCamera({
      position: pos.map((p) => Number(p)) as any,
      zoom: Number(zoom),
      fov: Number(fov),
    });
  };

  return (
    <EditorBlock text={"Camera"}>
      <TextSelector text="zoom" val={zoom} setVal={setZoom} />
      {/* <TextSelector text="fov" val={fov} setVal={setFov}/> */}
      <MultiSelector
        text="position"
        vals={position}
        setVal={setPosition}
        presets={position}
      />
      <SubmitButton handler={handleSubmit} />
    </EditorBlock>
  );
}

function LightEditor() {
  return (
    <EditorBlock text={"Light"}>
      <div className={styles.editorProp}>NOT IMPLEMENTED YET</div>
    </EditorBlock>
  );
}

function EditorBlock({
  text,
  children,
}: { text: string } & React.PropsWithChildren) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={
        clicked
          ? styles.editorButtonContainerSelected
          : styles.editorButtonContainer
      }
    >
      <div onClick={() => setClicked(!clicked)}>
        <div className={styles.editorBlockTitle}>{text}</div>
      </div>
      {clicked ? (
        <>
          <p style={{ marginTop: "4px" }} />
          {children}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

interface SelectorProps {
  text: string;
  val: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  preset?: string;
}

function TextSelector({ text, val, setVal, preset }: SelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <input
        className={styles.selectorTextInput}
        onChange={(e) => setVal(e.target.value)}
        type="text"
        value={val}
        placeholder={preset ? preset : ""}
      />
    </div>
  );
}

interface MultiSelectorProps {
  text: string;
  vals: string[];
  setVal: React.Dispatch<React.SetStateAction<string[]>>;
  presets?: string[];
}

function MultiSelector({ text, vals, setVal, presets }: MultiSelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <div className={styles.multiSelectorBlock}>
        {vals.map((v, i) => (
          <input
            key={i}
            className={styles.multiSelectorTextInput}
            onChange={(e) => {
              vals[i] = e.target.value;
              setVal([...vals]);
            }}
            type="text"
            value={v}
            placeholder={presets ? presets[i] : ""}
          />
        ))}
      </div>
    </div>
  );
}

function SubmitButton({ handler }: { handler: (e: React.MouseEvent) => void }) {
  return (
    <div className={styles.buttonSubmit} onClick={handler}>
      Submit
    </div>
  );
}
