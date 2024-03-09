import styles from "./NotFound.module.scss";
export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>
        <span className={styles.span}>🙃</span>
        <br />
        Nothing found
      </h1>
      <p className={styles.description}>
        Unfortunately, this page is not available in our online store.
      </p>
    </div>
  );
};
