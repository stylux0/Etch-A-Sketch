let container = document.getElementById("container");
const btnClear = document.getElementById("clear");
const inputRange = document.getElementById("resolution");
const labelRange = document.getElementById("label-resolution");
const inputColor = document.getElementById("color-select");
let canDraw = false;

let rowAndColumn = 4;
let currentColor = "#000000"
let heightContainerstring =  getComputedStyle(document.body).getPropertyValue('--height-container');
let heightContainer = parseInt (heightContainerstring.split('px')[0]);


console.log(inputColor.value);

setResolution();
createCanvas(heightContainer,rowAndColumn);
setClearCanvas();


inputColor.addEventListener('change',(e) =>{
    currentColor = e.target.value;
})


function setResolution(){
    labelRange.innerText = `Set resolution ${rowAndColumn} x ${rowAndColumn}`;
    inputRange.addEventListener('change',(e)=>{
        rowAndColumn = parseInt(e.target.value);
        labelRange.innerText = `Set resolution ${rowAndColumn} x ${rowAndColumn}`
        container.remove()
        container = document.createElement('div')
        container.setAttribute("id","container");
        document.getElementById('main-container').appendChild(container);
        createCanvas(heightContainer,rowAndColumn);
        
    })
}


function setClearCanvas(){
    btnClear.addEventListener('click',(e) => {
        console.log(container.children);
        for (const column of container.children) {
           console.log(column);
           for (const row of column.children){
            row.style.background = 'white';
           }
        }
        
    })
}





function createCanvas(height,rowcolumn){
    for (let col = 0; col < rowcolumn; col++) {
        let containerColumn = document.createElement("div");
        for (let row = 0; row < rowcolumn; row++) {
        containerColumn.appendChild(createSquare(height,rowcolumn));
        }
        container.appendChild(containerColumn);
    }
}

function createSquare(height,rowcolumn){
    let square = document.createElement("div");
    square.style.height = `${height/rowcolumn}px`;
    square.style.width = `${height/rowcolumn}px`;
    //square.style.border = "0.1px solid gray";
    square.className = "pixel";
    
    square.addEventListener('mousedown',(e) =>{canDraw = true})
    square.addEventListener('mouseup',()=>canDraw=false)
    square.addEventListener('mouseover',(e) =>{
       if (canDraw) {
        e.target.style.background = currentColor;
       } 
    })

    return square;
}