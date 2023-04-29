import clsx from "clsx";
import styles from "styles/button.module.scss";

export const Button = ({
  type="default",
  size="small",
  htmlType="button",
  className,
  onClick,
  attribute,
  children
}) => {
  const classNames = clsx([className ? className : styles.button,
    type === "primary" ? styles.primary : styles.default,
    size === "medium" ? styles.medium : (size === "large" ? styles.large : ""),
    styles.pseudo,
  ])
  return (
    <button
      type={htmlType}
      onClick={onClick}
      {...attribute}
      className={classNames}>
      {children}
    </button>
  );
};
