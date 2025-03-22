const pizarra=document.querySelector('.board');
const celdas=document.querySelectorAll('.cell');
const display=document.getElementById('winner');

let actualPlayer='X';
let gameActive=true;
let pizarraState=['','','','','','','','',''];

function verificarGanador(){
    const combinacionesGanadoras=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(const combinacion of combinacionesGanadoras){
        const [a,b,c]=combinacion;
        if(pizarraState[a]&&pizarraState[a]===pizarraState[b]&&pizarraState[a]===pizarraState[c]){
            return pizarraState[a];
        }
    }
    return null;
}


    function verificaClickCelda(event){
        const celda=event.target;
        const index=celda.dataset.index;

        if(!gameActive || pizarraState[index]) return;
        

        pizarraState[index]=actualPlayer;
        celda.textContent=actualPlayer;
        celda.classList.add('taken');

        const winner=verificarGanador();
        if(winner){
            display.textContent=`${winner} ha ganado!`;
            gameActive=false;
            return;
        } else if(!pizarraState.includes('')){
            display.textContent='Empate!';
            gameActive=false;
        }else{
            actualPlayer=actualPlayer==='X'?'O':'X';
        }

        
    }

    celdas.forEach(cell=>cell.addEventListener('click',verificaClickCelda));
   
