const urlBase = "http://contactmanagerproject.com/LAMPAPI";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";
const ids = [];

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;

  var hash = md5(password);
  if (!validLoginForm(login, password)) {
    document.getElementById("loginResult").innerHTML =
      "invalid username or password";
    return;
  }
  document.getElementById("loginResult").innerHTML = "";

  let tmp = {
    login: login,
    password: hash,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();
        window.location.href = "contactlist.html";
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doSignup() {
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!validSignUpForm(firstName, lastName, username, password)) {
    document.getElementById("signupResult").innerHTML = "invalid signup";
    return;
  }

  var hash = md5(password);

  document.getElementById("signupResult").innerHTML = "";

  let tmp = {
    firstName: firstName,
    lastName: lastName,
    login: username,
    password: hash,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SignUp." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) {
        return;
      }

      if (this.status == 409) {
        document.getElementById("signupResult").innerHTML =
          "User already exists";
        return;
      }

      if (this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        document.getElementById("signupResult").innerHTML = "User added";
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        saveCookie();
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("signupResult").innerHTML = err.message;
  }
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);

  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");

  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");

    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    document.getElementById("userName").innerHTML =
      "Welcome, " + firstName + " " + lastName + "!";
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";

  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}
