const button = document.getElementById('btn-novo-usuario');

button.addEventListener('click', () => {
    window.location.href = '/cadastro';
});

function removerUsuario(id) {
    console.log(id)
    fetch(`/deletar/${id}`, {
    method: 'DELETE'})
    .then(response => {
        if(response.ok){
            //Atualizar a página, depois da remoção do usuário (caso for bem-sucessida)
            location.reload();
        } else {
            console.log('Erro ao remover usuário:', response.status);
        }
    })

    .catch(error => {
        console.error('Erro ao remover usuário ', error);
    });
    }