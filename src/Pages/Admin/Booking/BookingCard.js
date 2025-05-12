import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  TablePagination,
  TextField,
  InputAdornment,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  CancelScheduleSend as CancelScheduleSendIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Book as BookOnlineIcon,
  LocalShipping as LocalShippingIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const cardData = [
  {
    id: 1,
    title: "Booking",
    value: "0",
    subtitle: "Requests",
    duration: "0% (30 Days)",
    icon: <BookOnlineIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Active ",
    value: "0",
    subtitle: "Deliveries",
    duration: "100% (30 Days)",
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Total Cancelled",
    value: "0",
    duration: "0% (30 Days)",
    icon: <CancelScheduleSendIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "0.00",
    value: "Rs.",
    subtitle: "Total Revenue",
    duration: "100% (30 Days)",
    icon: <AccountBalanceWalletIcon fontSize="large" />,
  },
];

const createData = (id, orderby, date, namep, pickup, named, drop, contact) => ({
  id,
  orderby,
  date,
  namep,
  pickup,
  named,
  drop,
  contact,
});

const initialRows = [
  createData(
    1,
    "Customer A",
    "2023-05-15",
    "John Smith",
    "Mumbai",
    "Raj Sharma",
    "Delhi",
    "9876543210"
  ),
  createData(
    2,
    "Customer B",
    "2023-05-16",
    "Priya Patel",
    "Bangalore",
    "Amit Singh",
    "Hyderabad",
    "8765432109"
  ),
  createData(
    3,
    "Customer C",
    "2023-05-17",
    "Rahul Verma",
    "Chennai",
    "Neha Gupta",
    "Kolkata",
    "7654321098"
  ),
  createData(
    4,
    "Customer D",
    "2023-05-18",
    "Sneha Joshi",
    "Pune",
    "Vikram Rao",
    "Ahmedabad",
    "6543210987"
  ),
  createData(
    5,
    "Customer E",
    "2023-05-19",
    "Arun Kumar",
    "Jaipur",
    "Meera Nair",
    "Lucknow",
    "5432109876"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

const headCells = [
  { id: "sno", label: "S.No", sortable: false },
  { id: "orderby", label: "Order By", sortable: true },
  { id: "date", label: "Date", sortable: true },
  { id: "namep", label: "Sender Name", sortable: true },
  { id: "pickup", label: "Pick Up", sortable: false },
  { id: "named", label: "Receiver Name", sortable: false },
  { id: "drop", label: "Drop", sortable: false },
  { id: "contact", label: "Contact", sortable: false },
  { id: "action", label: "Action", sortable: false },
];

const BookingCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const cardColor = "#0155a5";
  const cardLightColor = "#e6f0fa";
  const [activeCard, setActiveCard] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(initialRows);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const handleAdd = () => {
    navigate("/bookingform");
  };

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

 const handleView = (row) => {
  navigate('/bookingform', { 
    state: { 
      booking: row, 
      mode: 'view'  
    } 
  });
};
  const handleEdit = (row) => {
    navigate('/bookingform', { state: { booking: row, mode: 'edit' } });
  };

  const handleDeleteClick = (row) => {
    setBookingToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setBookings(bookings.filter(booking => booking.id !== bookingToDelete.id));
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  const filteredRows = bookings.filter(
    (row) =>
      (row.orderby && row.orderby.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.namep && row.namep.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.named && row.named.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.pickup && row.pickup.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.drop && row.drop.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.contact && row.contact.includes(searchTerm))
  );

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Manage Booking
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Add Booking
        </Button>
      </Box>

      {/* Dashboard Cards */}
      <Grid
        container
        spacing={2}
        sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}
      >
        {cardData.map((card) => (
          <Grid
            item
            key={card.id}
            sx={{ minWidth: 220, flex: 1, display: "flex", borderRadius: 2 }}
          >
            <Card
              onClick={() => handleCardClick(card.id)}
              sx={{
                flex: 1,
                cursor: "pointer",
                border:
                  activeCard === card.id
                    ? `2px solid ${cardColor}`
                    : "2px solid transparent",
                backgroundColor:
                  activeCard === card.id ? cardLightColor : "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[6],
                  backgroundColor: cardLightColor,
                  "& .icon-container": {
                    backgroundColor: cardColor,
                    color: "#fff",
                  },
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Box
                  className="icon-container"
                  sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    backgroundColor:
                      activeCard === card.id ? cardColor : cardLightColor,
                    color: activeCard === card.id ? "#fff" : cardColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  {React.cloneElement(card.icon, { color: "inherit" })}
                </Box>
                <Stack spacing={0.5}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={activeCard === card.id ? "primary" : "text.primary"}
                  >
                    {card.value}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={activeCard === card.id ? "primary" : "text.primary"}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {card.duration}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Admin Table */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1565c0" }}>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sx={{ fontWeight: "bold", color: "white" }}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={() => handleRequestSort(headCell.id)}
                        sx={{ color: "white !important" }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.orderby}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.namep}</TableCell>
                    <TableCell>{row.pickup}</TableCell>
                    <TableCell>{row.named}</TableCell>
                    <TableCell>{row.drop}</TableCell>
                    <TableCell>{row.contact}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleView(row)}
                          title="View"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(row)}
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(row)}
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete booking #{bookingToDelete?.id}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingCard;