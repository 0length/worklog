import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMenu, setActiveMenu } from '../../../../reducer/menu/actions'
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
class Menu extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        // Don't call this.setState() here!
      }
      state = { selectedOptions: {}, dataMenu:[]}
        // tslint:disable-next-line: no-unused-expression
        componentWillMount(){
            this.props.user && this.props.user.authToken && this.props.getMenu(`{ menus { name, parent_name, sequence } }`)

        }

        componentDidUpdate(){
            if(this.props.menu.data.length>0){
                // tslint:disable-next-line: max-line-length
                // const menuParsed = this.props.menu.data.map((oriItem: Menu, idx: number, ori: any)=>{ const item: any = oriItem;item.children = ori.filter((f: Menu)=>f.parent_name === item.name);return item})
                const temp: any[] =[]
                this.props.menu.data.forEach((item: any) =>{ temp.push(item)})
                let menuData= [...temp]
                menuData.reverse().forEach((itm, idx) => {
                    const children = menuData.filter(f => f.parent_name === itm.name)
                    menuData[idx] = {...itm, children}
                })
                menuData =  menuData.reverse().filter((item)=>!item.parent_name)
                const sortBySquence = (curr: any, next: any)=>{
                    curr.children ? curr = curr.children.sort(sortBySquence):null
                    return parseInt(next.sequence) - parseInt(curr.sequence)
                }
                menuData = menuData.sort(sortBySquence)
            this.state.dataMenu = menuData
            }
        }

    render() {
       return (
         <div>
             <GlobalStyle />
           <OptionsList
             options={this.state.dataMenu}
             onChange={(selectedOptions: any) => this.setState({selectedOptions})}
             selectedOptions={this.state.selectedOptions}
           />
         </div>
       )
    }
  }

  // Recursive component
  const OptionsList = ({ options, selectedOptions, onChange }) => {
    // const { options, selectedOptions, onChange } = props
    const handleItemClicked = (selectedOptionId: any) => {
      // is currently selected
      console.log('handleItemClicked', selectedOptionId, selectedOptions, selectedOptions[selectedOptionId])
      
    const element: any = document.querySelectorAll('.wl-sidebar__menu-main__item.'+selectedOptionId)[0]
    document.querySelectorAll('.wl-sidebar__menu-main__item').forEach((a: any)=>a.classList.toggle("active", false))
      if(selectedOptions[selectedOptionId]){
        // remove selected key from options list
        delete selectedOptions[selectedOptionId]
        element.classList.toggle("active", false)
        // subMenuClassList && subMenuClassList.toggle("hidden", true)
        // subMenuClassList && subMenuClassList.toggle("show", false)
      } else { // is not currently selected
        // Add selected key to optionsList
        selectedOptions[selectedOptionId] = {}
        element.classList.toggle("active", true)

      }

      onChange(selectedOptions)
    //   if(element.querySelector('.wl-sidebar__menu-2nd')){
    //     const subMenuClassList = element.querySelector('.wl-sidebar__menu-2nd').classList
    //     subMenuClassList && subMenuClassList.toggle("hidden", false)
    //     subMenuClassList && subMenuClassList.toggle("show", true)
    //   }
    }

    const handleSubOptionsListChange = (optionId: any, subSelections:any) => {
      // add sub selections to current optionId
      console.log('handleSubOptionsListChange', selectedOptions[optionId], optionId, subSelections)

      selectedOptions[optionId] = subSelections
      // call onChange function given by parent
      onChange(selectedOptions)
    }
    // console.log('option', props)
    

    return (
        <ul className="wl-sidebar__menu-main">
        {options.map((item: any) => {
            console.log(selectedOptions[item.name], selectedOptions)
            return (
          <Item  parent_name={item.parent_name||""} sequence={item.sequence} label={item.name} onChange={()=>handleItemClicked(item.name)} selected={selectedOptions[item.name]}>
            { item.children.length >0 && selectedOptions[item.name] &&
            <ul className="wl-sidebar__menu-2nd show">
              <OptionsList
                options={item.children}
                selectedOptions={selectedOptions[item.name]}
                onChange={(subSelections: any) => handleSubOptionsListChange(item.name, subSelections)}
               />
               </ul>
            }
          </Item>
        )})}
      </ul>
    )
  }

  const Item: React.FC<any> = (props) => {
      const { sequence, parent_name, selected, label, onChange, children } = props
    console.log('Item', props)
      return (
          <li
              key={`sidebar-menu-${parent_name}-${sequence}`}
              className={"wl-sidebar__menu-main__item " + label}
          >
              <div className="wl-sidebar__menu-main__item-toggle" onClick={(e: any) =>onChange(!selected)
              }>
                  <i className={"flaticon2-" + label} />&nbsp;&nbsp;&nbsp;
                <span className="wl-sidebar__menu__text">{label}</span>
              </div>
              { children }
          </li>)
  }
  const mapStateToProps = (state:any) => (state)

  const mapDispatchToProps = (dispatch:any) =>
      bindActionCreators({
          getMenu
      }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
