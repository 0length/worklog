import React, { useState } from 'react'
import { Input } from '../element'
import { createGlobalStyle } from 'styled-components'
import ActiveAccount from './ActiveAccount'
const Right: React.FC<any> = (props)=>{
    const [query, setQuery] = useState<string>('')
    const [toggleAA, setToggleAA] = useState<boolean>(false)

    const LocalStyle = createGlobalStyle`
    .wl-header__right {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        padding: 0;
        padding-right: 0px;
        padding-right: 25px;
        margin-left:auto;
      }
    
      .wl-header__right-wrapper {
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
      }
    
      .wl-header__right-icon {
        color: #727A7E;
        font-weight: 300;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        align-self: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        transition: all .3s;
      }

      .wl-header__right-icon:hover {
          background-color: #f5f6fc

      }
      
      .wl-header__right-icon__translate {
            background-color: #fff;
            width: 33px;
            height: 33px;
            margin: 10px;
      }

      .wl-header__right-icon__translate:hover {
        background-color: #F9CED0;
        transition: active 0.5 1s;
    }

      .wl-header__right-icon__translate img{
        -webkit-filter: drop-shadow(1px 1px 0 white)
        drop-shadow(-1px -1px 0 white);
        filter: drop-shadow(1px 1px 0 white) 
        drop-shadow(-1px -1px 0 white);
      }

      .wl-header__right-icon__profile {
          margin: 0 10px;
          background-color: #22b9ff;
          color: white;
          z-index: 99;
      }

      .wl-header__right-icon__profile:hover {
        color: #22b9ff;
        background-color: white;
        transition: active 0.5 1s;
    }

    .wl-header__right-icon__profile:active {
        color: white;
        transition:  color 0.5s .3s;
        transition:  background-color .5s .1s;
        background-color: #22b9ff;   
    }

    .wl-header__right-icon__quckpanel {
        margin: 0 10px;
        background-color: #fbce44;
        color: white;
    }

    .wl-header__right-icon__quckpanel:hover {
      color: #fbce44;
      background-color: white;
      transition: active 0.5 1s;
  }

  .wl-header__right-icon__quckpanel:active {
      color: white;
      transition:  color 0.5s .3s;
      transition:  background-color .5s .1s;
      background-color: #fbce44;   
  }
    `
    return (
        <div className="wl-header__right">
            <LocalStyle />
             <div className="wl-header__right-wrapper"><span className="wl-header__right-icon"><i className="flaticon2-search-1"/></span></div>
             <div className="wl-header__right-wrapper"><span className="wl-header__right-icon"><i className="flaticon2-bell-alarm-symbol"/></span></div>
             <div className="wl-header__right-wrapper"><span className="wl-header__right-icon"><i className="flaticon2-gear"/></span></div>
             <div className="wl-header__right-wrapper"><span className="wl-header__right-icon wl-header__right-icon__translate"><img src="/static/plugins/custom-icon/icon/translate.png"/></span></div>
             <div className="wl-header__right-wrapper"><span className="wl-header__right-icon wl-header__right-icon__profile " onClick={()=>setToggleAA(!toggleAA)}><i className="flaticon2-user-outline-symbol"/></span></div>
             <div className="wl-header__right-wrapper"><span className="wl-header__right-icon wl-header__right-icon__quckpanel "><i className="flaticon2-cube-1"/></span></div>
            {/* <Input {...{styleProfile: {}}} onChange={(e:any)=>{setQuery(e.target.value)}} type="text" placeholder="Search" name="search-bar" /> */}
            {toggleAA && <ActiveAccount {...{toggle: toggleAA}}/>}
        </div>
    )
}

export default Right