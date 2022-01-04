function allTest() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests",
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
    document.getElementById("display").innerHTML = res;
}


function formCreateTest() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/users",
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
            document.getElementById("display").innerHTML = form;
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
