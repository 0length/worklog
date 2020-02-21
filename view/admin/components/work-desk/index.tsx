import React from 'react'
import styled,{ createGlobalStyle } from 'styled-components'
import Testing from './component/Testing'
import Work from './component/work'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const GlobalStyle = createGlobalStyle``
const Wrapper = styled.div`
    display: flex;
    position: absolute;
    left: 15vw;
    top: 17.5vh;
    background: #fff;
    box-shadow: 0 0 40px 0 rgba(82,63,105,.1);
    border-radius: 4px; 
    width: 83vw;
    height: 88vh;
`
interface HighOrderType {
    [index: string]: JSX.Element
}

const HighOrder:  HighOrderType= {
    'work': <Work/>,
    'testing' : <Testing />
}

const WorkDesk: React.FC<any> = (props)=>{
    const activeMenu = props.menu.active
    return(<Wrapper>
        {HighOrder[activeMenu]}
    </Wrapper>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkDesk);