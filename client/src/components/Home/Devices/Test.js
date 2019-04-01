import React, { Component } from 'react';
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount(){
      console.log('here is daata:', this.props.DeviceList)
    }
    render() {
        return (
            this.props.DeviceList.map((item)=>{
                
                return (<div>{item.deviceName}</div>)
            })
            
        );
    }
}

export default Test;