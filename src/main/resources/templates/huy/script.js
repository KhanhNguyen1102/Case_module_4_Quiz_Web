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
                    <th>user</th>
                    <th colspan="3">Action</th>
                </tr>`
    for (let i = 0; i < test.length; i++) {
        res += `<tr>
                    <td> ${test[i].name}</td>
                    <td> ${test[i].status}</td>
                    <td> ${test[i].user.username}</td>
                    <td><button onclick="viewUser(${test[i].id})">View</button></td>
                    <td><button onclick="showFormEditUser(${test[i].id})">Edit</button></td>
                    <td><button onclick="deleteUser(${test[i].id})">Delete</button></td>
                        </tr>`
    }
    res += `</table>`
    document.getElementById("display").innerHTML = res;
}




