function getCategoryQuestion() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (data) {
            console.log(data)
            let category = `<option>Chủ dề :</option>`
            for (let i = 0; i < data.length; i++) {
                category += `<option value="${data[i].id}">${data[i].name}</option>`
                document.getElementById('category').innerHTML = category;
            }
        }
    })
}

function getALLQuiz() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (quiz) {
            console.log(quiz)
            getCategoryQuestion()
            displayQuiz(quiz)

        }
    })
}

function displayQuiz(array) {
    let res = "";
    res += `<hr>
        <select id="category"  ></select>
        
            <hr>`
    res += `<table border="1" cellpadding="5">
    <tr>
        <th>Content</th>
        <th>Category</th>
        <th>Value</th>
        <th>status</th>
        <th colspan="3">Action</th>
    </tr>`
    for (let i = 0; i < array.length; i++) {
        res += `<tr>
    <td> ${array[i].content}</td>
    <td> ${array[i].category.name}</td>
    <td> ${array[i].value}</td>
    <td> ${array[i].status}</td>
    <td><button onclick="viewQuiz(${array[i].id})">View</button></td>
    <td><button onclick="showFormEditQuiz(${array[i].id})">Edit</button></td>
    <td><button onclick="deleteQuiz(${array[i].id})">Delete</button></td>
</tr>`
    }
    res += `</table>`
    console.log(res)
    document.getElementById("listQuiz").innerHTML = res;
}

function deleteQuiz(id) {
    if (confirm("Are you sure")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/quizzes?id=" + id,
            headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
            success: getALLQuiz,
            error: function (error) {
                console.log(error)
            }
        })
    } else {
    }
}

function showFormEditQuiz(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/quizzes?id=" + id,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (quiz) {
            console.log(quiz)
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/categories",
                success: function (category) {
                    console.log(category)
                    let form =
                        "<p>Content</p>" + `<input type="text" id="content" value="${quiz.content}">\n` + "<br>" +
                        "<p>Value</p>" + `<input type="text" id="value" value="${quiz.value}">\n` + "<br>" +
                        "<p>Status</p>" + `<input type="text" id="status" value="${quiz.status}">\n` + "<br>" +
                        "<p>Category</p>" + `<select  id="category">
                                 <option value="${quiz.category.id}"> ${quiz.category.name}</option>`
                    for (let i = 0; i < category.length; i++) {
                        form += `<option value="${category[i].id}">${category[i].name}</option>`
                    }
                    form += `</select>`
                        + `<button onclick="updateQuiz(${quiz.id})">Thay đổi</button>` + '<br>'
                    console.log(form)
                    document.getElementById("listQuiz").innerHTML = form;
                }
            })
        }
    })
}

function updateQuiz(id) {
    let content = document.getElementById("content").value;
    let value = document.getElementById("value").value;
    let status = document.getElementById("status").value;
    let category = document.getElementById("category").value;
    let quiz = {
        content: content,
        category: {
            "id": category
        },
        value: value,
        status: status
    }
    console.log(quiz)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/quizzes?id=" + id,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        data: JSON.stringify(quiz),
        success: alert("Sứa thành công"),
        error: function (error) {
            console.log(error)
        }
    })
}

function formCreateQuiz() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (category) {
            console.log(category);
            let form = `<table cellpadding="5">
                      
                            <tr>
                                <th>Content: </th>
                                <td><input type="text" id="content"></td>
                            </tr>
                            <tr>
                                <th>Value: </th>
                                <td><input type="text" id="value"></td>
                            </tr>
                            <tr>
                                <th>Status: </th>
                                <td><input type="text" id="status"></td>
                            </tr>
                            <tr>
                                <th>Category: </th>
                                <td>
                                    <select id="category">`
            for (let i = 0; i < category.length; i++) {
                form += `<option value="${category[i].id}">${category[i].name}</option>`
            }
            form += `</select>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button onclick="saveQuiz()">Save</button></td>
                            </tr>
                        </table>`;
            document.getElementById("listQuiz").innerHTML = form;
        }
    })
}

function saveQuiz() {
    let quiz = {
        "content": document.getElementById("content").value,
        "category": {
            "id": document.getElementById("category").value,
        },
        "value": document.getElementById("value").value,
        "status": document.getElementById("status").value
    }
    console.log(quiz)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/quizzes/create",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        data: JSON.stringify(quiz),
        success: function () {
            alert("Thêm Thành Công")
            getALLQuiz();
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function viewQuiz(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/quizzes?id=" + id,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (quiz) {
            console.log(quiz)
            let view = `<table cellpadding="5">
                                    <tr>
                                        <th>Content: </th>
                                        <td>${quiz.content}</td>
                                    </tr>
                                    <tr>
                                        <th>Category: </th>
                                        <td>${quiz.category.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Value: </th>
                                        <td>${quiz.value}</td>
                                    </tr> 
                                    <tr>
                                        <th>Status: </th>
                                        <td>${quiz.status}</td>
                                    </tr>
                                </table>`;
            console.log(view)
            document.getElementById("listQuiz").innerHTML = view;
        }
    })
}