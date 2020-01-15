import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles, auth} from '../../reducer/actions';
import Auth from './components/auth'


export const Main: React.FC<any> = (props)=>{
    const {
        fetchArticleReducer,
        signinReducer,
        fetchArticles,
        auth,
      } = props;
    return (
        <div className="App">
        <Auth />
      </div>
    );
}
const mapStateToProps = state => (state);

const mapDispatchToProps = dispatch =>
    bindActionCreators({
      fetchArticles,
      auth
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);