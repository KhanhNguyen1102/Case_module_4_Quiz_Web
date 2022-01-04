function getUser() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users",
        success: function (data) {
            console.log(data)
            let user = `<option>Người dùng :</option>`
            for (let i = 0; i < data.length; i++) {
                user += `<option value="${data[i].id}">${data[i].name}</option>`
                document.getElementById('user').innerHTML = user;
            }
        }
    })
}

function getTest() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests",
        success: function (test) {
            console.log(test)
            let user = `<option>Test :</option>`
            for (let i = 0; i < data.length; i++) {
                user += `<option value="${data[i].id}">${data[i].name}</option>`
                document.getElementById('test').innerHTML = test;
            }
        }
    })
}

function getALLResult() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/results",
        success: function (result) {
            console.log(result)
            // getUser()
            getTest()
            displayResult(result)

        }
    })
}

function displayResult(array) {
    let res = "";
    res += `<hr>
        <select id="category" ></select>
        
            <hr>`
    res += `<table border="1" cellpadding="5">
    <tr>
        <th>Score</th>
        <th>User</th>
        <th>Test</th>
        <th colspan="3">Action</th>
    </tr>`
    for (let i = 0; i < array.length; i++) {
        res += `<tr>
    <td> ${array[i].score}</td>
    <td> ${array[i].user.fullName}</td>
    <td> ${array[i].test.name}</td>
    <td><button onclick="viewResult(${array[i].id})">View</button></td>
    <td><button onclick="showFormEditResult(${array[i].id})">Edit</button></td>
    <td><button onclick="deleteResult(${array[i].id})">Delete</button></td>
</tr>`
    }
    res += `</table>`
    console.log(res)
    document.getElementById("listResult").innerHTML = res;
}
