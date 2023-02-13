import "./Home.css";
import Category from "./Category";
import Post from "./Post";
import Categorycontext from "./context/categoryContext";

export default function Home() {
  return (
    <Categorycontext>
      <div className="homemain">
        <Category />
        <Post />
      </div>
    </Categorycontext>
  );
}
