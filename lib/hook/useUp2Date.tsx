import { useState, useEffect } from 'react'
import { useSelector  } from "react-redux"

const useUp2Date = (subject: string): any=>{

    const fromGlobal = useSelector( (state: any) => state[ subject.toLowerCase() ].uptodate )
    const [uptodate, setUptodate] = useState<any>(fromGlobal)

    useEffect(()=>{
        setUptodate(fromGlobal)
    }, [ fromGlobal ])

    return uptodate
}

export default useUp2Date