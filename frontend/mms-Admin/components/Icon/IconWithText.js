import React from "react";

function IconWithText({ styles, container, text, color, children }) {
  return (
    <div className={container}>
      <div className={color}>{children}</div>
      <div className={styles}>{text} </div>
    </div>
  );
}

export default IconWithText;
