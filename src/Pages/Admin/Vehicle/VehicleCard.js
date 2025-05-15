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
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const cardData = [
  {
    id: 1,
    title: "Available Vehicle",
    value: "12",
    duration: "+15% (30 Days)",
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Total Vehicle",
    value: "45",
    duration: "+8% (30 Days)",
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Deactive Vehicle",
    value: "5",
    duration: "-2% (30 Days)",
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "Blacklisted Vehicle",
    value: "3",
    duration: "+1% (30 Days)",
    icon: <LocalShippingIcon fontSize="large" />,
  },
];

// Function to generate random vehicle data
const generateRandomVehicles = () => {
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];
  const models = ["Toyota Camry", "Honda Accord", "Ford F-150", "Chevrolet Silverado", "Tesla Model 3", "BMW X5"];
  const firstNames = ["John", "Jane", "Robert", "Emily", "Michael", "Sarah"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller"];
  
  return Array.from({ length: 25 }, (_, i) => {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      id: `VH${1000 + i}`,
      vehicleId: `VH${1000 + i}`,
      location: location,
      ownerName: `${firstName} ${lastName}`,
      vehicleModel: model,
      status: Math.random() > 0.8 ? "Inactive" : "Active",
      registrationDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toLocaleDateString(),
      // Adding more detailed data that might be needed for view/edit pages
      registrationNumber: `REG${Math.floor(Math.random() * 10000)}`,
      manufactureYear: 2015 + Math.floor(Math.random() * 8),
      purchaseDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3)).toLocaleDateString(),
      insuranceProvider: ["Geico", "State Farm", "Progressive", "Allstate"][Math.floor(Math.random() * 4)],
      policyNumber: `POL${Math.floor(Math.random() * 100000)}`,
    };
  });
};

const initialRows = generateRandomVehicles();

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
  { id: "vehicleId", label: "Vehicle ID", sortable: true },
  { id: "location", label: "Location", sortable: true },
  { id: "ownerName", label: "Owner Name", sortable: true },
  { id: "vehicleModel", label: "Vehicle Model", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "action", label: "Action", sortable: false },
];

const VehicleCard = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 
  const cardColor = "#0155a5";
  const cardLightColor = "#e6f0fa";
  const [activeCard, setActiveCard] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ownerName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(initialRows);

  const handleAdd = () => {
    navigate("/vehicleform"); 
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

  const handleView = (vehicle) => {
    // Navigate to view page with vehicle ID as parameter
    navigate('/viewvehicle', { 
      state: { vehicleData: vehicle } 
    });
  };

  const handleEdit = (vehicle) => {
    // Navigate to edit page with vehicle ID as parameter
    navigate('/editvehicle', { 
      state: { vehicleData: vehicle } 
    });
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete vehicle ${row.vehicleId}?`)) {
      setRows(rows.filter(r => r.id !== row.id));
      alert(`Vehicle ${row.vehicleId} has been deleted`);
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase())
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
          Manage Vehicle
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Add Vehicle
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

      {/* Vehicle Table */}
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
                    sx={{ color: "white", fontWeight: "bold" }}
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
                    <TableCell>{row.vehicleId}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.ownerName}</TableCell>
                    <TableCell>{row.vehicleModel}</TableCell>
                    <TableCell sx={{ color: row.status === "Active" ? "success.main" : "error.main" }}>
                      {row.status}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEdit(row)}
                          aria-label="edit"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => handleView(row)}
                          aria-label="view"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(row)}
                          aria-label="delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
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
    </Box>
  );
};

export default VehicleCard;