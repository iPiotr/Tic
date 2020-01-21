const Player1 = 'fa-circle-o';
const Player2 = 'fa-times';
let round = 1;

const table = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


const boxes = document.querySelectorAll('.box');
boxes.forEach(box => box.addEventListener('click', pick));
 
$('.reset').click(function () {
    location.reload(); 
});



function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? Player2 : Player1;
    const move = round % 2 === 0 + 1 ? "Player 2" : "Player 1";
    if (table[row][column] !== '') return;
    event.target.classList.add(turn);
    table[row][column] = turn;
    round++;

    $('#move').text(move);
    console.log(check());
}

function check() {
    const result = table.reduce((total, row) => total.concat(row));
    let winner = '';
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };

    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[Player1].indexOf(index) > -1)) {
            winner = 'Winner: Player 1';
        }
        if (combination.every(index => moves[Player2].indexOf(index) > -1)) {
            winner = 'Winner: Player 2';
        }

        if (winner != '') {
            $(function(){
            document.querySelector('#move').innerHTML = winner;
            const boxes = document.querySelectorAll('.box');
            $(boxes).addClass('disable');
            });
            }
    });
    
    return winner;
}