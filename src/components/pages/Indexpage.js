import React from 'react'

import ShowProducts from './showProducts'
import SearchComponent from './searchComponent'


const Indexpage = () => {
  return (
    <div>
        <SearchComponent></SearchComponent>
        <ShowProducts />
    </div>
  )
  }

export default Indexpage;