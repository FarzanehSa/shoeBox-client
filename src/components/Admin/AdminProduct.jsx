import React, {useState, useContext} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
// import FormHelperText from '@mui/material/FormHelperText';

import GeneralContext from "../../contexts/GeneralContext";
import { findProductBySku } from '../../helper/findProductBySku';
import LoadProductForEdit from './LoadProductForEdit';
import LoadAddForm from './LoadAddForm';

import './AdminProduct.scss';

const AdminProduct = (props) => {

  const { user, products, url } = useContext(GeneralContext);
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);

  function onSearch(event) {
    event.preventDefault();
    const productFound = findProductBySku(products, sku);
    if (productFound) {
      axios.get(`${url}/api/products/${productFound.id}`)
      .then((response) => {
        setProduct((prev) => response.data.product);
        setAvailableSizes((prev) => response.data.availableSizes);
      })
      .catch(error => {
        console.log(error.message);
      })
      } else {
      setProduct({sku});
      toast("New Product, Start Inserting Data", {type: 'info'})
    }
  };

  function onResetSearch(event) {
    setSku("");
    setProduct({});
    setAvailableSizes([])
  };

  // console.log('SKU: ', sku);
  // console.log('Product: ', product);
  // console.log('Available: ', availableSizes);

  return (
    <div className='admin-product-page-main'>
      {user.name && 
        <div className='admin-product-page'>
          <p className='admin-title'>Input SKU in order to Edit or Add new product!</p>
          <div className='search-sku'>
            <form onSubmit={onSearch} className='search-sku-form'>
              <div className='sku-with-helper'>
                <div className='sku-feild'>
                  <TextField
                    required
                    label="SKU"
                    id="sku"
                    name="sku"
                    value={sku.trim()}
                    onChange={(event) => setSku(event.target.value)}
                    variant="standard"
                    disabled={Object.keys(product).length !== 0}
                    margin="normal"
                    sx={{ m: 0, width: '16ch' }}
                  />
                </div>
                {/* <FormHelperText>pattern: 4digits/c/2digits</FormHelperText> */}
                {/* <FormHelperText>exp: 1001c02</FormHelperText> */}
              </div>
              <button type="submit" className='btn-admin-page btn-sku-search'><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> Search</button>
              <button type="button" onClick={onResetSearch} className='btn-admin-page btn-sku-reset'>Reset</button>
            </form>
          </div>
          { product.sku && !product.name &&  
            <LoadAddForm onSubmit={props.onAdd} onReset={onResetSearch} sku={sku}/>
          }
          { product.name && 
            <LoadProductForEdit product={product} onSubmit={props.onEdit} onReset={onResetSearch} availableSizes={availableSizes}/>
          }
        </div>
      }
    </div>
  );
};

export default AdminProduct;