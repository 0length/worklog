import React, { useEffect, useState } from "react"
import { Work } from "../../../../../../global-types"
import { Button } from '../../../element';
import endPoint from '../../../../../../lib/const/endpoint';
const Table: React.FC<any> = ({data, setMode})=>{
    const [tbody, setTbody] = useState<Array<JSX.Element>>([<tr></tr>])

    useEffect(()=>{
        if(data){
            let temp: Array<JSX.Element> = []
            data.map((item: Work, idx: number)=>{
                temp.push( <tr key={"wl_dt__work-tr"+(idx+1)}>
                    <td key={"wl_dt__work-no"+(idx+1)}>{idx+1}</td>
                    <td key={"wl_dt__work-name"+(idx+1)}>{item.name}</td>
                    <td key={"wl_dt__work-p"+(idx+1)}>{JSON.parse(item.p).map((item: string, idx: number)=>(<a key={idx} className="tag">{item}</a>))}</td>
                    <td key={"wl_dt__work-author"+(idx+1)}>{item.author_name}</td>
                    <td key={"wl_dt__work-cap"+(idx+1)} className="text">{item.simple_caption.substr(0, 50)+'...'}</td>
                    <td key={"wl_dt__work-img"+(idx+1)}><img width="50px" height="auto" src={endPoint.GOOGLEDRIVE+item.img_url} alt={item.name} /></td>
                    <td key={"wl_dt__work-client"+(idx+1)}>{item.client}</td>
                    <td key={"wl_dt__work-date"+(idx+1)}>{item.completed_at}</td>
                    <td key={"wl_dt__work-desc"+(idx+1)} className="longtext">{item.long_desc.substr(0, 150)+'...'}</td>
                    <td key={"wl_dt__work-like"+(idx+1)}>{item.interisting_count}</td>
                    <td key={"wl_dt__work-act"+(idx+1)}><Button><i className={"fa fa-lg fa-trash-o"}/></Button><Button><i className={"flaticon-edit"}/></Button></td>
                </tr>)
            })
            setTbody(temp);   
        }
    }, [data])
    return(<>
        <Button className="btn-add" onClick={()=>setMode('write')}><i className={"fa fa-lg fa-plus"}/> Add New Work</Button>
        <table className="table-work">
                <thead>
                    <tr key={"wl_dt__work-tr"+0}>
                        <th key={"wl_dt__work-no"+0}>#</th>
                        <th key={"wl_dt__work-name"+0}>name</th>
                        <th key={"wl_dt__work-p"+0}>tag</th>
                        <th key={"wl_dt__work-author"+0}>author</th>
                        <th key={"wl_dt__work-cap"+0}>simple caption</th>
                        <th key={"wl_dt__work-img"+0}>image</th>
                        <th key={"wl_dt__work-client"+0}>client</th>
                        <th key={"wl_dt__work-date"+0}>finish</th>
                        <th key={"wl_dt__work-desc"+0}>description</th>
                        <th key={"wl_dt__work-like"+0}>interisting</th>
                        <th key={"wl_dt__work-act"+0}>action</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
            </tbody>
            </table>
    </>)
}

export default Table

