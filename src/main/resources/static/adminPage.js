// ----------------------------------------------------!!!!!!!METHODS!!!!!!---------------------------------------------
async function requestUser(url) {
    return (await fetch(url)).json();
}


async function postRequest(url, obj) {
    let path = window.location.origin + url;

    await fetch(path, {
        method: `POST`,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(obj)
    })
}


async function patchRequest(url, obj) {
    let path = window.location.origin + url;

    await fetch(path, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(obj),
    });
}


async function deleteRequest(url) {
    let path = window.location.origin + url;

    await fetch(path, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
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
            <tr>

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
        document.getElementById(`editModal${user.id}`).addEventListener("click", () => {            //THERE LAST CHANGES(change ' ' on " " in word - click)
            document.getElementById("editId").value = `${user.id}`;
            document.getElementById("editFirstName").value = `${user.name}`;
            document.getElementById("editLastName").value = `${user.lastName}`;
            document.getElementById("editAge").value = `${user.age}`;
            document.getElementById("editEmail").value = `${user.emailAddress}`;
            document.getElementById("editRole").value = `${user.roles}`
            document.getElementById("editBtn").onclick = function() {

                let obj = {
                    id: `${document.getElementById("editId").value}`,
                    name: `${document.getElementById("editFirstName").value}`,
                    lastName: `${document.getElementById("editLastName").value}`,
                    age: `${document.getElementById("editAge").value}`,
                    emailAddress: `${document.getElementById("editEmail").value}`,
                    password: `${document.getElementById("editPassword").value}`,
                    roles: [
                        { id : `${document.getElementById("editRole").value.substring(0, 1)}`,
                         name : `${document.getElementById("editRole").value.substring(2)}` }
                    ]
                };

                patchRequest("/api/users", obj)
                    .then(result => console.log(result));
                console.log(obj)
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
            document.getElementById("deleteBtn").onclick = () => deleteRequest(`/api/users/${user.id}`);
        })
    }
// ----------------------------------------------------!!!!!!!DELETE!!!!!!----------------------------------------------

// ----------------------------------------------------!!!!!!!ADD USER!!!!!!--------------------------------------------
document.getElementById("")

// ----------------------------------------------------!!!!!!!ADD USER!!!!!!--------------------------------------------
}

requestUser(window.location.origin + "/api/users")
    .then(users => table(users));


