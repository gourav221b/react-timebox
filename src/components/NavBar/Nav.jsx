import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom/dist";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import { FaBell, FaBellSlash } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbHourglassEmpty } from "react-icons/tb";

import TaskContext from "../../context/TaskProvider";
import "./Nav.css";
import { toastConstants } from "../../constants/toastConstant";
const Nav = ({ role }) => {
  const {
    task,
    modalOpen,
    toggleModal,
    toastMessage,
    notification,
    toggleNotifications,
  } = useContext(TaskContext);

  const [navOpen, setnavOpen] = useState(false);
  const sideNavRef = useRef();

  const toggleSideNav = () => {
    setnavOpen(!navOpen);
  };
  useEffect(() => {
    if (navOpen) sideNavRef.current.classList.add("sideNavWrapperOpen");
    else sideNavRef.current.classList.remove("sideNavWrapperOpen");
  }, [navOpen]);

  return (
    <section className="navWrapper">
      <div className="sideNavWrapper" ref={sideNavRef}>
        <div className="sideNavClose" onClick={toggleSideNav}>
          &times;
        </div>
        <div className="navItems">
          <NavLink to="/todo" className="navItemGroup">
            <BsListCheck /> &nbsp; TodoList
          </NavLink>

          <NavLink to="/timeboxing" className="navItemGroup">
            <AiOutlineFieldTime /> &nbsp; TimeBoxing
          </NavLink>

          <NavLink to="/pomodoro" className="navItemGroup">
            <TbHourglassEmpty /> &nbsp; Pomodoro Effect
          </NavLink>
        </div>
      </div>

      <div className="navTop">
        <button class="hamburgerMenuBtn" onClick={toggleSideNav}>
          <RxHamburgerMenu />
        </button>
      </div>
    </section>
  );
};

export default Nav;
