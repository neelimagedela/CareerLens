const express = require("express");
const cors = require("cors");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ PDF ANALYSIS API
app.post("/analyze", async (req, res) => {
  try {
    const { fileData } = req.body;

    const buffer = Buffer.from(fileData, "base64");
    const data = await pdfParse(buffer);

    res.json({ text: data.text.toLowerCase() });

  } catch (err) {
    res.status(500).json({ error: "Failed to parse PDF" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});