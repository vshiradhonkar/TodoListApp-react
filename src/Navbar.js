import React from 'react';
import "./Navbar.css";
import ListIcon from '@material-ui/icons/List';

function Navbar() {
  return (
    <div>
        <nav class="navbar">
            <h1 className='main_heading'>
                <ListIcon className='heading_icon'/> To-Do List
            </h1>
        </nav>
    </div>
  )
}

export default Navbar