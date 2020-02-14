import styled, {css} from 'styled-components'

const Button = styled(styled.button`
        background: transparent;
        border-radius: 3px;
        border: 1px solid #00a3ee;
        color: #00abfb;
        margin: 0 1em;
        padding: 0.25em 1em;
        cursor: pointer;
        ${(props: any)=>
            props.styleProfile && props.styleProfile.primary && 
            css`
            box-shadow: 0 9px 16px 0 rgba(34,185,255,.25) !important;
            background: #00a3ee;
            color: white;
            `}

    `)`

    &:hover {
        background: transparent;
        color: #00abfb;
    }

    &:active {
        background: #00a3ee;
        color: white;
    }
`
     
 
     
export default Button