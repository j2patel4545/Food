import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16">
      {/* Newsletter Section */}
      <div className="max-w-4xl  mx-auto px-4">
        <div className="bg-white text-black p-8 shadow-2xl shadow-black rounded-xl  flex flex-col md:flex-row items-center justify-between -mt-24">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">Subscribe Newsletter</h2>
            <p className="text-gray-500 text-sm">
              financial transactions remotely using a mobile
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email."
              className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none w-full md:w-64"
            />
            <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800">
              GET START
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h3 className="text-orange-600 items-center flex text-xl font-semibold">
            <img src="./logo.png" className=" h-20" alt="" />
            <i className=" -mt-3">Onifood</i></h3>
          <p className="text-gray-400 text-sm mt-4">
            Mean if he they been no hold mr. Is at much do made took held help. 
            Latter person am secure of estate genius at.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-orange-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-orange-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-orange-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-orange-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4">Features</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Signup</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Legal Notice</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#">Feedback</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Legal Notice</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <Link to='/admin' className="text-center flex cursor-pointer justify-center text-gray-200 text-xs py-4">
        Admin Login
      </Link>
    </footer>
  );
};

export default Footer;
