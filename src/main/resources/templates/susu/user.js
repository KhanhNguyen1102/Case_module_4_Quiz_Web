function signIn() {
    let user = {
        username: document.getElementById("user_name").value,
        password: document.getElementById("pass").value
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            localStorage.setItem("username", user.username)
            localStorage.setItem("token", data.accessToken)
            console.log(data)
            location.reload();
            document.getElementById('role').innerHTML = "<i class=\"flaticon-user\"></i>\n" +
                `                                    <span>Hello ${localStorage.getItem("username")}</span>`
            document.getElementById('logoubtn').innerHTML ="<a class=\"boxed_btn_orange\" href=\"#\">\n" +
                "                                        <i class=\"fas fa-sign-out-alt\"></i>\n" +
                "                                        <span>Logout</span>\n" +
                "                                    </a>"
            alert("Login success");
            // $("#test-form").hide()
        },
        error: function (error) {
            document.getElementById('wrongAcc').innerHTML ="<h5 style=\"color: #fd4e4e\">Wrong username or password</h5>"
        }
    });
}
function createNewAcc() {
    let user = {
        username: document.getElementById("newUserName").value,
        password: document.getElementById("newPass").value,
        confirmPassword : document.getElementById("newRePass").value
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/register",
        data: JSON.stringify(user),
        success: function (data) {
            localStorage.setItem("username", user.username)
            localStorage.setItem("token", data.accessToken)
            console.log(data)
            location.reload();
            alert("register success");
            // $("#test-form").hide()
        },
        error: function (error) {
            document.getElementById('wrongInput').innerHTML = "<h5 style=\"color: #fd4e4e\">username already exists or password and confirm password does not match</h5>"
        }
    })
}
function checkLogin(){
    let name = localStorage.getItem("username");
    if (name != null){
        document.getElementById('role').innerHTML = "<i class=\"flaticon-user\"></i>\n" +
            `                                    <span>Hello ${localStorage.getItem("username")}</span>`
        document.getElementById('logoubtn').innerHTML ="<a onclick=\"logout()\" class=\"boxed_btn_orange\" href=\"#\">\n" +
            "                                        <i class=\"fas fa-sign-out-alt\"></i>\n" +
            "                                        <span>Logout</span>\n" +
            "                                    </a>"
        loadLeaderBoard();
    }

}
function loadLeaderBoard(){
    $.ajax({
        type: "GET",
        url: " http://localhost:8080/api/results/top3",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (data) {
            console.log(data)
            displayLeaderBoard(data);
        }
    })
}
function displayLeaderBoard(data){
    let res = "";
    res += `<div style="border: 1px solid #d9d9d9" class="card-header ">
                        <center>
                            <p style="font-size: 2rem;color: #f55555">Leaderboard</p>
                        </center>
                    </div>
                    <div class="card"  style=" height: 750px;padding: 15px 15px 15px 15px">
                        <div class="card text-center" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title"><i style="color: yellow;font-size: 2rem" class="fas fa-medal"></i></h5>
                                <h6 style="font-size: 20px" class="card-subtitle mb-2 text-muted">${data[0].score} points</h6>
                                <p style="color: #0ea20e;font-size: 40px" class="card-text">${data[0].user.username}</p>
                            </div>
                        </div>
                        <div class="card text-center" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title"><i style="color: #d3d3d3;font-size: 2rem" class="fas fa-medal"></i></h5>
                                <h6 style="font-size: 20px" class="card-subtitle mb-2 text-muted">${data[1].score} points</h6>
                                <p style="color: #0ea20e;font-size: 40px" class="card-text">${data[1].user.username}</p>
                            </div>
                        </div>
                        <div class="card text-center" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title"><i style="color: #ce3030;font-size: 2rem" class="fas fa-medal"></i></h5>
                                <h6 style="font-size: 20px" class="card-subtitle mb-2 text-muted">${data[2].score} points</h6>
                                <p style="color: #0ea20e;font-size: 40px" class="card-text">${data[2].user.username}</p>
                            </div>
                        </div>
                    </div>`
    document.getElementById("leaderBoard").innerHTML = res;
}
function logout(){
    localStorage.clear();
    location.reload();
}
function findAllAcc(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/accounts",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (data) {
            console.log(data)
            displayAllAccount(data)
        }
    })
}
function displayAllAccount(data){
    let res = "";
    res += `<table border="1" cellpadding="5">
                <tr>
              
                    <th>username</th>
                    <th colspan="3">Action</th>
                </tr>`
    for (let i = 0; i < data.length; i++) {
        res += `<tr>
                   
                    <td> ${data[i].username}</td>
                    <td><button onclick="viewTest(${data[i].id})">View</button></td>
                    <td><button onclick="showFormEditTest(${data[i].id})">Edit</button></td>
                    <td><button onclick="deleteTest(${data[i].id})">Delete</button></td>
                        </tr>`
    }
    res += `</table>`
    document.getElementById("listQuiz").innerHTML = res;
}