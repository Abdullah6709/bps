// Dashboard.js
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Sunday", orders: 0 },
  { day: "Monday", orders: 0 },
  { day: "Tuesday", orders: 0 },
  { day: "Wednesday", orders: 0 },
  { day: "Thursday", orders: 0 },
  { day: "Friday", orders: 0 },
  { day: "Saturday", orders: 0 },
];

const OrderDashboard = () => {
  return (
    <Box p={4}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Quotation Order
        </Typography>
        <Button variant="outlined" sx={{ borderRadius: "16px", px: 3 }}>
          Tuesday
        </Button>
      </Grid>

      <Grid container spacing={2} mb={4}>
        <Grid item>
          <Typography sx={{ cursor: "pointer", color: "#1890ff" }}>
            Quotation
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ cursor: "pointer", color: "#1890ff" }}>
            Booking
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ cursor: "pointer", color: "#1890ff" }}>
            Bookings
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ cursor: "pointer", color: "#1890ff" }}>
            Cancelled
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ cursor: "pointer", color: "#1890ff" }}>
            Revenue
          </Typography>
        </Grid>
      </Grid>

      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#1890ff"
              strokeWidth={2}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default OrderDashboard;
