import React, { useState, useContext} from 'react';
import axios from 'axios';
// import { toast } from 'react-toastify';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import GeneralContext from "../../contexts/GeneralContext";
import OrderList from "./OrderList";

import './AdminOrders.scss';

const AdminOrders = (props) => {

  const { user, url } = useContext(GeneralContext);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [ordersData, setOrdersData] = useState([]);

  // console.log('🍎🍎', ordersData);

  function onDisplay(event) {

    event.preventDefault();

    // get date from calender in this format: yyyy-mm-dd
    const startDate = new Date(fromDate).toLocaleDateString().slice(0, 10);
    const endDate = new Date(toDate).toLocaleDateString().slice(0, 10);

    axios.get(`${url}/orders`, {
      params: { fromDate: startDate, toDate: endDate}
    })
    .then((response) => {
      const ordersInfo = response.data.ordersInfo;
      const orderDetails = response.data.orderDetails;
      // attach each order detail to it's parent (order info)
      const allData = ordersInfo.map(order => {
        const details = orderDetails.filter(line => line.order_id === order.id);
        return ({...order, details})
      })
      setOrdersData(allData);
    })
    .catch(error => {
      console.log(error.message);
    })
  };

  const onChangeFromDate = (newDate) => {
    // make sure from-date is always smaller that to-date
    if (newDate > toDate) {
      setToDate(newDate);
    }
    setFromDate(newDate);
  }

  const onChangeToDate = (newDate) => {
    if (newDate < fromDate) {
      setFromDate(newDate);
    }
    setToDate(newDate);
  }


  return (
    <div className='admin-orders-page-main'>
      {user.name && 
        <div className='admin-orders-page'>
        <p className="admin-title">Orders Detail!</p>
        <form onSubmit={onDisplay} className='order-date-form'>
          <div className='o-data-range-select'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className='date-picker-to'>
             <DesktopDatePicker
               label="From"
               value={fromDate}
               minDate={new Date('2017-01-01')}
               onChange={onChangeFromDate}
               renderInput={(params) => <TextField {...params} />}
             />
            </div>
            <div className='date-picker-to'>
              <DesktopDatePicker
                label="To"
                value={toDate}
                minDate={new Date('2017-01-01')}
                onChange={onChangeToDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            </LocalizationProvider>
          </div>
          <button type="submit" className='btn-admin-page btn-display'>Display</button>
        </form>
          {ordersData.length !== 0 && 
            <OrderList ordersData={ordersData} /> 
          }
        </div>
      }
    </div>
  );
};

export default AdminOrders;