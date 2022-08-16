
// ----------------------------------------------------!!!!!!!TopPanel!!!!!!--------------------------------------------
async function requestUser(url) {
    return (await fetch(url)).json();
}

requestUser(window.location.origin + "/api/userDetails");


function topPanel(user) {
    document.getElementById("topPanel").innerHTML = `
    <form class="form-inline" xmlns="http://www.w3.org/1999/html">
      <strong>
        <span class="navbar-text-xl text-white" />${user.emailAddress}</span>
      </strong>
      <span class="navbar-text-xl text-white">&nbsp with roles: &nbsp</span>
      <span class="navbar-text-xl text-white">
                <a>${user.roleName.replaceAll('ROLE_', '')}</a>
            </span>
    </form>
    <ul class="navbar-nav float-lg-end">
      <li class="nav-item">
        <a class="nav-link text-muted " href="${"/logout"}">Logout</a>
      </li>
    </ul>
    `;
}


requestUser(window.location.origin + "/api/userDetails")
    .then(user => topPanel(user));
// ----------------------------------------------------!!!!!!!TopPanel!!!!!!--------------------------------------------

// ----------------------------------------------------!!!!!!!Table!!!!!!-----------------------------------------------
function table(user) {
    document.getElementById("tabContent").innerHTML = `
        <div class="tab-pane table-striped container-fluid active">
            <div class="row">
                <div class="col border bg-light">
                    <p><h5>About user</h5>
                        </div>
                            <div class="w-100"></div>
                                <div class="col border bg-white">
                                <br/>
                            <table class="table  table-striped">
                                <thead>
                                <tr>

                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>

                                </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>${user.id}</td>
                                        <td>${user.name}</td>
                                        <td>${user.lastName}</td>
                                        <td>${user.age}</td>
                                        <td>${user.username}</td>
                                        <td>${user.roleName.replaceAll('ROLE_', '')}</td>
                                    </tr>
                                
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

requestUser(window.location.origin + "/api/userDetails")
    .then(user => table(user));
// ----------------------------------------------------!!!!!!!Table!!!!!!-----------------------------------------------

// ----------------------------------------------------!!!!!!!Left Panel!!!!!!------------------------------------------
function leftTable(user) {
    if (user.roleName.search("ADMIN") !== -1) {
        document.getElementById("leftPanel").innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/admin">Admin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="/user">User</a>
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
    .then(user => leftTable(user));

// ----------------------------------------------------!!!!!!!Left Panel!!!!!!------------------------------------------
