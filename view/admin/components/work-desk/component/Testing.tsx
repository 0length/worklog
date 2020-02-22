import React from 'react'
import { pushToast } from '../../../../../reducer/toast/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastCard, Dropzone } from '../../element';


const Testing: React.FC<any> = (props)=>{
  
    return(<>
        <button style={{zIndex: 10000, color: 'blue', left: '0px', top: '50px'}} onClick={ ()=>{
          const newData={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 10000, type: "info", created_at: new Date+""};
          const newData2={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 13000, type: "success", created_at: new Date+""};
          const newData3={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 7000, type: "warning", created_at: new Date+""};
          const newData4={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 5000, type: "danger", created_at: new Date+""};

           props.pushToast([newData, newData2, newData3, newData4, newData, newData2, newData3, newData4, newData, newData2, newData3, newData4, newData, newData2, newData3, newData4,  newData, newData2, newData3, newData4]);
        //   await setNotification([]);
        // setTimeout(() => {
        //   console.log(notification.indexOf(newData),notification.indexOf(newData2))
        //   // setNotification(notification.splice(notification.indexOf(newData), 1))
        //   // setNotification(notification.splice(notification.indexOf(newData2), 1))
        //   // setNotification(notification.splice(notification.indexOf(newData3), 1))
        //   // setNotification([]);
        // }, 1);
        }}>Push Toast</button>
      
    </>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      pushToast
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Testing);

