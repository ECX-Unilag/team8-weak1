let login = document.getElementById("login");
let loader = document.querySelector(".loader")
let error = document.querySelector(".error")
let element = document.createElement('p');

const submitLogin = (evt) => {
    evt.preventDefault()
    error.textContent = "";
    const password = document.querySelector(".password").value
    const data = {
        email: document.querySelector(".email").value,
        password,
    }
    // create request object
    const request = new Request('https://inventory-app-stock.herokuapp.com/api/v1/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    loader.classList.remove("none")
    fetch(request)
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                localStorage.setItem("InventStore", JSON.stringify(res.data))
                if (res.data.role === "user") {
                    window.location.href = "homepage.html"
                } else if (res.data.role === "supervisor") {
                    window.location.href = "homepage.html"
                } else if (res.data.role === "admin") {
                    window.location.href = "homepage.html"
                }
            } else {
                loader.classList.add("none");
                error.classList.remove("none");
                if (res.errors) {
                    res.errors.map((item) => {
                        const [value] = [Object.keys(item)]
                        element.textContent = `${value} is invalid`
                        element.classList.add("error-item");
                        error.appendChild(element);
                    })
                } else {
                    error.classList.remove("none");
                    element.textContent = res.error
                    element.classList.add("error-item");
                    error.appendChild(element);
                }

            }

        }).catch((err) => {
            loader.classList.add("none");
            error.classList.remove("none");
            element.textContent = `Network Error, Please Try Again`
            element.classList.add("error-item");
            error.appendChild(element);
        })

}

login.addEventListener("submit", submitLogin)