import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/AllSalaries.css";
import axios from "axios";
import { Button, Modal } from "antd";

function AllSalaries() {
  const [listofSalaries, setListOfSalaries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modal2Open, setModal2Open] = useState(false);

  const [company, setcompany] = useState("");
  const [role, setrole] = useState("");
  const [whoReported, setwhoReported] = useState("");
  const [payPeriod, setpayPeriod] = useState("");
  const [totalCompensation, settotalCompensation] = useState("");

  // let inputEl = document.querySelector("#AllSalaries_upper_search_input");

  // if (inputEl) {
  //   inputEl.addEventListener("keyup", function (event) {
  //     if (searchValue) {
  //       if (event.key === "Enter") {
  //         event.preventDefault();

  //         setListOfSalaries([]);
  //         axios
  //           .get(`http://localhost:3001/salary/search?param1=${searchValue}`)
  //           .then((response) => {
  //             setListOfSalaries(response.data);
  //           });
  //       }
  //     } else if (listofSalaries.length == 0) {
  //       axios.get("http://localhost:3001/salary").then((response) => {
  //         setListOfSalaries(response.data);
  //       });
  //     }
  //   });
  // }

  function searchSalaryByCompany(event) {
    if (listofSalaries.length == 0) {
      axios.get("http://localhost:3001/salary").then((response) => {
        setListOfSalaries(response.data);
      });
    } else {
      setListOfSalaries([]);
      axios
        .get(`http://localhost:3001/salary/search?param1=${searchValue}`)
        .then((response) => {
          setListOfSalaries(response.data);
        });
    }
  }

  function searchSalaryByRole(event) {
    if (listofSalaries.length == 0) {
      axios.get("http://localhost:3001/salary").then((response) => {
        setListOfSalaries(response.data);
      });
    } else {
      setListOfSalaries([]);
      axios
        .get(`http://localhost:3001/salary/searchbyrole?param1=${searchValue}`)
        .then((response) => {
          setListOfSalaries(response.data);
        });
    }
  }

  const postSalary = async () => {
    // e.preventDefault();
    // console.log(company, role, payPeriod, totalCompensation, whoReported);

    try {
      const response = await axios.post(
        "http://localhost:3001/salary/addsalary",
        {
          jobTitle: role,
          payPeriod: payPeriod,
          payPercentile: totalCompensation,
          reportedBy: whoReported,
        }
      );

      // Handle the response from the server as needed
      console.log(response.data);
    } catch (err) {
      // Handle any errors that occurred during the request
      console.error(err);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/salary").then((response) => {
      setListOfSalaries(response.data);
    });
  }, []);

  return (
    <div className="AllSalaries">
      <div className="Navbar_container">
        <Navbar />
      </div>
      <div className="AllSalaries_upper">
        <div className="AllSalaries_upper_search">
          <input
            id="AllSalaries_upper_search_input"
            placeholder="Search all jobs by company or role"
            type="text"
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <div
            onClick={searchSalaryByCompany}
            id="AllSalaries_upper_search_btn"
          >
            Company
          </div>
          <div
            onClick={searchSalaryByRole}
            id="AllSalaries_upper_role_search_btn"
          >
            Role
          </div>
        </div>
        <div
          onClick={() => setModal2Open(true)}
          id="AllSalaries_upper_add_salary_btn"
        >
          Add Salary
        </div>
        <Modal
          title="Add your compensation"
          centered
          open={modal2Open}
          onOk={() => postSalary()}
          onCancel={() => setModal2Open(false)}
        >
          <div className="AllSalaries_Modal">
            <input
              id="AllSalaries_Modal_company_input"
              type="text"
              placeholder="Company"
              onChange={(event) => setcompany(event.target.value)}
            ></input>
            <input
              id="AllSalaries_Modal_role_input"
              type="text"
              placeholder="Role"
              onChange={(event) => setrole(event.target.value)}
            ></input>
            <input
              id="AllSalaries_Modal_whoReported_input"
              type="text"
              placeholder="Are you a employer/employee?"
              onChange={(event) => setwhoReported(event.target.value)}
            ></input>
            <input
              id="AllSalaries_Modal_payPeriod_input"
              type="text"
              placeholder="Pay period"
              onChange={(event) => setpayPeriod(event.target.value)}
            ></input>
            <input
              id="AllSalaries_Modal_totalCompensation_input"
              type="text"
              placeholder="Total compensation"
              onChange={(event) => settotalCompensation(event.target.value)}
            ></input>
          </div>
        </Modal>
      </div>
      <div className="AllSalaries_lower">
        <div className="AllSalaries_lower_table">
          <div className="AllSalaries_lower_table_header">
            <div className="AllSalaries_lower_table_header_company">
              Company
            </div>
            <div className="AllSalaries_lower_table_header_role">Role</div>
            <div className="AllSalaries_lower_table_header_yoe">
              Who reported
            </div>
            <div className="AllSalaries_lower_table_header_yoe">Pay period</div>
            <div className="AllSalaries_lower_table_header_compensation">
              Total Compensation
            </div>
          </div>
          <div className="AllSalaries_lower_table_body">
            {listofSalaries &&
              listofSalaries.map((value, key) => {
                return (
                  <div className="AllSalaries_lower_table_body_row">
                    <div>{value.header_employer_name}</div>
                    <div>{value.s_job_title}</div>
                    <div>{value.s_who_reported}</div>
                    <div>{value.s_pay_period}</div>
                    <div>${value.s_pay_percentile_ninety}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSalaries;
