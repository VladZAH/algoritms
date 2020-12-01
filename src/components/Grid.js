import React, {useState, useEffect} from 'react';
import Node from './Node';
import './styles/Grid.css'

const Grid = () => {

    const [nodes, setNodes] = useState([])
    const [animating, setAnimating] = useState(false)
    const [inOrder, setInOrder] = useState(true)
    const [speed, setSpeed] = useState('medium')
    const [ms, setMs] = useState(100)

    useEffect(() => {
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
        setNodes(nodes)
    }, [])


    const animateBubblesort = () => {
        bubbleSort(nodes);
    }
    const animateSelectionsort = () => {
        selectionSort(nodes);
    }
    const animateInsertionsort = () => {
        insertionSort(nodes);
    }

    const shuffle = () => {
        let arr = nodes.slice(0);
        arr.sort(() => Math.random() - 0.5);
        setNodes(arr);
        setInOrder(false)
    }

    const insertionSort = (arr) => {
        var count = 0
        var currentVal, curNum
        for(var i = 1; i < arr.length; i++){
            currentVal = arr[i];
            curNum = arr[i].numb.filter(el => el.colored).length;
            for(var j = i - 1; j >= 0 && arr[j].numb.filter(el => el.colored).length > curNum; j--) {
                time(count,arr.slice(0), j+1, i)
                count++
                let x = arr[j+1]
                arr[j+1] = arr[j] 
                arr[j] = x
            }  
            arr[j+1] = currentVal;
            curNum = j+1
            time(count,arr.slice(0), j+1, i)
            count++
        }
        setTimeout(() => {
            setAnimating(false)
            setInOrder(true)
        }, ms * count)
    }



    const selectionSort = (arr) => {
        const swap = (arr, idx1, idx2) =>
          ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
        let count = 0;
      
        for (var i = 0; i < arr.length; i++) {
          let lowest = i;
          for (var j = i + 1; j < arr.length; j++) {    
            time(count,arr.slice(0),lowest, j)
            count++
            let x = arr[lowest].numb.filter(el => el.colored)
            let y = arr[j].numb.filter(el => el.colored)
            if (x.length > y.length) {
              lowest = j;
            }
          }
          if (i !== lowest) {
              swap(arr, i, lowest);
              time(count,arr.slice(0),lowest, j)
              count++
          }

        }
        setTimeout(() => {
            setAnimating(false)
            setInOrder(true)
            setNodes(arr)
        }, ms * count)
    }

    const bubbleSort = (arr) => {
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
                        time(count,arr.slice(0),j,j+1)
                        count++  
                    }else{
                        time(count,arr.slice(0),j,j+1)
                        count++ 
                    }
                }
            if(noSwaps){
                time(count,arr.slice(0),j,j+1)
                break
            };
        }
        setTimeout(() => {
            setAnimating(false)
            setInOrder(true)
        }, ms * count)

    }
    const time = (count, arr,p1,p2) => {
        setTimeout(() => {
            if(arr[p1] !== undefined && arr[p2] !== undefined){
            arr[p1].isPointer = true;
            arr[p2].isPointer = true;
            setNodes(arr);
            setAnimating(true);
            arr[p1].isPointer = false;
            arr[p2].isPointer = false;  
            }          
        }, ms * count)               
      }

    const handleOptionChange = (e) => {
        if(e.target.value === 'slow'){
            setSpeed(e.target.value)
            setMs(300)
        }else if(e.target.value === 'medium'){
            setSpeed(e.target.value)
            setMs(100)
        }else if(e.target.value === 'fast'){    
            setSpeed(e.target.value)
            setMs(50)
        }
            
    }

    return(
        <div className='app'>
            <form>
                <h1>Animate Algorithms</h1>
                <p>select playing speed, shuffle, and go...</p>
                <input type="radio" id="slow" name="speed" value="slow" checked={speed === 'slow'} onChange={handleOptionChange} />
                <label htmlFor="slow">slow</label>
                <input type="radio" id="medium" name="speed" value="medium" checked={speed === 'medium'} onChange={handleOptionChange}/>
                <label htmlFor="medium">medium</label>
                <input type="radio" id="fast" name="speed" value="fast" checked={speed === 'fast'} onChange={handleOptionChange}/>
                <label htmlFor="fast">fast</label>
            </form>

            <table className='grid'>
                {nodes.map((row) => {
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
            <button disabled={animating} className='shuffle-btn' onClick={shuffle}>SHUFFLE</button> <br />
            <button disabled={inOrder || animating} className='button' onClick={animateInsertionsort}>Animate <br/> Insertion Sort</button>
            <button  disabled={inOrder || animating} onClick={animateSelectionsort}>Animate <br/>  Selection Sort</button>    
            <button disabled={inOrder || animating} onClick={animateBubblesort}>Animate <br/>  Bubble Sort</button>
        </div>
    );
    
}

export default Grid;