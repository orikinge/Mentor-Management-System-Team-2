import Link from "next/link";
import PropTypes from "prop-types";

const generateButtonStyle = (variant, size, bordered) => ({
  ...pickBtnTheme(variant),
  ...generateBtnPadding(size),
  border: bordered ? "1px solid #058B94" : "none",
  cursor: "pointer",
});

const pickBtnTheme = (variant) => {
  switch (variant) {
    case "light":
      return { backgroundColor: "#E6FDFE" };
    case "dark":
      return { backgroundColor: "#035D63", color: "#ffffff" };
    case "normal":
      return { backgroundColor: "#058B94", color: "#ffffff" };
    case "white":
      return { backgroundColor: "#ffffff" };
    default:
      return { backgroundColor: "transparent" };
  }
};

const generateBtnPadding = (size) => {
  switch (size) {
    case "small":
      return { padding: "8px 18px", borderRadius: "5px", fontSize: "11px" };
    case "large":
      return { padding: "14px 28px", borderRadius: "10px" };
    default:
      return { padding: "1rem", borderRadius: "10px" };
  }
};

export const Button = (props) => {
  const otherProps = { ...props };
  delete otherProps.bordered;

  if (props.type === "link")
    return (
      <Link href={props.url}>
        <button
          {...otherProps}
          style={generateButtonStyle(
            props.variant,
            props.size,
            props.bordered,
          )}>
          {props.children}
        </button>
      </Link>
    );

  return (
    <button
      {...otherProps}
      style={generateButtonStyle(props.variant, props.size, props.bordered)}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  bordered: PropTypes.bool,
};
