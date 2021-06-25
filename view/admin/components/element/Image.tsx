import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { margin, zIndex } from 'styled-system'

const root = typeof document !== 'undefined' ? document.body : null
function Modal({ isOpen, handleEsc, children }) {
    // element to which the modal will be rendered
    const el: HTMLDivElement = document.createElement("div")

    useEffect(() => {
      // append to root when the children of Modal are mounted
      root!.appendChild(el)

      // do a cleanup
      return () => {
        root!.removeChild(el)
      }
    }, [el])

    useEffect(() => {
        // append to root when the children of Modal are mounted
        window.addEventListener('keydown', handleEsc)
        // do a cleanup
        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
      }, [])

    return (
      isOpen &&
      createPortal(
        // child element
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            padding: "100px",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 100,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: "50%",
              background: "white",
              padding: "50px",
              textAlign: "center",
              margin: '0 auto'
            }}
          >
            {children}
          </div>
        </div>,
        // target container
        el
      )
    )
  }

const Image: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (props)=>{
    const [isOpen, setIsOpen ] = useState(false)
    return (<>
        <img {...props} onClick={handleToggle} />
        {document && <Modal handleEsc={handleEsc} isOpen={isOpen}>
            <img {...{src:props.src}} />
        </Modal>}
    </>)
    function handleToggle(){
        setIsOpen((old)=>!old)
    }
    function handleEsc(e: any){
        if(e.key === 'Escape') setIsOpen(false)

    }
}

export default Image