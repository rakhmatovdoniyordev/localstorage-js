const form = document.querySelector(".form"),
inp = document.querySelector(".form input"),
collection = document.querySelector(".collection")




const data = JSON.parse(localStorage.getItem("data")) || []


function createLists(DATA){
    while(collection.firstChild){
        collection.firstChild.remove()
    }
    DATA.forEach(element => {
        let li = document.createElement("li")
        li.classList.add("collection__item")
        li.innerHTML = `
            <input type="checkbox">
            <p>${element.title}</p>
            <a href="#"><i class="fa-solid fa-xmark"></i></a>`
        collection.appendChild(li)

        const checkbox = li.querySelector("input[type='checkbox']");
        const text = li.querySelector("p");
        const close = li.querySelector("a");

        checkbox.addEventListener("change", () => {
            if(checkbox.checked){
                li.style.opacity = 0.7
                text.style.textDecoration = "line-through"
            }else{
                li.style.opacity = 1
                text.style.textDecoration = "none"
            }
        })

        close.addEventListener("click", () => {
            const index = data.findIndex(todo => todo.title === element.title);
            if (index !== -1) {
                data.splice(index, 1);
                localStorage.setItem("data", JSON.stringify(data));
                createLists(data)
            }
        });
    });
}


form.addEventListener("submit", e => {
    e.preventDefault()
    const value = inp.value
    if(!value){
        return null
    }
    let newToDo = {
        id: new Date().getTime(),
        title: value
    }
    data.push(newToDo)
    localStorage.setItem("data", JSON.stringify(data))
    inp.value = ""
    createLists(data)
})


createLists(data)