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
            color: #F4F4F4;
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

    ` as any)`

    &:hover {
        box-shadow: 0 0 5px rgba(33,33,33,.5) !important;
        // background: transparent;
        // color: #00abfb;
        ${(props: any)=>
            props.styleProfile && props.styleProfile.primary &&
            css`
            background: #00A3F0;
            color: white;
        `}
    }

    &:active {
        background: transparent;
        color: black;
        border: 1px solid rgba(33,33,33,.7);
    }
`

export default Button