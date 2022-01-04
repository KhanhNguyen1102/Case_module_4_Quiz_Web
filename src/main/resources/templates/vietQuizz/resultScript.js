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
        success: function (data) {
            console.log(data)
            let test = `<option>Test :</option>`
            for (let i = 0; i < data.length; i++) {
                test += `<option value="${data[i].id}">${data[i].name}</option>`
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
        <select id="test" ></select>
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

function formCreateResult() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests",
        success: function (test) {
            console.log(test);
            let form = `<table cellpadding="5">
                      
                            <tr>
                                <th>Score: </th>
                                <td><input type="text" id="score"></td>
                            </tr>
                            <tr>
                                <th>User: </th>
                                <td><input type="text" id="user" placeholder="id của user"></td>
                            </tr>
                            <tr>
                                <th>Test: </th>
                                <td>
                                    <select id="test">`
            for (let i = 0; i < test.length; i++) {
                form += `<option value="${test[i].id}">${test[i].name}</option>`
            }
            form += `</select>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button onclick="saveResult()">Save</button></td>
                            </tr>
                        </table>`;
            document.getElementById("listResult").innerHTML = form;
        }
    })
}

function saveResult() {
    let quiz = {
        "score": document.getElementById("score").value,
        "user": {
            "id": document.getElementById("user").value,
        }, "test": {
            "id": document.getElementById("test").value,
        }
    }
    console.log(quiz)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/results/create",
        data: JSON.stringify(quiz),
        success: function () {
            alert("Thêm Thành Công")
            getALLResult();
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showFormEditResult(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/results?id=" + id,
        success: function (result) {
            console.log(result)
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/tests",
                success: function (test) {
                    console.log(test)
                    let form =
                        "<p>Score</p>" + `<input type="text" id="score" value="${result.score}">\n` + "<br>" +
                        "<p>User</p>" + `<input type="text" id="user" value="${result.user.id}">\n` + "<br>" +
                        "<p>Test</p>" + `<select  id="test">
                                 <option value="${result.test.id}"> ${result.test.name}</option>`
                    for (let i = 0; i < test.length; i++) {
                        form += `<option value="${test[i].id}">${test[i].name}</option>`
                    }
                    form += `</select>`
                        + `<button onclick="updateResult(${result.id})">Thay đổi</button>` + '<br>'
                    console.log(form)
                    document.getElementById("listResult").innerHTML = form;
                }
            })
        }
    })
}

function updateResult(id) {
    let score = document.getElementById("score").value;
    let user = document.getElementById("user").value;
    let test = document.getElementById("test").value;
    let result = {
        score: score,
        user: {
            "id": user
        },
        test: {
            "id": test
        }
    }
    console.log(result)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/results?id=" + id,
        data: JSON.stringify(result),
        success: alert("Sứa thành công"),
        error: function (error) {
            console.log(error)
        }
    })
}