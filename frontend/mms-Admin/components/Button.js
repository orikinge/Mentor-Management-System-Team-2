import clsx from "clsx";
import styles from "styles/button.module.scss";

export const Button = ({ type="default", htmlType="button", children }) => {
  const classNames = clsx([styles.button, type === "primary" ? styles.primary : styles.default])
  return (
    <button
      type={htmlType}
      className={classNames}>
      {children}
    </button>
  );
};
