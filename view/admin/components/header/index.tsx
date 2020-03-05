import React from 'react'
import SearchBar from './Right'
import { createGlobalStyle } from 'styled-components'
import Right from './Right'

const Header: React.FC<any> = (props) =>{
    const LocalStyle = createGlobalStyle`
    .wl-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        height: 8vh;
        transition: all .3s ease;
        background-color:#fff;
        box-shadow: 0 0 40px 0 rgba(82,63,105,.1);
    }

    .wl-header--fixed {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 97;
    }
    `

    return (
        <div className="wl-header wl-grid wl-header--fixed">
            <LocalStyle />
            <Right />
        </div>
    )
}

export default Header