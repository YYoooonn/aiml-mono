import * as styles from "./login.css";
import LoginForm from "@/components/form/LoginForm";

export default function Login() {
  return (
    <div className={styles.loginPageContainer}>
      <LoginForm />
    </div>
  );
}
