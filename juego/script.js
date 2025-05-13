var words = ['red', 'orange', 'gold', 'green', 'blue', 'indigo', 'violet', 'hotpink', 'turquoise'];
var overlap_wanted = true

function setGameUp() {
  var blocks = 100
  const cb = document.querySelector('#crossword_board')
  var md = false
  var num_words = 3

  cb.innerHTML = ''
  cb.className = ''
  cb.style.pointerEvents = ''
  document.documentElement.style.setProperty('--bg-color', '#666')
  document.querySelectorAll('.listed_word').forEach(function (e) {
    e.remove()
  })

  var puzzle = wordfind.newPuzzle(words, {
    // Set dimensions of the puzzle
    height: 10,
    width: 10,
    // or enable all with => orientations: wordfind.validOrientations,
    orientations: ['horizontal', 'vertical'],
    // Set a random character the empty spaces
    fillBlanks: true,
    preferOverlap: overlap_wanted
  });

  // console.log(puzzle);
  puzzle = [].concat(...puzzle)

  function addBlocks() {
    for (var i = 0; i < blocks; i++) {
      var b = document.createElement('div')
      b.className = 'block'
      cb.appendChild(b)
    }
  }

  function addLetters() {
    for (var i = 0; i < puzzle.length; i++) {
      var b = document.querySelectorAll('.block')
      b[i].innerHTML = puzzle[i]
    }
  }

  function addWordsToFind() {
    for (var i = 0; i < words.length; i++) {
      var w = document.createElement('div')
      w.className = 'listed_word'
      w.innerHTML = words[i]
      document.body.appendChild(w)
    }
  }

  addBlocks()
  addLetters()
  addWordsToFind()

  function removeHighlights() {
    var h = document.querySelectorAll('.highlight')
    h.forEach(function (elm) {
      elm.classList.remove('highlight')
    })
  }

  function wordMatch() {
    var h = document.querySelectorAll('.highlight')
    h.forEach(function (elm) {
      elm.style.background = current_word
      document.documentElement.style.setProperty('--bg-color', current_word)
      elm.classList.add('letter_pop')
      elm.classList.remove('highlight')
    })

    var word_list = document.querySelectorAll('.listed_word')
    word_list.forEach(function (elm) {
      if (elm.innerHTML == current_word) {
        elm.classList.add('found_word')
      }
    })

    if (match == words.length) {
      cb.classList.add('game_winner')
      cb.style.pointerEvents = 'none'
    }
  }

  var match = 0
  var current_word = ''
  function checkCurrentWord() {
    if (words.includes(current_word)) {
      // console.log('Match!')
      match++
      wordMatch()
    } else {
      removeHighlights()
    }
  }
  var blocks = document.querySelectorAll('.block')
  blocks.forEach(function (elm) {
    elm.onmousedown = function () {
      md = true
      if (md) {
        current_word += this.innerHTML
        this.classList.add('highlight')
        // console.log(current_word)
      }
    }
    elm.onmouseenter = function () {
      if (md) {
        current_word += this.innerHTML
        this.classList.add('highlight')
        // checkCurrentWord()
      }
    }
    elm.onmouseup = function () {
      md = false
      checkCurrentWord()
      current_word = ''
    }
  })

  var touch_point = []
  function touch_move(event) {
    console.log(event.touches)
    var block = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
    touch_point.push(block)
    if (touch_point[touch_point.length - 2] != block) {
      current_word += block.innerHTML
      console.log(current_word)
      block.classList.add('highlight')
    }
  }
  function touch_end(event) {
    checkCurrentWord()
    current_word = ''
  }

  cb.addEventListener('touchmove', touch_move)
  cb.addEventListener('touchend', touch_end)
}

setGameUp()