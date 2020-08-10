let signup = document.getElementById("signup");
let loader = document.querySelector(".loader")
let error = document.querySelector(".error")
let element = document.createElement('p');
const check = document.querySelector(".check");
const button = document.querySelector(".create");


check.addEventListener("click", () => {
    check.checked ? button.disabled = false : button.disabled = true
})

const submitSignup = (evt) => {
    error.textContent = "";
    evt.preventDefault()

    error.classList.add("none");
    const password = document.querySelector(".password").value
    const passwordConfirm = document.querySelector(".password1").value
    const data = {
        firstName: document.querySelector(".firstname").value,
        lastName: document.querySelector(".lastname").value,
        email: document.querySelector(".email").value,
        password,
        passwordConfirm,
        phoneNumber: document.querySelector(".phone").value,
        role: "user"
    }

    if (password === passwordConfirm) {
        loader.classList.remove("none")
        // create request object
        const request = new Request('https://inventory-app-stock.herokuapp.com/api/v1/user/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    window.location.href = "log-in.html"
                } else {
                    console.log(res);
                    loader.classList.add("none");
                    error.classList.remove("none");
                    res.errors.map((item) => {
                        const [value] = [Object.keys(item)]
                        element.textContent = `${value} is invalid`
                        element.classList.add("error-item");
                        error.appendChild(element);
                    })
                }

            }).catch((err) => {
                loader.classList.add("none");
                error.classList.remove("none");
                element.textContent = `Network Error, Please Try Again`
                element.classList.add("error-item");
                error.appendChild(element);
            })

    } else {
        error.classList.remove("none");
        element.textContent = `Password is not the same as Confirm Password`
        element.classList.add("error-item");
        error.appendChild(element);
    }

}

signup.addEventListener("submit", submitSignup)