import React from "react";
import Image from "next/image";

function Icon({ icon, height, width }) {
  return <Image src={icon} width={width} height={height} />;
}

export default Icon;
