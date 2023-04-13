import { capitalize } from "utils/capitalize";

const NavHeader = ({ title }) => {
  return (
    <header className="module-header">
      <h2 className="title text-dark">{capitalize(title)}</h2>
    </header>
  );
};

export default NavHeader;
