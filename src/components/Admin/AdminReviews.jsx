import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

import GeneralContext from "../../contexts/GeneralContext";

import './AdminReviews.scss';

const AdminReviews = () => {

  const { user, url } = useContext(GeneralContext);
  const [newReviews, setNewReviews] = useState([])

  // console.log('😈', newReviews);
  useEffect(() => {
    axios.get(`${url}/reviews`)
    .then((response) => {
      setNewReviews(response.data.newReviews)
    })
    .catch(error => {
      console.log(error.message);
    })
  }, [url]);

  const handleChangeApproved = (event, index) => {
    const afterDecision = newReviews.map((review, i)=> {
      if (i === index) {
        return {...review, display:event.target.checked, inactive: false}
      } else {
        return review;
      }
    })
    setNewReviews(afterDecision)
  }

  const handleChangeReject = (event, index) => {
    const afterDecision = newReviews.map((review, i)=> {
      if (i === index) {
        return {...review, inactive:event.target.checked, display: false}
      } else {
        return review;
      }
    })
    setNewReviews(afterDecision)
  }

  const onSave = () => {

    // only post to server if one of the checkboxes ticked!
    const neededData = newReviews.filter(row => row.display || row.inactive).map(row => {
      return (
        {id: row.id, display: row.display, inactive: row.inactive}
      )
    })
    if (neededData.length) {
      axios.post(`${url}/reviews/edit`, {info: neededData})
      .then(res => {
        toast(`Saved Successfully`, {type: 'success'});
        // update and onle show reviews that are not decided yet
        const remained = newReviews.filter(row => !row.display && !row.inactive);
        setNewReviews(remained);
      })
      .catch(error => {
        toast(`${error.message}`, {type: 'error'});
      })
    }
  }

  const reviewsDataArray = newReviews.map((row, index) => { 
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell align='center'>
          <span className='date'>{row.date}</span>
        </TableCell>
        <TableCell align='center'>
          <div className='product-cell'>
            <img src={row.image1} alt="image1" width="80" height="80" />
            <span>{row.name}</span>
          </div>
        </TableCell>
        <TableCell align='left'>
          <div className='post-cell'>
            <span className='rate'>Rate: {row.rating}</span>
            <span className='headline'>Headline: {row.headline}</span>
            <span className='comments'>Comments: {row.comments}</span>
          </div>
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 28 }
            }}
            color="success"
            onChange={(event) => handleChangeApproved(event, index)}
            checked={row.display}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            sx={{
              color: pink[800],
              '&.Mui-checked': {color: pink[600],},
              '& .MuiSvgIcon-root': { fontSize: 28 }
            }}
            onChange={(event) => handleChangeReject(event, index)}
            checked={row.inactive}
          />
        </TableCell>
      </TableRow>
    );
  })

  return (
    <div className='admin-reviews-page-main'>
      {user.name && 
        <div className='admin-reviews-page'>
          <div className='head-group'>
          <p className="admin-title">New customer reviews</p>
          <button 
            className='btn-admin-page btn-review-save'
            disabled={!newReviews.length}
            onClick={onSave}
          >
            Save
          </button>     
          </div>
          <br />
          <br />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{minWidth: 70}}>Received Date</TableCell>
                    <TableCell align="center" style={{minWidth: 100}}>Item</TableCell>
                    <TableCell align="left" style={{minWidth: 150}}>New Post</TableCell>
                    <TableCell align="center" style={{minWidth: 70}}>Approved</TableCell>
                    <TableCell align="center" style={{minWidth: 70}}>Reject</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviewsDataArray}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      }
    </div>
  );
};

export default AdminReviews;