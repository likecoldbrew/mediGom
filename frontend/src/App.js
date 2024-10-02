import React, {useEffect, useState} from 'react';
import './admin/sidebar.css';
import axios from 'axios';

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
      <div>
          <div id="app" className="container mx-auto lg:mx-0">
              <div id="sideNavBg" className="fixed inset-0 w-full h-full"></div>
              {/* Side Nav */}
              <div id="sideNav"
                   className="w-64 -ml-64 lg:ml-0 bg-white lg:bg-gray-100 h-full min-h-screen fixed overflow-y-scroll block left-0 z-50">
                  <div className="h-24 flex flex-col justify-center relative">
                      <img src="https://saasadventure.io/img/saas-dark-logo.png" alt="Logo"
                           className="w-16 mx-auto -mt-2"/>
                      <div id="closeSideNav"
                           className="fixed right-0 bg-gray-100 h-8 w-8 flex justify-center items-center rounded-full text-2xl pt-0 pb-1 lg:hidden cursor-pointer mr-10">
                          &times;
                      </div>
                  </div>
                  <div
                      className="bg-gray-300 p-3 mr-3 rounded-r-full text-sm uppercase font-medium text-gray-600 pl-8 hover:bg-gray-800 hover:text-white cursor-pointer transition hover-invert-img">
                      <img src="https://saasadventure.io/img/svgs/arrow-down.svg" alt="down arrow"
                           className="float-left mt-2 mr-2 invert-me"/> Week 1
                  </div>
                  <ul>
                      <li>
                          <a href="#_"
                             className="text-xs p-3 pr-0 pl-8 mt-2 mr-10 block bg-purple-500 text-white rounded-r-full">
                              <img src="https://saasadventure.io/img/svgs/dot.svg" alt="dot"
                                   className="float-left mt-1 mr-2"/>
                              <span className="font-bold mr-1">Day 1</span> Crafting the idea
                          </a>
                      </li>
                      <li>
                          <a href="#"
                             className="text-xs p-3 pr-0 pl-8 mt-2 mr-10 block text-gray-800 rounded-r-full hover:bg-purple-500 hover:text-white hover-invert-img">
                              <img src="https://saasadventure.io/img/svgs/lock.svg" alt="lock"
                                   className="float-left mt-1 mr-2 invert-me"/>
                              <span className="font-bold mr-1">Day 2</span> The Landing Page
                          </a>
                      </li>
                      {/* More list items here... */}
                  </ul>
                  <div
                      className="bg-gray-300 p-3 mr-3 mt-2 rounded-r-full text-sm uppercase font-medium text-gray-600 pl-8 hover:bg-gray-800 hover:text-white cursor-pointer transition hover-invert-img">
                      <img src="https://saasadventure.io/img/svgs/arrow-right.svg" alt="right arrow"
                           className="float-left mr-2 mt-small invert-me"/> Week 2
                  </div>
                  <div
                      className="bg-pink-400 hover:bg-pink-500 p-3 mr-3 mt-2 rounded-r-full text-sm uppercase font-medium text-white pl-8 clearfix relative overflow-hidden transition cursor-pointer img-hover-animate">
                      <img src="https://saasadventure.io/img/svgs/arrow-right.svg" alt="right arrow"
                           className="float-left mr-2 mt-small"/>
                      <span className="float-left ml-2">Goodies</span>
          <img src="https://saasadventure.io/img/svgs/goodies.svg" alt="donut icon"
               className="w-16 absolute -mr-1 right-0 top-0 float-right clearfix"/>
                  </div>
              </div>
              {/* Main Content */}
              <div className="lg:ml-64 lg:pl-10 mb-12">
                  <div className="flex flex-col justify-center h-24 py-2">
                      <div className="flex space-around">
                          <h1 className="flex-1 text-xl font-bold justify-center">
              <span id="menuBtn"
                    className="inline-block lg:hidden mr-2 h-10 w-8 float-left rounded-full flex justify-center cursor-pointer">
                <img src="https://saasadventure.io/img/svgs/menu.svg" alt="menu icon"/>
              </span>
                              <span className="uppercase">Day 1</span> - Crafting the Idea
                          </h1>
                          <div className="relative cursor-pointer mt-1">
                              <div
                                  className="w-5 h-5 absolute right-0 top-0 bg-red-500 rounded-full text-center text-white text-xs font-bold -mr-2 -mt-2 pt-small">4
                              </div>
                              <img src="https://saasadventure.io/img/svgs/bell.svg" alt="Bell Icon"/>
                          </div>
                          <div className="ml-8 -mt-2 flex cursor-pointer relative">
                              <img src="https://saasadventure.io/img/avatar.jpg" alt="User Avatar"
                                   className="w-12 rounded-full border-3 border-purple-400"/>
                              <img src="https://saasadventure.io/img/svgs/angle-down.svg" alt="angle down"
                                   className="pl-2"/>
                          </div>
                      </div>
                  </div>
                  {/* More main content sections here... */}
              </div>
          </div>
      </div>
);
}

export default App;
