import * as styles from "./form.css";

interface FormProp {
  label: string;
  input: string;
  visible?: boolean;
}

export default function Form({ props }: { props: FormProp[] }) {
  return (
    <>
      {props.map((prop, i) => {
        return (
          <div key={i} className={styles.formContainer}>
            <div className={styles.formLabel}>{prop.label} :</div>
            <input className={styles.formInput} type={prop.label}></input>
          </div>
        );
      })}
    </>
  );
}
