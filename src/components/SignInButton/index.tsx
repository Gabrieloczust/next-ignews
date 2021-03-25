import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isLogged = true;

  return isLogged ? (
    <button type="button" className={styles.button}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  ) : (
    <button type="button" className={styles.button}>
      <FaGithub color="#04d361" />
      Gabriel Oczust
      <FiX color="#737380" className={styles.close} />
    </button>
  );
}
