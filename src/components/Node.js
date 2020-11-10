import React from 'react';
import './styles/Node.css'

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let startFinishClass = 'node';
        if(this.props.node.colored && this.props.pointer){
            startFinishClass = 'node pointer'
        }else if(this.props.node.colored){
            startFinishClass = 'node node-colored'
        }

        return(
            <div className={startFinishClass} key={this.props.node.key}>
                
            </div>
        );
    }
}

export default Node;