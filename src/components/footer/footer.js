import React from 'react'
import './footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>© {year} Lazar Veselinovic All Rights Reserved</p>
    </footer>
  );
}
 
export default Footer;