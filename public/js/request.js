const form = document.getElementById('test-form')

form.addEventListener('submit', (e) => {
    e.preventDefault
    debugger
    console.log(e.target.elements)
    const data = {
        question: e.target.elements.question.value,
        answer1: e.target.elements.answer1.value,
        answer2: e.target.elements.answer2.value,
        answer3: e.target.elements.answer3.value,
        answer4: e.target.elements.answer4.value
    }

    const dataJSON = JSON.stringify(data)
    axios.post('/api/tests', dataJSON)
/*     axios({
        method: 'post',
        url: '/api/tests',
        data
    }) */
})