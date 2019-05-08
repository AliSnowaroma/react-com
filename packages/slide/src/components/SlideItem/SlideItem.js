import React, { Component }from 'react';

export default class SlideItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <li className="slide-item-container slide-item-container1">{this.props.children}</li>
  }
}
