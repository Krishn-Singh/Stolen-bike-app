import React from 'react';
import './Navbar.css'

function Navbar() {
  return (
    <div className='top--section w-100'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <h3 className="navbar-brand text-center">Police Department of Mathura</h3>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;