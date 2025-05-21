import React from "react";
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";

// --- View-only form component ---
const stations = ["Station A", "Station B", "Station C"];
const states   = ["State A", "State B", "State C"];
const cities   = ["City A", "City B", "City C"];

const UserViewForm = ({ data }) => (
  <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
    <Typography variant="h5" mb={3}>
      Admin Details (View Only)
    </Typography>
    <Grid container spacing={2}>
      {["firstName", "middleName", "lastName"].map((field) => (
        <Grid size={{xs:12, sm:4}} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1")}
            value={data[field]}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      ))}

      {/** Station & Email **/}
      <Grid size={{xs:12, sm:6}}>
        <TextField
          select
          fullWidth
          label="Start Station"
          value={data.startStation}
          InputProps={{ readOnly: true }}
        >
          {stations.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid  size={{xs:12, sm:6}}>
        <TextField
          fullWidth
          label="Email"
          value={data.emailId}
          InputProps={{ readOnly: true }}
        />
      </Grid>

      {/** Password & Contact **/}
      <Grid  size={{xs:12, sm:6}}>
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={data.password}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid  size={{xs:12, sm:6}}>
        <TextField
          fullWidth
          label="Contact Number"
          value={data.contactNumber}
          InputProps={{ readOnly: true }}
        />
      </Grid>

      {/** Address **/}
      <Grid  size={{xs:12}}>
        <Typography variant="subtitle1">Address</Typography>
      </Grid>
      <Grid  size={{xs:12}}>
        <TextField
          fullWidth
          label="Street Address"
          value={data.address}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      {[
        { name: "distinct", label: "District" },
        { name: "state",    label: "State",  select: states },
        { name: "city",     label: "City",   select: cities },
        { name: "pinCode",  label: "Pin Code" },
      ].map(({ name, label, select }) => (
        <Grid  size={{xs:12, sm:6}} key={name}>
          {select ? (
            <TextField
              select
              fullWidth
              label={label}
              value={data[name]}
              InputProps={{ readOnly: true }}
            >
              {select.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              fullWidth
              label={label}
              value={data[name]}
              InputProps={{ readOnly: true }}
            />
          )}
        </Grid>
      ))}

      {/** Documents **/}
      <Grid  size={{xs:12}}>
        <Typography variant="subtitle1">Documents</Typography>
      </Grid>
      <Grid  size={{xs:12, sm:4}}>
        <TextField
          fullWidth
          label="ID Proof No."
          value={data.idProof}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid  size={{xs:12, sm:4}}>
        <Typography variant="body2">
          ID Proof File: {data.idProofPhoto.name}
        </Typography>
      </Grid>
      <Grid  size={{xs:12, sm:4}}>
        <Typography variant="body2">
          Admin Photo: {data.adminProfilePhoto.name}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

// --- Example usage with random data ---
export default function App() {
  const randomData = {
    firstName: "Alice",
    middleName: "B.",
    lastName: "Carroll",
    startStation: stations[Math.floor(Math.random() * stations.length)],
    emailId: "alice.carroll@example.com",
    password: "••••••••",
    contactNumber: "9876543210",
    address: "221B Baker Street",
    distinct: "Central",
    state: states[Math.floor(Math.random() * states.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    pinCode: "123456",
    idProof: "IDPROOF-" + Math.floor(Math.random() * 900000 + 100000),
    idProofPhoto: { name: `id-proof-${Date.now() % 100000}.jpg` },
    adminProfilePhoto: { name: `profile-${Date.now() % 100000}.png` },
  };

  return (
    <Container maxWidth="md">
      <UserViewForm data={randomData} />
    </Container>
  );
}
