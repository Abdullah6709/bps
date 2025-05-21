import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const stations = ["Station A", "Station B"];
const states = ["State A", "State B"];
const cities = ["City A", "City B"];

// Yup schema for validation
const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  middleName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  startStation: Yup.string().required("Required"),
  emailId: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  contactNumber: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  distinct: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  pinCode: Yup.string().required("Required"),
  idProof: Yup.string().required("Required"),
  idProofPhoto: Yup.mixed().required("Required"),
  adminProfilePhoto: Yup.mixed().required("Required"),
});

const UserEditForm = ({ initialValues = {} }) => {
  const formik = useFormik({
    initialValues: {
      firstName: initialValues.firstName || "",
      middleName: initialValues.middleName || "",
      lastName: initialValues.lastName || "",
      startStation: initialValues.startStation || "",
      emailId: initialValues.emailId || "",
      password: initialValues.password || "",
      contactNumber: initialValues.contactNumber || "",
      address: initialValues.address || "",
      distinct: initialValues.distinct || "",
      state: initialValues.state || "",
      city: initialValues.city || "",
      pinCode: initialValues.pinCode || "",
      idProof: initialValues.idProof || "",
      idProofPhoto: initialValues.idProofPhoto || null,
      adminProfilePhoto: initialValues.adminProfilePhoto || null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      console.log("Form Submitted", values);
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Edit Admin Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name, Middle Name, Last Name */}
          {["firstName", "middleName", "lastName"].map((field) => (
            <Grid size={{xs:12, sm:4}} key={field}>
              <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
              />
            </Grid>
          ))}

          {/* Station, Email ID */}
          <Grid size={{xs:12, sm:6}}>
            <TextField
              select
              fullWidth
              label="Select Station"
              name="startStation"
              value={formik.values.startStation}
              onChange={formik.handleChange}
              error={formik.touched.startStation && Boolean(formik.errors.startStation)}
              helperText={formik.touched.startStation && formik.errors.startStation}
            >
              {stations.map((station) => (
                <MenuItem key={station} value={station}>
                  {station}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Email"
              name="emailId"
              value={formik.values.emailId}
              onChange={formik.handleChange}
              error={formik.touched.emailId && Boolean(formik.errors.emailId)}
              helperText={formik.touched.emailId && formik.errors.emailId}
            />
          </Grid>

          {/* Password, Contact Number */}
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            />
          </Grid>

          {/* Address Section */}
          <Grid size={{xs:12}}>
            <Typography variant="subtitle1">Address</Typography>
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Address / Street"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          {[
            { name: "distinct", label: "District" },
            { name: "state", label: "Select State", select: states },
            { name: "city", label: "Select City", select: cities },
            { name: "pinCode", label: "Pin Code" },
          ].map(({ name, label, select }) => (
            <Grid size={{xs:12, sm:6}} key={name}>
              {select ? (
                <TextField
                  select
                  fullWidth
                  label={label}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                >
                  {select.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                />
              )}
            </Grid>
          ))}

          {/* Documents Section */}
          <Grid size={{xs:12}}>
            <Typography variant="subtitle1">Documents</Typography>
          </Grid>

          <Grid size={{xs:12, sm:4}}>
            <TextField
              fullWidth
              label="ID Proof No."
              name="idProof"
              value={formik.values.idProof}
              onChange={formik.handleChange}
              error={formik.touched.idProof && Boolean(formik.errors.idProof)}
              helperText={formik.touched.idProof && formik.errors.idProof}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color={formik.errors.idProofPhoto ? "error" : "primary"}
            >
              {formik.values.idProofPhoto ? "Change ID Proof" : "Upload ID Proof"}
              <input
                type="file"
                hidden
                onChange={(e) =>
                  formik.setFieldValue("idProofPhoto", e.currentTarget.files[0])
                }
              />
            </Button>
            {formik.touched.idProofPhoto && formik.errors.idProofPhoto && (
              <Typography color="error" variant="caption">
                {formik.errors.idProofPhoto}
              </Typography>
            )}
            {formik.values.idProofPhoto && !formik.errors.idProofPhoto && (
              <Typography variant="caption">File selected</Typography>
            )}
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color={formik.errors.adminProfilePhoto ? "error" : "primary"}
            >
              {formik.values.adminProfilePhoto ? "Change Admin's Photo" : "Upload Admin's Photo"}
              <input
                type="file"
                hidden
                onChange={(e) =>
                  formik.setFieldValue("adminProfilePhoto", e.currentTarget.files[0])
                }
              />
            </Button>
            {formik.touched.adminProfilePhoto && formik.errors.adminProfilePhoto && (
              <Typography color="error" variant="caption">
                {formik.errors.adminProfilePhoto}
              </Typography>
            )}
            {formik.values.adminProfilePhoto && !formik.errors.adminProfilePhoto && (
              <Typography variant="caption">File selected</Typography>
            )}
          </Grid>

          {/* Submit */}
          <Grid size={{xs:12}} display="flex" justifyContent="center">
            <Button variant="contained" type="submit">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

UserEditForm.defaultProps = {
  initialValues: {
    firstName: "",
    middleName: "",
    lastName: "",
    startStation: "",
    emailId: "",
    password: "",
    contactNumber: "",
    address: "",
    distinct: "",
    state: "",
    city: "",
    pinCode: "",
    idProof: "",
    idProofPhoto: null,
    adminProfilePhoto: null,
  }
};

export default UserEditForm;