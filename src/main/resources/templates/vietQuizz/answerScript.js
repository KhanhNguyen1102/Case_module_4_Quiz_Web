function getQuiz() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes",
        success: function (data) {
            console.log(data)
            let quiz = `<option>Câu Hỏi :</option>`
            for (let i = 0; i < data.length; i++) {
                quiz += `<option value="${data[i].id}">${data[i].content}</option>`
                document.getElementById('quiz').innerHTML = quiz;
            }
        }
    })
}

function getALLAnswer() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/answers",
        success: function (answer) {
            console.log(answer)
            getQuiz()
            displayAnswer(answer)

        }
    })
}

function displayAnswer(array) {
    let res = "";
    res += `<hr>
        <select id="quiz" ></select>
            <hr>`
    res += `<table border="1" cellpadding="5">
    <tr>
        <th>Content</th>
        <th>Correct</th>
        <th>Quiz</th>
        <th colspan="3">Action</th>
    </tr>`
    for (let i = 0; i < array.length; i++) {
        res += `<tr>
    <td> ${array[i].content}</td>
    <td> ${array[i].correct}</td>
    <td> ${array[i].quiz.content}</td>
    <td><button onclick="viewAnswer(${array[i].id})">View</button></td>
    <td><button onclick="showFormEditAnswer(${array[i].id})">Edit</button></td>
    <td><button onclick="deleteAnswer(${array[i].id})">Delete</button></td>
</tr>`
    }
    res += `</table>`
    console.log(res)
    document.getElementById("listAnswer").innerHTML = res;
}

function formCreateAnswer() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/quizzes",
        success: function (quiz) {
            console.log(quiz);
            let form = `<table cellpadding="5">
                      
                            <tr>
                                <th>Content: </th>
                                <td><input type="text" id="content"></td>
                            </tr>
                            <tr>
                                <th>Correct: </th>
                                <td><input type="text" id="correct"></td>
                            </tr>
                            <tr>
                                <th>Quiz: </th>
                                <td>
                                    <select id="quiz">`
            for (let i = 0; i < quiz.length; i++) {
                form += `<option value="${quiz[i].id}">${quiz[i].content}</option>`
            }
            form += `</select>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button onclick="saveAnswer()">Save</button></td>
                            </tr>
                        </table>`;
            document.getElementById("listAnswer").innerHTML = form;
        }
    })
}

function saveAnswer() {
    let quiz = {
        "content": document.getElementById("content").value,
        "correct": document.getElementById("correct").value,
        "quiz": {
            "id": document.getElementById("quiz").value,
        },
    }
    console.log(quiz)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/answers/create",
        data: JSON.stringify(quiz),
        success: function () {
            alert("Thêm Thành Công")
            getALLAnswer();
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showFormEditAnswer(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/answers?id=" + id,
        success: function (answer) {
            console.log(answer)
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/quizzes",
                success: function (quiz) {
                    console.log(quiz)
                    let form =
                        "<p>Content</p>" + `<input type="text" id="content" value="${answer.content}">\n` + "<br>" +
                        "<p>Correct</p>" + `<input type="text" id="correct" value="${answer.correct}">\n` + "<br>" +
                        "<p>Quiz</p>" + `<select  id="quiz">
                                 <option value="${answer.quiz.id}"> ${answer.quiz.content}</option>`
                    for (let i = 0; i < quiz.length; i++) {
                        form += `<option value="${quiz[i].id}">${quiz[i].content}</option>`
                    }
                    form += `</select>`
                        + `<button onclick="updateAnswer(${answer.id})">Thay đổi</button>` + '<br>'
                    console.log(form)
                    document.getElementById("listAnswer").innerHTML = form;
                }
            })
        }
    })
}

function updateAnswer(id) {
    let content = document.getElementById("content").value;
    let correct = document.getElementById("correct").value;
    let quiz = document.getElementById("quiz").value;
    let answer = {
        content: content,
        correct: correct,
        quiz: {
            "id": quiz
        }
    }
    console.log(answer)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/answers?id=" + id,
        data: JSON.stringify(answer),
        success: alert("Sứa thành công"),
        error: function (error) {
            console.log(error)
        }
    })
}

function deleteAnswer(id) {
    if (confirm("Are you sure")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/answers?id=" + id,
            success: getALLAnswer,
            error: function (error) {
                console.log(error)
            }
        })
    } else {
    }
}

function viewAnswer(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/answers?id=" + id,
        success: function (answer) {
            console.log(answer)
            let view = `<table cellpadding="5">
                                    <tr>
                                        <th>Content: </th>
                                        <td>${answer.content}</td>
                                    </tr>
                                    <tr>
                                        <th>Correct: </th>
                                        <td>${answer.correct}</td>
                                    </tr> 
                                    <tr>
                                        <th>Quiz: </th>
                                        <td>${answer.quiz.content}</td>
                                        <td>Giá Trị điểm: ${answer.quiz.value}</td>
                                        <td>Trạng thái : ${answer.quiz.status}</td>
                                        <td>Chủ đề: ${answer.quiz.category.name}</td>
                                    </tr>
                                </table>`;
            console.log(view)
            document.getElementById("listAnswer").innerHTML = view;
        }
    })
}