import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMenu, setActiveMenu } from '../../../../reducer/menu/actions'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
.wl-sidebar__menu-main{
    margin: none;
    list-style: none;
    box-sizeing: border-box;
    margin-left: -1vw;

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
    padding: 1vh 2vw;
    text-decoration: none;
    outline: 0;
    min-height: 3.5vh;
    margin-left: -1.5vw;
    z-index:97;
}

.wl-sidebar__menu__text{
    display: flex;
    align-item: center;
    flex-grow: 1;
    font-weight: 400;
    font-size: 1.8vh;
    color: #595d6e;;
    text-transform: initial;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
    padding: 0;
    text-transform: capitalize;
    cursor: pointer;
}

.wl-sidebar__menu-2nd{
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: none;
    list-style: none;
    box-sizeing: border-box;
    transform: translateZ(0);
    -webkit-transform-style: preserve-3d;
    margin-left: 0vw;
    transform: translateY(0);
}

.wl-sidebar__menu-2nd__item{
    display flex;
    float; none;
    padding:0;
    flex-direction: column;
    margin: 2px 0;
    transition: background-color .3s;
    transition: all 1ms linear 0s;
    transition: height 0.5s linear 0s;
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
    margin-left: -0.5vw;
}

 .hidden{
    opacity: 0;
    height: 0;
    overflow: hidden;
 }
 .show{
     transition: all 0.5s;
     height: 100%;
}

 .active {
    color: #2384FB;
    & > .wl-sidebar__menu-main__item-toggle {
        & > span {
            color: #2384FB;
        }
    }

    .wl-sidebar__menu-nd__item-toggle.active {
        & > span {
            color: #2384FB;
        }
    }
 }

 .wl-sidebar__menu-nd__item-toggle.active {
    & > span {
        color: #2384FB;
    }
}
`

const Menu: React.FC<any> = (props)=>{
const [dom, setDom] = useState<JSX.Element>(<></>)

useEffect(()=>{
    // tslint:disable-next-line: no-unused-expression
    props.user && props.user.authToken && props.getMenu(`{ menus { name, parent_name, sequence } }`)
},[props.user.authToken])

useEffect(()=>{
    if(props.menu.data.length>0){
        const menuDom = props.menu.data.filter((item: any)=>item.parent_name==="").map((item: any, idx: any) => {
            return (
            <li
                key={`sidebar-menu-${item.parent_name}-${item.sequence}`}
                className={"wl-sidebar__menu-main__item "+item.name}
            >
                <div className="wl-sidebar__menu-main__item-toggle" onClick={(e: any)=>{
                    // todo: create function for this
                    props.setActiveMenu(item.name)
                    const element: any = document.querySelectorAll('.wl-sidebar__menu-main__item.'+item.name)[0]
                    document.querySelectorAll('.wl-sidebar__menu-main__item')
                        .forEach((a: any)=>a.classList.toggle("active", false))
                    document.querySelectorAll('.wl-sidebar__menu-nd__item-toggle')
                        .forEach((a: any)=>a.classList.toggle("active", false))
                    !element.classList.contains("active") ?element.classList.toggle("active", true)
                        :element.classList.toggle("active", false)
                    const subMenuClassList = element.querySelector('.wl-sidebar__menu-2nd').classList
                    !subMenuClassList.contains("hidden")?subMenuClassList.toggle("hidden", true)
                        :subMenuClassList.toggle("hidden", false)
                    subMenuClassList.contains("show")?subMenuClassList.toggle("show", false):subMenuClassList.toggle("show", true)
                 }}>
                <i className={"flaticon2-"+item.name}/>&nbsp;&nbsp;&nbsp;
                <span className="wl-sidebar__menu__text">{item.name}</span>
                </div>
                <ul className="wl-sidebar__menu-2nd show">
                    {
                        props.menu.data.filter((child: any)=>child.parent_name===item.name)
                            .map((child: any)=>{
                            return(<li
                                key={`sidebar-menu-${item.sequence}-${child.sequence}`}
                                className="wl-sidebar__menu-2nd__item"
                            >
                                    <div className={"wl-sidebar__menu-nd__item-toggle "+child.name} onClick={(e: any)=>{
                                        props.setActiveMenu(child.name)
                                        const element: any = document.querySelectorAll('.wl-sidebar__menu-nd__item-toggle.'+child.name)[0]
                                        document.querySelectorAll('.wl-sidebar__menu-nd__item-toggle')
                                            .forEach((a: any)=>a.classList.toggle("active", false))
                                        element.classList.contains("active") ?element.classList.toggle("active", false)
                                            :element.classList.toggle("active", true)
                                    }}>
                                    &nbsp;&nbsp;&nbsp;
                                        <span className="wl-sidebar__menu__text">{child.name}</span>
                                    </div>
                            </li>)
                        })
                    }
                </ul>
            </li>)
        })
        setDom(menuDom)
    }
},[props.menu.data])
    return (<ul className="wl-sidebar__menu-main"><GlobalStyle />{dom}</ul>)
}

const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
        getMenu,
        setActiveMenu
    }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Menu)