import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import Input from './Input'
import Button from './Button'
import styled from 'styled-components'

const Span = styled.span`
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
`

const TagsInput: React.FC<any> = ({valueGetter})=>{
    const [tags, setTags] = useState<Array<string>>([])
    const [dom, setdom] = useState<any>([])

    const addTag = (text: string)=>{
        let temp = tags
        temp[tags.length||0] = text
        setTags([...temp])
    }

    const pressMatch = (e: any)=>{
        console.log(e);
        
        if(e.key === 'Enter' && e.target.value && tags.indexOf(e.target.value) === -1){
            addTag(e.target.value)
            e.target.value = ""
        }
        if(!e.target.value && e.keyCode === 8 && tags[tags.length-1] ){
            e.target.value = tags[tags.length-1]
            removeTag(tags.length -1)
        }
    }

    const removeTag = (param: string|number)=>{
            let temp = tags
            typeof param === 'string' && temp.splice(temp.indexOf(param), 1)
            typeof param === 'number' && temp.splice(param, 1)

            setTags([...temp])
    }

useEffect(()=>{
    valueGetter(tags)
setdom(tags.map((item, index)=>{
            return <a key={"tag"+index} className="tag">{item}</a>
        }))

}, [tags])

return (<div>
    <Span >
  {
        dom
  }  <input onKeyUp={(e)=>pressMatch(e)} style={{border: 'none'}}/>
</Span></div>)
}

export default TagsInput