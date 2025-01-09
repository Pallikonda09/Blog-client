
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <Link to="">Pages</Link>
                </li>
                <li>
                  <Link to="">Our Team</Link>
                </li>
                <li>
                  <Link to="">Feuchers</Link>
                </li>
                <li>
                  <Link to="">Pricing</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <Link to="">Wikipedia </Link>
                </li>
                <li>
                  <Link to="">React blog</Link>
                </li>
                <li>
                  <Link to="">Term &amp; Service</Link>
                </li>
                <li>
                  <Link to="">Angular dev</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">Help</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <Link to="/register">Sign Up </Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="">Terms of Services</Link>
                </li>
                <li>
                  <Link to="">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Contact Us
              </h6>
              <p className="contact-info mt-4">
                Contact us if need help withanything
              </p>
              <p className="contact-info">+91 7780189558</p>
               <Link to=''>adityapallikonda66335@gmail.com</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="footer-alt mb-0 f-14">2024 © CopyRights, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
