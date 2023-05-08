const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  no: String,
  name: String,
  tradeName: String,
  businessNo: String,
  municipality: String,
  businessType: String,
  status: String,
  companyUrl: String,
  category: String,
});

const CompanyModel = mongoose.model("companies", companySchema);

module.exports = CompanyModel;
