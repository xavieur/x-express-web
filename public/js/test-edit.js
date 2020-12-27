const testEditForm = document.querySelector('#test-form-edit')

testEditForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    let submitterID = e.submitter.id
    const testID = e.target.dataset.id

    console.log('test-id: ', testID)

    if (submitterID === 'edit') {
        const update = {}
        const question = e.target.elements.question.value
        if (question) {
            update.question = question
        }
        const answer1 = e.target.elements.answer1.value
        if (answer1) {
            update.answer1 = answer1
        }
        const answer2 = e.target.elements.answer2.value
        if (answer2) {
            update.answer2 = answer2
        }
        const answer3 = e.target.elements.answer3.value
        if (answer3) {
            update.answer3 = answer3
        }
        const answer4 = e.target.elements.answer4.value
        if (answer4) {
            update.answer4 = answer4
        }
        const solution = e.target.elements.solution.value
        if (solution) {
            update.solution = solution
        }
        

        try {
            const resultado = await axios.patch(`/api/tests/${testID}`, update)
            console.log(resultado)
            
        } catch (error) {
            console.log(error)
        }

        window.location.assign('/tests')
    } else if (submitterID === 'delete') {

        try {
            const resultado = await axios.delete(`/api/tests/${testID}`)
            console.log(resultado)
            
        } catch (error) {
            console.log(error)
        }
        window.location.assign('/tests')
    }
})