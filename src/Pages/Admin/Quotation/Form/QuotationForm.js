import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const stationOptions = ["Station A", "Station B", "Station C"];
const states = ["State A", "State B", "State C"];
const cities = ["City A", "City B", "City C"];
const payOptions = ["None", "To Pay", "Paid"];

const initialValues = {
  firstName: "",
  lastName: "",
  startStationName: null,
  endStation: null,
  locality: "",
  quotationDate: "",
  proposedDeliveryDate: "",
  fromCustomerName: "",
  fromAddress: "",
  fromState: "",
  fromCity: "",
  fromPincode: "",
  toCustomerName: "",
  toAddress: "",
  toState: "",
  toCity: "",
  toPincode: "",
  amount: "",
  freight: "",
  sgst: "",
  sTax: "",
  additionalCmt: "",
  productDetails: [
    {
      name: "",
      quantity: "",
      price: "",
      weight: "",
    },
  ],
  addComment: "",
  freight: "",
  ins_vpp: "",
  billTotal: "",
  cgst: "",
  sgst: "",
  igst: "",
  grandTotal: "",
};

const QuotationForm = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("Form Submitted:", values);
        }}
      >
        {({ values, handleChange, setFieldValue }) => {
          const handleUpdate = (index) => {
            const item = values.productDetails[index];

            if (!item.No.OfParcel || !item.weightKgs || !item.amount) {
              setSnackbar({
                open: true,
                message: "Please fill all required fields for this item",
                severity: "error",
              });
              return;
            }

            console.log("Updating item:", item);
            setSnackbar({
              open: true,
              message: `Item ${index + 1} updated successfully!`,
              severity: "success",
            });
          };

          return (
            <Form>
              <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
                <Grid size={{xs:12}}>
                  <Typography variant="h6" fontWeight="bold">
                    Edit Customer Quotation
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      select
                      fullWidth
                      label="Start Station"
                      name="startStation"
                      value={values.startStation}
                      onChange={handleChange}
                    >
                      {stationOptions.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      select
                      fullWidth
                      label="Destination Station"
                      name="destinationStation"
                      value={values.destinationStation}
                      onChange={handleChange}
                    >
                      {stationOptions.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:6}}>
                      <DatePicker
                        label="Booking Date"
                        value={values.bookingDate}
                        onChange={(val) => setFieldValue("bookingDate", val)}
                        minDate={new Date()}
                        renderInput={(params) => (
                          <TextField fullWidth {...params} name="bookingDate" />
                        )}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <DatePicker
                        label="Proposed Delivery Date"
                        value={values.deliveryDate}
                        onChange={(val) => setFieldValue("deliveryDate", val)}
                        minDate={values.bookingDate || new Date()}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            name="deliveryDate"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid size={{xs:12, sm:9}}>
                    <Typography fontWeight="bold">
                      Customer Name/Number
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Search for customer"
                      name="customerSearch"
                      value={values.customerSearch}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:3}}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddIcon />}
                      type="submit"
                    >
                      Register
                    </Button>
                  </Grid>

                  {["firstName", "middleName", "lastName"].map((name) => (
                    <Grid size={{xs:12, sm:4}} key={name}>
                      <TextField
                        fullWidth
                        label={name.replace(/([A-Z])/g, " $1")}
                        name={name}
                        value={values[name]}
                        onChange={handleChange}
                      />
                    </Grid>
                  ))}

                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="contactNumber"
                      value={values.contactNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                    />
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Typography variant="h6">From (Address)</Typography>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="fromName"
                      value={values.fromName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="GST Number"
                      name="fromGST"
                      value={values.fromGST}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Locality / Street"
                      name="fromLocality"
                      value={values.fromLocality}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      select
                      fullWidth
                      label="State"
                      name="fromState"
                      value={values.fromState}
                      onChange={handleChange}
                    >
                      {states.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      select
                      fullWidth
                      label="City"
                      name="fromCity"
                      value={values.fromCity}
                      onChange={handleChange}
                    >
                      {cities.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Pin Code"
                      name="fromPin"
                      value={values.fromPin}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Typography variant="h6">To (Address)</Typography>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="toName"
                      value={values.toName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="GST Number"
                      name="toGST"
                      value={values.toGST}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Locality / Street"
                      name="toLocality"
                      value={values.toLocality}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      select
                      fullWidth
                      label="State"
                      name="toState"
                      value={values.toState}
                      onChange={handleChange}
                    >
                      {states.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      select
                      fullWidth
                      label="City"
                      name="toCity"
                      value={values.toCity}
                      onChange={handleChange}
                    >
                      {cities.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Pin Code"
                      name="toPin"
                      value={values.toPin}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Typography variant="h6">Product Details</Typography>
                  </Grid>

                  <FieldArray name="productDetails">
                    {({ push, remove }) => (
                      <>
                        {values.productDetails.map((_, index) => (
                          <Grid
                            container
                            spacing={2}
                            key={index}
                            alignproductDetails="center"
                            sx={{ mb: 2 }}
                          >
                            <Grid size={{xs:0.5}}>
                              <Typography>{index + 1}.</Typography>
                            </Grid>
                            {["No.OfParcel", "weightKgs", "amount"].map(
                              (field) => (
                                <Grid size={{xs:6, sm:3, md:2.5}} key={field}>
                                  <Field
                                    as={TextField}
                                    fullWidth
                                    size="small"
                                    label={field.replace(/([A-Z])/g, " $1")}
                                    name={`productDetails[${index}].${field}`}
                                    required
                                  />
                                </Grid>
                              )
                            )}
                            <Grid size={{xs:6, sm:3, md:1.5}}>
                              <TextField
                                select
                                fullWidth
                                size="small"
                                label="To Pay/Paid"
                                name={`productDetails[${index}].toPayPaid`}
                                value={values.productDetails[index].toPayPaid}
                                onChange={handleChange}
                              >
                                {payOptions.map((p) => (
                                  <MenuItem key={p} value={p}>
                                    {p}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid size={{xs:3, sm:1.5, md:1}}>
                              <Button
                                color="primary"
                                onClick={() => handleUpdate(index)}
                                variant="contained"
                                fullWidth
                                size="small"
                              >
                                Update
                              </Button>
                            </Grid>
                            <Grid size={{xs:3, sm:1.5, md:1}}>
                              <Button
                                color="error"
                                onClick={() => remove(index)}
                                variant="outlined"
                                fullWidth
                                size="small"
                              >
                                Remove
                              </Button>
                            </Grid>
                          </Grid>
                        ))}

                        <Grid size={{xs:12}}>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                              push({
                                receiptNo: "",
                                refNo: "",
                                insurance: "",
                                vppAmount: "",
                                toPayPaid: "",
                                weightKgs: "",
                                amount: "",
                              })
                            }
                          >
                            Add Item
                          </Button>
                        </Grid>
                      </>
                    )}
                  </FieldArray>

                  <Grid size={{xs:12, md:9}}>
                    <TextField
                      name="comments"
                      label="Additional Comments"
                      multiline
                      minRows={10}
                      fullWidth
                      value={values.comments}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, md:3}}>
                    <Grid container spacing={2}>
                      {[
                        ["sgst", "SGST%"],
                        ["grandTotal", "Grand Total"],
                      ].map(([name, label]) => (
                        <Grid size={{xs:6}} key={name}>
                          <TextField
                            name={name}
                            label={label}
                            value={values[name]}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit All
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={snackbar.severity}
                  sx={{ width: "100%" }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Form>
          );
        }}
      </Formik>
    </LocalizationProvider>
  );
};

export default QuotationForm;
