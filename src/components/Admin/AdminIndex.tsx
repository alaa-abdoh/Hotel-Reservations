import Introduction from "./Introduction";
import SideBar from "./SideBar";
import { Outlet, useOutlet } from 'react-router-dom';

function AdminIndex() {
    const outlet = useOutlet();
    const isOutletEmpty = outlet === null;

  return (
    <div className="adminPage">
      <SideBar />
      <div className="mainContent">
        {isOutletEmpty && <Introduction />}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminIndex;
