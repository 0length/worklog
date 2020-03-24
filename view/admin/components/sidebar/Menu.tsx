import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMenu, setActiveMenu } from '../../../../reducer/menu/actions'
import { createGlobalStyle } from 'styled-components'
import { Menu } from '../../../../global-types'

const GlobalStyle = createGlobalStyle`
.wl-sidebar__menu-main{
    margin: none;
    list-style: none;
    box-sizeing: border-box;
    margin-left: -1vw;
    color: rgb(123, 125, 130);
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
    border-bottom: 2.5px solid #fff;

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
    margin-right: 0.5vw;
    transform: translateY(0);
    background-color: #FBFBFB;
    border-radius: 4px;
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
    color: #353535;
    & > .wl-sidebar__menu-main__item-toggle {
        & > span {
            color: #353535;
        }
    }

    .wl-sidebar__menu-nd__item-toggle.active {
        & > span {
            color: #353535;
        }
    }
 }

//  .wl-sidebar__menu-nd__item-toggle.active {
//     & > span {
//         color: #2384FB;
//     }
// }
`

const Menu: React.FC<any> = (props)=>{
const [dom, setDom] = useState<JSX.Element>(<></>)

useEffect(()=>{
    // tslint:disable-next-line: no-unused-expression
    props.user && props.user.authToken && props.getMenu(`{ menus { name, parent_name, sequence } }`)
},[props.user.authToken])

useEffect(()=>{
    if(props.menu.data.length>0){
        // tslint:disable-next-line: max-line-length
        // const menuParsed = props.menu.data.map((oriItem: Menu, idx: number, ori: any)=>{ const item: any = oriItem;item.children = ori.filter((f: Menu)=>f.parent_name === item.name);return item})
        const temp: any[] =[]
        props.menu.data.forEach((item: any) =>{ temp.push(item)})
        let menuData= [...temp]
        menuData.reverse().forEach((itm, idx) => {
            const children = menuData.filter(f => f.parent_name === itm.name)
            menuData[idx] = {...itm, children}
        })
        menuData =  menuData.reverse().filter((item)=>!item.parent_name)
        const sortBySquence = (a: any, b: any)=>{
            // a.children.length>0 ? a = a.children.sort(sortBySquence):null
            b.children.length>0 ? b = b.children.sort(sortBySquence):null
            // tslint:disable-next-line: radix
            return parseInt(a.sequence) - parseInt(b.sequence)
        }
        menuData = menuData.sort(sortBySquence)
        const menu2Dom = (item: any, idx: any) => {
            const html =
            (<li
                key={`sidebar-menu-${item.parent_name}-${item.sequence}`}
                className={"wl-sidebar__menu-main__item "+item.name}
            >
                <div className="wl-sidebar__menu-main__item-toggle" onClick={(e: any)=>{
                    // todo: create function for this
                    props.setActiveMenu(item.name)
                    const element: any = document.querySelectorAll('.wl-sidebar__menu-main__item.'+item.name)[0]
                    document.querySelectorAll('.wl-sidebar__menu-main__item')
                        .forEach((a: any)=>a.classList.toggle("active", false))
                    !element.classList.contains("active") ?element.classList.toggle("active", true)
                        :element.classList.toggle("active", false)
                        console.log(element.querySelector('.wl-sidebar__menu-2nd'))
                        if(element.querySelector('.wl-sidebar__menu-2nd')){
                    const subMenuClassList = element.querySelector('.wl-sidebar__menu-2nd').classList
                    !subMenuClassList.contains("hidden")?subMenuClassList.toggle("hidden", true)
                        :subMenuClassList.toggle("hidden", false)
                    subMenuClassList.contains("show")?subMenuClassList.toggle("show", false):subMenuClassList.toggle("show", true)
                        }
                 }}>
                <i className={"flaticon2-"+item.name}/>&nbsp;&nbsp;&nbsp;
                <span className="wl-sidebar__menu__text">{item.name}</span>
                </div>
                    {
                         item.children && item.children.length > 0 && <ul className="wl-sidebar__menu-2nd hidden">
                    {
                        item.children && item.children.length > 0 && item.children
                            .map(menu2Dom)
                    }
                   </ul>
                   }
            </li>)
            return html

        }
        const menuDom: any = menuData.map(menu2Dom)
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