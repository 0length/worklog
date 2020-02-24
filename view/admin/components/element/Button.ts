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
            background: #00a3ee;
            color: white;
            border: white;
        `}

        ${(props: any)=>
            props.styleProfile && props.styleProfile.danger && 
            css`
            box-shadow: none;
            background: #FD27EB;
            border: white;
            color: white;

        `}

    `)`

    &:hover {
        box-shadow: 0 0 5px rgba(33,33,33,.3) !important;
        // background: transparent;
        // color: #00abfb;
    }

    &:active {
        background: transparent;
        color: black;
        border: 1px solid rgba(33,33,33,.7);
    }
`
     
 
     
export default Button