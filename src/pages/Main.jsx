import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Nav from "../components/NavBar/Nav";
// import Nav from "../components/Nav/Nav";
// import { ROLES } from "../constants/RoleConstants";
const Main = ({ role }) => {
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (
  //       localStorage.getItem("first_name") == "" ||
  //       localStorage.getItem("last_name") == ""
  //     )
  //       navigate("/dashboard/profile", { replace: true });
  //     else if (
  //       (localStorage.getItem("roles") === ROLES.writer ||
  //         localStorage.getItem("roles") === ROLES.reviewer) &&
  //       localStorage.getItem("first_name") !== "" &&
  //       localStorage.getItem("last_name") !== ""
  //     )
  //       navigate("/dashboard/stories", { replace: true });
  //     else navigate("/dashboard/upload", { replace: true });
  //   }, []);
  return (
    <>
      {/* <Nav role={role} /> */}
      <Modal />
      <Nav role={role}></Nav>
      <section className="mainWrapper">
        {<Outlet /> || (
          <div>
            {" "}
            <center>Welcome to timeboxing</center>
            <div>
              <Link to="/calender">Visit Calender here</Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Main;
