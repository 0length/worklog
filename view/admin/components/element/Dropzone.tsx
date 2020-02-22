import React, { useRef, useState } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'

const LocalStyle = createGlobalStyle`
@-webkit-keyframes blink {
    0%, 49% {
      background-color: #fff;
    }
    50%, 100% {
      background-color: #F1F0EF;
    }
  }

  @-webkit-keyframes linear {
    0%, 49% {
      background-color: #fff;
    }
    50%, 100% {
      background-color: #F1F0EF;
    }
  }

`


const Container = styled.div`
    border: 3px dashed #F1F0EF;
    display: flex;
    border-radius: 3px;
    // background: #F1F0EF;
    height: 100px;
    width: 100%; 
    justify-content: center;
    cursor: pointer;
    & > span{
        font-family: 'Montserrat';
        font-size: 10.5px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-weight: 500;
        align-self: center;
    }

    ${
        (props: any)=>
        props && props.event ==='Drop' && css`
        cursor: initial;
        `
    }
    ${
        (props: any)=>
        props && props.event ==='DragOver' && css`
            cursor: grab;
            transition:background-color 1s;
            background-color: darkgrey;
            color: #fff;
        `
    }
    ${
        (props: any)=>
        props && props.event ==='DragLeave' && css`
            animation: blink 0.5s infinite;
        `
    }

    ${
        (props: any)=>
        props && props.event ==='Drag' && css`
            animation: blink 1s infinite;
        `
    }
`
const Dropzone: React.FC<any> = (props)=>{
    const [event, setEvent] = useState<string>('none');
    const [inputDisable, setinputDisable] = useState<boolean>(false);
    const inputRef = useRef<any>();
    const openFileDialog = (e: any)=>{
        if (e.target.disabled) return
        inputRef.current.click()
    }
    const onFileAdded = (e: any)=>{
        const files = e.target.files
        setEvent('Drop')
        setinputDisable(true)
        console.log(files.item(0))

    }

    const onDrop = (e: any)=>{
        e.preventDefault()
        setEvent('Drop')
        const files = e.dataTransfer.files
        setinputDisable(true)
        console.log(files.item(0), files)

    }

    const onDragOver = (e: any)=>{
        e.preventDefault()
        setEvent('DragOver')
        // console.log(files)
    }

    const onDragLeave = (e: any)=>{
        e.preventDefault()
        setEvent('DragLeave')
        // console.log(files)
        setTimeout(()=>{
            setEvent('none')
        }, 3000)
        
    }

    const onDrag = (e: any)=>{
        e.preventDefault()
        setEvent('Drag')
        // console.log(files)
        setTimeout(()=>{
            setEvent('none')
        }, 3000)
        
    }
    
    const fileListToArray = (list: any)=>{
        const array = []
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i))
        }
        return array
      }

    return(<Container
        {...{event}}
        onDragOver={(e)=>onDragOver(e)}
        onDragLeave={(e)=>onDragLeave(e)}
        onDrop={(e)=>onDrop(e)}
        onDragStart={(e)=>onDrag(e)}
        onClick={(e)=>{openFileDialog(e)}}
    >
        <LocalStyle />
        {event !== 'Drop' && <span>Drag & Drop Files Or Browse</span>}
        <input ref={inputRef}  style={{display: 'none'}}type="file" onChange={(e)=>{onFileAdded(e)}} disabled={inputDisable} hidden={true}/>
        {event === 'Drop' && <div className={""} >Uploading ...</div>}
    </Container>)
}

export default Dropzone