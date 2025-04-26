
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {

  pageSize = 6
  apiK = process.env.REACT_APP_NEWS_API 
    state={
      progress : 0
    }
    setProgress=(progress)=>{
     this.setState({progress : progress})
    }


  render() {
    return (
      <div>
          <Router>
            < Navbar />
                  <LoadingBar
                color="#f11946"
                progress={this.state.progress}
                // onLoaderFinished={() => this.setProgress(80)}
                  />
           <Routes>

            
            console.log(this.pageSize);
            
            <Route exact path="/" key="general" element={<News setProgress={this.setProgress} apikey={this.apiK} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/science" key="science" element={<News setProgress={this.setProgress} apikey={this.apiK} key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route exact path="/business" key="business" element={<News setProgress={this.setProgress} apikey={this.apiK} key="business"  pageSize={this.pageSize} country="us" category="business" />} />
            <Route exact path="/entertainment" key="entertainment" element={<News setProgress={this.setProgress} apikey={this.apiK} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route exact path="/general"  element={<News setProgress={this.setProgress} apikey={this.apiK} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/health"  element={<News setProgress={this.setProgress} apikey={this.apiK} key="health"  pageSize={this.pageSize} country="us" category="health" />} />
            <Route exact path="/sports"  element={<News setProgress={this.setProgress} apikey={this.apiK} key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route exact path="/technology"  element={<News setProgress={this.setProgress} apikey={this.apiK} key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
           </Routes>
          </Router>
      </div>
    )
  }
}


