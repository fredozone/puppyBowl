import { Link } from "react-router-dom";
function navbar() {
  return (
    <>
      <div className="Container">
        <div className="styleLink">
          <Link to="/" className="navbar-link">
            All Players
          </Link>
        </div>
      </div>
    </>
  );
}
export default navbar;
