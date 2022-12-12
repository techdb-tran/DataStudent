function resetInput(){
    document.getElementById('index').value=''
    document.getElementById('name').value=''
    document.getElementById('birthday').value=''
    document.getElementById('phonenumber').value=''
}
function validateAge(){
    const isAdult =()=>{
    let birthday = document.getElementById('birthday').value
    let age = (new Date(birthday)).getFullYear()
    const currentYear = (new Date()).getFullYear()
    if((currentYear-age)>=18&&(currentYear-age)<100){
        return true;
    }else{return false}}
    if(isAdult()===false){
        document.getElementById('validBirthday').innerText =`Your age is 18 to 100`}
    else{document.querySelector('.error-message').innerText =''}
    
}

function validateInput(){
    let name = document.getElementById('name').value
    let phonenumber = document.getElementById('phonenumber').value
    //validate Name {5,15}
    const regexName = /^(.|\s){5,15}$/
    if(!regexName.test(name)){document.getElementById('validName').innerText =`Min-Name is 5, Max-Name is 15`}
    else{document.querySelector('.error-message').innerText =''}
    //validate PhoneNumber(10)
    const regexPhonenumber = /^[0-9\-\+]{10,10}$/
    if(!regexPhonenumber.test(phonenumber)){document.getElementById('validPhonenumber').innerText =`Phone number include of 10 number`}
    else{document.querySelector('.error-message').innerText =''}
}
function addNew(){
    validateAge()
    validateInput()
    let eleForm = document.querySelector('.form')
    let eleError = eleForm.querySelectorAll('.error-message')
    let eleErrorArr = []
    eleError.forEach((item)=>{
        eleErrorArr.push(item.innerText)
    })
    let checkError = eleErrorArr.every(value => value ==='')
    if(checkError){
        let name = document.getElementById('name').value
        let birthday = document.getElementById('birthday').value
        let phonenumber = document.getElementById('phonenumber').value
        let idStudent = document.getElementById('index').value
        let listStudent = localStorage.getItem('list-student')?JSON.parse(localStorage.getItem('list-student')) :[]
        listStudent.push(
            {   
                idStudent: idStudent,
                name: name,
                birthday: birthday,
                phonenumber: phonenumber
            })
            localStorage.setItem('list-student', JSON.stringify(listStudent));
            renderStudent()
            resetInput()
    }
}
function renderStudent(){
    let listStudent = localStorage.getItem('list-student')?JSON.parse(localStorage.getItem('list-student')):[]
    let student =`
            <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>BIRTHDAY</th>
            <th>PHONE NUMBER</th>
            <th>ACTION</th>
            </tr>`
    listStudent.map((value,index)=>{
        student += `
            <tr>
                <td>${index+1}</td>
                <td>${value.name}</td>
                <td>${value.birthday}</td>
                <td>${value.phonenumber}</td>
                <td><button onclick="editStudent(${index})">Edit</button></td>             
            </tr>`
    })
    document.getElementById('tableContent').innerHTML =student
}
function editStudent(index){
    let listStudent = localStorage.getItem('list-student')?JSON.parse(localStorage.getItem('list-student')):[]
    document.getElementById('name').value =listStudent[index].name
    document.getElementById('birthday').value =listStudent[index].birthday
    document.getElementById('phonenumber').value =listStudent[index].phonenumber
    document.getElementById('index').value =index

    document.getElementById('save').style.display = 'none'
    document.getElementById('update').style.display ='inline-block'
}
function update(){
    validateAge()
    validateInput()
    let listStudent = localStorage.getItem('list-student')?JSON.parse(localStorage.getItem('list-student')):[]
    let index = document.getElementById('index').value
    listStudent[index]={
        name:document.getElementById('name').value,
        birthday:document.getElementById('birthday').value,
        phonenumber:document.getElementById('phonenumber').value,
        idStudent:document.getElementById('index').value
    }
    localStorage.setItem('list-student', JSON.stringify(listStudent));
    document.getElementById('save').style.display = 'inline-block'
    document.getElementById('update').style.display ='none'
    renderStudent();
    resetInput();
}
function logOut(){
    localStorage.removeItem('token')
}