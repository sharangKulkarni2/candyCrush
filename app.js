const grid = document.querySelector('.grid')
const width = 8
const squares = []
let score = 0
const scoreDisplay = document.getElementById('score')

const candyColores = [
    'url(red-candy.png)',
    'url(yellow-candy.png)',
    'url(orange-candy.png)',
    'url(purple-candy.png)',
    'url(green-candy.png)',
    'url(blue-candy.png)'
]

function createBoard() {
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
      
        let randomColor = Math.floor(Math.random() * candyColores.length)
        square.style.backgroundImage = candyColores[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

function dragStart(e) {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(squareIdBeingDragged,'dragstart')
}
function dragEnd(e) {
    console.log(this.id, 'dragend')
    let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + width,
        squareIdBeingDragged + 1
    ]

    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }


}
function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragover')
}
function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragenter')
}
function dragLeave(e) {
    console.log(this.id, 'dragleave')
}
function dragDrop(e) {
   
    console.log(this.id, 'dragDrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

function moveDown() {
    const firstRow = [0, 1, 2, 3, 4, 5, 6]
    for (let i = 0; i <= 55; i++) {
        if (squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
        }
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * candyColores.length)
                squares[i].style.backgroundImage = candyColores[randomColor]
        }

        
    }

 }




function checkRowForThree() {
    for (let i = 0; i <= 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if(notValid.includes(i)) continue

        if (!isBlank && rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor)) {
            score += 3
            scoreDisplay.textContent = score
            setTimeout(() => {
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }, 400)
          
        }
    }
}

function checkRowForFour() {
    for (let i = 0; i <= 60; i++) {
        let rowOfFour= [i, i + 1, i + 2, i + 3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31,37, 38, 39,45, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue

        if (!isBlank && rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor)) {
            score += 4
            scoreDisplay.textContent = score
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}




function checkColumnForThree() {
    for (let i = 0; i <= 47; i++) {
        let columnOfThree = [i, i + width , i + 2*width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        if (!isBlank && columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor)) {
            score += 3
            scoreDisplay.textContent = score
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

function checkColumnForFour() {
    for (let i = 0; i <= 39; i++) {
        let columnOfFour = [i, i + width, i + 2 * width,  i + 3*width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        if (!isBlank && columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor)) {
            score += 4
            scoreDisplay.textContent = score
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

window.setInterval(function () {
    moveDown() 
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
},100)