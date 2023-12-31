const darkMode = document.querySelector('#dark-btn');

function checkMode(){
    if(darkMode.checked){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
    }
}

darkMode.addEventListener('click',checkMode);