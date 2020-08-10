let logout = document.querySelector(".logout");
const tbody = document.querySelector(".tbody");
let loader = document.querySelector(".loader")

const products = (evt) => {

    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    console.log(token)
    const request = new Request('https://inventory-app-stock.herokuapp.com/api/v1/product', {
        method: 'GET',
        withCredentials: true,
        headers: {
            authorization: token
        }
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {
            res.data.map((item, index) => {
                loader.classList.add("none")
                let tr = document.createElement("tr")
                let th = document.createElement("th")
                th.textContent = index + 1
                let td2 = document.createElement("td")
                td2.textContent = item.name
                let td3 = document.createElement("td")
                td3.textContent = item.category
                let td4 = document.createElement("td")
                td4.textContent = item.description
                let td5 = document.createElement("td")
                td5.textContent = item.quantity
                let td6 = document.createElement("td")
                let link = document.createElement("a")
                link.classList.add("fa", "fa-trash", "color-red")
                td6.appendChild(link)
                tr.appendChild(th)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tr.appendChild(td6)
                tbody.appendChild(tr)

            })
        })
}

products();

logout.addEventListener("click", () => {
    localStorage.removeItem("InventStore");
    window.location.href = "log-in.html";
})