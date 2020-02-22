import React, { useEffect, useState } from "react"
import { Work } from "../../../../../../global-types"
import { Button } from '../../../element';
import endPoint from '../../../../../../lib/const/endpoint';
import { createGlobalStyle } from "styled-components";
import withLayout from "../withLayout";

const LocalStyle = createGlobalStyle`

.table-work {
    font-size: 13px;
    font-weight: 300;
    font-family: Poppins,Helvetica,sans-serif;
    border-collapse: initial !important;
    border-spacing: 0 !important;
    width: 100%;
    border: 1px solid #ebedf2;
    border-radius: 4px; 
}

.table-work td, .table-work th{
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

.table-work tr:nth-child(even){background-color: #fafbfc;}

.table-work tr:hover {
    color: #212529;
    background: #FAFBFC;
}

.table-work th{
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
.table-work tr td {
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

.tag {
    background: rgba(44, 44, 44, 0.07);
    display: inline-block;
    margin: 5px;
    border-radius: 4px;
    padding: 5px;
    color: #62605a !important;
}

// .btn-add {
//     float: right;
//     margin: 1vh 0vw;
// }
`
const Table: React.FC<any> = ({data})=>{
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
    return(
        <table className="table-work">
            <LocalStyle />
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
            </table>)
}
export default withLayout(Table)

