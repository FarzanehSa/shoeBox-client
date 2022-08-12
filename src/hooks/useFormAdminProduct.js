import { useState } from "react";

export default function useFormAdminProduct(baseData, action, reset, baseSize) {
  const [formData, setFormData] = useState(baseData);
  const [errorMsg, setErrorMsg] = useState("");
  const [formSize, setFormSize] = useState(baseSize);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value} = event.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleCheckBoxChange = (event) => {
    setFormData({ ...formData, disp: !formData.disp });
  }

  const handleChangeBarcode = (event) => {
    const { id, name } = event.target;
    formSize[id][name] = event.target.value.trim();
    setFormSize([...formSize])
  }

  const deleteImage = (e) => {
    const name = e.currentTarget.id;
    setFormData({ ...formData, [name]: "" })
  }

  const uploadImage = async e => {
    const name = e.target.name;
    const files = e.target.files;

    const data = new FormData();
    data.append('file', files[0])
    data.append('upload_preset', 'theShoeBoxImages')

    setLoading(true);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'post',
      body: data
    })

    const file = await res.json()
    // console.log(file);
    if (file.secure_url) {
      setFormData({ ...formData, [name]: `${file.secure_url}` })
    } else {
      setFormData({ ...formData})
    }
    setLoading(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const regexBarcode = /^[a-zA-Z0-9]*$/;
    const regexPrics = /^\d+(\.\d{1,2})?$/;

    const validSizes = formSize.filter(row => row.barcode !== "");
    const barcodesArray = validSizes.map(row => row.barcode);
    const duplicates = barcodesArray.filter((barcode, index) => index !== barcodesArray.indexOf(barcode));

    for (const x of barcodesArray) {
      if (!regexBarcode.test(x)) {
        setErrorMsg("Input valid barcode. Only accept charecters and numbers.");
        return;
      }
    }
    // console.log(duplicates);
    if (!regexPrics.test(formData.price)) {
      setErrorMsg("Input valid price, with max 2 digits after decimal point");
      // setFormData({...formData, price: ""});
      } else if (formData.image1 === "") {
        setErrorMsg("Image 1 is required.");
      } else if (duplicates.length) {
        setErrorMsg("There is Duplication in barcodes");
      } else if (!formData.id && validSizes.length === 0) {
        setErrorMsg("You have to add atleast one size with it's barcode");
      } else {
      setErrorMsg("");
      action(formData, validSizes);
      reset();
    };
  }

  return {formData, formSize, errorMsg, loading, handleChange, uploadImage, handleCheckBoxChange, handleChangeBarcode, handleSubmit, deleteImage};
}