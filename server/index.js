const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const pool = require("./db");
const companyRouter = require("./routes/Company");
const salaryRouter = require("./routes/Salary");
const jobRouter = require("./routes/Job");

app.use(cors());
app.use(bodyParser.json());

app.use("/company", companyRouter);
app.use("/salary", salaryRouter);
app.use("/job", jobRouter);

app.listen(3001, () => {
  console.log("server running on port 3001");
});
