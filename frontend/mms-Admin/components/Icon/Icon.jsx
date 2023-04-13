import { iconPaths } from "./iconPaths";

export const Icon = ({ name }) => {
  const IconName = iconPaths[name];
  return IconName ? <IconName /> : null;
};
