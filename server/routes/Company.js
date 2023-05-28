const express = require("express");
const router = express.Router();
const pool = require("../db");
const { promisify } = require("util");

const queryAsync = promisify(pool.query).bind(pool);
router.get("/", async (req, res) => {
  try {
    const rows = await queryAsync(
      "SELECT header_employer_name, header_employer_id FROM company_unique limit 25"
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
      `SELECT header_employer_name, header_employer_id FROM company_unique where header_employer_name like '%${param1}%' limit 25`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.get("/searchalldetails/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const rows = await queryAsync(
      `SELECT * FROM reviews_with_employer left outer join company_unique using(header_employer_id) where header_employer_id = ${slug} limit 25`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!" + slug);
  }
});

router.post("/addreview", async (req, res) => {
  // const reqdata = req.body;
  // console.log(reqdata);
  const { slug, role, pros, cons } = req.body;

  try {
    // Execute the SQL INSERT statement to add a new row to the table
    const result = await queryAsync(
      `INSERT INTO reviews_with_employer (header_employer_id, r_publisher, r_pros, r_cons) VALUES (?, ?, ?, ?)`,
      [slug, role, pros, cons]
    );

    // Send a success response to the client
    res.json({ success: true, message: "Review added successfully" });
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.get("/searchallreviews/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const rows = await queryAsync(
      `SELECT * FROM reviews_with_employer left outer join company_unique using(header_employer_id) where header_employer_id = ${slug}`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!" + slug);
  }
});

module.exports = router;
