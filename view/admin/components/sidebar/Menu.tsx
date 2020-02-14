import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMenu, setActiveMenu } from '../../../../reducer/menu/actions'
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
                className="wl-sidebar__menu-main__item"
            >
                <div className="wl-sidebar__menu-main__item-toggle" onClick={()=>{props.setActiveMenu(item.name)}}>
                <i className={"flaticon2-"+item.name}/>&nbsp;&nbsp;&nbsp;
                <span className="wl-sidebar__menu__text">{item.name}</span>
                </div>
                <ul className="wl-sidebar__menu-2nd">
                    {
                        props.menu.data.filter((child: any)=>child.parent_name===item.name).map((child: any, idx: any)=>{
                            return(<li 
                                key={`sidebar-menu-${item.sequence}-${child.sequence}`}
                                className="wl-sidebar__menu-2nd__item"
                            >
                                    <div className="wl-sidebar__menu-nd__item-toggle" onClick={()=>{props.setActiveMenu(child.name)}}>
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
    return (<ul className="wl-sidebar__menu-main">{dom}</ul>)
}

const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
        getMenu,
        setActiveMenu
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Menu)