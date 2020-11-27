for (form of document.forms) {
    console.log(form)
    form.addEventListener('click', (e) => {
        console.log(e.target.parentNode.id) // el id de la pregunta
        console.log(e.target.value) // el value de cada respuesta
    })
}

