function getCategoryQuestion() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (data) {
            console.log(data)
            let category = `<option>Category :</option>`
            for (let i = 0; i < data.length; i++) {
                category += `<option value="${data[i].id}">${data[i].name}</option>`
                document.getElementById('category').innerHTML = category;
            }
        }
    })
}

function getAllQuiz(page) {
    let search = "";
    search += ` <div class="select-container">
                                        <form class="d-flex">
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="keyQuiz">
                                            <button class="btn btn-outline-success" type="button" onclick="searchAllQuiz(0)">
                                                Search
                                            </button></br>
                                        </form>
                                    </div>`

    let addButton = "<button type=\"button\" class=\"btn btn-success\" style=\"width: 100%\" onclick=\"formCreateQuiz()\">New Quiz</button>";
    document.getElementById("inputSearch").innerHTML = search;
    document.getElementById("addBtn").innerHTML = addButton;

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes/page?page=" + page,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (quiz) {
            console.log(quiz)
            getCategoryQuestion()
            displayQuiz(quiz.content,page,quiz)

        }
    })

}
function searchAllQuiz(page){
    let key = document.getElementById("keyQuiz").value;
    if (key==null){
        key = "";
    }
    console.log(key);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes/page?page=" + page +"&key=" +key,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (quiz) {
            console.log(quiz)
            getCategoryQuestion()
            displayQuiz(quiz.content,page,quiz)

        }
    })
}
function displayQuiz(array,page,quiz) {
    let res = "";
    res += `<hr>
        <span id="category1"><select id="category"  ></select></span>
        
            <hr>`
    res += `<table class="table table-hover" style="width: 100%" border="1" cellpadding="5">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Content</th>
        <th scope="col">Category</th>
        <th scope="col">Value</th>
    </tr>
    </thead><tbody>`
    for (let i = 0; i < array.length; i++) {
        res += `
<tr>
        <th scope="row">${i+1}</th>
        <td>${array[i].content}</td>
        <td>${array[i].category.name}</td>
        <td>${array[i].value}</td>
    </tr>`

    }
    res += `</tbody></table>
    <div style="margin-left: 40%" class="row text-center">
      `
    if (page>0){
        res+=`<button type="button" class="btn btn-success" style="font-size: 1rem;color: black" onclick="getAllQuiz(${page-1})">Previous</button>&ensp;`
    }
    res+=`<span style="font-size: 1.5rem;color: black">${page+1} / ${quiz.totalPages}</span>&ensp;`
    if (page+1<quiz.totalPages){
        res+=`<button type="button" class="btn btn-success" style="font-size: 1rem;color: black" onclick="getAllQuiz(${page+1})">Next</button></div>`
    }

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
                                
                                <td><input type="hidden" id="status" value="1"></td>
                            </tr>
                            <tr>
                                <th>Answer 1: </th>
                                <td><input type="text" id="answer1"></td>
                            </tr>
                            <tr>
                                <th>Answer 2: </th>
                                <td><input type="text" id="answer2"></td>
                            </tr>
                            <tr>
                                <th>Answer 3: </th>
                                <td><input type="text" id="answer3"></td>
                            </tr>
                            <tr>
                                <th>Answer 4: </th>
                                <td><input type="text" id="answer4"></td>
                            </tr>
                            <tr>
                                <th>The correct answer: </th>
                                <td><input type="radio" name="correct" value="1">Answer1</td>
                                <td width="163px"><input type="radio" name="correct" value="2">Answer2</td>
                                <td width="163px"><input type="radio" name="correct" value="3">Answer3</td>
                                <td width="163px"> <input type="radio" name="correct" value="4">Answer4</td>
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
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        url: "http://localhost:8080/api/quizzes/create",
        data: JSON.stringify(quiz),
        success: function () {
            alert("Thêm Thành Công")
        },
        error: function (error) {
            console.log(error)
        }
    })
setTimeout(createAnswer(),1000);

    getAllQuiz(0);
}
function createAnswer(){

    var checkbox = document.getElementsByName("correct");
    var correct1,correct2,correct3,correct4 = 2;

    for (var i = 0; i < checkbox.length; i++){
        if (checkbox[0].checked === true){
            correct1=1;
        }
        if (checkbox[1].checked === true){
            correct2=1;
        }
        if (checkbox[2].checked === true){
            correct3=1;
        }
        if (checkbox[3].checked === true){
            correct4=1;
        }
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes/newest",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (data) {
            console.log(data)
            localStorage.setItem("quizId",data.id);
            let quizId= localStorage.getItem("quizId");
            console.log(quizId);
            let newAnswer1 = {
                "content": document.getElementById("answer1").value,
                "quiz": {
                    "id": quizId
                },

                "correct": correct1
            };
            let newAnswer2 = {
                "content": document.getElementById("answer2").value,
                "quiz": {
                    "id": quizId
                },

                "correct": correct2
            };
            let newAnswer3 = {
                "content": document.getElementById("answer3").value,
                "quiz": {
                    "id": quizId
                },

                "correct": correct3
            };
            let newAnswer4 = {
                "content": document.getElementById("answer4").value,
                "quiz": {
                    "id": quizId
                },

                "correct": correct4
            };
            saveNewAnswer(newAnswer1);
            saveNewAnswer(newAnswer2);
            saveNewAnswer(newAnswer3);
            saveNewAnswer(newAnswer4);
            localStorage.removeItem("quizId");
        }
    })

}
function saveNewAnswer(answer){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        url: "http://localhost:8080/api/answers/create",
        data: JSON.stringify(answer),
        success: function () {
            alert("add answer ok")
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