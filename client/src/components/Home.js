import React, { Component } from 'react';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {   
    console.log(process.env)             
    return (
      <div className="Home">
        <h1>Home</h1>
        <p>Test my new SEO tool</p>
        {process.env.REACT_APP_WATSON_USERNAME}
      </div>
    );
  }
}

export default Home;
