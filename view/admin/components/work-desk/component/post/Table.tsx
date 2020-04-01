import React, { useEffect, useState } from "react"
import { Post } from "../../../../../../global-types"
import { Button } from '../../../element'
import endPoint from '../../../../../../lib/const/endpoint'
import { createGlobalStyle } from "styled-components"
import withLayout from "../withLayout"
import useUp2Date from "../../../../../../lib/hook/useUp2Date"
import { useDispatch } from "react-redux"
import useGrapher, { status } from "../../../../../../lib/hook/useGrapher"
import { pushToast } from "../../../../../../reducer/toast/action"
import { toastSuccess } from "../../../../../../lib/utils/toastModel"


// tofo: merge stylesheet for table

const LocalStyle = createGlobalStyle`

.table {
    font-size: 13px;
    font-weight: 300;
    font-family: Poppins,Helvetica,sans-serif;
    border-collapse: initial !important;
    border-spacing: 0 !important;
    width: 100%;
    border: 1px solid #ebedf2;
    border-radius: 4px;
}

.table td, .table th{
    padding: 6px;
    font-weight: 500;
    border: 1px solid #ebedf2;
    border-bottom-width: 1px;
    border-left-width: 1px;
    padding: .75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-left-width: 0;
    box-sizing: content-box;
}

.table tr:nth-child(even){background-color: #fafbfc;}

.table tr:hover {
    color: #212529;
    background: #FAFBFC;
}

.table th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    color: #212529;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    border-bottom: 2px solid #ebedf2;
    border-bottom-width: 2px;
    text-transform: capitalize;
}
.table tr td {
    font-weight: 300;
    color: #595d6e;
    border-top-width: 0px;
    border-bottom-width: 1px;
}

.text {
    font-size: 11px;
}

.longtext {
    font-size: 8px;
}



// .btn-add {
//     float: right;
//     margin: 1vh 0vw;
// }
`
const Table: React.FC<any> = ( props )=>{

    const { instanceOf } =props
    const data = useUp2Date(instanceOf)
    const [tbody, setTbody] = useState<JSX.Element[]>([<tr key={"wl_dt__-tr"+(1)}></tr>])
    const dispatch = useDispatch()
    const { grapher, setGrapher } = useGrapher()
    const actions = {
        delete: 'delete'
    }


    const handleDelete = (name: string)=>{
        setGrapher({
            processId: instanceOf+'-'+actions.delete+'-'+name,
            payload: {
                method: 'mutation',
                doWhat: actions.delete+instanceOf,
                varIn: `where: { name: "${name}"}`,
                varOut: 'name'
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
                        <img width="50px" height="auto" src={endPoint.GOOGLEDRIVE+item.img_url} alt={item.title} />
                    </td>
                    <td key={"wl_dt_-content"+(idx+1)} className="longtext">{
                            item.text_content.substr(0, 150)+'...'
                        }</td>
                    <td key={"wl_dt_-date"+(idx+1)}>{item.published_at}</td>
                    <td key={"wl_dt_-view"+(idx+1)}>{item.view_cont}</td>
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
            <LocalStyle />
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

