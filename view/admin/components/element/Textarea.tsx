import Styled from 'styled-components'

const Textarea = Styled(Styled.textarea`
display: block;
width: 100%;
height: auto;
padding: .65rem 1rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #495057;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #e2e5ec;
border-radius: 4px;
transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;

`)`
&:focus {
    color: #495057;
    // background-color: #5fccff;
    outline: 0;
    border: 1px solid #A3C5FC;
}

&::placeholder {
    color: #74788d;
    opacity: 1;
}
`

export default Textarea