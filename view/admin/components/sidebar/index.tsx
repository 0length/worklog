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
        margin-top: 80px;
        padding-top: 10px;
    }

    .wl-sidebar__menu-main{
        margin: none;
        list-style: none;
        box-sizeing: border-box;
        
    }

    .wl-sidebar__menu-main__item{
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        float; none;
        padding:0;
        flex-direction: column;
        margin: 2px 0;
        transition: background-color .3s;

    }
    .wl-sidebar__menu-main__item-toggle{
        display: flex;
        flex-grow: 1;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        margin: 0;
        padding: 5px 40px;
        text-decoration: none;
        outline: 0;
        min-height: 35px;
    }
    
    .wl-sidebar__menu__text{
        display: flex;
        align-item: center;
        flex-grow: 1;
        font-weight: 400;
        font-size: 1rem;
        text-transform: initial;
        -webkit-box-align: center;
        -webkit-box-flex: 1;
        padding: 0;
        text-transform: capitalize;
        cursor: pointer;
    }

    .wl-sidebar__menu-2nd{
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        margin: none;
        list-style: none;
        box-sizeing: border-box;
        transform: translateZ(0);
        -webkit-transform-style: preserve-3d;
    }

    .wl-sidebar__menu-2nd__item{
        display flex;
        float; none;
        padding:0;
        flex-direction: column;
        margin: 2px 0;
        transition: background-color .3s;
    }

    .wl-sidebar__menu-nd__item-toggle{
        display: flex-box;
        flex-grow: 1;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        margin: 0;
        text-decoration: none;
        outline: 0;
        min-height: 25px;
        margin-left: 10px;
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