import React, { useState } from "react";
import { TextField, Button, MenuItem, Container, Box } from "@mui/material";
import axios from "axios";

const App = () => {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [cnae, setCnae] = useState("");

  const handleFilter = async () => {
    try {
      const response = await axios.post(
        "/api/filter-leads",
        {
          role,
          industry,
          country,
          cnae,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filtered_leads.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <h1>Filtrar Leads</h1>
        <TextField
          label="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Industria"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          margin="normal"
        />
        <TextField
          label="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          margin="normal"
        />
        <TextField
          label="CNAE"
          value={cnae}
          onChange={(e) => setCnae(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleFilter} sx={{ mt: 2 }}>
          Filtrar y Descargar
        </Button>
      </Box>
    </Container>
  );
};

export default App;
