import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types'
import { Dots, SlideItem } from "./components"
import './index.scss'

function setStyle(target, styles){
  const { style } = target;
  Object.keys(styles).forEach(attr => {
    style[attr] = styles[attr];
  })
}
class Slide extends Component {
  static propTypes = {
    className: PropTypes.string,
    speed:PropTypes.string,
    style:PropTypes.string,
    hasMark:PropTypes.bool
  };

  static defaultProps = {
    speed:'1000',
    style:'normal',
    hasMark:true
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex:0
    }
    this.slideContainer = React.createRef();
  }

  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      children: { length },
    } = this.props;
    //isStatic表示动画时间为0,在边界处时执行
    const isStatic = prevState.activeIndex > length -1 || prevState.activeIndex < 0
    if(this.state.activeIndex === prevState.activeIndex){return false}

    this.translate(this.state.activeIndex,prevState.activeIndex,isStatic)
  }
  componentWillUnmount() {
    this.slideStop()
  }

  setWrapNodeWdth = () => {
    this.wrapContainerWidth = this.wrapNode.getBoundingClientRect().width;
  }
  init = () => {
    this.setWrapNodeWdth();
    setStyle(this.slideContainer.current,{
      width:`${this.wrapContainerWidth*this.slideContainer.current.children.length}px`
    });
    Array.from(this.slideContainer.current.children).map(item => {
      setStyle(item,{
        width:`${100/this.slideContainer.current.children.length}%`
      });
    })
    this.slidePlay();
    this.translate(this.state.activeIndex, null, true);

  }
  translate = (activeIndex, prevIndex, isStatic) => {
    const {
      speed,
      children:{ length }
    } = this.props;

    const translateDistance = this.wrapContainerWidth*(-1-activeIndex);
    const realSpeed = isStatic ? 0 : speed;
    //设置动画
    setStyle(this.slideContainer.current,{
      'transform': `translate3d(${translateDistance}px,0,0)`,
      'transition-duration': `${realSpeed}ms`
    })

    //边界处理 边界元素动画结束后，执行一次复位，移动到真实元素位置
    if(activeIndex> length -1){ //右边界
      setTimeout(() => {
        this.setState({activeIndex:0})
      },speed)
    }else if(activeIndex<0){ //左边界
      setTimeout(() => {
        this.setState({activeIndex:length - 1})
      },speed)
    }

    setTimeout( () => {
      this._inAnimate = false;
    },realSpeed)
  }

  handleMouseEnter = () => {
    const { autoplay } = this.props;
    autoplay && this.slideStop();
  }

  handleMouseLeave = () => {
    const { autoplay } = this.props;
    autoplay && this.slidePlay();
  }
  slideLeft(){
    if(this._inAnimate || Children.count(this.props.children) === 1){
      return false;
    }
    this._inAnimate = true;
    this.setState({
      activeIndex: this.state.activeIndex + 1
    });
  }
  slideRight(){
    if(this._inAnimate || Children.count(this.props.children) === 1){
      return false;
    }
    this._inAnimate = true;
    this.setState({
      activeIndex: this.state.activeIndex - 1
    });
  }
  slidePlay = () => {
    this.slideInterval = setInterval( () => {this.slideLeft()},2000)
  }
  slideStop = () => {
    clearInterval(this.slideInterval)
    this.slideInterval = null;//阻止自增
  }
  slideJump = (index) => {
    this.setState({activeIndex:index})
  }
  getULstyle = () => {
    let ulStyle = {};

    return ulStyle
  }
  hasAddChildren = () => {
    const ChildrenCount = Children.count(this.props.children);
    if(ChildrenCount <= 1) return this.props.children;

    const hasAddChildren = new Array(ChildrenCount + 2)
    //使用forEach不返回新数组，使用map加return时返回新数组，不加return返回长度一样的数组，但是里面的元素是未定义的
    React.Children.forEach(this.props.children,(child,index) => {
      hasAddChildren[index+1] = child;
      if(index === 0){
        hasAddChildren[ChildrenCount+1] = child;//尾部添加头部
      }else if(index+1 === ChildrenCount){
        hasAddChildren[0] = child;//头部添加尾部
      }
    })
    return hasAddChildren;
  }
  render() {
    return (
      <div
        className="slide-container-wrap"
        ref={ (wrapNode) => {this.wrapNode = wrapNode}}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ul
          className="slide-container"
          ref={this.slideContainer}
          style={this.getULstyle()}
        >
          {
            Children.map(this.hasAddChildren(),(child,index) => {
              return cloneElement(child,{
                key:index-1,
                style:{float:'left',height:'100%'}
              })
            })
          }
        </ul>
        <Dots
          slideJump = {this.slideJump}
          count = {Children.count(this.props.children)}
          activeIndex = {this.state.activeIndex}
        >
        </Dots>
        <a
          href="javascript:void(0)"
          className="arrow arrow-left"
          onClick={this.slideLeft.bind(this)}
        >&lt;</a>
        <a
          href="javascript:void(0)"
          className="arrow arrow-right"
          onClick={this.slideRight.bind(this)}
        >&gt;</a>
      </div>
    );
  }
}

Slide.SlideItem = SlideItem;

export default Slide;
