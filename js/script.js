const regForm = document.forms['reg-form']
const signForm = document.forms['sign-form']

const regBtn = document.querySelector('#reg-btn')
const signBtn = document.querySelector('#sign-btn')

regBtn.addEventListener('click', ()=> {
    regForm.hidden = false
    signForm.hidden = true
})

signBtn.addEventListener('click', ()=> {
    signForm.hidden = false
    regForm.hidden = true
})

const users = JSON.parse(localStorage.getItem('users')) || []

regForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const gender = document.querySelector('input[type=radio]:checked').value
    const login = regForm.login.value
    const password = regForm.password.value
    const lang = regForm.lang.value
    const mailing = regForm.mailing.checked

    const user = {
        login,
        password,
        lang,
        gender,
        mailing
    }

   if(users.find(it => it.login === login)){
       alert('пользователь с таким логином уже существует')
       return
   }
   if(user.password.length < 8){
       alert('пароль должен состоять не меньше 8 символов')
       return;
   }
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    alert('вы зарегестрированы')
    regForm.reset()
})

signForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const login = signForm.login.value
    const password = signForm.password.value

    const user = users.find(it => it.login === login)


    if(!user){
        alert('Неверный логин или пароль')
        return;
    }
    if(user.password !== password){
        alert('Неверный логин или пароль')
        return;
    }

    alert(`Добро пожаловать, ${user.login}`)
    signForm.reset()
})