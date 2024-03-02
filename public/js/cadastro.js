document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'alert alert-success mt-3';
        confirmationMessage.textContent = 'Cadastro feito com sucesso!';
        form.parentNode.insertBefore(confirmationMessage, form.nextSibling);
    });
});


//<div class="form-group col-md-6">
{/* <label for="cidade">Cidade:</label>
<input type="text" class="form-control" name="cidade" id="cidade" placeholder="Digite a cidade">
</div> */}