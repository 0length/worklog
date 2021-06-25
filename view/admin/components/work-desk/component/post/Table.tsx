import React, { useEffect, useState } from "react"
import { Post } from "../../../../../../global-types"
import { Button, Image } from '../../../element'
import endPoint from '../../../../../../lib/const/endpoint'
import { createGlobalStyle } from "styled-components"
import withLayout from "../withLayout"
import useUp2Date from "../../../../../../lib/hook/useUp2Date"
import { useDispatch } from "react-redux"
import useGrapher, { status } from "../../../../../../lib/hook/useGrapher"
import { pushToast } from "../../../../../../reducer/toast/action"
import { toastSuccess } from "../../../../../../lib/utils/toastModel"


// tofo: merge stylesheet for table

const Table: React.FC<any> = ( props )=>{

    const { instanceOf } =props
    const data = useUp2Date(instanceOf)
    const [tbody, setTbody] = useState<JSX.Element[]>([<tr key={"wl_dt__-tr"+(1)}></tr>])
    const dispatch = useDispatch()
    const { grapher, setGrapher } = useGrapher()
    const actions = {
        delete: 'delete'
    }


    const handleDelete = (title: string)=>{
        setGrapher({
            processId: instanceOf+'-'+actions.delete+'-'+title,
            payload: {
                method: 'mutation',
                doWhat: actions.delete+instanceOf,
                varIn: `where: { title: "${title}"}`,
                varOut: 'title'
            },
            status: status.send,
        })
    }

    useEffect(()=>{
        // tslint:disable-next-line: no-unused-expression
        grapher.data &&
        grapher.data.name &&
        dispatch(
            pushToast(
                [
                    toastSuccess(
                        grapher.data.name+ " has been "+actions.delete+"ed "
                    )
                ]
            )
        )
    }, [grapher.data])

    useEffect(()=>{
        const temp: JSX.Element[] = []
        if(data.length > 0){
            data.map((item: Post, idx: number)=>{
                temp.push( <tr key={"wl_dt_-tr"+(idx+1)}>
                    <td key={"wl_dt_-no"+(idx+1)}>{idx+1}</td>
                    <td key={"wl_dt_-title"+(idx+1)}>{item.title}</td>
                    <td key={"wl_dt__-p"+(idx+1)}>{
                        item && item.p && JSON.parse(item.p).map((tag: string, iTag: number)=>
                        (<a key={'w-'+item.title+'-tag-'+iTag} className="tag">{tag}</a>))
                    }</td>
                    <td key={"wl_dt_-author"+(idx+1)}>{item.author_name}</td>
                    <td key={"wl_dt_-img"+(idx+1)}>

                        { typeof window !== 'undefined' && typeof document !== 'undefined' ?
                        <Image width="50px" height="auto" src={endPoint.GOOGLEDRIVE+item.img_url} alt={item.title} />
                        : null}
                    </td>
                    <td key={"wl_dt_-content"+(idx+1)} className="longtext">{
                            JSON.parse(item.text_content).blocks.filter((i: any)=>i.type==="paragraph")[0].data.text
                            .substr(0, 150)+'...'
                        }</td>
                    <td key={"wl_dt_-date"+(idx+1)}>{item.published_at}</td>
                    <td key={"wl_dt_-view"+(idx+1)}>{item.view_count}</td>
                    <td key={"wl_dt_-like"+(idx+1)}>{item.interisting_count}</td>
                    <td key={"wl_dt__-act"+(idx+1)}>
                        <Button onClick={()=>handleDelete(item.title)}><i className={"fa fa-lg fa-trash-o"}/></Button>
                        <Button onClick={
                            ()=>{
                                props.generic.setSelectedItem(item)
                                props.generic.setMode('update')
                            }
                        }>
                            <i className={"flaticon-edit"}/>
                        </Button>
                    </td>
                </tr>)
            })
        }else{
        temp.push( <tr key={"wl_dt_-tr"+0}>
            <td key={"wl_dt_-no"+0} colSpan={10} align="center">
                <span > Not Record Found</span>
            </td>
        </tr> )
        }
        setTbody(temp)
    }, [data])
    return(
        <table className="table">
                <thead>
                    <tr key={"wl_dt_-tr"+0}>
                        <th key={"wl_dt_-no"+0}>#</th>
                        <th key={"wl_dt_-title"+0}>title</th>
                        <th key={"wl_dt_-p"+0}>tag</th>
                        <th key={"wl_dt_-author"+0}>author</th>
                         <th key={"wl_dt_-img"+0}>image</th>
                        <th key={"wl_dt_-content"+0}>content</th>
                        <th key={"wl_dt_-date"+0}>publised at</th>
                        <th key={"wl_dt_-view"+0}>view count</th>
                        <th key={"wl_dt_-like"+0}>interisting</th>
                        <th key={"wl_dt_-act"+0}>action</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
            </tbody>
            </table>)
}
export default withLayout(Table)

