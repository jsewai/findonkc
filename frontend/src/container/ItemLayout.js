import React, { Fragment }from 'react';
import ItemList from './ItemList';
import Navbar from '../components/Navbar';


const ItemLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <ItemList />
    </Fragment>
  )
}

export default ItemLayout;
