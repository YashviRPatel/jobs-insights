const express = require("express");
const router = express.Router();
const pool = require("../db");
const { promisify } = require("util");

const queryAsync = promisify(pool.query).bind(pool);
router.get("/", async (req, res) => {
  try {
    const rows = await queryAsync(
      "SELECT header_employer_id, s_job_title, s_pay_period, s_pay_percentile_ninety, s_who_reported, header_employer_name FROM salary_with_employer inner join company_unique using(header_employer_id) where s_who_reported = 'employer' limit 25"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.get("/search", async (req, res) => {
  const param1 = req.query.param1;

  try {
    const rows = await queryAsync(
      `SELECT header_employer_id, s_job_title, s_pay_period, s_pay_percentile_ninety, s_who_reported, header_employer_name  FROM salary_with_employer inner join company_unique using(header_employer_id) where header_employer_name like '%${param1}%' limit 25`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.get("/searchbyrole", async (req, res) => {
  const param1 = req.query.param1;

  try {
    const rows = await queryAsync(
      `SELECT header_employer_id, s_job_title, s_pay_period, s_pay_percentile_ninety, s_who_reported, header_employer_name  FROM salary_with_employer inner join company_unique using(header_employer_id) where s_job_title like '%${param1}%' limit 25`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.post("/addsalary", async (req, res) => {
  // const reqdata = req.body;
  // console.log(reqdata);
  const { jobTitle, payPeriod, payPercentile, reportedBy } = req.body;

  try {
    // Execute the SQL INSERT statement to add a new row to the table
    const result = await queryAsync(
      `INSERT INTO salary_with_employer (s_job_title, s_pay_period, s_pay_percentile_ninety, s_who_reported) VALUES (?, ?, ?, ?)`,
      [jobTitle, payPeriod, payPercentile, reportedBy]
    );

    // Send a success response to the client
    res.json({ success: true, message: "Salary added successfully" });
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.get("/searchalldetails/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const rows = await queryAsync(
      `SELECT * FROM company_unique where header_employer_id = ${slug}`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!" + slug);
  }
});

module.exports = router;
