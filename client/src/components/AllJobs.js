import React, { useEffect, useState } from "react";
import "../styles/AllJobs.css";
import Navbar from "./Navbar";
import axios from "axios";

function AllJobs() {
  let locationArr = [];
  let titleArr = [];
  let salaryArr = [];
  let datePostedArr = [];

  const [searchValue, setSearchValue] = useState("");
  const [totalJobs, setTotalJobs] = useState("");
  const [listofJobs, setListOfJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/job/totaljobs").then((response) => {
      setTotalJobs(response.data[0]);
      console.log(totalJobs);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/job").then((response) => {
      setListOfJobs(response.data);
      console.log(listofJobs);
    });
  }, []);

  // document.addEventListener("mouseup", function (e) {
  //   let locationContainer = document.querySelector(
  //     ".AllJobs_upper_filter_location_menu"
  //   );
  //   if (!locationContainer.contains(e.target)) {
  //     locationContainer.style.display = "none";
  //   }
  //   let titleContainer = document.querySelector(
  //     ".AllJobs_upper_filter_title_menu"
  //   );
  //   if (!titleContainer.contains(e.target)) {
  //     titleContainer.style.display = "none";
  //   }
  //   let salaryContainer = document.querySelector(
  //     ".AllJobs_upper_filter_salary_menu"
  //   );
  //   if (!salaryContainer.contains(e.target)) {
  //     salaryContainer.style.display = "none";
  //   }
  //   let date_postedContainer = document.querySelector(
  //     ".AllJobs_upper_filter_date_posted_menu"
  //   );
  //   if (!date_postedContainer.contains(e.target)) {
  //     date_postedContainer.style.display = "none";
  //   }
  // });

  let showLocationMenu = () => {
    let ele = document.querySelector(".AllJobs_upper_filter_location_menu");

    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
    }
  };
  let showTitleMenu = () => {
    let ele = document.querySelector(".AllJobs_upper_filter_title_menu");
    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
    }
  };
  let showSalaryMenu = () => {
    let ele = document.querySelector(".AllJobs_upper_filter_salary_menu");
    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
    }
  };

  let showDatePostedMenu = () => {
    let ele = document.querySelector(".AllJobs_upper_filter_date_posted_menu");
    if (ele.style.display === "block") {
      ele.style.display = "none";
    } else {
      ele.style.display = "block";
    }
  };

  function removeLocation(element) {
    // Get the selected items container
    const selectedEle = document.querySelector(
      ".AllJobs_upper_filter_location_selected"
    );

    // Get the parent div to remove
    const divToRemove = element.parentNode;

    // Remove the div from the container
    selectedEle.removeChild(divToRemove);

    // Get the index of the location in the array
    const index = locationArr.indexOf(
      divToRemove.firstChild.textContent.trim()
    );

    // Remove the location from the array
    if (index !== -1) {
      locationArr.splice(index, 1);
    }
  }

  let addLocation = (e) => {
    let ele = document.querySelector("#AllJobs_upper_filter_location_input");
    let locationStr = ele.value.trim();
    if (locationStr != "" && locationArr.includes(locationStr) === false) {
      locationArr.push(locationStr);
      let selectedEle = document.querySelector(
        ".AllJobs_upper_filter_location_selected"
      );
      selectedEle.innerHTML = "";

      for (let i = 0; i < locationArr.length; i++) {
        selectedEle.innerHTML += `
          <div class='AllJobs_upper_filter_location_selected_item'>
            <div class='AllJobs_upper_filter_location_selected_item_name'>
                ${locationArr[i]}
            </div>
            <div class='AllJobs_upper_filter_location_selected_item_btn'>
                X
            </div>
          </div>
        `;
      }

      selectedEle.addEventListener("click", function (event) {
        // Check if the clicked element is the "X" button
        if (
          event.target.classList.contains(
            "AllJobs_upper_filter_location_selected_item_btn"
          )
        ) {
          // Call the removeLocation function with the clicked element as the argument
          removeLocation(event.target);
        }
      });
    }
  };

  function searchJobByKeyword() {
    if (listofJobs.length == 0) {
      axios.get("http://localhost:3001/job").then((response) => {
        setListOfJobs(response.data);
      });
    } else {
      setListOfJobs([]);
      axios
        .get(`http://localhost:3001/job/search?param1=${searchValue}`)
        .then((response) => {
          setListOfJobs(response.data);
        });
    }
  }

  function searchJobByTitle() {
    if (listofJobs.length == 0) {
      axios.get("http://localhost:3001/job").then((response) => {
        setListOfJobs(response.data);
      });
    } else {
      setListOfJobs([]);
      axios
        .get(`http://localhost:3001/job/searchbytitle?param1=${searchValue}`)
        .then((response) => {
          setListOfJobs(response.data);
        });
    }
  }

  function searchJobByCompany() {
    if (listofJobs.length == 0) {
      axios.get("http://localhost:3001/job").then((response) => {
        setListOfJobs(response.data);
      });
    } else {
      setListOfJobs([]);
      axios
        .get(`http://localhost:3001/job/searchbycompany?param1=${searchValue}`)
        .then((response) => {
          setListOfJobs(response.data);
        });
    }
  }

  return (
    <div className="AllJobs">
      <div className="Navbar_container">
        <Navbar />
      </div>
      <div className="AllJobs_main">
        <div className="AllJobs_upper">
          {/* <div className='AllJobs_heading'>All job listings</div> */}
          <div className="AllJobs_upper_search">
            <input
              id="AllJobs_upper_search_input"
              placeholder="Search all jobs by keyword"
              type="text"
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <div onClick={searchJobByKeyword} id="AllJobs_upper_search_btn">
              Keyword
            </div>
            <div onClick={searchJobByTitle} id="AllJobs_upper_job_search_btn">
              Job title
            </div>
            <div
              onClick={searchJobByCompany}
              id="AllJobs_upper_company_search_btn"
            >
              Company
            </div>
          </div>
          {/* <div className="AllJobs_upper_filters">
            <div
              onClick={showLocationMenu}
              className="AllJobs_upper_filter_location"
            >
              Location
            </div>
            <div className="AllJobs_upper_filter_location_menu">
              <span className="AllJobs_upper_filter_location_menu_heading">
                Filter by location of job listings
              </span>
              <div className="AllJobs_upper_filter_location_input_wrapper">
                <input id="AllJobs_upper_filter_location_input" type={"text"} />
                <div
                  onClick={addLocation}
                  id="AllJobs_upper_filter_location_input_btn"
                >
                  Add
                </div>
              </div>
              <div className="AllJobs_upper_filter_location_selected">
              </div>
            </div>
            <div onClick={showTitleMenu} className="AllJobs_upper_filter_title">
              Title
            </div>
            <div className="AllJobs_upper_filter_title_menu">
              <span className="AllJobs_upper_filter_title_menu_heading">
                Filter by title of job listings
              </span>
              <div className="AllJobs_upper_filter_title_input_wrapper">
                <input id="AllJobs_upper_filter_title_input" type={"text"} />
                <div id="AllJobs_upper_filter_title_input_btn">Add</div>
              </div>
              <div className="AllJobs_upper_filter_title_selected">
                <div className="AllJobs_upper_filter_title_selected_item">
                  <div className="AllJobs_upper_filter_title_selected_item_name">
                    Item 1
                  </div>
                  <div className="AllJobs_upper_filter_title_selected_item_btn">
                    X
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={showSalaryMenu}
              className="AllJobs_upper_filter_salary"
            >
              Salary
            </div>
            <div className="AllJobs_upper_filter_salary_menu">
              <span className="AllJobs_upper_filter_salary_menu_heading">
                Filter by minimum salary of job listings
              </span>
              <div className="AllJobs_upper_filter_salary_input_wrapper">
                <input id="AllJobs_upper_filter_salary_input" type={"text"} />
                <div id="AllJobs_upper_filter_salary_input_btn">Add</div>
              </div>
              <div className="AllJobs_upper_filter_salary_selected">
                <div className="AllJobs_upper_filter_salary_selected_item">
                  <div className="AllJobs_upper_filter_salary_selected_item_name">
                    Item 1
                  </div>
                  <div className="AllJobs_upper_filter_salary_selected_item_btn">
                    X
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={showDatePostedMenu}
              className="AllJobs_upper_filter_date_posted"
            >
              Date Posted
            </div>
            <div className="AllJobs_upper_filter_date_posted_menu">
              <span className="AllJobs_upper_filter_date_posted_menu_heading">
                Filter by posting date of job listings
              </span>
              <div className="AllJobs_upper_filter_date_posted_input_wrapper">
                <input
                  id="AllJobs_upper_filter_date_posted_input"
                  type={"date"}
                />
                <div id="AllJobs_upper_filter_date_posted_input_btn">Add</div>
              </div>
              <div className="AllJobs_upper_filter_date_posted_selected">
                <div className="AllJobs_upper_filter_date_posted_selected_item">
                  <div className="AllJobs_upper_filter_date_posted_selected_item_name">
                    Item 1
                  </div>
                  <div className="AllJobs_upper_filter_date_posted_selected_item_btn">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="AllJobs_lower">
          <div className="AllJobs_lower_table">
            <div className="AllJobs_lower_table_left">
              <div className="AllJobs_lower_table_left_heading">
                <div>Tons of companies hiring</div>
                <div>{totalJobs.totaljobs} total jobs</div>
              </div>
              <div className="AllJobs_lower_table_left_main">
                <table>
                  <tr>
                    <th>Listing ID</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Job Description</th>
                    <th>Posted Date</th>
                  </tr>
                  {listofJobs &&
                    listofJobs.map((value, key) => {
                      return (
                        <tr>
                          <td>{value.job_listing_id}</td>
                          <td>{value.header_job_title}</td>
                          <td>{value.header_employer_name}</td>
                          <td>
                            {value.job_description &&
                              value.job_description.substring(0, 200)}
                            ...
                          </td>
                          <td>{value.header_jobs_posted_date}</td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
            {/* <div className="AllJobs_lower_table_right"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllJobs;
