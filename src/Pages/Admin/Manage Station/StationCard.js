import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { ReactComponent as CustomCarIcon } from '../../../assets/station/car.svg';
import { AdsClick, Search } from '@mui/icons-material';
import StationForm from '../Manage Station/Form/StationForm';

const StationCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [stations, setStations] = useState(() => {
    const savedStations = localStorage.getItem('stations');
    return savedStations ? JSON.parse(savedStations) : [
      { 
        id: 'STN001', 
        stationName: 'Alpha Station', 
        contact: '9876543210',
        email: 'alpha@example.com',
        address: '123 Main St',
        street: 'Main Street',
        city: 'Metropolis',
        state: 'State',
        pinCode: '123456'
      }
    ];
  });
  const [currentStation, setCurrentStation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('stations', JSON.stringify(stations));
  }, [stations]);

  const handleSubmit = (values) => {
    if (isEditing && currentStation) {
      // Update existing station
      setStations(stations.map(station => 
        station.id === currentStation.id ? { ...station, ...values } : station
      ));
    } else {
      // Add new station
      const newStation = {
        id: `STN${(stations.length + 1).toString().padStart(3, '0')}`,
        ...values
      };
      setStations([...stations, newStation]);
    }
    setShowForm(false);
    setCurrentStation(null);
    setIsEditing(false);
  };

  const handleEdit = (station) => {
    setCurrentStation(station);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAdd = () => {
    setCurrentStation(null);
    setIsEditing(false);
    setShowForm(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ m: 2 }}>
          Manage Station
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AdsClick />}
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            padding: '6px 20px',
            backgroundColor: '#0155a5',
            '&:hover': { backgroundColor: '#013f71' },
          }}
        >
          <Typography variant="h6" sx={{ color: 'white' }}>Add</Typography>
        </Button>
      </Box>

      <Card sx={{ m: 2, boxShadow: 3, p: 2, backgroundColor: '#0155a5', 
        color: '#ffffff' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <CustomCarIcon width={74} height={77} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h6" fontWeight="600">{stations.length}</Typography>
              <Typography variant="body2" sx={{ color: '#ffffffa0' }}>Total stations</Typography>
              <Typography variant="h6">(30 days)</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff', borderRadius: '20px' },
            '& .MuiInputLabel-root': { color: '#0155a5' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0155a5' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#013f71' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: '#0155a5' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ margin: '0 auto', mt: 2, maxWidth: '97%' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#0155a5' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>S. No</TableCell>
              <TableCell sx={{ color: 'white' }}>Station ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Station Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>City</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((station, index) => (
              <TableRow key={station.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{station.id}</TableCell>
                <TableCell>{station.stationName}</TableCell>
                <TableCell>{station.contact}</TableCell>
                <TableCell>{station.email}</TableCell>
                <TableCell>{station.city}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleEdit(station)}
                    sx={{
                      color: '#0155a5',
                      borderColor: '#0155a5',
                      '&:hover': {
                        backgroundColor: '#0155a510',
                        borderColor: '#013f71',
                      }
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StationForm 
        open={showForm} 
        onClose={() => {
          setShowForm(false);
          setCurrentStation(null);
          setIsEditing(false);
        }} 
        onSubmit={handleSubmit}
        initialValues={currentStation}
        isEditing={isEditing}
      />
    </>
  );
};

export default StationCard;