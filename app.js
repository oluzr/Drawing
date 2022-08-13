const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineCap="round"



let isPainting = false;
let isFilling = false;
canvas.addEventListener("mousemove",onMove)
canvas.addEventListener("mousedown",onMousedown)
canvas.addEventListener("mouseup",canclePainting)
canvas.addEventListener("mouseleave",canclePainting)
canvas.addEventListener("click",onMouseClick)
canvas.addEventListener("dblclick",onDoubleClick)
const lineWidth = document.getElementById("line-width")
lineWidth.addEventListener("change",onLineWidthChange)
ctx.lineWidth = lineWidth.value;

const color = document.getElementById("color")
color.addEventListener("change",onColorChange)

const colorOptions = Array.from(document.getElementsByClassName("color-option"))
colorOptions.forEach(i => i.addEventListener("click",onColorClick))

const modeBtn = document.getElementById("mode-btn")
modeBtn.addEventListener("click",onModeClick)

const destroyBtn = document.getElementById("destroy-btn") 
destroyBtn.addEventListener("click",onDestroyClick)

const eraseBtn = document.getElementById("eraser-btn")
eraseBtn.addEventListener("click",onEraseClick)


const fileInput = document.getElementById("file")
fileInput.addEventListener("change",onFileChange)

const textInput =document.getElementById("text")

const saveBtn = document.getElementById("save")
saveBtn.addEventListener("click",onSaveClick)
function onMove(e){
    if(isPainting){
        ctx.lineTo(e.offsetX,e.offsetY)
        ctx.stroke();
        return;
    }
    ctx.beginPath()
    ctx.moveTo(e.offsetX,e.offsetY);
}
function onMousedown(){
    isPainting = true;
}
function canclePainting(){
    isPainting = false;
}
function onLineWidthChange(e){
    ctx.lineWidth = e.target.value
}
function onColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;

}
function onColorClick (e){
    const colorValue = e.target.dataset.color 
    ctx.strokeStyle = colorValue 
    ctx.fillStyle = colorValue
    color.value=colorValue
}

function onModeClick(){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText="Fill"
    } else{
        isFilling=true
        modeBtn.innerText="draw"
    }
}
function onMouseClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    }
}
function onDestroyClick(){
    ctx.fillStyle = "#fff"
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
}
function onEraseClick(){
    ctx.strokeStyle="#fff";
    isFilling=false;
    modeBtn.innerText="Fill"
}


function onFileChange(e){
    const file =  e.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.src=url;
    image.onload=function(){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    }
    fileInput.value=null;
}

function onDoubleClick(e){
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth=1;
        ctx.font = "68px serif"
        ctx.strokeText(text,e.offsetX,e.offsetY)
        ctx.restore()
    }
}

function onSaveClick(e){
    const url = canvas.toDataURL();
    const a = document.createElement("a")
    a.href=url;
    a.download="myDrawing.png"
    a.click()
}
