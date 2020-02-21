import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMenu, setActiveMenu } from '../../../../reducer/menu/actions'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 .hidden{
    display: none;
 }
 .show{
    display: flex;
}

 .active {
    color: #22B9FF;
    & > .wl-sidebar__menu-main__item-toggle {
        & > span {
            color: #22B9FF;   
        }
    }

    .wl-sidebar__menu-nd__item-toggle.active {
        & > span {
            color: #22B9FF;   
        }
    }
 }

 .wl-sidebar__menu-nd__item-toggle.active {
    & > span {
        color: #22B9FF;   
    }
}
`

const Menu: React.FC<any> = (props)=>{
const [dom, setDom] = useState<JSX.Element>(<></>)

useEffect(()=>{
    props.user && props.user.authToken && props.getMenu(`{ menus { name, parent_name, sequence } }`)
},[props.user.authToken])

useEffect(()=>{
    if(props.menu.data.length>0){
        let menuDom = props.menu.data.filter((item: any)=>item.parent_name==="").map((item: any, idx: any) => {
            return (<li 
                key={`sidebar-menu-${item.parent_name}-${item.sequence}`}
                className={"wl-sidebar__menu-main__item "+item.name}
            >
                <div className="wl-sidebar__menu-main__item-toggle" onClick={(e: any)=>{
                    //todo: create function for this
                    props.setActiveMenu(item.name);
                    let element: any = document.querySelectorAll('.wl-sidebar__menu-main__item.'+item.name)[0]
                    document.querySelectorAll('.wl-sidebar__menu-main__item').forEach((item: any)=>item.classList.toggle("active", false))
                    document.querySelectorAll('.wl-sidebar__menu-nd__item-toggle').forEach((item: any)=>item.classList.toggle("active", false))
                    !element.classList.contains("active") ?element.classList.toggle("active", true):element.classList.toggle("active", false)
                    let subMenuClassList = element.querySelector('.wl-sidebar__menu-2nd').classList
                    !subMenuClassList.contains("hidden")?subMenuClassList.toggle("hidden", true)&&subMenuClassList.toggle("show", false):subMenuClassList.toggle("hidden", false)&&subMenuClassList.toggle("hidden", true)
                 }}>
                <i className={"flaticon2-"+item.name}/>&nbsp;&nbsp;&nbsp;
                <span className="wl-sidebar__menu__text">{item.name}</span>
                </div>
                <ul className="wl-sidebar__menu-2nd hidden">
                    {
                        props.menu.data.filter((child: any)=>child.parent_name===item.name).map((child: any, idx: any)=>{
                            return(<li 
                                key={`sidebar-menu-${item.sequence}-${child.sequence}`}
                                className="wl-sidebar__menu-2nd__item"
                            >
                                    <div className={"wl-sidebar__menu-nd__item-toggle "+child.name} onClick={(e: any)=>{
                                        props.setActiveMenu(child.name)
                                        let element: any = document.querySelectorAll('.wl-sidebar__menu-nd__item-toggle.'+child.name)[0]
                                        document.querySelectorAll('.wl-sidebar__menu-nd__item-toggle').forEach((item: any)=>item.classList.toggle("active", false))
                                        element.classList.contains("active") ?element.classList.toggle("active", false):element.classList.toggle("active", true)
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

const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
        getMenu,
        setActiveMenu
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Menu)