let btn = document.querySelector('.btn'),
input = document.querySelector('.input'),
form = document.querySelector('.login-form');


const validateInput = ({target}) =>{
    if(target.value.length > 2){
        btn.removeAttribute('disabled');
    }
    else{
        btn.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) =>{ //comportamanto padrão : enviar o formulario e recarregar a pagina, voltando ao estado inicial
    event.preventDefault();
    localStorage.setItem('player', input.value); // chave, valor -> setItem and getItem -> valor recuperavel
    window.location = 'game.html'; // redirecionar
}

input.addEventListener('input', validateInput); //quando a pessoa escrever algo
form.addEventListener('submit', handleSubmit);