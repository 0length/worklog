import styled, {css} from 'styled-components'

const Input = styled(styled.input`
    display: block;
    width: 100%;
    // height: calc(1.5em + 1.3rem + 2px);
    padding: .65rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e2e5ec;
    border-radius: 4px;
    -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    ${(props: any)=>
        props.styleProfile && props.styleProfile.auth &&
        css`
        height: 46px;
        border-radius: 0;
        border: 0;
        border-bottom: 1px solid rgba(235,237,242,.8);
        padding: 1rem 0;
        margin-top: .1rem;
        color: #595d6e;
        background: none;
        `
    }
    ${(props: any)=>
        props.styleProfile && props.styleProfile.last &&
        css`
        border: 0;
        `
    }
`)`
&:-internal-autofill-selected {
    background-color: none;
    color: none;
}
`

export default Input