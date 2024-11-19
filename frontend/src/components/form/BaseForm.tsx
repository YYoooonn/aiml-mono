import { Dispatch, SetStateAction, useState } from "react";
import * as styles from "./form.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface FormProp {
  label: string;
  type: string;
  visible?: boolean;
}

interface PropwithDispatch {
  form: FormProp;
  dispatcher: Dispatch<SetStateAction<any>>; // FIXME
}

interface PropswithDispatch {
  props: PropwithDispatch[];
  error: string;
  buttonMessage?: string;
}

export default function Form({
  propsWithDispatch,
  handleSubmit,
}: {
  propsWithDispatch: PropswithDispatch;
  handleSubmit: (e: React.MouseEvent) => Promise<void>;
}) {
  const error = propsWithDispatch.error;
  const onKeydownSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // FIXME
      handleSubmit(e as any);
    }
  };
  return (
    <div className={styles.formContainer}>
      {propsWithDispatch.props.map((prop, i) => {
        if (prop.form.type === "text" || "password") {
          return (
            <TextInput
              key={i}
              prop={prop}
              error={error}
              onSubmit={onKeydownSubmit}
            />
          );
        } else if (prop.form.type === "checkbox") {
          return (
            <CheckboxInput key={i + 100} prop={prop} i={i} error={error} />
          );
        }
      })}
      {propsWithDispatch.error ? (
        <div style={{ color: "red" }}>{propsWithDispatch.error}</div>
      ) : (
        <></>
      )}
      <div className={styles.buttonSubmit} onClick={handleSubmit}>
        {propsWithDispatch.buttonMessage
          ? propsWithDispatch.buttonMessage
          : "submit"}
      </div>
    </div>
  );
}

function TextInput(props: {
  prop: PropwithDispatch;
  error: string;
  onSubmit: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div className={styles.formLineContainer}>
      <div className={styles.formLabel}>{props.prop.form.label} :</div>
      <input
        className={styles.formInput}
        style={props.error ? { borderColor: "red", color: "red" } : {}}
        type={props.prop.form.type}
        onChange={(e) => props.prop.dispatcher(e.target.value)}
        onKeyDown={props.onSubmit}
      ></input>
    </div>
  );
}

function CheckboxInput(props: {
  prop: PropwithDispatch;
  i: number;
  error: string;
}) {
  const [check, setCheck] = useState(false);
  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.checkboxTitle}> {props.prop.form.label} </div>
      <div
        className={styles.checkbox}
        style={assignInlineVars({ [styles.isCheck]: check ? "1" : "0" })}
        onClick={(e) => {
          e.preventDefault();
          setCheck(!check);
          console.log(check, check ? "0" : "1");
          console.log("clicked");
          props.prop.dispatcher(check);
        }}
      />
    </div>
  );
}
