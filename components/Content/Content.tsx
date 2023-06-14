import { Outlet } from "react-router-dom";
import contentStyles from "./Content.module.css";

function Detail() {
  return (
    <div id="detail" className={contentStyles.content}>
      <Outlet />
    </div>
  );
}

export default Detail;
