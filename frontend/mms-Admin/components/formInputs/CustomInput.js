import { Button, Input } from "antd";
import styles from "./form.module.css";
import clsx from "clsx";

export function CustomTextArea({ ...inputConfig }) {
  return <Input.TextArea className={styles.textarea} {...inputConfig} />;
}

export function CustomInput({ size, direction, label, ...inputConfig }) {
  const classN = clsx(styles.input, { [styles.small]: size == "small" });
  const layout = clsx(styles.layout, {
    [styles.horizontal]: direction == "horizontal",
  });

  if (label) {
    return inputConfig.eyeIcon ? (
      <div className={layout}>
        <div className={styles.label}>
          <label>{label}</label>
        </div>
        <Input.Password className={classN} {...inputConfig} />
      </div>
    ) : (
      <div className={layout}>
        <div className={styles.label}>
          <label>{label}</label>
        </div>
        <Input className={classN} {...inputConfig} />
      </div>
    );
  }
  return inputConfig.eyeIcon ? (
    <Input.Password className={classN} {...inputConfig} />
  ) : (
    <Input className={classN} {...inputConfig} />
  );
}

export function CustomButton({ children, ...props }) {
  return (
    <Button className={styles.button} {...props}>
      <span className={styles.btn_text}>{children}</span>
    </Button>
  ); 
}

export function Label({ title, weight }) {
  const classN = clsx(styles.label, { [styles.label_bold]: weight == "bold" });

  return (
    <div className={classN}>
      <label>{title}</label>
    </div>
  );
}
