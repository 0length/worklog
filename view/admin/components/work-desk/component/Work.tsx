import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGlobalStyle } from 'styled-components';

const Work: React.FC<any> = (props)=>{

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
                        <th>Social Links</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Raihan</td>
                        <td>this Perihal</td>
                        <td>hidesec</td>
                        <td>About My World</td>
                        <td>http://img.url</td>
                        <td>hans</td>
                        <td>http://web.site</td>
                        <td>02 Februrari 2020</td>
                        <td>Hey this long description</td>
                        <td>304</td>
                        <td>https://instagram.com/social</td>
                    </tr>
            </tbody>
            </table>
        </div>
    </>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Work);