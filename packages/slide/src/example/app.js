import React, { Component }from 'react';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Slide from '../index.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    const { SlideItem } = Slide;
    return (
      <div style={{margin:'50px auto',width:'80%',height:'200px'}}>
        <Slide autoplay = { true }>
          <SlideItem>
            <div>
              测试1111111
              组件生成
            </div>
          </SlideItem>
          <li className="slide-item-container slide-item-container2">测试22222222</li>
          <li className="slide-item-container slide-item-container3">测试33333333</li>
          <li className="slide-item-container slide-item-container4">测试44444444</li>
          <li className="slide-item-container slide-item-container5">测试55555555</li>
        </Slide>
      </div>
    )
  }
}


ReactDOM.render(<App></App>,document.getElementById('app'))
