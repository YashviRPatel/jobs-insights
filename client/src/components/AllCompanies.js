import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/AllCompanies.css";
import axios from "axios";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function AllCompanies() {
  const [listofCompanies, setListOfCompanies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  let inputEl = document.querySelector("#AllCompanies_search_input");

  if (inputEl) {
    inputEl.addEventListener("keyup", function (event) {
      if (searchValue) {
        if (event.key === "Enter") {
          event.preventDefault();

          setListOfCompanies([]);
          axios
            .get(`http://localhost:3001/company/search?param1=${searchValue}`)
            .then((response) => {
              setListOfCompanies(response.data);
            });
        }
      } else if (listofCompanies.length == 0) {
        axios.get("http://localhost:3001/company").then((response) => {
          setListOfCompanies(response.data);
        });
      }
    });
  }

  useEffect(() => {
    axios.get("http://localhost:3001/company").then((response) => {
      setListOfCompanies(response.data);
    });
  }, []);
  return (
    <div className="AllCompanies">
      <div className="Navbar_container">
        <Navbar />
      </div>
      <div className="AllCompanies_main">
        <div className="AllCompanies_search">
          <span className="AllCompanies_search_heading">
            Search for companies
          </span>
          <span className="AllCompanies_search_subheading">
            Search companies to explore salaries, benefits, and more.
          </span>
          <input
            placeholder="Company Name"
            id="AllCompanies_search_input"
            type="text"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="AllCompanies_listed">
          <span className="AllCompanies_listed_heading">Listed Companies</span>
          <div className="AllCompanies_listed_cards">
            {listofCompanies &&
              listofCompanies.map((value, key) => {
                return (
                  <NavLink
                    target="_blank"
                    className="AllCompanies_link"
                    exact
                    to={`/company/${value.header_employer_id}`}
                  >
                    <div
                      key={value.header_employer_id}
                      className="AllCompanies_listed_each_card"
                    >
                      {value.header_employer_name}
                    </div>
                  </NavLink>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCompanies;
