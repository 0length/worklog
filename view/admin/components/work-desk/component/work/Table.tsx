import React, { useEffect, useState } from "react"
import { Work, ActivityPageProps } from "../../../../../../global-types"
import { Button, Image } from '../../../element'
import endPoint from '../../../../../../lib/const/endpoint'
import { createGlobalStyle } from "styled-components"
import withLayout from "../withLayout"
import {  useDispatch } from "react-redux"
import useGrapher, { status } from "../../../../../../lib/hook/useGrapher"
import { pushToast } from "../../../../../../reducer/toast/action"
import { toastSuccess } from "../../../../../../lib/utils/toastModel"
import useUp2Date from "../../../../../../lib/hook/useUp2Date"

const LocalStyle = createGlobalStyle`





// .btn-add {
//     float: right;
//     margin: 1vh 0vw;
// }
`
const Table: React.FC<ActivityPageProps> = (props)=>{
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
            processId: instanceOf + '-' + actions.delete + '-' + name.split( " " ).join( "-" ),
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
            data.map((item: Work, idx: number)=>{
                temp.push( <tr key={"wl_dt__-tr"+(++idx)}>
                    <td key={"wl_dt__-no"+(++idx)}>{++idx}</td>
                    <td key={"wl_dt__-name"+(++idx)}>{item.name}</td>
                    <td key={"wl_dt__-p"+(++idx)}>{
                        JSON.parse(item.p).map((tag: string, iTag: number)=>
                        (<a key={'w-'+item.name+'-tag-'+iTag} className="tag">{tag}</a>))
                    }</td>
                    <td key={"wl_dt__-author"+(++idx)}>{item.author_name}</td>
                    <td key={"wl_dt__-cap"+(++idx)} className="text">{item.simple_caption.substr(0, 50)+'...'}</td>
                    <td key={"wl_dt__-img"+(++idx)}>
                        <Image width="50px" height="auto" src={endPoint.GOOGLEDRIVE+item.img_url} alt={item.name} />
                    </td>
                    <td key={"wl_dt__-client"+(++idx)}>{item.client}</td>
                    <td key={"wl_dt__-date"+(++idx)}>{item.completed_at}</td>
                    <td key={"wl_dt__-desc"+(++idx)} className="longtext">{item.long_desc.substr(0, 150)+'...'}</td>
                    <td key={"wl_dt__-like"+(++idx)}>{item.interisting_count}</td>
                    <td key={"wl_dt__-act"+(++idx)}>
                        <Button onClick={()=>handleDelete(item.name)}><i className={"fa fa-lg fa-trash-o"}/></Button>
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
            <td key={"wl_dt_-no"+0} colSpan={11} align="center">
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
                    <tr key={"wl_dt__-tr"+0}>
                        <th key={"wl_dt__-no"+0}>#</th>
                        <th key={"wl_dt__-name"+0}>name</th>
                        <th key={"wl_dt__-p"+0}>tag</th>
                        <th key={"wl_dt__-author"+0}>author</th>
                        <th key={"wl_dt__-cap"+0}>simple caption</th>
                        <th key={"wl_dt__-img"+0}>image</th>
                        <th key={"wl_dt__-client"+0}>client</th>
                        <th key={"wl_dt__-date"+0}>finish</th>
                        <th key={"wl_dt__-desc"+0}>description</th>
                        <th key={"wl_dt__-like"+0}>interisting</th>
                        <th key={"wl_dt__-act"+0}>action</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
            </tbody>
            </table>)
}


export default withLayout(Table)