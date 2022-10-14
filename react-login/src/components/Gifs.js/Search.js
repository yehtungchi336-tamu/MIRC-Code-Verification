import React from 'react'

export function Search({search, setSearch, fetchData, setTitle}) {
// Handle Submit
const handleSubmit = (e)=>{
    // Prevent default
    e.preventDefault();
    // Set Title
    setTitle(search);
    // Fetch
    fetchData(search);
    // Reset form search value
    setSearch('');
}

// RETURN    
    return (

            <form className='gif-search flexrow' onSubmit={handleSubmit}>
              <div className="gifform flexrow">
              <button className='themeBtn'>
            <i className="fal fa-search"></i>
            </button>
              <input 
            className='inputgif'
            type="text"
            value={search}
            onChange={ e => {setSearch(e.target.value)}}
            placeholder='Search GIFs'
            /> 
       
              </div>
            </form>
    )
}
