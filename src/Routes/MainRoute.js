import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard';
//import Users from '../Pages/Admin/Users';
import DashboardLayout from '../Layout/DashboardLayout';
import BookingCard from '../Pages/Admin/Booking/BookingCard';
import ContactCard from '../Pages/Admin/Contact/ContactCard';
import CustomerCard from '../Pages/Admin/Customer/CustomerCard';
import DeliveryCard from '../Pages/Admin/Delivery/DeliveryCard';
import DriverCard from '../Pages/Admin/Driver/DriverCard';
import VehicleCard from '../Pages/Admin/Vehicle/VehicleCard';
import TrackerCard from '../Pages/Admin/Tracker/TrackerCard';
import QuotationCard from '../Pages/Admin/Quotation/QuotationCard';
import LedgerCard from '../Pages/Admin/Ledger/LedgerCard';
import UserCard from '../Pages/Admin/Manage User/UserCard';
import StationCard from '../Pages/Admin/Manage Station/StationCard';
import StationForm from '../Pages/Admin/Manage Station/Form/StationForm';
//import Customer from '../Pages/Admin/Customer/CustomerCard'
import CustomerForm from '../Pages/Admin/Customer/Form/CustomerForm';
import BookingForm from '../Pages/Admin/Booking/Form/BookingForm';
import QuotationForm from  '../Pages/Admin/Quotation/Form/QuotationForm';
import VehicleForm from '../Pages/Admin/Vehicle/Form/VehicleForm';
import ViewBooking from '../Pages/Admin/Booking/Form/ViewBooking';
import EditBooking from '../Pages/Admin/Booking/Form/EditBooking';
import ViewQuotation from '../Pages/Admin/Quotation/Form/ViewQuotation';
import EditQuotation from '../Pages/Admin/Quotation/Form/EditQuotation';
import ViewVehicle from '../Pages/Admin/Vehicle/Form/ViewVehicle'
import EditVehicle from '../Pages/Admin/Vehicle/Form/EditVehicle'
import TotalRevenue from '../Pages/Admin/Booking/TotalRevenue';
const MainRoute = () => {
    const isAuthenticated = true; // Replace with real auth check

    return isAuthenticated ? (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Booking Routing */}
                <Route path='/booking' element={<BookingCard />} />
                <Route path='/bookingform' element={<BookingForm />} />
                <Route path='/viewbooking' element={<ViewBooking/>} />
                <Route path='/editbooking' element={<EditBooking/>} />
                <Route path='/totalrevenue' element={<TotalRevenue/>} />

                


                {/* contact Routing */}
                <Route path='/contact' element={<ContactCard />} />
                

                  {/* customer routing  */}
                <Route path='/customer' element={<CustomerCard />} />
                <Route path='/customerform' element={<CustomerForm />} />

                {/* delivery routing  */}
                <Route path='/delivery' element={<DeliveryCard />} />
                <Route path='/driver' element={<DriverCard />} />

                {/* vehicle routing */}
                <Route path='/vehicle' element={<VehicleCard />} />
                <Route path='/vehicleform' element={<VehicleForm/>} />
                <Route path='/viewvehicle' element={<ViewVehicle />} />
                <Route path='/editvehicle' element={<EditVehicle />} />




                
                <Route path='/tracker' element={<TrackerCard />} />

                {/* Quotation routing */}
                <Route path='/quotation' element={<QuotationCard />} />
                <Route path='/quotationform' element={<QuotationForm />} />
                <Route path='/viewquotation' element={<ViewQuotation/>} />
                <Route path='/editquotation' element={<EditQuotation/>} />

                
                <Route path='/ladger' element={<LedgerCard />} />
                <Route path='/users' element={<UserCard />} />

                {/* station routing  */}
                <Route path='/station' element={<StationCard />} />
                <Route path='/stationform' element={<StationForm />} />
             
            </Routes>
        </DashboardLayout>
    ) : (
        <Navigate to="/login" />
    );
};

export default MainRoute;
