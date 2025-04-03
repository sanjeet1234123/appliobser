import React, { useState } from 'react';
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import DocSidebar from '../docSidebar/docSidebar';
import Navbar from "../Common-Componet/Navbar/navbar";
function Documentation(props) {
    return (
        <>
          <Navbar/>
      
      
        <div className="documentation" style={{display:'flex'}}>
            <Sidebar />
            <DocSidebar/>
        </div>
        </>
    );
}

export default Documentation;
