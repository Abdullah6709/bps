import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const stationOptions = ["Station A", "Station B", "Station C"];
const states = ["State A", "State B", "State C"];
const cities = ["City A", "City B", "City C"];
const payOptions = ["None", "To Pay", "Paid"];

// Generate random data
const randomItem = () => ({
  receiptNo: `RCPT${Math.floor(1000 + Math.random() * 9000)}`,
  refNo: `REF${Math.floor(1000 + Math.random() * 9000)}`,
  insurance: Math.floor(Math.random() * 1000),
  vppAmount: Math.floor(Math.random() * 500),
  toPay: payOptions[Math.floor(Math.random() * payOptions.length)],
  weight: Math.floor(1 + Math.random() * 50),
  amount: Math.floor(50 + Math.random() * 500),
});

const randomData = {
  startStation: stationOptions[Math.floor(Math.random() * stationOptions.length)],
  endStation: stationOptions[Math.floor(Math.random() * stationOptions.length)],
  bookingDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  deliveryDate: new Date(Date.now() + Math.floor(1 + Math.random() * 14) * 24 * 60 * 60 * 1000),
  customerSearch: `Customer${Math.floor(1 + Math.random() * 100)}`,
  firstName: ["John", "Jane", "Robert", "Emily", "Michael"][Math.floor(Math.random() * 5)],
  middleName: ["A.", "B.", "C.", "D.", "E."][Math.floor(Math.random() * 5)],
  lastName: ["Smith", "Johnson", "Williams", "Brown", "Jones"][Math.floor(Math.random() * 5)],
  contactNumber: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
  email: `user${Math.floor(1 + Math.random() * 100)}@example.com`,
  senderName: `Sender ${Math.floor(1 + Math.random() * 10)}`,
  senderLocality: `${Math.floor(1 + Math.random() * 100)} Main St`,
  fromCity: cities[Math.floor(Math.random() * cities.length)],
  senderGgt: `GSTIN${Math.floor(1000 + Math.random() * 9000)}`,
  fromState: states[Math.floor(Math.random() * states.length)],
  senderPincode: `${Math.floor(100000 + Math.random() * 900000)}`,
  receiverName: `Receiver ${Math.floor(1 + Math.random() * 10)}`,
  receiverLocality: `${Math.floor(1 + Math.random() * 100)} Park Ave`,
  receiverGgt: `GSTIN${Math.floor(1000 + Math.random() * 9000)}`,
  toState: states[Math.floor(Math.random() * states.length)],
  toCity: cities[Math.floor(Math.random() * cities.length)],
  toPincode: `${Math.floor(100000 + Math.random() * 900000)}`,
  items: Array.from({ length: Math.floor(1 + Math.random() * 3) }, randomItem),
  addComment: Math.random() > 0.5 ? "Handle with care" : "Fragile items included",
  freight: Math.floor(100 + Math.random() * 500),
  ins_vpp: Math.floor(50 + Math.random() * 200),
  billTotal: Math.floor(500 + Math.random() * 1500),
  cgst: Math.floor(5 + Math.random() * 10),
  sgst: Math.floor(5 + Math.random() * 10),
  igst: Math.floor(5 + Math.random() * 10),
  grandTotal: Math.floor(1000 + Math.random() * 3000),
};

const ViewBooking = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Grid container spacing={2}>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            select
            fullWidth
            label="Start Station"
            value={randomData.startStation}
            InputProps={{ readOnly: true }}
          >
            <MenuItem value={randomData.startStation}>
              {randomData.startStation}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            select
            fullWidth
            label="Destination Station"
            value={randomData.endStation}
            InputProps={{ readOnly: true }}
          >
            <MenuItem value={randomData.endStation}>
              {randomData.endStation}
            </MenuItem>
          </TextField>
        </Grid>

        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Booking Date"
            value={randomData.bookingDate.toLocaleDateString()}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Proposed Delivery Date"
            value={randomData.deliveryDate.toLocaleDateString()}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size ={{xs:12, sm:9}}>
          <Typography fontWeight="bold">Customer Name/Number</Typography>
          <TextField
            fullWidth
            value={randomData.customerSearch}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
       
        <Grid size ={{xs:12, sm:4}}>
          <TextField
            fullWidth
            label="First Name"
            value={randomData.firstName}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:4}}>
          <TextField
            fullWidth
            label="Middle Name"
            value={randomData.middleName}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:4}}>
          <TextField
            fullWidth
            label="Last Name"
            value={randomData.lastName}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Contact Number"
            value={randomData.contactNumber}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Email"
            value={randomData.email}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size ={{xs:12}}>
          <Typography variant="h6">From (Address)</Typography>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Name"
            value={randomData.senderName}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="GST Number"
            value={randomData.senderGgt}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Locality / Street"
            value={randomData.senderLocality}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            select
            fullWidth
            label="State"
            value={randomData.fromState}
            InputProps={{ readOnly: true }}
          >
            <MenuItem value={randomData.fromState}>
              {randomData.fromState}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            select
            fullWidth
            label="City"
            value={randomData.fromCity}
            InputProps={{ readOnly: true }}
          >
            <MenuItem value={randomData.fromCity}>
              {randomData.fromCity}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Pin Code"
            value={randomData.senderPincode}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size ={{xs:12}}>
          <Typography variant="h6">To (Address)</Typography>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Name"
            value={randomData.receiverName}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="GST Number"
            value={randomData.receiverGgt}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Locality / Street"
            value={randomData.receiverLocality}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            select
            fullWidth
            label="State"
            value={randomData.toState}
            InputProps={{ readOnly: true }}
          >
            <MenuItem value={randomData.toState}>
              {randomData.toState}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            select
            fullWidth
            label="City"
            value={randomData.toCity}
            InputProps={{ readOnly: true }}
          >
            <MenuItem value={randomData.toCity}>
              {randomData.toCity}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size ={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Pin Code"
            value={randomData.toPincode}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size ={{xs:12}}>
          <Typography variant="h6">Product Details</Typography>
        </Grid>
        {randomData.items.map((item, index) => (
          <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
            <Grid size ={{xs:0.5}}>
              <Typography>{index + 1}.</Typography>
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.4}}>
              <TextField
                fullWidth
                size="small"
                label="Receipt No"
                value={item.receiptNo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.4}}>
              <TextField
                fullWidth
                size="small"
                label="Ref No"
                value={item.refNo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.4}}>
              <TextField
                fullWidth
                size="small"
                label="Insurance"
                value={item.insurance}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.4}}>
              <TextField
                fullWidth
                size="small"
                label="VPP Amount"
                value={item.vppAmount}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.4}}>
              <TextField
                fullWidth
                size="small"
                label="Weight"
                value={item.weight}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.4}}>
              <TextField
                fullWidth
                size="small"
                label="Amount"
                value={item.amount}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid size ={{xs:3, sm:3, md:1.5}}>
              <TextField
                select
                fullWidth
                size="small"
                label="To Pay/Paid"
                value={item.toPay}
                InputProps={{ readOnly: true }}
              >
                <MenuItem value={item.toPay}>{item.toPay}</MenuItem>
              </TextField>
            </Grid>
           
          </Grid>
        ))}

      

        <Grid size ={{xs:12, md:9}}>
          <TextField
            label="Additional Comments"
            multiline
            minRows={10}
            fullWidth
            value={randomData.addComment}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />
        </Grid>
        <Grid size ={{xs:12, md:3}}>
          <Grid container spacing={2}>
            <Grid size ={{xs:6}}>
              <TextField
                label="FREIGHT"
                value={randomData.freight}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size ={{xs:6}}>
              <TextField
                label="INS/VPP"
                value={randomData.ins_vpp}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size ={{xs:6}}>
              <TextField
                label="Bill Total"
                value={randomData.billTotal}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size ={{xs:6}}>
              <TextField
                label="CGST%"
                value={randomData.cgst}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size ={{xs:6}}>
              <TextField
                label="SGST%"
                value={randomData.sgst}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size ={{xs:6}}>
              <TextField
                label="IGST%"
                value={randomData.igst}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size ={{xs:6}}>
              <TextField
                label="Grand Total"
                value={randomData.grandTotal}
                InputProps={{ readOnly: true }}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

      
      </Grid>
    </Box>
  );
};

export default ViewBooking;