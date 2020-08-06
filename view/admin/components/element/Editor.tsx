import React, { useCallback, useRef, useState } from "react";
import endPoint from "../../../../lib/const/endpoint";
import { useSelector } from "react-redux";
// import EditorJs from "react-editor-js";


// let EditorJs: any
// if (typeof window !== 'undefined') {
//   EditorJs = require('react-editor-js');
// console.log(EditorJs);

// }else{
//   EditorJs = null
// }
interface EditorIProps {
  data: string
}

const EditorJs = typeof window !== 'undefined' ? require('react-editor-js') : null

const Editor: React.FC<EditorIProps> = ({data}) => {
  const [ref, setRef] = useState<any>(null);
  const store = useSelector((store: any)=>store)
  const handleSave = useCallback(()=>{
    if(ref){
      // console.log(ref.save().then); 
      ref.save().then((data: any)=>data.blocks && console.log(data))
    }
    console.log(ref, "ref")
  },[ref])


  const EDITOR_JS_TOOLS: any = ({store}: any)=> ({
    embed: require("@editorjs/embed"),
    table:  require("@editorjs/table"),
    marker: require("@editorjs/marker"),
    list: require("@editorjs/list"),
    code: require("@editorjs/code"),
    linkTool: require("@editorjs/link"),
    image: {
      class: require("@editorjs/image"),
      config: {
        endpoints: {
          byFile: endPoint.GOOGLEDRIVE
        },
        additionalRequestHeaders: {
          'CSRF-Token': store.csrf.token,
          'Authorization':`Bearer ${store.user.authToken}`
        }
      }
    },
    raw: require("@editorjs/raw"),
    header: require("@editorjs/header"),
    quote: require("@editorjs/quote"),
    checklist: require("@editorjs/checklist"),
    delimiter: require("@editorjs/delimiter"),
    inlineCode: require("@editorjs/inline-code"),
    simpleImage: require("@editorjs/simple-image")
  })


  return (<div style={{margin: 'auto'}}>
    <button onClick={handleSave}>save</button>
    <EditorJs.default
      data={JSON.parse(data)}
      tools={EDITOR_JS_TOOLS({store})}
      instanceRef={(ref: any)=>setRef(ref)}
      />
  </div>);
}





export default Editor
