import React from 'react';
import Node from './Node';
import './styles/Grid.css'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            animating: false,
            inOrder: true
        };
    }

    componentDidMount() {
        const nodes = [];
        for(let row = 0; row < 25; row++){
            const curRow = [];
            for(let col = 0; col < 25; col++){
                let curNode = {
                    col, 
                    row,
                    key: `id${row}${col}`,
                    colored: col <= row ? true : false 
                };
                curRow.push(curNode);
            }
        nodes.push({numb: curRow, 
                    key: `kr${row}`,
                    isPointer: false
                    })
        }
        this.setState({nodes})
    }

    onClick = () => {
        this.bubbleSort(this.state.nodes);
    }
    renew = () => {
        let arr = this.state.nodes.slice(0);
        arr.sort(() => Math.random() - 0.5);
        this.setState({nodes: arr, inOrder: false})
    }

    bubbleSort = (arr) => {
        var noSwaps;
        var count = 0;
        for(var i = arr.length; i > 0; i--){
            noSwaps = true;
                for(var j = 0; j < i - 1; j++){
                    let x = arr[j].numb.filter(el => el.colored)
                    let y = arr[j + 1].numb.filter(el => el.colored)
                    if(x.length > y.length){
                        var temp = arr[j];
                        arr[j] = arr[j+1];
                        arr[j+1] = temp;
                        noSwaps = false;
                        this.time(count,arr.slice(0),i,j)
                        count++  
                    }else{
                        this.time(count,arr.slice(0),i,j)
                        count++ 
                    }
                }
            if(noSwaps){
                this.time(count,arr.slice(0),i,j)
                break
            
            };
        }
        setTimeout(() => {
            this.setState({animating: false, inOrder: true})
        }, 100 * count)

    }
    time = (count, arr,i,j) => {
        setTimeout(() => {
            arr[j].isPointer = true;
            arr[j+1].isPointer = true;
            this.setState({nodes: arr, animating: true})
            arr[j].isPointer = false;
            arr[j+1].isPointer = false;
            console.log(i)              
        }, 100 * count)               
      }


    render() {
        
        return(
            <div >
                <button className={this.state.inOrder || this.state.animating ? 'hide-buton' : 'show-button'} onClick={this.onClick}>Animate bubble sort</button>
                <button className={this.state.animating ? 'hide-buton' : 'show-button'} onClick={this.renew}>Shuffle</button>
                <table className='grid'>
                    {this.state.nodes.map((row) => {
                        return (
                            <thead key={row.key}>
                                <tr className='no-margin'>
                                    {row.numb.map((node) => {
                                        return <th className="border" key={node.key}><Node node={node} pointer={row.isPointer} key={node.key}/> </th>
                                    })}
                                </tr>                                
                            </thead>
                        );
                    })}                    
                </table>

            </div>
        );
    }
}

export default Grid;