import { iconPaths } from "./iconPaths";

export const Icon = ({ name, color, width, height }) => {
  const IconName = iconPaths[name];

  return IconName ? (
    <IconName color={color} width={width} height={height} />
  ) : null;
};
