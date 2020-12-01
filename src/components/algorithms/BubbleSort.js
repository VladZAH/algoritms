export default BubbleSort = (arr, timeoutFunc) => {
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
                    timeoutFunc(count,arr.slice(0),i,j)
                    count++  
                }else{
                    timeoutFunc(count,arr.slice(0),i,j)
                    count++ 
                }
            }
        if(noSwaps){
            timeoutFunc(count,arr.slice(0),i,j)
            break
        
        };
    }
    setTimeout(() => {
        this.setState({animating: false, inOrder: true})
    }, this.state.ms * count)

}