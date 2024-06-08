import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <div className="flex">
        <Link to={"/about"}>About</Link>
      </div>
      <div className="text-3xl">Main Page</div>
    </div>
  );
};

export default MainPage;
