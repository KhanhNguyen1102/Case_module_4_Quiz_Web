function playTest() {
    let id = localStorage.getItem("testInPlay")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests/search?id=" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (test) {
            console.log(test)
            localStorage.setItem("content1", test.quizzes[0].content);
            localStorage.setItem("content2", test.quizzes[1].content);
            localStorage.setItem("content3", test.quizzes[2].content);
            localStorage.setItem("content4", test.quizzes[3].content);
            localStorage.setItem("content5", test.quizzes[4].content);
            localStorage.setItem("content6", test.quizzes[5].content);
            localStorage.setItem("content7", test.quizzes[6].content);
            localStorage.setItem("content8", test.quizzes[7].content);
            localStorage.setItem("content9", test.quizzes[8].content);
            localStorage.setItem("content10", test.quizzes[9].content);
            localStorage.setItem("quizId1", test.quizzes[0].id);
            localStorage.setItem("quizId2", test.quizzes[1].id);
            localStorage.setItem("quizId3", test.quizzes[2].id);
            localStorage.setItem("quizId4", test.quizzes[3].id);
            localStorage.setItem("quizId5", test.quizzes[4].id);
            localStorage.setItem("quizId6", test.quizzes[5].id);
            localStorage.setItem("quizId7", test.quizzes[6].id);
            localStorage.setItem("quizId8", test.quizzes[7].id);
            localStorage.setItem("quizId9", test.quizzes[8].id);
            localStorage.setItem("quizId10", test.quizzes[9].id);
            let i = 2;
            playingTest(test.quizzes[0].content, test.quizzes[0].id, i);

        }
    })

}

function playingTest(test, quizId, i) {
    if (i<11 && i>2){
        let nextContent = localStorage.getItem("content" + i);
        let nextQuiz = localStorage.getItem("quizId" + i);
        let previousContent = localStorage.getItem("content" + (i-2));
        let previousQuiz = localStorage.getItem("quizId" + (i-2));
        localStorage.setItem("nextContent",nextContent);
        localStorage.setItem("previousContent",previousContent);
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/answers/quiz?id=" + quizId,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
            success: function (data) {
                console.log(nextContent);
                console.log(nextQuiz);
                let form = `<div class="row">
        <div class="col-12">
            <div class="row">
                <h5 id="time">Total time :3 minutes</h5>
                <h5 id="pageNum">Question ${i-1}/10</h5>
            </div>
        </div>
        <div class="col-12">
            <button class="button1">
                ${test}
            </button>
        </div>
        <div class="col-12">
            <button id="button2">${data[0].content}</button>
            <button id="button3">${data[1].content}</button>
        </div>
        <div class="col-12">
            <button id="button4">${data[2].content}</button>
            <button id="button5">${data[3].content}</button>
        </div>
        <div class="col-12">
            <div class="row">
                <button id="previous" onclick="playingTest('${localStorage.getItem('previousContent')}',${previousQuiz},${i-1})">Previous</button>
                <button id="next" onclick="playingTest('${localStorage.getItem('nextContent')}',${nextQuiz},${i+1})" >Next</button>
            </div>
        </div>
    </div>`

                document.getElementById("content").innerHTML = form;
            }
        })
    }else if (i===2){
        let nextContent = localStorage.getItem("content" + i);
        let nextQuiz = localStorage.getItem("quizId" + i);
        localStorage.setItem("nextContent",nextContent);
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/answers/quiz?id=" + quizId,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
            success: function (data) {
                console.log(nextContent);
                console.log(nextQuiz);
                let form = `<div class="row">
        <div class="col-12">
            <div class="row">
                <h5 id="time">Total time :3 minutes</h5>
                <h5 id="pageNum">Question ${i-1}/10</h5>
            </div>
        </div>
        <div class="col-12">
            <button class="button1">
                ${test}
            </button>
        </div>
        <div class="col-12">
            <button id="button2">${data[0].content}</button>
            <button id="button3">${data[1].content}</button>
        </div>
        <div class="col-12">
            <button id="button4">${data[2].content}</button>
            <button id="button5">${data[3].content}</button>
        </div>
        <div class="col-12">
            <div class="row">
                <button style="left: 470px!important;" id="next" onclick="playingTest('${localStorage.getItem('nextContent')}',${nextQuiz},${i+1})" >Next</button>
            </div>
        </div>
    </div>`
                document.getElementById("content").innerHTML = form;
            }
        })
    }else {
        let previousContent = localStorage.getItem("content" + (i-2));
        let previousQuiz = localStorage.getItem("quizId" + (i-2));
        localStorage.setItem("previousContent",previousContent);
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/answers/quiz?id=" + quizId,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
            success: function (data) {
                let form = `<div class="row">
        <div class="col-12">
            <div class="row">
                <h5 id="time">Total time :3 minutes</h5>
                <h5 id="pageNum">Question ${i-1}/10</h5>
            </div>
        </div>
        <div class="col-12">
            <button class="button1">
                ${test}c
            </button>
        </div>
        <div class="col-12">
            <button id="button2">${data[0].content}</button>
            <button id="button3">${data[1].content}</button>
        </div>
        <div class="col-12">
            <button id="button4">${data[2].content}</button>
            <button id="button5">${data[3].content}</button>
        </div>
        <div class="col-12">
            <div class="row">
                <button id="previous" onclick="playingTest('${localStorage.getItem('previousContent')}',${previousQuiz},${i-1})">Previous</button>
                <button id="next" >Finish</button>
            </div>
        </div>
    </div>`

                document.getElementById("content").innerHTML = form;
            }
        })
    }
}