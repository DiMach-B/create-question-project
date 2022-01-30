export function creteModale(title) {
    const model = document.createElement('div')
    model.className = 'modale'
    model.innerHTML = `
    <div class="modale-content">
    ${title == 'Авторизация' ?
            '<div class="title-model">Авторизация</div>'
            : '<div class="title-model">Регистрация</div>'
        }
    <div><input id="email" type="email" required placeholder="Введите логин"></div>
    <div><input id="password" type="password" placeholder="Введите пароль"></div>
    <p class="error">Введён не корретно логин, либо пароль!</p>
    ${title == 'Авторизация' ?
            `<span id='redirReg'>Зарегестрироваться</span>`
            : `<span id='redirAuth'>Авторизоваться</span>`
        }

    ${title == 'Авторизация' ?
            `<button id='auth'>Войти</button>`
            : `<button id='regr'>Зарегестрироваться</button>`
        }
    
</div>
    `
    document.body.prepend(model)
}

export function authFithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDLawqSYvFaWS7eVHp2op9FN5Djmtes2fg'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('myToken', data.idToken)
            return data.idToken;
    })

}

export function regrFithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDLawqSYvFaWS7eVHp2op9FN5Djmtes2fg'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => data)

}