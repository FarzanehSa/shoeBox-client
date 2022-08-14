import React, { useContext, useEffect, useState } from "react";
// import { toast } from 'react-toastify';
import axios from "axios";

import GeneralContext from "../../contexts/GeneralContext";
import {BarChartProduct, BarChartColor, BarChartSize, BarChartSale,} from "./BarChart";

import "./Dashboard.scss";

const Dashboard = () => {

  const { user, url } = useContext(GeneralContext);
  const [topSellProducts, setTopSellProducts] = useState([]);
  const [topSellSizes, setTopSellSizes] = useState([]);
  const [topSellColors, setTopSellColors] = useState([]);
  const [totalSales, setTotalSales] = useState([]);

  useEffect(() => {
    axios.get(`${url}/dashboard`)
    .then(res => {
      // console.log('🍎',res.data);
      setTopSellProducts(res.data.topSellProducts);
      setTopSellSizes(res.data.topSellSizes);
      setTopSellColors(res.data.topSellColors);
      setTotalSales(res.data.totalSales);
    })
    .catch(error => {
      console.log(error.message);
    })
  }, [url]);

  const barProducts = topSellProducts.map(row => {
    return ({x: row.product, y: Number(row.qty) })
  })
  
  const barColors = topSellColors.map(row => {
    return ({x: row.color, y: Number(row.qty) })
  })

  const barSizes = topSellSizes.map(row => {
    return ({x: row.size.toString(), y: Number(row.qty) })
  })

  const barSales = totalSales.map(row => {
    return ({x: row.date, y: (Number(row.total) / 100) })
  })

  return (
    <div className="admin-dashboard-page-main">
      {user.name && 
        <div className="admin-dashboard-page">
          <div className="two-bar-row top-two">
            <div className="barchart pr-chart">
              {barProducts.length !==0 &&
                <BarChartProduct barData={barProducts} />
              }
            </div>
            <div className="barchart sal-chart">
              {barSales.length !==0 &&
                <BarChartSale barData={barSales} />
              }
            </div>
          </div>
          <div className="two-bar-row">
            <div className="barchart co-chart">
              {barColors.length !==0 &&
                <BarChartColor barData={barColors} />
              }
            </div>
            <div className="barchart siz-chart">
              {barSizes.length !==0 &&
                <BarChartSize barData={barSizes} />
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Dashboard;