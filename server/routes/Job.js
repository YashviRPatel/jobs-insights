const express = require("express");
const router = express.Router();
const pool = require("../db");
const { promisify } = require("util");

const queryAsync = promisify(pool.query).bind(pool);
router.get("/", async (req, res) => {
  try {
    const rows = await queryAsync(
      `SELECT header_employer_id, header_employer_name, map_country, header_job_title, header_location_city , 
      header_jobs_posted_date , 
      header_pay_high , 
      header_pay_low , 
      header_pay_med , 
      header_pay_period , 
      header_salary_high ,
      header_salary_low ,
      header_salary_source , 
      job_description, job_listing_id  FROM job_listings_unique_with_country_code inner join company_unique using (header_employer_id) limit 10`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.get("/totaljobs", async (req, res) => {
  try {
    const rows = await queryAsync(
      `SELECT count(*) as totaljobs FROM job_listings_unique_with_country_code`
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
      `SELECT header_employer_id, header_employer_name, map_country, header_job_title, header_location_city , 
      header_jobs_posted_date , 
      header_pay_high , 
      header_pay_low , 
      header_pay_med , 
      header_pay_period , 
      header_salary_high ,
      header_salary_low ,
      header_salary_source , 
      job_description, job_listing_id  FROM job_listings_unique_with_country_code inner join company_unique using (header_employer_id) where job_description like '%${param1}%'  limit 10`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.get("/searchbytitle", async (req, res) => {
  const param1 = req.query.param1;

  try {
    const rows = await queryAsync(
      `SELECT header_employer_id, header_employer_name, map_country, header_job_title, header_location_city , 
      header_jobs_posted_date , 
      header_pay_high , 
      header_pay_low , 
      header_pay_med , 
      header_pay_period , 
      header_salary_high ,
      header_salary_low ,
      header_salary_source , 
      job_description, job_listing_id  FROM job_listings_unique_with_country_code inner join company_unique using (header_employer_id) where header_job_title like '%${param1}%'  limit 10`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!");
  }
});

router.get("/searchbycompany", async (req, res) => {
  const param1 = req.query.param1;

  try {
    const rows = await queryAsync(
      `SELECT header_employer_id, header_employer_name, map_country, header_job_title, header_location_city , 
      header_jobs_posted_date , 
      header_pay_high , 
      header_pay_low , 
      header_pay_med , 
      header_pay_period , 
      header_salary_high ,
      header_salary_low ,
      header_salary_source , 
      job_description, job_listing_id  FROM job_listings_unique_with_country_code inner join company_unique using (header_employer_id) where header_employer_name like '%${param1}%'  limit 10`
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
      `SELECT * FROM company_unique where header_employer_id = ${slug}`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error!" + slug);
  }
});

module.exports = router;
