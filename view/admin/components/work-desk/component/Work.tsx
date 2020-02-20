import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { Work } from '../../../../../prisma/src/generated/prisma-client';

const Work: React.FC<any> = (props)=>{
const [tbody, setTbody] = useState<Array<JSX.Element>>([<tr></tr>])

    const StyleWork = createGlobalStyle`
        .div-work{
            margin-top: 5vh;
            margin-left: 18%;
            margin-right: 15%;
        }

        .table-work {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        .table-work td, .table-work th{
            border: 1px solid #ddd;
            padding: 6px;
        }

        .table-work tr:nth-child(even){background-color: #f2f2f2;}

        .table-work tr:hover{background-color: #ddd;}

        .table-work th{
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #8B008B;
            color: white;
        }
    `

    // useEffect(()=>{
    //     if(props.work.uptodate){
    //         let temp: Array<JSX.Element> = []
    //         props.work.uptodate.map((item: Work)=>{
    //             temp.push( <tr>
    //                 <td>{item.name}</td>
    //                 <td>{item.p}</td>
    //                 <td>{item.author_name}</td>
    //                 <td>{item.simple_caption}</td>
    //                 <td><img src={'/gdrive/'+ item.img_url} alt={item.name} /></td>
    //                 <td>{item.client}</td>
    //                 <td>{item.website}</td>
    //                 <td>{item.completed_at}</td>
    //                 <td>{item.long_desc}</td>
    //                 <td>{item.interisting_count}</td>
    //                 {/* <td>https://instagram.com/social</td> */}
    //             </tr>)
    //         })
    //     setTbody(temp);
    //     }
    // }, [])

    useEffect(()=>{
        if(props.work.uptodate){
            let temp: Array<JSX.Element> = []
            props.work.uptodate.map((item: Work)=>{
                temp.push( <tr>
                    <td>{item.name}</td>
                    <td>{item.p}</td>
                    <td>{item.author_name}</td>
                    <td>{item.simple_caption}</td>
                    <td><img width="150px" height="auto" src={'/api/gdrive/'+ item.img_url} alt={item.name} /></td>
                    <td>{item.client}</td>
                    <td>{item.website}</td>
                    <td>{item.completed_at}</td>
                    <td>{item.long_desc.substr(0, 150)+'...'}</td>
                    <td>{item.interisting_count}</td>
                    {/* <td>https://instagram.com/social</td> */}
                </tr>)
            })
            setTbody(temp);   
        }
    }, [props.work.uptodate])
    return (<>
        <div className="div-work">
            <StyleWork />
            <table className="table-work">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Perihal</th>
                        <th>Author Name</th>
                        <th>Simple Caption</th>
                        <th>Image Url</th>
                        <th>Client</th>
                        <th>Website</th>
                        <th>Completed_at</th>
                        <th>long Desc</th>
                        <th>Interesting Count</th>
                        {/* <th>Social Links</th> */}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
            </tbody>
            </table>
        </div>
    </>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Work);