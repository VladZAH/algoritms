import React from 'react';
import Node from './Node';
import './styles/Grid.css'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            animating: false,
            inOrder: true,
            speed: 'medium',
            ms: 100
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

    animateBubblesort = () => {
        this.bubbleSort(this.state.nodes);
    }
    animateSelectionsort = () => {
        this.selectionSort(this.state.nodes);
    }
    animateInsertionsort = () => {
        this.insertionSort(this.state.nodes);
    }

    shuffle = () => {
        let arr = this.state.nodes.slice(0);
        arr.sort(() => Math.random() - 0.5);
        this.setState({nodes: arr, inOrder: false})
    }

    insertionSort = (arr) => {
        var count = 0
        var currentVal, curNum
        for(var i = 1; i < arr.length; i++){
            currentVal = arr[i];
            curNum = arr[i].numb.filter(el => el.colored).length;
            for(var j = i - 1; j >= 0 && arr[j].numb.filter(el => el.colored).length > curNum; j--) {
                this.time(count,arr.slice(0), j+1, i)
                count++
                let x = arr[j+1]
                arr[j+1] = arr[j] 
                arr[j] = x
            }  
            arr[j+1] = currentVal;
            curNum = j+1
            this.time(count,arr.slice(0), j+1, i)
            count++
        }
        setTimeout(() => {
            this.setState({animating: false, inOrder: true})
        }, this.state.ms * count)
    }



    selectionSort = (arr) => {
        const swap = (arr, idx1, idx2) =>
          ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
        let count = 0;
      
        for (var i = 0; i < arr.length; i++) {
          let lowest = i;
          for (var j = i + 1; j < arr.length; j++) {    
            this.time(count,arr.slice(0),lowest, j)
            count++
            let x = arr[lowest].numb.filter(el => el.colored)
            let y = arr[j].numb.filter(el => el.colored)
            if (x.length > y.length) {
              lowest = j;
            }
          }
          if (i !== lowest) {
              swap(arr, i, lowest);
              this.time(count,arr.slice(0),lowest, j)
              count++
          }

        }
        setTimeout(() => {
            this.setState({animating: false, inOrder: true, nodes: arr})
        }, this.state.ms * count)
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
                        this.time(count,arr.slice(0),j,j+1)
                        count++  
                    }else{
                        this.time(count,arr.slice(0),j,j+1)
                        count++ 
                    }
                }
            if(noSwaps){
                this.time(count,arr.slice(0),j,j+1)
                break
            
            };
        }
        setTimeout(() => {
            this.setState({animating: false, inOrder: true})
        }, this.state.ms * count)

    }
    time = (count, arr,p1,p2) => {
        setTimeout(() => {
            if(arr[p1] !== undefined && arr[p2] !== undefined){
            arr[p1].isPointer = true;
            arr[p2].isPointer = true;
            this.setState({nodes: arr, animating: true})
            arr[p1].isPointer = false;
            arr[p2].isPointer = false;  
            }          
        }, this.state.ms * count)               
      }

    handleOptionChange = (e) => {
        if(e.target.value === 'slow'){
            this.setState({
                speed: e.target.value,
                ms: 300
            });
        }else if(e.target.value === 'medium'){
            this.setState({
                speed: e.target.value,
                ms: 100
            });
        }else if(e.target.value === 'fast'){
            this.setState({
                speed: e.target.value,
                ms: 50
            });
        }
            
    }


    render() {
        let disabled = this.state.inOrder || this.state.animating;
        let shuffle = this.state.animating;
        return(
            <div className='app'>
                <form>
                    <h1>Animate Algorithms</h1>
                    <p>select playing speed, shuffle, and go...</p>
                    <input type="radio" id="slow" name="speed" value="slow" checked={this.state.speed === 'slow'} onChange={this.handleOptionChange} />
                    <label htmlFor="slow">slow</label>
                    <input type="radio" id="medium" name="speed" value="medium" checked={this.state.speed === 'medium'} onChange={this.handleOptionChange}/>
                    <label htmlFor="medium">medium</label>
                    <input type="radio" id="fast" name="speed" value="fast" checked={this.state.speed === 'fast'} onChange={this.handleOptionChange}/>
                    <label htmlFor="fast">fast</label>
                </form>

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
                <button disabled={shuffle} className='shuffle-btn' onClick={this.shuffle}>SHUFFLE</button> <br />
                <button disabled={disabled} className='button' onClick={this.animateInsertionsort}>Animate <br/> Insertion Sort</button>
                <button  disabled={disabled} onClick={this.animateSelectionsort}>Animate <br/>  Selection Sort</button>    
                <button disabled={disabled} onClick={this.animateBubblesort}>Animate <br/>  Bubble Sort</button>
            </div>
        );
    }
}

export default Grid;