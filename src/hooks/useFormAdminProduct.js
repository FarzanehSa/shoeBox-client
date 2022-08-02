import { useState } from "react";

export default function useFormAdminProduct(baseData, action, reset, baseSize) {
  const [formData, setFormData] = useState(baseData);
  const [errorMsg, setErrorMsg] = useState("");
  const [formSize, setFormSize] = useState(baseSize)

  const handleChange = (event) => {
    const { name, value, type} = event.target;
    if (type === 'file') {
      // setFormData({ ...formData, [name]: `/${event.target.files[0].name}` })
      if (event.target.files.length) {
        setFormData({ ...formData, [name]: `/${event.target.files[0].name}` })
      } else {
        setFormData({ ...formData, [name]: "" })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  };

  const handleCheckBoxChange = (event) => {
    setFormData({ ...formData, disp: !formData.disp });
  }

  const handleChangeBarcode = (event) => {
    const { id, name, value} = event.target;
    formSize[id][name] = event.target.value;
    setFormSize([...formSize])
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(formData.price)) {
      setErrorMsg("Input valid price, with max 2 digits after decimal point")
      setFormData({...formData, price: ""});
    } else {
      setErrorMsg("");
      action(formData, formSize);
      reset();
    };
  }

  return { formData, handleChange, handleSubmit, handleCheckBoxChange, errorMsg, formSize, handleChangeBarcode };
}