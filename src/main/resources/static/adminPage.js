// ----------------------------------------------------!!!!!!!METHODS!!!!!!---------------------------------------------
async function requestUser(url) {
    return (await fetch(url)).json();
}


async function patchRequest(url, user) {
    let path = window.location.origin + url;

    await fetch(path, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(user),
    })
        .then(() => location.reload());
}


async function deleteRequest(id) {

    await fetch("http://localhost:8080/api/users" + `/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(() => document.getElementById(`row${id}`).remove());
}
// ----------------------------------------------------!!!!!!!METHODS!!!!!!---------------------------------------------


//----------------------------------------------------!!!!!!!TOP PANEL!!!!!!--------------------------------------------
function topPanel(user) {
    document.getElementById("adminTopPanel").innerHTML = `
    <form class="form-inline">
        <strong>
            <span class="navbar-text-xl text-white">${user.emailAddress}</span>
        </strong>
        <span class="navbar-text-xl text-white">&nbsp with roles: &nbsp</span>
        <span class="navbar-text-xl text-white">
                    <a>${user.roleName.replaceAll('ROLE_', '')}</a>
        </span>
    </form>
    <ul class="navbar-nav float-lg-end">
        <li class="nav-item">
            <a class="nav-link text-muted " href=${"/logout"}>Logout</a>
        </li>
    </ul> `;
}

requestUser(window.location.origin + "/api/userDetails")
    .then(user => topPanel(user));
// ----------------------------------------------------!!!!!!!TOP PANEL!!!!!!-------------------------------------------


// ----------------------------------------------------!!!!!!!LEFT PANEL!!!!!!------------------------------------------
function leftTable(user) {
    if (user.roleName.search("ADMIN") !== -1) {
        document.getElementById("admLeftPanel").innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" href="/admin">Admin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user">User</a>
            </li>
    `;
    } else {
        document.getElementById("leftPanel").innerHTML =` 
        <li class="nav-item">
            <a class="nav-link active" href="/user">User</a>
        </li>
    `;
    }
}

requestUser(window.location.origin + "/api/userDetails")
    .then(user => leftTable(user))
// ----------------------------------------------------!!!!!!!LEFT PANEL!!!!!!------------------------------------------


// ----------------------------------------------------!!!!!!!TABLE!!!!!!-----------------------------------------------
function table(users) {
    let elem = document.getElementById("adminTable");

    for (let user of users) {
        elem.innerHTML += `
            <tr id="row${user.id}">

                <td>${user.id}</td>    
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.emailAddress}</td>
                <td>${user.roleName.replaceAll('ROLE_', '')}</td>
    
                <td>
                    <button class="btn btn-info" data-target="#editModal" data-toggle="modal" id="editModal${user.id}">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger" data-target="#deleteModal" data-toggle="modal" id="deleteModal${user.id}">Delete</button>
                </td>
            </tr>
                    `;
    }
// ----------------------------------------------------!!!!!!!TABLE!!!!!!-----------------------------------------------


// ----------------------------------------------------!!!!!!!EDIT!!!!!!------------------------------------------------
    for(let user of users) {

        document.getElementById(`editModal${user.id}`).addEventListener("click", () => {
            document.getElementById("editId").value = `${user.id}`;
            document.getElementById("editFirstName").value = `${user.name}`;
            document.getElementById("editLastName").value = `${user.lastName}`;
            document.getElementById("editAge").value = `${user.age}`;
            document.getElementById("editEmail").value = `${user.emailAddress}`;
            document.getElementById("editBtn").onclick = function() {
                let arrRoles = [];
                let bothRoles = [{id: 1, name: "ADMIN"}, {id: 2, name: "USER"}]

                for (let option of document.getElementById("editRole")) {
                    if (option.selected) {
                        arrRoles.push(option.value)
                    }
                }


                let user = {
                    id: `${document.getElementById("editId").value}`,
                    name: `${document.getElementById("editFirstName").value}`,
                    lastName: `${document.getElementById("editLastName").value}`,
                    age: `${document.getElementById("editAge").value}`,
                    emailAddress: `${document.getElementById("editEmail").value}`,
                    password: `${document.getElementById("editPassword").value}`,
                    roles: arrRoles.length > 1
                        ? bothRoles
                        : [{
                        id: `${document.getElementById("editRole").value.substring(0, 1)}`,
                        name: `${document.getElementById("editRole").value.substring(2)}`
                        }]
                };



                patchRequest("/api/users", user);

            }
    })
}
// ----------------------------------------------------!!!!!!!EDIT!!!!!!------------------------------------------------


// ----------------------------------------------------!!!!!!!DELETE!!!!!!----------------------------------------------
    for (let user of users) {
        document.getElementById(`deleteModal${user.id}`).addEventListener("click", () => {
            document.getElementById("deleteId").value = `${user.id}`;
            document.getElementById("deleteFirstName").value = `${user.name}`;
            document.getElementById("deleteLastName").value = `${user.lastName}`;
            document.getElementById("deleteAge").value = `${user.age}`;
            document.getElementById("deleteEmail").value = `${user.emailAddress}`;
            document.getElementById("deleteBtn")
            document.getElementById("deleteBtn").onclick = (btn) => {
                btn.preventDefault();
                deleteRequest(user.id)
            }
        })
    }
// ----------------------------------------------------!!!!!!!DELETE!!!!!!----------------------------------------------


// ----------------------------------------------------!!!!!!!ADD USER!!!!!!--------------------------------------------
document.getElementById("addBtn").onclick = (btn) => {
    btn.preventDefault();
    let arrRoles = [];
    let bothRoles = [{id: 1, name: "ADMIN"}, {id: 2, name: "USER"}]

    for (let option of document.getElementById("Roles")) {
        if (option.selected) {
            arrRoles.push(option.value)
        }
    }

        let user = {
            id: null,
            name: `${document.getElementById("firstName").value}`,
            lastName: `${document.getElementById("lastName").value}`,
            age: `${document.getElementById("age").value}`,
            emailAddress: `${document.getElementById("email").value}`,
            password: `${document.getElementById("password").value}`,
            roles: arrRoles.length > 1
                ? bothRoles
                : [{
                    id: `${document.getElementById("Roles").value.substring(0, 1)}`,
                    name: `${document.getElementById("Roles").value.substring(2)}`
                }]
                };

    patchRequest("/api/users", user);

}
}
// ----------------------------------------------------!!!!!!!ADD USER!!!!!!--------------------------------------------

requestUser(window.location.origin + "/api/users")
    .then(users => table(users));


