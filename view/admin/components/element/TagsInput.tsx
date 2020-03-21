import React, { useState, useEffect, useRef } from 'react'
import Styled from 'styled-components'
import Input from './Input'
import Button from './Button'
import styled from 'styled-components'

const Span = styled.span`
display: block;
cursor: text;
width: 100%;
// height: calc(1.5em + 1.3rem + 2px);
padding: .25rem 1rem;
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

const TagsInput: React.FC<any> = ({valueGetter, className})=>{
    const [tags, setTags] = useState<string[]>([])
    const [dom, setdom] = useState<JSX.Element[]>([])
    const [focus, setFocus] = useState<boolean>(false)

    const inputRef = useRef<any>()
    const handleTofocus = ()=>{
        inputRef.current.focus()
        inputRef.current.onblur = ()=>setFocus(false)
        setFocus(true)
    }

    const addTag = (text: string)=>{
        const temp = tags
        temp[tags.length||0] = text
        setTags([...temp])
    }

    const pressMatch = (e: any)=>{
        // console.log(e.key)

        if((e.key === 'Enter' || e.key === ' ')&& e.target.value && tags.indexOf(e.target.value) === -1){
            addTag(e.target.value)
            e.target.value = ""
        }
        if(!e.target.value && e.keyCode === 8 && tags[tags.length-1] ){
            e.target.value = tags[tags.length-1]
            removeTag(tags.length -1)
        }
    }

    const removeTag = (param: string|number)=>{
            const temp = tags
            // tslint:disable-next-line: no-unused-expression
            typeof param === 'string' && temp.splice(temp.indexOf(param), 1)
            // tslint:disable-next-line: no-unused-expression
            typeof param === 'number' && temp.splice(param, 1)

            setTags([...temp])
    }

useEffect(()=>{
    valueGetter(tags)
setdom(tags.map((item, index)=>{
            return <a
                key={"tag"+index}
                className="tag"
                style={{margin: '3px 5px'}}
            >
                {item}
                <i
                    className="wl-icon__close"
                    onClick={()=>removeTag(item)}
                />
            </a>
        }))

}, [tags])

return (
    <Span
        className={className}
        style={ focus?{border: '1px solid #A3C5FC'}:undefined}
        onClick={()=>handleTofocus()}
    >
        {
            dom
        }
        <input
            ref={inputRef}
            onKeyUp={(e)=>pressMatch(e)}
            style={
                {
                    outline: 'none',
                    border: 0,
                    height: '30px',
                    lineHeight: '1.5'
                }
            }
        />
    </Span>)
}

export default TagsInput