canvas = document.getElementById("cvgame")
ctx = canvas.getContext("2d")

let canvasX = null
let canvasY = null
let gridX = null
let gridY = null
let tiles = []
let selected = "factory"
let timeOne = 0;
let player = {
  money: 500,
  mps: 0,
  num_factory: 0
}

class City{
  constructor(){

  }

}

let city = new City()



document.addEventListener('contextmenu', event => event.preventDefault());

canvas.addEventListener("mousemove", function (e) {
  let cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
  canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas 
  canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make  
  requestAnimationFrame(update)
});

canvas.addEventListener("click", function () {
  let gridXs = (gridX < 10) ? "0" + gridX : gridX
  let gridYs = (gridY < 10) ? "0" + gridY : gridY
  let pushed = selected + "" + gridXs + "" + gridYs
  if (checkValid(gridXs, gridYs) == true || tiles.length == 0) {
    tiles.push(pushed)
  }
  requestAnimationFrame(update)
})

function update() {
  if ((Date.now() - timeOne) >= 10) {
      timeOne = Date.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      redrawTiles()
      writeCords()
      writeGrid()
      counters()
  }
  if (true){
      requestAnimationFrame(update)
  }
}

function counters(){
  player.mps = player.num_factory * 0.0125
  player.money += player.mps
  document.getElementById("money").innerText = `You have ${player.num_factory} factories, those make \$${(player.mps * 100).toFixed(1)} in a second, you currently have \$${(player.money).toFixed(1)}`
}

function redrawTiles(){
  player.num_factory = 0
  tiles.forEach(function (item) {
    console.log(item.slice(0, -4))
    ctx.drawImage(eval(item.slice(0, -4)), (item.substr(item.length - 4)).slice(0, -2) * 32, item.substr(item.length - 2) * 32, 32, 32)
    if (item.slice(0, -4) == "factory"){
      player.num_factory++
    }
  })
}

function writeCords() {
  ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 2, 10);
}

function writeGrid() {
  gridX = Math.floor(canvasX / 32)
  gridY = Math.floor(canvasY / 32)
  ctx.fillText("Grid: " + gridX + ", " + gridY, 2, 20)
  showSelection()
}

function showSelection() {
  ctx.beginPath();
  ctx.rect(gridX * 32, gridY * 32, 32, 32);
  ctx.stroke();
}

function checkValid(gridXs, gridYs) {
  let invalid = false
  tiles.forEach(function (item) {
    if (((item.substr(item.length - 4)) == (gridXs + gridYs)) || player.money < 300) {
      invalid = true
    }
  })
  if (invalid == true){
    return false
  } else {
    player.money -= 300
    return true
  }
}

/*$(".buildings>button").on("click", function () {
  console.log(this)
})*/