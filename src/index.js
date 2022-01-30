import { creteModale, authFithEmailAndPassword, regrFithEmailAndPassword } from "./utils";
import { Question } from "./question";

const input = document.querySelector('.question')
const button = document.querySelector('.addQuestion')
const authButton = document.querySelector('.green')
const regButton = document.querySelector('.red')
const endButton = document.querySelector('.end')
button.disabled = true;
input.disabled = true;


input.addEventListener('input', () => {

    if (!isValid(input.value)) {
        button.style.opacity = '0.5'
    } else {
        button.style.opacity = '1'
    }

})


button.addEventListener('click', function addQuestion() {

    const question = {
        text: input.value.trim(),
        date: new Date().toJSON()
    }
    Question.create(question)
})

authButton.addEventListener('click', () => openModale('Авторизация'))
regButton.addEventListener('click', () => openModale('Регистрация'))
window.addEventListener('click', outCloseModale)


function openModale(title) {
    creteModale(title)
    const modale = document.querySelector('.modale')
    if (title == 'Авторизация') {
        document.querySelector('#auth')
            .addEventListener('click', authHendler)
        document.querySelector('#redirReg')
            .addEventListener('click', () => {
                modale.remove()
                openModale('Регистрация')
            })
    } else {
        document.querySelector('#regr')
            .addEventListener('click', regrHendler)
        document.querySelector('#redirAuth')
            .addEventListener('click', () => {
                modale.remove()
                openModale('Авторизация')
            })
    }
}


function outCloseModale(e) {

    const modale = document.querySelector('.modale')

    if (e.target == modale) {
        modale.remove()
    }
}

function authHendler() {

    const modale = document.querySelector('.modale')
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    authFithEmailAndPassword(email, password)
        .then(() => Question.fetchAllQuestion(localStorage.getItem('myToken')))
        .then((data) => {
            if (data == 'err') { } else {
                Question.renderList(data)
                document.querySelector('.green').style.display = 'none'
                document.querySelector('.red').style.display = 'none'
                document.querySelector('.end').style.display = 'flex'
                input.disabled = false;
                button.disabled = false
                button.style.opacity = '1'
                document.querySelector('.title4').innerHTML = 'Вопросы пользователей'
                modale.remove()
            }
        })
}

function regrHendler() {

    const modale = document.querySelector('.modale')
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    regrFithEmailAndPassword(email, password)
        .then((data) => {

            if (data.error && data.error.message == 'EMAIL_EXISTS') {
                document.querySelector('.error').style.display = 'block'
                document.querySelector('.error').innerHTML = 'Пользователь уже существует!'
            } else {

                modale.remove()
                openModale('Авторизация')
            }

        })

}

endButton.addEventListener('click', closeSession)

function closeSession() {
    location.reload();
    localStorage.removeItem('myToken');

    document.querySelector('.title4').innerHTML = 'Чтобы посмотреть вопросы пользователей и задать вопрос - авторизуйтесь!'
}



