import React from "react";

export const FlexContainer = ({ className, children }) => {
  return (
    <div className={`flex flex-wrap sm:flex-nowrap ${className}`}>
      {children}
    </div>
  );
};

export const Section = ({ className, children }) => {
  return <section className={className}>{children}</section>;
};
