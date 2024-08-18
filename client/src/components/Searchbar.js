import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useRef } from 'react'
import { ShopContext } from '../context/shop-context'


const Searchbar = () => {
  const { setSearchResults} = useContext(ShopContext);
  const inputRef= useRef ();
  const inputFocus = (e) =>{
    e.preventDefault();
    inputRef.current.focus();
  }

  return (
    <div>
        <form className='searchbarform' >
            <input className="searchinput" ref={inputRef} type= "text" placeholder="Search" onChange={(e)=>setSearchResults(e.target.value.toLowerCase())}/>
            <button onClick={inputFocus}><FontAwesomeIcon icon={faSearch}/></button>
        </form>
    </div>
  )
}

export default Searchbar