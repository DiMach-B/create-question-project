export class Question {
    static create (question){
        fetch('https://create-question-project-default-rtdb.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => Question.fetchAllQuestion(localStorage.getItem('myToken')))
        .then(Question.renderList)
    }

    static renderList(questions) {

        const html = questions.length ? 
        questions.map(toCard).join('')
        : `<div class="item">Нет заданных вопросов, будьте первым!</div>`

        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static fetchAllQuestion(token) {

        if (token === 'undefined'){
            document.querySelector('.error').style.display = 'block'
            return 'err'
        }
        return fetch(`https://create-question-project-default-rtdb.firebaseio.com/question.json?auth=${token}`)
        .then(response => response.json())
        .then(response => {
            if(response && response.error){
                const errorMassage = document.querySelector('.error');
                errorMassage.style.display = 'block';
                errorMassage.innerHTML = response.error
                return 'err';
            }

            return response ? Object.keys(response).map(key => ({
                id: key,
                ...response[key]
            })) : []
        })
    }
}

function toCard(question){
    return `
     <div class="item">
     <div class="date">
     ${new Date(question.date).toLocaleDateString()}
     ${new Date(question.date).toLocaleTimeString()}
     </div>
     <div class="content">${question.text}</div>
     </div>`
}