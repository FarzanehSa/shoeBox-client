import React, {useEffect, useState, useContext} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import LinearProgress from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

import GeneralContext from "../../contexts/GeneralContext";
import {findProductByBarcode} from '../../helper/findProductByBarcode';
import InventoryList from './InventoryList';

import './AdminInventory.scss';

const AdminInventory = () => {

  const { user, url } = useContext(GeneralContext);
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState({});
  const [newQty, setNewQty] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [inventoryData, setInventoryData] = useState([]);

  // console.log(product);
  // console.log(inventoryData);

  useEffect(() => {
    axios.get(`${url}/api/inventory`)
    .then((response) => {
      setInventoryData(response.data.inventoryInfo.map(row => ({...row, select: false})));
    })
    .catch(error => {
      console.log(error.message);
    })
  }, [url]);

  useEffect(() => {
    setInventoryData(pre => pre.map(row => {
      return row.barcode === product.barcode ? ({...row, select: true}) : ({...row, select: false});
    }))
  }, [product]);

  function onSearch(event) {
    event.preventDefault();
    const productFound = findProductByBarcode(inventoryData, barcode);
    if (productFound) {
      setProduct(productFound);
    } else {
      toast("Barcode not exist", {type: 'error'})
    }
  };

  function onResetSearch(event) {
    setBarcode("");
    setProduct({});
  };

  const handleChange = (event) => {
    setNewQty(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex =  /^[1-9]\d*$/ ;
    if (!regex.test(newQty)) {
      setErrorMsg("*Input valid quantity")
    } else {
      setErrorMsg("");
      setProduct({});
      addToInvetory(barcode, newQty);
      setNewQty("");
      setBarcode("");
    };
  };

  const addToInvetory = (barcode, newQty) => {
    axios.post(`${url}/api/inventory`, {barcode, newQty})
    .then(res => {
      const updatedInvetoryLine = res.data;
      toast(`Inventory update successful`, {type: 'success'});
      const newInvData = inventoryData.map(row => {
        if (row.barcode === updatedInvetoryLine.barcode) {
          row.qty = updatedInvetoryLine.quantity;
          row.select = false;
        }
        return row;
      })
      setInventoryData(newInvData);
    })
    .catch(error => {
      toast(`${error.message}`, {type: 'error'});
    })
  }

  const onClickHandler = (barcode) => {
    setProduct(findProductByBarcode(inventoryData, barcode))
    setBarcode(barcode);
  }

  return (
    <div className='admin-inventory-page-main'>
      {user.name && 
        <div className='admin-inventory-page'>
          <h3>Enter product's barcode or select by clicking on it's row to Update Inventory!</h3>
          <div className='search-barcode-set-qty'>
            <div className='search-barcode'>
              <form onSubmit={onSearch} className='search-barcode-form'>
                <div className='barcode-input'>
                  <TextField
                    required
                    label="Barcode"
                    id="barcode"
                    name="barcode"
                    value={barcode.trim()}
                    onChange={(event) => setBarcode(event.target.value)}
                    variant="standard"
                    disabled={Object.keys(product).length !== 0}
                    margin="normal"
                    sx={{ m: 0, width: '18ch' }}
                  />
                </div>
                <button type="submit" className='btn-admin-page btn-inventory-search'><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> Search</button>
              </form>
              <div>
                <button onClick={onResetSearch} className='btn-admin-page btn-inventory-reset'>Reset</button>
              </div>
            </div>
            {product.barcode && 
              <div className='xxx'>
              <form onSubmit={handleSubmit} className='set-qty-form' >
                <div >
                  <TextField 
                    required
                    label="quantity"
                    id="quantity"
                    type="number"
                    min="1"
                    name="quantity"
                    value={newQty}
                    onChange={handleChange}
                    variant="standard"
                    margin="normal"
                    sx={{ m: 0, width: '18ch' }}
                  />
                  {errorMsg &&
                  <FormHelperText style={{color: 'red'}}>{errorMsg}</FormHelperText>}
                </div>
                <button type="submit" className='btn-admin-page btn-add-qty'> Add To Quantity </button>
              </form>
              </div>
            }
          </div>
          { inventoryData.length === 0 ?
            <div className="page-loading">
              <LinearProgress color="secondary" />
            </div> :
            <InventoryList inventoryData={inventoryData} product={product} onClickHandler={onClickHandler}/>
          }
        </div>
      }
    </div>
  );
};

export default AdminInventory;