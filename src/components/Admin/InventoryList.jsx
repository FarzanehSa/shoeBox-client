import React, {useEffect, useRef} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import './AdminInventory.scss';

const InventoryList = ({inventoryData, product, onClickHandler}) => {

  const barcodesRef = useRef([]);

  // console.log(inventoryData);
  // console.log(product);

  useEffect(() => {
    const productIndex = inventoryData.indexOf(product);
    productIndex === -1 ? scroll(0) : scroll(productIndex);
  }, [product]); // eslint-disable-line

  const scroll = (index) =>
    barcodesRef && barcodesRef.current[index] && barcodesRef.current[index].scrollIntoView({ behavior: "smooth", block: "center"});

  useEffect(() => {
    barcodesRef.current = barcodesRef.current.slice(0, inventoryData.length);
  }, [inventoryData]);

  const inventoryDataArray = inventoryData.map((row, index) => {

    const classSelect = row.select ? "select" : "";
      
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.barcode} ref={el => barcodesRef.current[index] = el} onClick={() => onClickHandler(row.barcode)}>
        <TableCell align='center' className={classSelect} >
          <span className='row-cell'>{index + 1}</span>
        </TableCell>
        <TableCell align='center' className={classSelect} >
          <span className='barcode-cell'>{row.barcode}</span>
        </TableCell>
        <TableCell align='center' className={classSelect} >
          <span className='size-cell'>{row.size}</span>
        </TableCell>
        <TableCell align='center' className={classSelect} >
          <div className='item-cell'>
            <img src={row.image1} alt="image1" className='inventory-image'/>
            <div className='details'>
              <span className='sku'>SKU: {row.sku}</span>
              <span className='item-name'>{row.name}</span>
            </div>
          </div>         
        </TableCell>
        <TableCell align='center' className={classSelect} >
          <span className='size-cell'>{row.qty}</span>
        </TableCell>
      </TableRow>
    );
  })

  return (
    <div className='inventory-section'>
      <hr />
      <p className='admin-inventory-title'>Inventory List</p>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 20 }}>Row</TableCell>
                <TableCell align="center" style={{ minWidth: 40 }}>Barcode</TableCell>
                <TableCell align="center" style={{ minWidth: 30 }}>Size</TableCell>
                <TableCell align="center" style={{ minWidth: 80 }}>Item Details</TableCell>
                <TableCell align="center" style={{ minWidth: 40 }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryDataArray}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
};

export default InventoryList;