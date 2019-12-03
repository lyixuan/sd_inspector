import React,{Component} from 'react'
import starColor from '@/assets/starColor.png'
import starNone from '@/assets/starNone.png'
class Star extends Component{
  constructor(props){
    super(props);
    this.state={
      starNum:[starNone,starNone,starNone,starNone,starNone]
    }
  }
  componentDidMount(){
    this.getStar(Math.round(this.props.star)+1);
  }
  getStar(num){
    let newStar = this.state.starNum.map((item)=>{
      --num;
      return num>=1?starColor:starNone;
    })
    this.setState({
      starNum:newStar
    })
  }
  render(){
    return (<span className="star">
            {
              this.state.starNum.map((item, index)=>{
                return <img src={item}  key={index} style={{width:'12px',height:'12px',marginRight:'3px'}}/>
              })
            }
        </span>)
  }
}
export default Star;
