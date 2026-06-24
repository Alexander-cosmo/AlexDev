const formulario = document.querySelector('.formulario');
const modal= document.getElementById('modal');

formulario.addEventListener('submit', function(e){
e.preventDefault();
fetch(formulario.action,{
method: 'POST',
body: new FormData(formulario),

headers:{'accept':'application/json'}
}).then(function(response){
    if(response.ok){
        modal.classList.add('activo');
        formulario.reset();
    };
});

});

function cerrarmodal(){
modal.classList.remove('activo');

}