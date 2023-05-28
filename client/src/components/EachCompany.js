import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/EachCompany.css";
import axios from "axios";
import { Button, Modal } from "antd";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";

function EachCompany() {
  const { slug } = useParams();
  const [companyDetails, setCompanyDetails] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [role, setrole] = useState("");
  const [pros, setpros] = useState("");
  const [cons, setcons] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/company/searchalldetails/${slug}`)
      .then((response) => {
        console.log(response.data);
        setCompanyDetails(response.data);
      });
  }, []);

  const postReview = async () => {
    // e.preventDefault();
    // console.log(company, role, payPeriod, totalCompensation, whoReported);

    try {
      const response = await axios.post(
        "http://localhost:3001/company/addreview",
        {
          slug: slug,
          role: role,
          pros: pros,
          cons: cons,
        }
      );

      // Handle the response from the server as needed
      console.log(response.data);
    } catch (err) {
      // Handle any errors that occurred during the request
      console.error(err);
    }
  };

  return (
    <div className="EachCompany">
      <div className="Navbar_container">
        <Navbar />
      </div>
      <div className="EachCompany_body">
        <NavLink
          className="AllCompanies_link"
          target="_top"
          exact
          to="/companies"
        >
          <div className="EachCompany_directory">Company Directory</div>{" "}
        </NavLink>
        <div className="EachCompany_body_main">
          <div className="EachCompany_profile">
            <div className="EachCompany_banner">
              {/* <img
                id="EachCompany_banner_img"
                src={process.env.PUBLIC_URL + "/assets/img/sample-banner.png"}
                alt="Sample-banner"
              /> */}
            </div>
            <div className="EachCompany_profile_pic">
              <img
                id="EachCompany_banner_profile_pic"
                src={
                  companyDetails &&
                  companyDetails[0] &&
                  companyDetails[0].header_company_logo
                }
                alt="Sample-profile-pic"
              />
            </div>
            <div className="EachCompany_name">
              {companyDetails &&
                companyDetails[0] &&
                companyDetails[0].header_employer_name}
              <div
                onClick={() => setModal2Open(true)}
                id="EachCompany_add_review"
              >
                Add Review
              </div>
            </div>

            <Modal
              title="Rate this company"
              centered
              open={modal2Open}
              onOk={() => postReview()}
              onCancel={() => setModal2Open(false)}
            >
              <div className="AllSalaries_Modal">
                <input
                  id="AllSalaries_Modal_role_input"
                  type="text"
                  placeholder="Role"
                  onChange={(event) => setrole(event.target.value)}
                ></input>
                <input
                  id="AllSalaries_Modal_whoReported_input"
                  type="text"
                  placeholder="List our pros"
                  onChange={(event) => setpros(event.target.value)}
                ></input>
                <input
                  id="AllSalaries_Modal_payPeriod_input"
                  type="text"
                  placeholder="List out cons"
                  onChange={(event) => setcons(event.target.value)}
                ></input>
              </div>
            </Modal>
          </div>
          <div className="EachCompany_content">
            <table>
              <tr className="EachCompany_content_about">
                <td>Description</td>
                <td>
                  {companyDetails[0] &&
                    companyDetails[0].overview_company_description}
                </td>
              </tr>
              <tr className="EachCompany_content_rating">
                <td>Rating</td>
                <td>
                  {companyDetails[0] && companyDetails[0].header_company_rating}
                </td>
              </tr>
              <tr className="EachCompany_content_foundation_year">
                <td>Foundation year</td>
                <td>
                  {companyDetails[0] &&
                    companyDetails[0].overview_company_foundation_year}
                </td>
              </tr>
              <tr className="EachCompany_content_hq">
                <td>Headquarters</td>
                <td>
                  {companyDetails[0] &&
                    companyDetails[0].overview_company_headquarters}
                </td>
              </tr>
              <tr className="EachCompany_content_industry">
                <td>Industry</td>
                <td>
                  {companyDetails[0] &&
                    companyDetails[0].overview_company_industry}
                </td>
              </tr>
              <tr className="EachCompany_content_summary">
                <td>Benefits summary</td>
                <td>
                  {companyDetails[0] &&
                    companyDetails[0].benefits_employer_summary}
                </td>
              </tr>
              <tr className="EachCompany_content_size">
                <td>Size</td>
                <td>
                  {companyDetails[0] && companyDetails[0].overview_company_size}
                </td>
              </tr>
              <tr className="EachCompany_content_type">
                <td>Type</td>
                <td>
                  {companyDetails[0] && companyDetails[0].overview_company_type}
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <th>Review Posted</th>
                <th>Job Role</th>
                <th>Pros</th>
                <th>Cons</th>
              </tr>
              {companyDetails &&
                companyDetails.map((value, key) => {
                  return (
                    <tr>
                      <td>{value.r_publish}</td>
                      <td>{value.r_publisher}</td>
                      <td>{value.r_pros}</td>
                      <td>{value.r_cons}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachCompany;
