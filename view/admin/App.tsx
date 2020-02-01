import React, { JSXElementConstructor, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../../reducer/actions';
import Header from './components/header'
import { createGlobalStyle } from 'styled-components';
import SideBar from './components/sidebar';

export const App: React.FC<any> = (props)=>{
//   const {
//       user
//     } = props;

  const GlobalStyle = createGlobalStyle`
  .wl-grid {
    display: flex;
    flex-direction: row;
  }

  .wl-icon {
    color: #b8bac3;
    transition: all .3s;
    font-weight: 100;
    -webkit-text-stroke: 0.05em white;
  }
  .wl-icon__color-white {
    color: white;
    // -webkit-text-stroke: 0.1em #b8bac3;
  }

  `;
  
    
  return (
    <div className="App">
        <GlobalStyle />
        <Header />
        <SideBar /> 
    </div>
  );
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      fetchArticles,
      
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);