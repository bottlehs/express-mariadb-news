const fs = require("fs");
const path = require("path");

const save = (usStates) => {
  fs.writeFile(
    path.join(__dirname, ".", "usStates.json"),
    // "./usStates.json",
    JSON.stringify(usStates, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};