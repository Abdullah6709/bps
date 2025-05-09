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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const stationOptions = ["Station A", "Station B", "Station C"];
const states = ["State A", "State B", "State C"];
const cities = ["City A", "City B", "City C"];
const payOptions = ["None", "To Pay", "Paid"];

const initialValues = {
  startStation: "",
  endStation: "",
  bookingDate: null,
  deliveryDate: null,
  customerSearch: "",
  firstName: "",
  middleName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  senderName: "",
  senderLocality: "",
  fromCity: "",
  senderGgt: "",
  fromState: "",
  senderPincode: "",
  receiverName: "",
  receiverLocality: "",
  receiverGgt: "",
  toState: "",
  toCity: "",
  toPincode: "",
  items: [
    {
      receiptNo: "",
      refNo: "",
      insurance: "",
      vppAmount: "",
      toPay: "",
      weight: "",
      amount: "",
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

const BookingForm = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("Form Submitted:", values);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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

                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Booking Date"
                    value={values.bookingDate}
                    onChange={(val) => setFieldValue("bookingDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="bookingDate" />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Proposed Delivery Date"
                    value={values.deliveryDate}
                    onChange={(val) => setFieldValue("deliveryDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="deliveryDate" />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 9 }}>
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
                <Grid
                  size={{ xs: 12, sm: 3 }}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
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
                  <Grid size={{ xs: 12, sm: 4 }} key={name}>
                    <TextField
                      fullWidth
                      label={name.replace(/([A-Z])/g, " $1")}
                      name={name}
                      value={values[name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">From (Address)</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="fromName"
                    value={values.fromName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="fromGST"
                    value={values.fromGST}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="fromLocality"
                    value={values.fromLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="fromPin"
                    value={values.fromPin}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">To (Address)</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="toName"
                    value={values.toName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="toGST"
                    value={values.toGST}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="toLocality"
                    value={values.toLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="toPin"
                    value={values.toPin}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">Product Details</Typography>
                </Grid>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {values.items.map((_, index) => (
                        <Grid
                          container
                          spacing={2}
                          key={index}
                          alignItems="center"
                          sx={{ mb: 2 }}
                        >
                          <Grid size={{ xs: 0.5 }}>
                            <Typography>{index + 1}.</Typography>
                          </Grid>
                          {[
                            "receiptNo",
                            "refNo",
                            "insurance",
                            "vppAmount",
                            "weight",
                            "amount",
                          ].map((field) => (
                            <Grid size={{ xs: 6, sm: 3, md: 1.5 }} key={field}>
                              <Field
                                as={TextField}
                                fullWidth
                                size="small"
                                label={field.replace(/([A-Z])/g, " $1")}
                                name={`items[${index}].${field}`}
                              />
                            </Grid>
                          ))}
                          <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
                            <TextField
                              select
                              fullWidth
                              size="small"
                              label="To Pay/Paid"
                              name={`items[${index}].toPayPaid`}
                              value={values.items[index].toPayPaid}
                              onChange={handleChange}
                            >
                              {payOptions.map((p) => (
                                <MenuItem key={p} value={p}>
                                  {p}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid size={{ xs: 6, sm: 3, md: 1 }}>
                            <Button
                              color="error"
                              onClick={() => remove(index)}
                              variant="outlined"
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid size={{ xs: 12 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() =>
                            push({
                              receiptNo: "",
                              refNo: "",
                              insurance: "",
                              vppAmount: "",
                              toPayPaid: "",
                              weight: "",
                              amount: "",
                            })
                          }
                        >
                          + Add Item
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>

                <Grid size={{ xs: 12, md: 9 }}>
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
                <Grid size={{ xs: 12, md: 3 }}>
                  <Grid container spacing={2}>
                    {[
                      ["freight", "FREIGHT"],
                      ["insVpp", "INS/VPP"],
                      ["billTotal", "Bill Total"],
                      ["cgst", "CGST%"],
                      ["sgst", "SGST%"],
                      ["igst", "IGST%"],
                      ["grandTotal", "Grand Total"],
                    ].map(([name, label]) => (
                      <Grid size={{ xs: 6 }} key={name}>
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

                <Grid size={{ xs: 12 }}>
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
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default BookingForm;
