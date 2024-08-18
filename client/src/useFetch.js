import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [products, setProducts] = useState([]);
    const [loading,setLoading]= useState (false);
    const [error,setError] = useState (null);

    useEffect(()=>{
        setLoading (true);
        axios.get(url).then(response =>{
                setProducts(response.data);
            }).catch((err)=>{
                setError(err);
            }).finally (()=>{
                setLoading(false);
            });
            },[url]);

    return {products, loading, error};
}
