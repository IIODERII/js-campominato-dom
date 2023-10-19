(function oderCampoMinato(){

    const NUM_BOMBE = 16;

    play();

    function play(){
        const startbtn = document.getElementById('start');
        const returntbtn = document.getElementById('resume');

        const playground = document.getElementById('playground');
        const scoreContainer = document.getElementById('score');
        const selectContainer = document.getElementById('select-container');

        let bombList = [] ;
        let score;
        let youLose;
        let square;
        let maxClick

        //bottone per iniziare il gioco
        startbtn.addEventListener('click', function() {
            youLose = false;

            playground.innerHTML = '' ;
            startbtn.classList.add('d-none');
            playground.classList.remove('d-none') ;
            returntbtn.classList.remove('d-none') ;
            scoreContainer.className = 'fw-bold fs-3 text-center p-3 d-inline-block mx-auto rounded-3';

            const numSquare = parseInt(document.getElementById('difficulty').value);           
            maxClick = numSquare - NUM_BOMBE ;

            score = 0 ;
            scoreContainer.innerHTML = `Punteggio: ${score}`;

            generaBombe(numSquare);

            console.log(bombList.sort());
            
            selectContainer.classList.add('d-none');

            for(let i = 1 ; i <= numSquare ; i++){
                square = createSquare(i , numSquare);

                playground.append(square) ;
            }
        })

        //bottone per tornare alla selezione della difficoltà
        returntbtn.addEventListener('click', function() {
            startbtn.classList.remove('d-none');
            returntbtn.classList.add('d-none');
            playground.classList.add('d-none') ;    
            selectContainer.classList.remove('d-none');
            scoreContainer.className = 'd-none';

            bombList = [] ;
        })


        // utility

        function createSquare(squareIndex , rowSquare){
            const squareWidth = Math.sqrt(rowSquare);
            const square = document.createElement('div');

            square.classList.add('square');
            square.style.width = `calc(100% /  ${squareWidth} )`;
            square.style.height = `calc(100% /  ${squareWidth} )`;
            square.innerHTML = squareIndex ;

            square.addEventListener('click' , function colorSquare(){

                if(!youLose){
                    if(bombList.includes(squareIndex)){
                        square.classList.add('bomb');
                        square.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>' ;
                        console.log('BOMBA');
                        youLose = true ;
                        gameOver();
                    }else{
                        square.classList.add('active');
                        console.log(squareIndex);
                        square.removeEventListener('click' , colorSquare);
                        score++ ;
                        scoreContainer.innerHTML = `Punteggio: ${score}`;
    
                        if(score === maxClick){
                            gameOver();
                        }
                    }
                }else{
                    square.removeEventListener('click' , colorSquare);
                }
                             
            })

            return square;
        }

        function generaBombe(maxBomb){
            while(bombList.length < NUM_BOMBE){
                let bomba = getRndInteger(1 , maxBomb);
                if(!bombList.includes(bomba)){
                    bombList.push(bomba)
                }
            }
        }

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        function gameOver(){
            const squareList = document.getElementsByClassName('square');

            if(youLose && score < maxClick){

                scoreContainer.classList.add('bg-danger');
                scoreContainer.innerHTML = `
                    Peccato hai perso. <br>
                    Punteggio: ${score}
                `;
            }else{
                scoreContainer.classList.add('bg-success');
                scoreContainer.innerHTML = `
                    Complimenti Hai vinto!!! <br>
                    Punteggio: ${score}
                `;
            }

            for(let i = 0 ; i < squareList.length ; i++){
                let currentSquare = squareList[i] ;

                if(bombList.includes(i+1)){
                    currentSquare.classList.add('bomb');
                    currentSquare.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>' ;
                }
            }
        }
    }
})();
    
    
