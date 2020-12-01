import React from 'react';
import './styles/Node.css'

const Node = (props) => {
    let startFinishClass = 'node';
    if(props.node.colored && props.pointer){
        startFinishClass = 'node pointer'
    }else if(props.node.colored){
        startFinishClass = 'node node-colored'
    }

    return(
        <div className={startFinishClass} key={props.node.key}>
            
        </div>
    );  
}

export default Node;