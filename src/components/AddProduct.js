import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct =()=>{

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();

    

    const addProduct = async()=>{
        
       // console.warn(name, price, category, company);
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);

        let result = await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        navigate('/')
    }


    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input className = "inputBox" type ="text" placeholder='Enter Product Name' 
            onChange={(e)=>setName(e.target.value)} value ={name}/>

            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input className = "inputBox" type ="text" placeholder='Enter Product Price' 
             onChange={(e)=>setPrice(e.target.value)} value ={price}/>

             {error && !price && <span className='invalid-input'>Enter valid name</span>}

            <input className = "inputBox" type ="text" placeholder='Enter Product Category' 
             onChange={(e)=>setCategory(e.target.value)} value ={category}/>

            {error && !category && <span className='invalid-input'>Enter valid name</span>}

            <input className = "inputBox" type ="text" placeholder='Enter Product Company' 
             onChange={(e)=>setCompany(e.target.value)} value ={company}/>
             
            {error && !company && <span className='invalid-input'>Enter valid name</span>}

            <button className = "appButton"
            onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;