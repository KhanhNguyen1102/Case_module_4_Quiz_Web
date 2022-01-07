function allTest() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (hi) {
            console.log(hi)
            displayTest(hi)
        }
    })
}

function displayTest(test) {
    let res = "";
    res += `<table border="1" cellpadding="5">
                <tr>
                    <th>name</th>
                    <th>status</th>
                    <th>username</th>
                    <th colspan="3">Action</th>
                </tr>`
    for (let i = 0; i < test.length; i++) {
        res += `<tr>
                    <td> ${test[i].name}</td>
                    <td> ${test[i].status}</td>
                    <td> ${test[i].user.username}</td>
                    <td><button onclick="viewTest(${test[i].id})">View</button></td>
                    <td><button onclick="showFormEditTest(${test[i].id})">Edit</button></td>
                    <td><button onclick="deleteTest(${test[i].id})">Delete</button></td>
                        </tr>`
    }
    res += `</table>`
    document.getElementById("listQuiz").innerHTML = res;
    let search = "";
    search += ` <div class="select-container">
                                        <form class="d-flex">
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="key">
                                            <a class="btn btn-outline-success" type="submit" onclick="searchTest()">
                                                Search
                                            </a></br>
                                        </form>
                                    </div>`

    let addButton = "<button type=\"submit\" class=\"btn btn-success\" style=\"width: 100%\" onclick=\"formCreateTest()\">New Test</button>";
    document.getElementById("inputSearch").innerHTML = search;
    document.getElementById("addBtn").innerHTML = addButton;
}
function searchTest(){

}

function formCreateTest() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (user) {
            console.log(user);
            let form = `<table cellpadding="5">
                      
                            <tr>
                                <th>name: </th>
                                <td><input type="text" id="name"></td>
                            </tr>
                            <tr>
                                <th>Status: </th>
                                <td><input type="text" id="status"></td>
                            </tr>
                            <tr>
                                <th>username: </th>
                                <td>
                                    <select id="user">`
            for (let i = 0; i < user.length; i++) {
                form += `<option value="${user[i].id}">${user[i].username}</option>`
            }
            form += `</select>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button onclick="saveTest()">Save</button></td>
                            </tr>
                        </table>`;
            document.getElementById("listQuiz").innerHTML = form;
        }
    })
}

function saveTest() {
    let test = {
        "name": document.getElementById("name").value,
        "status": document.getElementById("status").value,
        "user": {
            "id": document.getElementById("user").value,
        },

    }
    console.log(test)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/tests/create",
        data: JSON.stringify(test),
        success: function (test) {
            alert("Thêm Thành Công")
            allTest(test);
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function deleteTest(id) {
    if (confirm("Are you sure")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/tests?id=" + id,
            success: function (test) {
                allUser(test)
            },
            error: function (error) {
            }
        })
    }
}

function viewTest(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/tests?id=" + id,
        success: function (test) {
            console.log(test)
            let view = `<table cellpadding="5">
                                    <tr>
                                        <th>name: </th>
                                        <td>${test.name}</td>
                                    </tr>
                                    <tr>
                                        <th>status: </th>
                                        <td>${test.status}</td>
                                    </tr>
                                      <tr>
                                        <th>username: </th>
                                        <td>${test.user.fullName}</td>
                                    </tr>
                                </table>`;
            console.log(view)

            document.getElementById("display").innerHTML = view;
        }
    })
}


function showFormEditTest(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/tests?id=" + id,
        success: function (test) {
            console.log(test)
            let form =
                "<p>Name</p>" + `<input type="text" id="name" value="${test.name}">\n` + "<br>" +
                "<p>status</p>" + `<input type="text" id="status" value="${test.status}">\n` + "<br>" +
                "<p>User</p>" + `<input type="text" id="user" value="${test.user.id}">\n` + "<br>" +
                `<button onclick="updateTest(${test.id})">Thay đổi</button>` + '<br>'
            console.log(form)
            document.getElementById("display").innerHTML = form;
        }
    })
}

function updateTest(id) {
    let name = document.getElementById("name").value;
    let status = document.getElementById("status").value;
    let user = document.getElementById("user").value;
    let test = {
        name: name,
        status: status,
        user: {
            "id": user
        }
    }
    console.log(test)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/tests?id=" + id,
        data: JSON.stringify(test),
        success: alert("Sứa thành công"),
        error: function (error) {
            console.log(error)
        }
    })
}
