import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Returns Calculator</h1>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <p>Home</p>
      </Link>
    </header>
  );
};

export default Header;
