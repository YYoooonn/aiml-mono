import { Dispatch, SetStateAction } from "react";
import * as styles from "./form.css";

interface FormProp {
  label: string;
  type: string;
  visible?: boolean;
}

interface PropwithDispatch {
  form: FormProp;
  dispatcher: Dispatch<SetStateAction<string>>;
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
        return (
          <div key={i} className={styles.formLineContainer}>
            <div key={i} className={styles.formLabel}>
              {prop.form.label} :
            </div>
            <input
              key={i + 100}
              className={styles.formInput}
              style={error ? { borderColor: "red", color: "red" } : {}}
              type={prop.form.type}
              onChange={(e) => prop.dispatcher(e.target.value)}
              onKeyDown={onKeydownSubmit}
            ></input>
          </div>
        );
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
