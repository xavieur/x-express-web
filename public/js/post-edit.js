const postEditForm = document.querySelector('#post-form-edit')

postEditForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    console.log('hola', e.submitter)
    let submitterID = e.submitter.id
    const postID = e.target.dataset.id

    if (submitterID === 'edit') {
        const update = {}
        const title = e.target.elements.title.value
        if (title) {
            update.title = title
        }
        const snippet = e.target.elements.snippet.value
        if (snippet) {
            update.snippet = snippet
        }
        const body = e.target.elements.body.value
        if (body) {
            update.body = body
        }

        console.log( )

        try {
            const resultado = await axios.patch(`/api/posts/${postID}`, update)
            console.log(resultado)
            
        } catch (error) {
            console.log(error)
        }

        window.location.assign('/')
    } else if (submitterID === 'delete') {

        try {
            const resultado = await axios.delete(`/api/posts/${postID}`)
            console.log(resultado)
            
        } catch (error) {
            console.log(error)
        }
        window.location.assign('/')
    }
})