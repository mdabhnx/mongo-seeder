const fs = require("fs");
const path = require("path");
const JSONStream = require("JSONStream");
const { log } = require("console");

const mongoose = require("mongoose");
const CompanyModel = require("./models/Companies.model");

mongoose.connect("mongodb://127.0.0.1:27017/kerko");

const TARGET_PATH = path.join(__dirname, "data/comapnies/");

const startCompaniesSeeding = () => {
  fs.readdir(TARGET_PATH, async (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    console.time("seeding-time");
    files.map(async (file) => {
      try {
        const dataStream = await fs.createReadStream(
          path.join(TARGET_PATH, file),
          "utf8"
        );
        const parser = JSONStream.parse("*");
        dataStream.pipe(parser).on("data", (data) => {
          CompanyModel.collection.insertOne(data);
        });
      } catch (error) {
        log("err", error);
      }
    });
    console.timeEnd("seeding-time");
  });
};

const startCompanyDetailsSeeding = () => {
  const fs = require("fs");
  const path = require("path");

  function readFilesRecursively(folderPath) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        readFilesRecursively(filePath);
      } else {
        log(stats);
      }
    });
  }
};
