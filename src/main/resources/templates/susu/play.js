function playTest() {

    let id = localStorage.getItem("testInPlay")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/tests/search?id=" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (test) {
            console.log(test)
            localStorage.setItem("score1",test.quizzes[0].value);
            localStorage.setItem("score2",test.quizzes[1].value);
            localStorage.setItem("score3",test.quizzes[2].value);
            localStorage.setItem("score4",test.quizzes[3].value);
            localStorage.setItem("score5",test.quizzes[4].value);
            localStorage.setItem("score6",test.quizzes[5].value);
            localStorage.setItem("score7",test.quizzes[6].value);
            localStorage.setItem("score8",test.quizzes[7].value);
            localStorage.setItem("score9",test.quizzes[8].value);
            localStorage.setItem("score10",test.quizzes[9].value);
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
            localStorage.setItem("choice11","1");
            localStorage.setItem("choice12","1");
            localStorage.setItem("choice13","1");
            localStorage.setItem("choice14","1");
            localStorage.setItem("choice21","1");
            localStorage.setItem("choice22","1");
            localStorage.setItem("choice23","1");
            localStorage.setItem("choice24","1");
            localStorage.setItem("choice31","1");
            localStorage.setItem("choice32","1");
            localStorage.setItem("choice33","1");
            localStorage.setItem("choice34","1");
            localStorage.setItem("choice41","1");
            localStorage.setItem("choice42","1");
            localStorage.setItem("choice43","1");
            localStorage.setItem("choice44","1");
            localStorage.setItem("choice51","1");
            localStorage.setItem("choice52","1");
            localStorage.setItem("choice53","1");
            localStorage.setItem("choice54","1");
            localStorage.setItem("choice61","1");
            localStorage.setItem("choice62","1");
            localStorage.setItem("choice63","1");
            localStorage.setItem("choice64","1");
            localStorage.setItem("choice71","1");
            localStorage.setItem("choice72","1");
            localStorage.setItem("choice73","1");
            localStorage.setItem("choice74","1");
            localStorage.setItem("choice81","1");
            localStorage.setItem("choice82","1");
            localStorage.setItem("choice83","1");
            localStorage.setItem("choice84","1");
            localStorage.setItem("choice91","1");
            localStorage.setItem("choice92","1");
            localStorage.setItem("choice93","1");
            localStorage.setItem("choice94","1");
            localStorage.setItem("choice101","1");
            localStorage.setItem("choice102","1");
            localStorage.setItem("choice103","1");
            localStorage.setItem("choice104","1");
            let i = 2;
            playingTest(test.quizzes[0].content, test.quizzes[0].id, i);
            let second = 0 ;
            localStorage.setItem("time",second);
            setInterval(increaseTime,1000);
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
        localStorage.setItem("nowContent",test);
        let choice1 = localStorage.getItem("choice"+(i-1)+"1");
        let choice2 = localStorage.getItem("choice"+(i-1)+"2");
        let choice3 = localStorage.getItem("choice"+(i-1)+"3");
        let choice4 = localStorage.getItem("choice"+(i-1)+"4");
        console.log(choice1);
        console.log(choice2);
        console.log(choice3);
        console.log(choice4);
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/answers/quiz?id=" + quizId,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
            success: function (data) {
                console.log(nextContent);
                console.log(nextQuiz);
                for (let j = 0; j < data.length; j++) {
                    if (data[j].correct === 1){
                        // localStorage.setItem("correct"+(i-1),"choice"+(i-1)+(j+1));
                        localStorage.setItem("correct"+(i-1),"choice"+(i-1)+(j+1));
                        break;
                    }
                }
                let form = `<div class="row">
        <div class="col-12">
            <div class="row">
                <h5 id="time">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</h5>
                <h5 id="pageNum">Question ${i-1}/10</h5>
            </div>
        </div>
        <div class="col-12">
            <button class="button1">
                ${test}
            </button>
        </div>
        <div class="col-12">
            <button id="button2" onclick="pickChoice1('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[0].content}</button>
            <button id="button3" onclick="pickChoice2('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[1].content}</button>
        </div>
        <div class="col-12">
            <button id="button4" onclick="pickChoice3('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[2].content}</button>
            <button id="button5" onclick="pickChoice4('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[3].content}</button>
        </div>
        <div class="col-12">
            <div class="row">
                <button id="previous" onclick="playingTest('${localStorage.getItem('previousContent')}',${previousQuiz},${i-1})">Previous</button>
                <button id="next" onclick="playingTest('${localStorage.getItem('nextContent')}',${nextQuiz},${i+1})" >Next</button>
            </div>
        </div>
    </div>`
                document.getElementById("content").innerHTML = form;
                if (choice1 === "2"){
                    document.getElementById("button2").style.background = '#f7797d';
                }
                if (choice2 === "2"){
                    document.getElementById("button3").style.background = '#f7797d';
                }
                if (choice3 === "2"){
                    document.getElementById("button4").style.background = '#f7797d';
                }
                if (choice4 === "2"){
                    document.getElementById("button5").style.background = '#f7797d';
                }
            }
        })
    }else if (i===2){
        let nextContent = localStorage.getItem("content" + i);
        let nextQuiz = localStorage.getItem("quizId" + i);
        localStorage.setItem("nextContent",nextContent);
        localStorage.setItem("nowContent",test);
        let choice1 = localStorage.getItem("choice"+(i-1)+"1");
        let choice2 = localStorage.getItem("choice"+(i-1)+"2");
        let choice3 = localStorage.getItem("choice"+(i-1)+"3");
        let choice4 = localStorage.getItem("choice"+(i-1)+"4");
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/answers/quiz?id=" + quizId,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
            success: function (data) {
                console.log(nextContent);
                console.log(nextQuiz);
                for (let j = 0; j < data.length; j++) {
                    if (data[j].correct === 1){
                        localStorage.setItem("correct"+(i-1),"choice"+(i-1)+(j+1));
                        break;
                    }
                }
                let form = `<div class="row">
        <div class="col-12">
            <div class="row">
                <h5 id="time">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</h5>
                <h5 id="pageNum">Question ${i-1}/10</h5>
            </div>
        </div>
        <div class="col-12">
            <button class="button1">
                ${test}
            </button>
        </div>
       <div class="col-12">
            <button id="button2" onclick="pickChoice1('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[0].content}</button>
            <button id="button3" onclick="pickChoice2('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[1].content}</button>
        </div>
        <div class="col-12">
            <button id="button4" onclick="pickChoice3('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[2].content}</button>
            <button id="button5" onclick="pickChoice4('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[3].content}</button>
        </div>
        <div class="col-12">
            <div class="row">
                <button style="left: 470px!important;" id="next" onclick="playingTest('${localStorage.getItem('nextContent')}',${nextQuiz},${i+1})" >Next</button>
            </div>
        </div>
    </div>`
                document.getElementById("content").innerHTML = form;
                document.getElementById("content").innerHTML = form;
                if (choice1 === "2"){
                    document.getElementById("button2").style.background = '#f7797d';
                }
                if (choice2 === "2"){
                    document.getElementById("button3").style.background = '#f7797d';
                }
                if (choice3 === "2"){
                    document.getElementById("button4").style.background = '#f7797d';
                }
                if (choice4 === "2"){
                    document.getElementById("button5").style.background = '#f7797d';
                }
            }
        })
    }else {
        let previousContent = localStorage.getItem("content" + (i-2));
        let previousQuiz = localStorage.getItem("quizId" + (i-2));
        localStorage.setItem("previousContent",previousContent);
        localStorage.setItem("nowContent",test);
        let choice1 = localStorage.getItem("choice"+(i-1)+"1");
        let choice2 = localStorage.getItem("choice"+(i-1)+"2");
        let choice3 = localStorage.getItem("choice"+(i-1)+"3");
        let choice4 = localStorage.getItem("choice"+(i-1)+"4");
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/answers/quiz?id=" + quizId,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
            success: function (data) {
                for (let j = 0; j < data.length; j++) {
                    if (data[j].correct === 1){
                        localStorage.setItem("correct"+(i-1),"choice"+(i-1)+(j+1));
                        break;
                    }
                }
                let form = `<div class="row">
        <div class="col-12">
            <div class="row">
                <h5 id="time">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</h5>
                <h5 id="pageNum">Question ${i-1}/10</h5>
            </div>
        </div>
        <div class="col-12">
            <button class="button1">
                ${test}
            </button>
        </div>
         <div class="col-12">
            <button id="button2" onclick="pickChoice1('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[0].content}</button>
            <button id="button3" onclick="pickChoice2('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[1].content}</button>
        </div>
        <div class="col-12">
            <button id="button4" onclick="pickChoice3('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[2].content}</button>
            <button id="button5" onclick="pickChoice4('${localStorage.getItem('nowContent')}',${quizId},${i})">${data[3].content}</button>
        </div>
        <div class="col-12">
            <div class="row">
                <button id="previous" onclick="playingTest('${localStorage.getItem('previousContent')}',${previousQuiz},${i-1})">Previous</button>
                <button id="next" onclick="calScore()" >Finish</button>
            </div>
        </div>
    </div>`

                document.getElementById("content").innerHTML = form;
                document.getElementById("content").innerHTML = form;
                if (choice1 === "2"){
                    document.getElementById("button2").style.background = '#f7797d';
                }
                if (choice2 === "2"){
                    document.getElementById("button3").style.background = '#f7797d';
                }
                if (choice3 === "2"){
                    document.getElementById("button4").style.background = '#f7797d';
                }
                if (choice4 === "2"){
                    document.getElementById("button5").style.background = '#f7797d';
                }
            }
        })
    }
}
function pickChoice1(test, quizId, i){
    localStorage.setItem("choice"+(i-1)+"1","2");
    localStorage.setItem("choice"+(i-1)+"2","1");
    localStorage.setItem("choice"+(i-1)+"3","1");
    localStorage.setItem("choice"+(i-1)+"4","1");
    playingTest(test, quizId, i)
}
function pickChoice2(test, quizId, i){
    localStorage.setItem("choice"+(i-1)+"1","1");
    localStorage.setItem("choice"+(i-1)+"2","2");
    localStorage.setItem("choice"+(i-1)+"3","1");
    localStorage.setItem("choice"+(i-1)+"4","1");
    playingTest(test, quizId, i)
}
function pickChoice3(test, quizId, i){
    localStorage.setItem("choice"+(i-1)+"1","1");
    localStorage.setItem("choice"+(i-1)+"2","1");
    localStorage.setItem("choice"+(i-1)+"3","2");
    localStorage.setItem("choice"+(i-1)+"4","1");
    playingTest(test, quizId, i)
}
function pickChoice4(test, quizId, i){
    localStorage.setItem("choice"+(i-1)+"1","1");
    localStorage.setItem("choice"+(i-1)+"2","1");
    localStorage.setItem("choice"+(i-1)+"3","1");
    localStorage.setItem("choice"+(i-1)+"4","2");
    playingTest(test, quizId, i)
}
function calScore(){
    let totalScore = 0;
    let timeLeft = 180 - Number(localStorage.getItem("second"));
    for (let k = 1; k <11 ; k++) {
        let correct = localStorage.getItem("correct"+k);
        let choice = localStorage.getItem(correct);
        if (choice === "2"){
            totalScore += Number(localStorage.getItem("score"+k)) + timeLeft/10*50;
        }
    }

    alert("your score :" + totalScore);
    let result = {
        "score": totalScore,
        "user": {
            "id": localStorage.getItem("userId"),
        }, "test": {
            "id": localStorage.getItem("testInPlay"),
        }
    }
    console.log(result)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        url: "http://localhost:8080/api/results/create",
        data: JSON.stringify(result),
        success: function () {
            alert("Thêm Thành Công")
        },
        error: function (error) {
            console.log(error)
        }
    })
}
function increaseTime(){
    let second = Number(localStorage.getItem("time")) + 1;
    localStorage.setItem("time",second);
    document.getElementById("time").innerHTML= "Time:"+ second+ "/180s"
    if (second===180){
        calScore();
    }
}