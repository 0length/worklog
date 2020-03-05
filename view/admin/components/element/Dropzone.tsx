import React, { useRef, useState, useEffect } from 'react'
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

  .slide-up {
    opacity: 1 !important;
  }

`


const Container = styled.div`
    border: 3px dashed #D8D5D1;
    display: flex;
    border-radius: 3px;
    height: 100px;
    width: 100%;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 500ms linear 0s;
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
            // cursor: grab;
            // background-color: darkgrey;
            background: radial-gradient(circle at calc(var(--mouse-x, 0) * 100%) calc(var(--mouse-y, 0) * 100%), #D4D4D4 0%, transparent 10%, transparent 100%) no-repeat 0 0;
            color: #55C8FF;
            border: 3px solid #fff;
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
interface IProps {
    onFilesAdded?: (file: FileList[], pid: string)=>void
    progress?: string,
    pid: string
}


const Dropzone: React.FC<IProps> = (props)=>{
    const [event, setEvent] = useState<string>('')
    // const [mouseX, setMouseX] = useState<number>(defaultXY);
    // const [mouseY, setMouseY] = useState<number>(defaultXY);

    const [inputDisable, setinputDisable] = useState<boolean>(false)
    const inputRef = useRef<any>()
    const openFileDialog = (e: any)=>{
        if (e.target.disabled) return
        inputRef.current.click()
    }
    const onFileAdded = (e: any)=>{
        const files = e.target.files
        setEvent('Drop')
        setinputDisable(true)
        // console.log(files.item(0))
        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array, props.pid)
        }
    }

    const onDrop = (e: any)=>{
        e.preventDefault()
        setEvent('Drop')
        const files = e.dataTransfer.files
        setinputDisable(true)
        // console.log(files.item(0), files)

        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array, props.pid)
        }
    }

    const onDragOver = (e: any)=>{
        e.preventDefault()
        setEvent('DragOver')
        // console.log(e.target)
        e.target.style.setProperty('--mouse-x', e.clientX / innerWidth)
        e.target.style.setProperty('--mouse-y', e.clientY / innerHeight)
    }

    const onDragLeave = (e: any)=>{
        e.preventDefault()
        setEvent('DragLeave')
        // console.log(files)
        setTimeout(()=>{
            setEvent('none')
        }, 3000)
    }

    // const onDrag = (e: any)=>{
    //     e.preventDefault()
    //     setEvent('Drag')
    //     // console.log(files)
    //     setTimeout(()=>{
    //         setEvent('none')
    //     }, 3000)

    // }

    const fileListToArray = (list: any)=>{
        const array = []
        for (let i = 0; i < list.length; i++) {
          array.push(list.item(i))
        }
        return array
      }

      useEffect(()=>{
          setTimeout(() => {
              setEvent('none')
          }, 500)

    }, [])

    return(<Container
        {...{event, className: event ? 'slide-up': ''}}
        onDragOver={(e)=>onDragOver(e)}
        onDragLeave={(e)=>onDragLeave(e)}
        onDrop={(e)=>onDrop(e)}
        // onDragStart={(e)=>onDrag(e)}
        onClick={(e)=>{openFileDialog(e)}}
    >
        <LocalStyle />
        {event !== 'Drop' && <span>Drag & Drop Files Or Browse</span>}
        <input
            ref={inputRef}
            style={{display: 'none'}}
            type="file"
            onChange={(e)=>{onFileAdded(e)}}
            disabled={inputDisable}
            hidden={true}
        />
        {event === 'Drop' && <div className={""} >Uploading ...{ props.progress &&'('+props.progress+'%)' }</div>}
    </Container>)
}

export default Dropzone