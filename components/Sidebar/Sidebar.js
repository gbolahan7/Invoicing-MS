import React from 'react';
import Image from 'next/image';

function Sidebar () {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__header">
                    <div className="sidebar__logo">
                        <h2>Abass</h2>
                    </div>
                </div>
                <div className="sidebar__footer">
                    <Image src="/" alt="profile-img" width="30" height="30"/>
                </div>
            </div>            
        </div>)
}


export default Sidebar;