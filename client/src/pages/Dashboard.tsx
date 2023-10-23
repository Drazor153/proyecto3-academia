import { menuItems } from "../utils/pages";
import { privilegedItemsShortcuts } from "../utils/pages";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

function AdministrationShortcuts() {
  const role = useAppSelector((state) => state.userReducer.role);
  if (role !== "ADMIN") return null;
  return (
    <section>
      <h2 className="bg-blue">Administration Shortcuts</h2>
      <div className="grid">
        {privilegedItemsShortcuts.map((item, index) => (
          <NavLink className="shortcut privileged" to={item.path} key={index}>
            <div className="icon">{item.icon}</div>
            <div className="name">{item.name}</div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <main>
        <section className="shortcuts-container">
          <h2>Shortcuts</h2>
          <div className="grid">
            {menuItems.slice(1, -1).map((item, index) => (
              <NavLink className="shortcut" to={item.path} key={index}>
                <div className="icon">{item.icon}</div>
                <div className="name">{item.name}</div>
              </NavLink>
            ))}
          </div>
        </section>
        {AdministrationShortcuts()}
      </main>
    </>
  );
}

export default Dashboard;
