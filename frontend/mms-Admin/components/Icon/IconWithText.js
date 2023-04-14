import React from "react";

function IconWithText({ styles, container, text, color, children }) {
  return (
    <div className={container}>
      <div className={color}>{children}</div>
      <div>
        <p className={styles}>{text} </p>
      </div>
    </div>
  );
}

export default IconWithText;
