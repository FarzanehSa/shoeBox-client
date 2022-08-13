import React, {useContext} from 'react';
import useFormAdminProduct from "../../hooks/useFormAdminProduct";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

import GeneralContext from '../../contexts/GeneralContext';

import './AdminProduct.scss';

const LoadProductForEdit = ({product, onSubmit, onReset, availableSizes}) => {

  const {productSpec} = useContext(GeneralContext);

  const newSizes = productSpec.sizes.filter(row => !availableSizes.find(rowData => rowData.size_id === row.id));
  const baseSize = newSizes.map(row => {
    return (
      {
        barcode: "",
        size_id: row.id,
        sku: product.sku,
        size: row.size,
      }
    )
  })

  const categories = productSpec.categories.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.cat}</MenuItem>
    )
  });

  const styles = productSpec.styles.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.style}</MenuItem>
    )
  });

  const colors = productSpec.colors.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.color}</MenuItem>
    )
  });
 
  const baseFormData = { ...product, price: product.price / 100};
  
  const {formData, formSize, errorMsg, loading, handleChange, uploadImage, handleCheckBoxChange, handleChangeBarcode, handleSubmit, deleteImage} = useFormAdminProduct(baseFormData, onSubmit, onReset, baseSize);

  // console.log('🚨🚨🚨',formData);
  // console.log('🚨🚨🚨',formSize);

  const newSizeArray = baseSize.map((row, index) => {
    return (
      <div className='edit-size-row' key={index}>
        <div className='size-feild'>
          <TextField
            id="filled-size"
            label="Size"
            defaultValue={row.size}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            margin='dense'
            sx={{mr: '2em', input: { color: 'DarkGreen' } }}
          />
        </div>
        <FormControl>
          <div className='barcode-feild'>
            <TextField 
              label="barcode"
              id={index.toString()}
              name="barcode"
              value={formSize.barcode}
              onChange={handleChangeBarcode}
              variant="standard"
              margin='dense'
              sx={{input: { color: 'DarkGreen' } }}
            />
          </div>
        </FormControl>
      </div>
    )
  })

  const oldSizeArray = availableSizes.map((row, index) => {
    return (
      <div className='edit-size-row' key={index}>
        <div className='size-feild'>
          <TextField
            id="filled-size"
            label="Size"
            defaultValue={row.size}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            margin='dense'
            sx={{mr: '2em' }}
          />
        </div>
        <div className='barcode-feild'>
          <TextField
            id="filled-barcode"
            label="barcode"
            defaultValue={row.barcode}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            margin='dense'
          />
        </div>
      </div>
    )
  });
  
  return (
    <div className='edit-item-section'>
      <hr />
      <form onSubmit={handleSubmit} className='edit-item-form'>
        <div className='edit-item-form-header'>
          <h2>Edit Product</h2>
          <div className='button-error'>
            <button type="submit" className='btn-admin-page btn-edit-product'> Save</button>
            {errorMsg &&
              <FormHelperText style={{color: 'red'}}>{errorMsg}</FormHelperText>}
          </div>
        </div>

        <div className='edit-top-body'>
          <div className='edit-top-left'>
            <div className='name-price'>
              <div className='name-feild'>
                <TextField
                  required
                  id="name"
                  label="Product's Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="standard"
                  margin='normal'
                  sx={{width: '80%', input: { color: 'indigo' } }}
                />
                <FormHelperText>Required</FormHelperText>
              </div>

              <div className='price-feild'>
                <TextField
                  required
                  id="price"
                  label="Price"
                  name="price"
                  type='number'
                  value={formData.price}
                  onChange={handleChange}
                  variant="standard"
                  margin='normal'
                  sx={{width: '50%', input: { color: 'indigo' } }}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start">$</InputAdornment>)
                  }}
                />
                <FormHelperText>Required</FormHelperText>
              </div>
            </div>

            <div className='description-feild'>
              <TextField
                id="description"
                label="Description"
                multiline
                maxRows={10}
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="standard"
                margin='normal'
                sx={{width: '90%' }}
              />
            </div>

            <div className='category-style-color'>
              <div className='category-feild'>
                <InputLabel id="select-category-label" className='category-feild'>Category</InputLabel>
                <Select
                  labelId="select-category-label"
                  id="select-category"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  variant="standard"
                  sx={{width: '90%' }}
                >
                  {categories}
                </Select>
              </div>

              <div className='style-feild'>
                <InputLabel id="select-style-label">Style</InputLabel>
                <Select
                  labelId="select-style-label"
                  id="select-style"
                  name="style_id"
                  value={formData.style_id}
                  onChange={handleChange}
                  variant="standard"
                  sx={{width: '90%' }}
                >
                  {styles}
                </Select>
              </div>

              <div className='color-feild'>
                <InputLabel id="select-color-label">Color</InputLabel>
                <Select
                  labelId="select-color-label"
                  id="select-color"
                  name="color_id"
                  value={formData.color_id}
                  onChange={handleChange}
                  variant="standard"
                  sx={{width: '90%' }}
                >
                  {colors}
                </Select>
              </div>
            </div>
          </div>
          <div className='edit-top-right'>
            <div className='image-loading'>
              <div className='add-item-image-group'>
                <div className='image-select'>
                  <label htmlFor="file-upload-image1" className="custom-file-upload">
                    Select & Upload Image 1
                  </label>
                  <input 
                    id="file-upload-image1" 
                    type="file"
                    name="image1"
                    accept={'image/*'} 
                    onChange={uploadImage}
                  />
                  {formData.image1 &&
                    <div className='img-preview-part'>
                      <span> preview:</span>
                      <div className='img-preview'>
                        <img
                          src={formData.image1}
                          alt="image1"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div id='image1' onClick={deleteImage}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" className='erase-image'/>
                      </div>
                    </div>
                  }
                  {!formData.image1 && 
                    <FormHelperText>Required</FormHelperText>
                  }     
                </div>

                <div className='image-select'>
                  <label htmlFor="file-upload-image2" className="custom-file-upload">
                    Select & Upload Image 2
                  </label>
                  <input 
                    id="file-upload-image2" 
                    type="file"
                    name="image2"
                    accept={'image/*'} 
                    onChange={uploadImage}
                  />
                  {formData.image2 &&
                    <div className='img-preview-part'>
                      <span> preview:</span>
                      <div className='img-preview'>
                        <img
                          src={formData.image2}
                          alt="image2"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div id='image2' onClick={deleteImage}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" className='erase-image'/>
                      </div>
                    </div>
                  }     
                </div>

                <div className='image-select'>
                  <label htmlFor="file-upload-image3" className="custom-file-upload">
                    Select & Upload Image 3
                  </label>
                  <input 
                    id="file-upload-image3" 
                    type="file"
                    name="image3"
                    accept={'image/*'} 
                    onChange={uploadImage}
                  />
                  {formData.image3 &&
                    <div className='img-preview-part'>
                      <span> preview:</span>
                      <div className='img-preview'>
                        <img
                          src={formData.image3}
                          alt="image3"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div id='image3' onClick={deleteImage}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" className='erase-image'/>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className='loading-image-sign'>
                {loading && <CircularProgress />}
              </div>
            </div>

            <div className='checkbox-display'>
              <FormControlLabel control=
              {
                <Checkbox
                  checked={formData.disp}
                  onChange={handleCheckBoxChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              } label="Display In Collection Page" 
              />
            </div>
          </div>
        </div>
          
        <div className='size-table'>
          { newSizeArray.length !== 0 &&
            <div className='new-sizes'>
              <h3><li>Define unique barcode for these sizes.</li></h3> 
              {newSizeArray}
            </div>
          }
          { oldSizeArray.length !== 0 &&
            <div className='old-sizes'>
              <h3><li>Already defined sizes.</li></h3> 
              {oldSizeArray}
            </div>
          }
        </div>
      </form>
    </div>        
  );
};

export default LoadProductForEdit;