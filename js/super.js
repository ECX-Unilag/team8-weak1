//let loader = document.querySelector(".loader")
let logout = document.querySelector(".logout");
let tbody = document.querySelector(".tbody");

const log = () => {
    //loader.classList.remove("none")
    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    const request = new Request(`https://inventory-app-stock.herokuapp.com/api/v1/log/`, {
        method: 'GET',
        withCredentials: true,
        headers: {
            authorization: token
        }
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {

            //loader.classList.add("none")
            const logdata = res.data.filter((item) => {


                return (item.action === "Update Product") && (item.user.role === "user")
            })
            console.log(logdata)
            logdata.map((item, index) => {
                let tr = document.createElement("tr")
                let th = document.createElement("th")
                th.textContent = index + 1
                let td2 = document.createElement("td")
                td2.textContent = item.user.firstName + " " + item.user.lastName
                let td3 = document.createElement("td")
                td3.textContent = item.product.name
                let td4 = document.createElement("td")
                td4.textContent = item.product.description
                let td5 = document.createElement("td")
                td5.textContent = item.quantity
                let td6 = document.createElement("td")

                let button1 = document.createElement("button")
                button1.dataset.id = item._id
                button1.classList.add("btn", "btn-info", "mx-4", "confirm")

                button1.textContent = "Confirm"
                console.log(item.status)
                item.status === "true" ? button1.disabled = true : button1.disabled = false
                item.status === "true" ? button1.textContent = "Confirmed" : button1.textContent = "Confirm"
                td6.appendChild(button1)

                tr.appendChild(th)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tr.appendChild(td6)
                tbody.appendChild(tr);
            })
        })

}

log();

const updatelog = (evt) => {

    if (evt.target.textContent !== "Confirm") {
        return
    }
    let id = evt.target.dataset.id
    console.log(id)
    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    const request = new Request(`https://inventory-app-stock.herokuapp.com/api/v1/log/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
            authorization: token
        })
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {

            if (res.status === "success") {
                console.log(res)
                setTimeout(() => {
                    window.location.href = "supervisor.html";
                }, 2000)
            }

        })
}

logout.addEventListener("click", () => {
    localStorage.removeItem("InventStore");
    window.location.href = "log-in.html";
})

document.addEventListener("click", updatelog)