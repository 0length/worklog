import React from 'react'
import { createGlobalStyle } from 'styled-components'


const SideBar: React.FC = ()=>{
    const LocalStyle = createGlobalStyle`
    .wl-sidebar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        width: 255px;
        height: 100%;
        transition: all .3s ease;
        background-color:#fff;
        box-shadow: 0 0 40px 0 rgba(82,63,105,.1);
        flex-direction: column;
    }

    .wl-sidebar--fixed {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 96;
    }

    .wl-sidebar__menu {
    }

    .wl-sidebar__menu ul{
        margin-top: 80px;
        padding-top: 10px;
    }
    `
    
    return(
        <div className="wl-sidebar wl-sidebar--fixed">
                <LocalStyle />
            <div className="wl-sidebar__menu">
                <ul className="">
                    <li>Dashboard</li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar