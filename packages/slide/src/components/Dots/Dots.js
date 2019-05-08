import React from 'react';
import PropTypes from 'prop-types'

export default class Dots extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    activeIndex:PropTypes.number,
    count: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.dotsArr = new Array(this.props.count)
    for(var i = 0;i<this.props.count;i++){
      this.dotsArr[i] = i+1
    }
    console.log(this.dotsArr)
  }

  realActiveIndex = () => {
    let realActiveIndex;
    if(this.props.activeIndex > this.props.count-1){
      realActiveIndex = 0;
    }else if(this.props.activeIndex < 0){
      realActiveIndex = this.props.count;
    }else{
      realActiveIndex = this.props.activeIndex;
    }
    return realActiveIndex;
  }

  slideJump(index){
    this.props.slideJump(index)
  }
  render() {
    return (
      <div className = "mark">
        <ul>
          {
            this.dotsArr.map( (item,index) => {
              return <li
                key={index+1}
                className={`dot-item ${this.realActiveIndex() == index ? 'active' : ''}`}
                onClick={this.slideJump.bind(this,index)}
              >
                {index+1}
              </li>
            })
          }

        </ul>
      </div>
    );
  }
}
