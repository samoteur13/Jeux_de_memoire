//liens vers html

let timer = document.querySelector("#timer");
let victory = document.querySelector('#victory')
let col = document.querySelector('#col')
let row = document.querySelector('#row')
let time = document.querySelector('#time')
let board = document.querySelector('#board')
let grille = document.querySelector('#grille button')
let img = document.querySelector('#grille td')
let audio = new Audio('pika.mp3');
let audio_time = new Audio('tictac.mp3')

//let global
let nb_Array = []
let nombre_retourner = []
let board_cell = []

let nb_col;
let nb_row;
let crono;
var timerInterval = null;

let nb_paire = 0
let paire = 0
let disabled = false;

//demaré la partie
function start() {

  victory.innerHTML = ""
  nb_col = col.value
  nb_row = row.value
  nb_Array = []
  let calcul = nb_col * nb_row % 2
  if (calcul === 0) {
    nb_Array = []
    approval_cell()
    Nombre_Collone();
    Timer()
  } else {
    alert('vos cellule doivent former un nombre paire')
  }

}

//agremente les chiffre dans le tableaux selon le nombre de cellule
function approval_cell() {
  let calculation_cell = nb_col * nb_row / 2
  nb_paire = calculation_cell
  for (let i = 1; i <= calculation_cell; i++) {
    nb_Array.push(i)
    nb_Array.push(i)
  }
}

//crée les collone et cellules
function Nombre_Collone() {
  board.innerHTML = '';
  for (let x = 0; x < nb_col; x++) {
    const tr_element = document.createElement('tr');

    for (let y = 0; y < nb_row; y++) {
      const td_element = document.createElement('td')
      const img_element = document.createElement('img')
      img_element.hidden = true
      td_element.addEventListener('click', function () {
        if (!disabled) {
          //empeche le click sur des celules retourné
          if (img_element.hidden) {
            img_element.hidden = false
            if (img_element.hidden === false) {
              nombre_retourner.push(img_element.src)
              board_cell.push(td_element)
              turn()
            }
          }
        }
      });
      td_element.appendChild(img_element)
      tr_element.appendChild(td_element);
    }
    board.appendChild(tr_element);
  }
  Img_Random_for_Array()

}

//relance le tableaux
function reset() {
  victory.innerHTML = ""
  crono = 0
  paire = 0
  nb_Array = []
  approval_cell()
  Nombre_Collone()
  Timer()
  disabled = false;
}

//crée les condition de jeux
function turn() {
  if (nombre_retourner[0] === nombre_retourner[1]) {
    paire++
    crono += 10
    board_cell[0].style.background = 'green'
    board_cell[1].style.background = 'green'
    nombre_retourner = []
    board_cell = []
    Win_condition()
  } else if (nombre_retourner[0] && nombre_retourner[1]) {
    disabled = true;
    setTimeout(() => {// appelle ma fonction avec un delai de 1sec  
      board_cell[0].firstChild.hidden = true
      board_cell[1].firstChild.hidden = true
      nombre_retourner = []
      board_cell = []
      disabled = false;
    }, 1500); // delai toujours en milliseconde 
    // board.children[x].children[y].firstChild.hidden = true
  }
}

//distribue les chiffres dans la grille
function Img_Random_for_Array() {
  for (let x = 0; x < nb_col; x++) {
    for (let y = 0; y < nb_row; y++) {
      let stock_Random = Aleatoire(0, nb_Array.length - 1);
      board.children[x].children[y].firstChild.src = `./pokemon/${nb_Array[stock_Random]}.png`;  //modifier le data ici
      // splice (supprime a partir de , nombre d'élément)
      nb_Array.splice(stock_Random, 1)
    }
  }
}

//condition de victoire
function Win_condition() {
  if (paire === nb_paire) {
    victory.innerHTML = "Victory"
    audio.play()
    paire = 0
    clearInterval(timerInterval)
  }
}

function Aleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Timer() {
  crono = time.value
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => {
    crono--
    timer.innerHTML = crono
    if (crono < 15) {
      //timer.innerHTML.style.color = 'red'
      audio_time.play()
    }else if (crono === 0) {
      clearInterval(timerInterval);
      nombre_retourner = []
      disabled = true
      victory.innerHTML = "Domage le chrono est terminé vous avez perdue"
    } // Stopping the counter when reaching 0.

  }, 1000);
}




