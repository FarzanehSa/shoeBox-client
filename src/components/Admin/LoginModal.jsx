import React from 'react';

import TextField from '@mui/material/TextField';

import useForm from "../../hooks/useForm";
import './modal.scss';

const LoginModal = (props) => {

  const baseFormData = { name: "", password: "" };
  const { formData, handleChange, handleSubmit } = useForm(baseFormData, props.onLogin);

  return (
    <div className='login-modal'>
      <div className='left-section'>
      </div>
      <div className='right-section'>
        <span className='title'>Welcome</span>
        <span className='line-2'>PLEASE LOGIN TO ADMIN DASHBOARD</span>
        <form onSubmit={handleSubmit} className='login-form'>
            <div className='login-username'>
              <TextField 
                required 
                id="name"
                label="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="standard"
                color="success"
                margin="normal"
                size="small"
                focused
                // style={{ color: 'white'}}
                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
              />
            </div>

            <div className='login-password' >
              <TextField
                required 
                id="password"
                label="password"
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                variant="standard"
                color="success"
                margin="normal"
                size="small"
                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                focused
              />
            </div>
            {props.msg && <span className='login-error'>{props.msg}</span>}
            <button type="submit" className="login-button"> Login </button>

        </form>
      </div>
    </div>
  );
};

export default LoginModal;