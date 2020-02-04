import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMenu } from '../../../../reducer/menu/actions'


const SideBar: React.FC<any> = (props)=>{
    const [menuDom, setMenuDom] = useState<JSX.Element>(<li></li>)
    
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
    useEffect(()=>{
        props.user && props.user.authToken && props.getMenu(`{ menus { name, parent_name, sequence } }`)
    },[props.user.authToken])

    useEffect(()=>{
        if(props.menu.data.length>0){
            let menuDom = props.menu.data.filter((item: any)=>item.parent_name==="").map((item: any, idx: any) => {
                return (<li 
                    key={`sidebar-menu-${item.parent_name}-${item.sequence}`}
                    className=""
                >
                    <span>{item.name}</span>
                    <ul>
                        {
                            props.menu.data.filter((child: any)=>child.parent_name===item.name).map((child: any, idx: any)=>{
                                return(<li 
                                    key={`sidebar-menu-${item.sequence}-${child.sequence}`}
                                    className=""
                                >
                                        <span>{child.name}</span>
                                </li>)
                            })
                            
                        }
                    </ul>
                </li>)
            })
            setMenuDom(menuDom)
        }
    },[props.menu.data])


    return(
        <div className="wl-sidebar wl-sidebar--fixed">
                <LocalStyle />
            <div className="wl-sidebar__menu">
                <ul className="">
                    {
                        menuDom
                    }
                    
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
        getMenu
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)