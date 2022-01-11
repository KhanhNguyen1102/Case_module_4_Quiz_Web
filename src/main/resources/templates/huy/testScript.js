function allTest(page) {
    let search = "";
    search += ` <div class="select-container">
                                        <form class="d-flex">
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="keyTest">
                                            <button class="btn btn-outline-success" type="button" onclick="searchAllTest()">
                                                Search
                                            </button></br>
                                        </form>
                                    </div>`

    let addButton = "<button type=\"button\" class=\"btn btn-success\" style=\"width: 100%\" onclick=\"formCreateTest()\">New Test</button>";
    document.getElementById("inputSearch").innerHTML = search;
    document.getElementById("addBtn").innerHTML = addButton;

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests/page?page=" + page,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (test) {
            console.log(test)
            // getCategoryQuestion()
            displayTest1(test.content,page,test)

        }
    })
}
function displayTest1(array,page,test){
    let res = "";

    res += `<table class="table table-hover" style="width: 100%" border="1" cellpadding="5">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Author</th>
        <th scope="col">Action</th>
    </tr>
    </thead><tbody>`
    for (let i = 0; i < array.length; i++) {
        res += `
<tr>
        <th scope="row">${i+1}</th>
        <td>${array[i].name}</td>
        <td>${array[i].user.username}</td>
        <td width="300px"><button type="button" class="btn btn-info" onclick="viewTest(${array[i].id})"><i class="fas fa-pen"></i></button>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<button type="button" class="btn btn-danger" onclick="loadTest(${array[i].id})">  <i class="fas fa-gamepad"></i></button>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<button type="button" class="btn btn-dark" onclick="deleteTest(${array[i].id})" ><i class="far fa-trash-alt"></i></button></td>
    </tr>`
    }
    res += `</tbody></table>
    <div style="margin-left: 40%" class="row text-center">
      `
    if (page>0){
        res+=`<button type="button" class="btn btn-success" style="font-size: 1rem;color: black" onclick="allTest(${page-1})">Previous</button>&ensp;`
    }
    res+=`<span style="font-size: 1.5rem;color: black">${page+1} / ${test.totalPages}</span>&ensp;`
    if (page+1<test.totalPages){
        res+=`<button type="button" class="btn btn-success" style="font-size: 1rem;color: black" onclick="allTest(${page+1})">Next</button></div>`
    }
    console.log(res)
    document.getElementById("listQuiz").innerHTML = res;
}
function loadTest(id){
    localStorage.setItem("testInPlay",id);
    window.location="play.html";
}


function formCreateTest() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            console.log(data);
            let form = `<table cellpadding="5">                 
                            <tr>
                                <th>name: </th>
                                <td><input type="text" id="name"></td>
                            </tr>
                            <tr>
                                <td><input type="hidden" id="status" value="1"></td>
                            </tr>
                            <tr>
                                 <td><input type="hidden" id="user" value="${localStorage.getItem("userId")}"></td>
                            </tr>
                            <tr>
                                <td>Question 1:</td>
                                 <td><select id="quest1">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 2:</td>
                                 <td><select id="quest2">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 3:</td>
                                 <td><select id="quest3">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 4:</td>
                                 <td><select id="quest4">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 5:</td>
                                 <td><select id="quest5">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 6:</td>
                                 <td><select id="quest6">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 7:</td>
                                 <td><select id="quest7">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 8:</td>
                                 <td><select id="quest8">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 9:</td>
                                 <td><select id="quest9">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                             <tr>
                                <td>Question 10:</td>
                                 <td><select id="quest10">`
            for (let i = 0; i < data.length; i++) {
                form += `<option value="${data[i].id}">${data[i].content}</option>`
            }
            form +=`</select></td>
                            </tr>
                            <tr>                               
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
            "id": document.getElementById("user").value
        },
        "quizzes":[{
            "id":document.getElementById("quest1").value
        },
            {
                "id":document.getElementById("quest2").value
            },
            {
                "id":document.getElementById("quest3").value
            },
            {
                "id":document.getElementById("quest4").value
            },
            {
                "id":document.getElementById("quest5").value
            },
            {
                "id":document.getElementById("quest6").value
            },
            {
                "id":document.getElementById("quest7").value
            },
            {
                "id":document.getElementById("quest8").value
            },
            {
                "id":document.getElementById("quest9").value
            },
            {
                "id":document.getElementById("quest10").value
            }]
    }
    console.log(test)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        url: "http://localhost:8080/api/tests/create",

        data: JSON.stringify(test),
        success: function () {
            alert("Thêm Thành Công")
            allTest(0);
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
            headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
            success: function (test) {
                allTest(0);
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
