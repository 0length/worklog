import React from 'react'
import { pushToast } from '../../../../../reducer/toast/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const Testing: React.FC<any> = (props)=>{
  
    return(<>
        {/* <img src="https://awsimages.detik.net.id/community/media/visual/2019/12/12/029c0887-7cc3-4f96-b666-4f7dea48f937_169.jpeg?w=700&q=90" />
        <button style={{zIndex: 10000, color: 'blue', position: 'absolute', left: '200px', top: '50px'}} onClick={ ()=>{
          const newData={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 5000, type: "info", created_at: new Date+""};
          const newData2={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 7000, type: "success", created_at: new Date+""};
          const newData3={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 3000, type: "warning", created_at: new Date+""};
          const newData4={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 2000, type: "danger", created_at: new Date+""};

           props.pushToast([newData, newData2, newData3, newData4, newData, newData2, newData3, newData4, newData, newData2, newData3, newData4, newData, newData2, newData3, newData4,  newData, newData2, newData3, newData4]);
        //   await setNotification([]);
        // setTimeout(() => {
        //   console.log(notification.indexOf(newData),notification.indexOf(newData2))
        //   // setNotification(notification.splice(notification.indexOf(newData), 1))
        //   // setNotification(notification.splice(notification.indexOf(newData2), 1))
        //   // setNotification(notification.splice(notification.indexOf(newData3), 1))
        //   // setNotification([]);
        // }, 1);
        }}>Push Toast</button> */}
        

    </>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      pushToast
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Testing);

