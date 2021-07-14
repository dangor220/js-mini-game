var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var $stopGame = document.querySelector('#stop-game')

var score = 0
var color = ['red', 'blue', 'pink', 'yellow', 'green', 'orange']
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)
$stopGame.addEventListener('click', stopGameClick)



function startGame() {
    score = 0
    setGameTime()
    $stopGame.classList.remove('hide')
    $gameTime.setAttribute('disabled', true)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    isGameStarted = true
    $start.classList.add('hide')
    $game.style.backgroundColor = '#fff'

    var interval = setInterval(function() {
        var time = +$time.textContent

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - .1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function stopGameClick () {
    endGame()
}

function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(20, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    box.style.position = 'absolute'
    box.style.height = box.style.width = boxSize + 'px'
    box.style.backgroundColor = color[getRandom(0, color.length)]
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement("afterbegin", box)
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
    
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function endGame () {
    isGameStarted = false
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
    $result.textContent = score
    $start.classList.remove('hide')
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    $gameTime.removeAttribute('disabled')
    $stopGame.classList.add('hide')
}
function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
}