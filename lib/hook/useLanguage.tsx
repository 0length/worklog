import { useState, useEffect } from 'react'
import { useSelector  } from "react-redux"
import language from '../lang'
const useLanguage = (): any=>{
    const activeLanguage = useSelector( (state: any) => state.language.code )
    const [ lang, setLang ] =useState<any>(language[ activeLanguage ])
    useEffect(()=>{
        // tslint:disable-next-line: no-unused-expression
        activeLanguage && setLang(language[ activeLanguage ])
    }, [ activeLanguage ])
    return lang
}

export default useLanguage