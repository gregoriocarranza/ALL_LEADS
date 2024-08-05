const express = require("express");
const { google } = require("googleapis");
const { authorize } = require("./src/sheets");
const { Parser } = require("json2csv");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/authCode", (req, res) => {
  const { code } = req.query;
  res.send(`Codigo de autenticacion: ${code}`);
});

app.post("/filter-leads", async (req, res) => {
  const { role, industry, country, cnae } = req.body;

  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1WVHLn2cE7_uQjADBnLjKtiZoOgHtAnG902jY2NjYcYs";
    const range = "Hoja 1!A:S";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;

    if (rows.length === 0) {
      res.status(404).send("No data found in the spreadsheet.");
      return;
    }

    const headers = rows[0];

    const noCriteriaProvided = !role && !industry && !country && !cnae;

    const filteredLeads = noCriteriaProvided
      ? rows.slice(1)
      : rows.slice(1).filter((row) => {
          return (
            (!role || row[15] === role) &&
            (!industry || row[11] === industry) &&
            (!country || row[9] === country) &&
            (!cnae || row[16] === cnae)
          );
        });

    const filteredLeadsObjects = filteredLeads.map((row) => {
      let lead = {};
      headers.forEach((header, index) => {
        lead[header] = row[index];
      });
      return lead;
    });

    const updates = filteredLeads.map((lead) => ({
      range: `Hoja 1!R${rows.findIndex((row) => row[1] === lead[1]) + 1}`,
      values: [[(lead[17] ? parseInt(lead[17]) : 0) + 1]],
    }));
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: { data: updates, valueInputOption: "RAW" },
    });

    const parser = new Parser({ fields: headers });
    const csv = parser.parse(filteredLeadsObjects);

    res.header("Content-Type", "text/csv");
    res.attachment("filtered_leads.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error filtering leads:", error);
    res.status(500).send("Error filtering leads");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
