(function oderCampoMinato(){
    const startbtn = document.getElementById('start');
    const returntbtn = document.getElementById('resume');

    const playground = document.getElementById('playground');

//bottone per iniziare il gioco
startbtn.addEventListener('click', function() {
    playground.innerHTML = '' ;
    startbtn.classList.add('d-none');
    playground.classList.remove('d-none') ;
    returntbtn.classList.remove('d-none') ;

    const numSquare = parseInt(document.getElementById('difficulty').value);
    
    document.getElementById('select-container').classList.add('d-none');

    for(let i = 1 ; i <= numSquare ; i++){
        let square = createSquare(i , numSquare);

        playground.append(square) ;
    }
})

//bottone per tornare alla selezione della difficoltà
returntbtn.addEventListener('click', function() {
    startbtn.classList.remove('d-none');
    returntbtn.classList.add('d-none');
    playground.classList.add('d-none') ;    
    document.getElementById('select-container').classList.remove('d-none');
})


// utility

function createSquare(squareIndex , rowSquare){
    const squareWidth = Math.sqrt(rowSquare);
    const square = document.createElement('div');

    square.classList.add('square');
    square.style.width = `calc(100% /  ${squareWidth} )`;
    square.style.height = `calc(100% /  ${squareWidth} )`;
    square.innerHTML = squareIndex ;

    square.addEventListener('click' , function(){
        square.classList.toggle('active');
        console.log(squareIndex);
    })

    return square;
}

})();
