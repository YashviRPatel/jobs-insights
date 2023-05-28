import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar_child">
        <div className="Navbar_child_row_one">
          <div className="Navbar_left">
            <NavLink target={"_top"} to="/" className={"Navbar_link"}>
              <span>Jobs Insights</span>
            </NavLink>
            <div className="Searchbar">
              <input
                placeholder="Search by Company, Title or City"
                className="Searchbar_input"
              ></input>
            </div>
          </div>
          {/* <div className='Navbar_right'>
                    <NavLink target={"_top"} to='/employers' className={"Navbar_link"}>
                        <div className='Navbar_forEmployers'>
                            For Employers
                        </div>
                    </NavLink>
                </div> */}
        </div>
        <div className="Navbar_child_row_two">
          <div className="Navbar_child_row_two_left">
            <NavLink target={"_top"} to="/salaries" className={"Navbar_link"}>
              <div className="Navbar_salaries">Salaries</div>
            </NavLink>
            <NavLink target={"_top"} to="/jobs" className={"Navbar_link"}>
              <div className="Navbar_jobs">Jobs</div>
            </NavLink>
            <NavLink target={"_top"} to="/companies" className={"Navbar_link"}>
              <div className="Navbar_companies">Companies</div>
            </NavLink>
            <NavLink target={"_top"} to="/prediction" className={"Navbar_link"}>
              <div className="Navbar_prediction">Prediction</div>
            </NavLink>
          </div>
          <div className="Navbar_child_row_two_right">
            <NavLink target={"_top"} to="/about" className={"Navbar_link"}>
              <div className="Navbar_about_us">About us</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
