let addproduct = document.getElementById("addproduct")
let updateproduct = document.getElementById("update")
let catbut = document.getElementById("catbut")
let loader = document.querySelector(".loader")
let updateload = document.querySelector(".updateload")
let updateload1 = document.querySelector(".updateload1")
let success = document.querySelector(".success")
let success2 = document.querySelector(".success2")
let success3 = document.querySelector(".success3")
let element = document.createElement('p');
let logout = document.querySelector(".logout");
let selectproduct = document.querySelector(".selectproduct")
let selectcategory = document.querySelector(".selectcategory")
let options = ""
let options2 = ""
let parent = document.createElement('p');
let catbody = document.querySelector(".catbody")
let viewcat = document.getElementById("view")
let tablelog = document.querySelector(".tablelog")

const products = () => {

    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
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
            localStorage.setItem("products", JSON.stringify(res.data))
        })
}

const categories = () => {

    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    const request = new Request('https://inventory-app-stock.herokuapp.com/api/v1/category', {
        method: 'GET',
        withCredentials: true,
        headers: {
            authorization: token
        }
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("category", JSON.stringify(res.data))
        })
}

const log = () => {
    loader.classList.remove("none")
    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    let id = JSON.parse(localStorage.getItem("InventStore")).id
    const request = new Request(`https://inventory-app-stock.herokuapp.com/api/v1/log/${id}`, {
        method: 'GET',
        withCredentials: true,
        headers: {
            authorization: token
        }
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {
            loader.classList.add("none")
            tablelog.classList.remove("none")
            console.log(res.data)
            res.data.map((item) => {
                let tr = document.createElement("tr")
                let td1 = document.createElement("td")
                let date = new Date(parseInt(item.date)).toISOString()
                
                td1.textContent = date
                let td2 = document.createElement("td")
                td2.textContent = item.action
                tr.appendChild(td1)
                tr.appendChild(td2)
                tablelog.appendChild(tr)
            })
        })
}

log();
products();
categories();



const getcat = () => {
    catbody.innerHTML = ""
    const allcategories = JSON.parse(localStorage.getItem("category"))

    allcategories.map((item) => {
        let newelement = document.createElement("p")
        newelement.textContent = item.name
        catbody.appendChild(newelement)
    })

}

viewcat.addEventListener("click", getcat)



const allproducts = [{
    name: "Select Product"
}, ...JSON.parse(localStorage.getItem("products"))]


allproducts.map((item) => {
    options += `<option value=${item.name}>${item.name}</option>`
})

selectproduct.innerHTML = options;

const allcategories2 = [{
    name: "Select Category"
}, ...JSON.parse(localStorage.getItem("category"))]

console.log(allcategories2)

allcategories2.map((item) => {
    options2 += `<option value=${item.name}>${item.name}</option>`
})

selectcategory.innerHTML = options2;





const productAdded = (evt) => {
    evt.preventDefault();
    console.log(selectcategory.options[selectcategory.selectedIndex].value)
    loader.classList.remove("none")
    const data = {
        name: document.querySelector(".productname").value,
        category: selectcategory.options[selectcategory.selectedIndex].value,
        description: document.querySelector(".productdesc").value,
    }
    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    const request = new Request('https://inventory-app-stock.herokuapp.com/api/v1/product', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            authorization: token
        })
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {
            loader.classList.add("none")
            if (res.status === "success") {
                element.textContent = `New Product created succesfully`
                element.classList.add("success")
                success.appendChild(element);
                setTimeout(() => {
                    window.location.href = "homepage.html";
                }, 2000)
            }

        })
}


const productUpdated = (evt) => {
    evt.preventDefault();
    console.log(loader)
    updateload.classList.remove("none")
    let name = selectproduct.options[selectproduct.selectedIndex].value;
    let foundp = allproducts.find((item) => {
        console.log(item.name)
        return item.name === name
    })
    console.log(document.querySelector(".productnum").value)

    const data = {
        name: foundp.name,
        category: foundp.category,
        quantity: document.querySelector(".productnum").value,
    }
    console.log(data)
    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    const request = new Request(`https://inventory-app-stock.herokuapp.com/api/v1/product/${foundp._id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            authorization: token
        })
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {
            updateload.classList.add("none")
            if (res.status === "success") {
                element.textContent = `Product count updated succesfully`
                element.classList.add("success")
                success2.appendChild(element);
                setTimeout(() => {
                    window.location.href = "homepage.html";
                }, 2000)
            }

        })
}


const categoryAdded = (evt) => {
    evt.preventDefault();
    updateload1.classList.remove("none")
    const data = {
        name: document.querySelector(".catname").value,
        description: document.querySelector(".catdesc").value,
    }
    console.log(data)
    let token = "JWT " + JSON.parse(localStorage.getItem("InventStore")).token
    const request = new Request('https://inventory-app-stock.herokuapp.com/api/v1/category', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            authorization: token
        })
    });


    fetch(request)
        .then(res => res.json())
        .then(res => {
            updateload1.classList.add("none")
            if (res.status === "success") {
                element.textContent = `New Category created succesfully`
                element.classList.add("success")
                success3.appendChild(element);
                setTimeout(() => {
                    window.location.href = "homepage.html";
                }, 2000)
            }

        })
}





addproduct.addEventListener("click", productAdded)
updateproduct.addEventListener("click", productUpdated)
catbut.addEventListener("click", categoryAdded)
logout.addEventListener("click", () => {
    localStorage.removeItem("InventStore");
    window.location.href = "log-in.html";
})