import { useState } from "react";
import "../stylesheets/CSVFileOpener.css";

const CSVFileOpener = ({onSubmit}) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setStatusMessage("Please select a CSV file.");
      return;
    }
    console.log(file);
    const fileType = file.type;
    if (fileType !== "text/csv" && fileType !== "application/vnd.ms-excel") {
      setStatusMessage("Invalid file type. Only CSV files are allowed.");
      return;
    }

    readCSVFile(file);
  };

  const readCSVFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const csvData = event.target.result;
      const parsedCSVData = parseCSVData(csvData);

      onSubmit(parsedCSVData);
    };
    reader.onerror = (event) => {
      setStatusMessage("Error reading file.");
    };
  };

  const parseCSVData = (csvData) => {
    const lines = csvData.split("\n");
    // TODO: idk if all data will have the "/r" but it did for the file I tested
    return lines.map((line) => line.split("\r")[0]); // remove the "\r" from the end of each line
  };

  return (
    <div className="csv-file-opener">
      <label className="file-input">
        Choose CSV File
        <input type="file" id="csvFileInput" accept=".csv" onChange={handleFileSelect} />
      </label>
      <div id="status">{statusMessage}</div>
    </div>
  );
};

export default CSVFileOpener;