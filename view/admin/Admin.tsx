import React from 'react'
import { Provider } from 'react-redux'
import Main from './Main'
interface Props {
    store: any
}
const Admin: React.FC <Props> = (props)=>(
<Provider store={props.store}>
    <Main/>
</Provider>)
export default Admin;