import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Menu from './Menu'




const SideBar: React.FC<any> = (props)=>{
    // const [menuDom, setMenuDom] = useState<JSX.Element>(<li></li>)
    
    const LocalStyle = createGlobalStyle`

    .wl-sidebar {
        font-family: Poppins,Helvetica,sans-serif;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        width: 13vw;
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
        margin-top: 10vh;
        padding-top: 2vh;
        padding-left:0;
    }

    `



    return(
        <div className="wl-sidebar wl-sidebar--fixed">
                <LocalStyle />
            <div className="wl-sidebar__menu">
                <Menu />
            </div>
        </div>
    )
}

export default SideBar