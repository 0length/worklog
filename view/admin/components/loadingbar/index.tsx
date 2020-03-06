import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { width } from 'styled-system'

const Wrapper = styled(styled.div`
    position: fixed;
    left: 0;
    top: 20;
    min-width: 100%;
    min-height: 10px;
`)`
&> div {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 98;
    width: 0;
    height: 3px;
    background: #3E51D7;
    transition:width 500ms ease-out;
}
`

const LoadingBar: React.FC<any> = ({user})=>{
const { isLoading } = user
    useEffect(()=>{
        if(isLoading){
            document.querySelectorAll(".wl-loadingbar")[0].setAttribute('style', 'height: 3px;width: 70%;')
        }
        if(!isLoading){
            document.querySelectorAll(".wl-loadingbar")[0].setAttribute('style', 'height: 0;width: 100%;transition:width 0ms ease-out;')
            setTimeout(()=>document.querySelectorAll(".wl-loadingbar")[0].setAttribute('style', 'height: 0;width: 0;transition:width 1500ms ease-out;'), 2000)
        }
    }, [isLoading])

    return(<Wrapper><div className="wl-loadingbar"/></Wrapper>)
}
const mapStateToProps = (state: any) => (state)

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoadingBar)