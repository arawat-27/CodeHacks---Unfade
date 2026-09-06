//Import React library
import React, { useState } from "react";

//Importing the useNavigate hook from react-router-dom for navigation
import { useNavigate } from 'react-router-dom'

//Importing the CSS file for styling
import './NavBar.css'

import logoImage from "./logoo.png";

const NavBar = () => {

  //Initializing the useNavigate hook for navigation
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const handleHomeClick = (event) => {
    event.preventDefault();
    navigate("/");
  };
  
  const handleBusinessClick = () => {
    navigate('/Business');
  }
  
  const handleMusicClick = () => {
    navigate('/Music')
  }

  const handleFilmsClick = () => {
    navigate('/Films')
  }

  const handleBooksClick = () => {
    navigate('/Books')
  }

  const handleCollaborateClick = () => {
    navigate("/Collaborate");
  };

  // Navigate to Add Your Work
  const handleAddWorkClick = () => {
    navigate("/AddWork");
  };

  // Open and close the search bar
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    //Main header for the Navbar
    <header className="header">
      {/* Logo of the website - clicking will lead the user back to the home page */}
      <a href="/" className="logo" ><img
            src={logoImage}
            className="logo-image"
            alt="Unfade logo"
          />

          <span className="logo-text">
            Unfade
          </span></a>
      
      {/* Navigation bar containing all the main tabs of the website */}
      <nav className="navbar">
        {/* Tabs on the Navbar */}
        <a href="/" onClick={handleHomeClick}>Home</a>
        <a href="/Business" onClick={handleBusinessClick}>Business</a>
        <a href="/Music" onClick={handleMusicClick}>Music</a>
        <a href="/Films" onClick={handleFilmsClick}>Films</a>
        <a href="/Books" onClick={handleBooksClick}>Books</a>
      </nav>
      <div className="navbar-actions">
        <button
          className="search-button"
          onClick={handleSearchClick}
          aria-label="Search"
        >
          ⌕
        </button>

        <button
          className="collaborate-button"
          onClick={handleCollaborateClick}
        >
          Collaborate
        </button>

        <button
          className="add-work-button"
          onClick={handleAddWorkClick}
        >
          + Add Your Work
        </button>
      </div>

      {/* Search bar remains inside the header */}
      <div
        className={
          searchOpen
            ? "search-container search-open"
            : "search-container"
        }
      >
        <input
          type="search"
          placeholder="Search businesses, music, films, and books..."
          autoFocus={searchOpen}
        />
      </div>

    </header>
  )
}

//Exporting the Navbar component
export default NavBar