import React from 'react'
import styled,{ createGlobalStyle } from 'styled-components'
import Testing from './component/Testing'
import Work from './component/work'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import Post from './component/post'

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    left: 15vw;
    top: 17.5vh;
    width: 83vw;
    height: 88vh;
`
interface HighOrderType {
    [index: string]: JSX.Element
}



const WorkDesk: React.FC = ()=>{
    const activeMenu = useSelector( (state: any) => state.menu.active )
    const HighOrder:  HighOrderType= {
        'work': <Work/>,
        'post': <Post/>,
        'testing' : <Testing />
    }
    return(<Wrapper>
        {HighOrder[activeMenu]}
    </Wrapper>)
}

export default WorkDesk