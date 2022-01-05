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

            alert("Login success");
            // $("#test-form").hide()
        },
        error: function (error) {

        }
    });
}
function checkLogin(){
    let name = localStorage.getItem("username");
    if (name != null){
        document.getElementById('role').innerHTML = "<i class=\"flaticon-user\"></i>\n" +
            `                                    <span>Hello ${localStorage.getItem("username")}</span>`
    }
}