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

// Dashboard card data
const cardData = [
  {
    id: 1,
    title: "Booking",
    value: "10",
    subtitle: "Requests",
    duration: "10% (30 Days)",
    icon: <BookOnlineIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Active",
    value: "5",
    subtitle: "Deliveries",
    duration: "50% (30 Days)",
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Total Cancelled",
    value: "2",
    duration: "20% (30 Days)",
    icon: <CancelScheduleSendIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "5000.00",
    value: "Rs.",
    subtitle: "Total Revenue",
    duration: "100% (30 Days)",
    icon: <AccountBalanceWalletIcon fontSize="large" />,
  },
];

// Sample data
const createData = (id, adminId, name, contact, pickup, drop, date, orderby) => ({
  id,
  adminId,
  name,
  contact,
  pickup,
  drop,
  date,
  orderby,
});

const rows = [
  createData(1, "admin001", "John Doe", "9876543210", "Location A", "Location B", "2025-05-01", "Manager A"),
  createData(2, "admin002", "Jane Smith", "9123456780", "City Center", "Suburb B", "2025-05-02", "Manager B"),
  createData(3, "admin003", "Michael Johnson", "9988776655", "Depot 3", "Station X", "2025-05-03", "Manager C"),
  createData(4, "admin004", "Emily Brown", "9871234567", "Warehouse Z", "Client HQ", "2025-05-04", "Manager D"),
  createData(5, "admin005", "Chris Evans", "9345678901", "Hub 1", "Location Y", "2025-05-05", "Manager E"),
  createData(6, "admin006", "Olivia Wilson", "9765432180", "Location Q", "Destination A", "2025-05-06", "Manager F"),
  createData(7, "admin007", "David Miller", "9988123456", "Zone C", "Area X", "2025-05-07", "Manager G"),
  createData(8, "admin008", "Sophia Taylor", "9876543201", "Depot 5", "Office D", "2025-05-08", "Manager H"),
  createData(9, "admin009", "Daniel Anderson", "9765012345", "Branch R", "Warehouse B", "2025-05-09", "Manager I"),
  createData(10, "admin010", "Emma Thomas", "9123459876", "Center L", "Client M", "2025-05-10", "Manager J"),
];

// Sorting helpers
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};
const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
const stableSort = (array, comparator) => {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
};

// Table columns
const headCells = [
  { id: "sno", label: "S.No", sortable: false },
  { id: "orderby", label: "Order By", sortable: true },
  { id: "date", label: "Date", sortable: true },
  { id: "name", label: "Name", sortable: true },
  { id: "pickup", label: "Pick Up", sortable: false },
  { id: "drop", label: "Drop", sortable: false },
  { id: "contact", label: "Contact", sortable: false },
  { id: "action", label: "Action", sortable: false },
];

const QuotationCard = () => {
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

  const handleAdd = () => navigate("/quotationform");
  const handleCardClick = (id) => setActiveCard(activeCard === id ? null : id);
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

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this quotation?");
    if (confirm) {
      alert(`Quotation with ID ${id} deleted.`);
      // Add your API delete logic or state update here
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.adminId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.contact.includes(searchTerm)
  );
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Manage Quotation
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Quotation
        </Button>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={2} sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}>
        {cardData.map((card) => (
          <Grid item key={card.id} sx={{ minWidth: 220, flex: 1, display: "flex", borderRadius: 2 }}>
            <Card
              onClick={() => handleCardClick(card.id)}
              sx={{
                flex: 1,
                cursor: "pointer",
                border: activeCard === card.id ? `2px solid ${cardColor}` : "2px solid transparent",
                backgroundColor: activeCard === card.id ? cardLightColor : "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[6],
                  backgroundColor: cardLightColor,
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    backgroundColor: activeCard === card.id ? cardColor : cardLightColor,
                    color: activeCard === card.id ? "#fff" : cardColor,
                  }}
                >
                  {React.cloneElement(card.icon, { color: "inherit" })}
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="h5" fontWeight="bold">{card.value}</Typography>
                  <Typography variant="subtitle1">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.subtitle}</Typography>
                  <Typography variant="caption" color="text.disabled">{card.duration}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table Search */}
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

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1565c0" }}>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{ fontWeight: "bold", color: "white" }}
                  sortDirection={orderBy === cell.id ? order : false}
                >
                  {cell.sortable ? (
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : "asc"}
                      onClick={() => handleRequestSort(cell.id)}
                      sx={{ color: "inherit" }}
                    >
                      {cell.label}
                    </TableSortLabel>
                  ) : (
                    cell.label
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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.pickup}</TableCell>
                  <TableCell>{row.drop}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton size="small" color="info" onClick={() => navigate('/viewquotation')}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary" onClick={() => navigate('/editquotation')}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} />
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
  );
};

export default QuotationCard;
