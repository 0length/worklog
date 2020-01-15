import styled, {css} from 'styled-components'

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #00a3ee;
    color: #00abfb;
    margin: 0 1em;
    padding: 0.25em 1em;
    ${(props: any)=>
        props.styleProfile && props.styleProfile.primary && 
        css`
        box-shadow: 0 9px 16px 0 rgba(34,185,255,.25) !important;
        background: #00a3ee;
        color: white;
        `}

`
     
 
     
export default Button