var checkboxSelected = [];
var textSearch = "";

let data = []
async function getData(){
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(Response => Response.json())
        .then(json=> data = json)
let eventos = data
return eventos
}
data =  await getData()
console.log(data)

function categoriasXD() {
    //ANCHOR CREO LOS CHECKBOX DINAMICOS Y TRABAJO CON ELLOS DESDE EL INICIO DE LA CARGA DEL DOCUMENTO
    var checkboxes = document.getElementById("categorias")

    var todasLasCategorias = data.events.map(eventos => eventos.category) //Recorro el array de eventos y separo de este la propiedad categorias
    
    const datosArray = new Set(todasLasCategorias) //Dado al recorrer el array anterios me va a dar todas las propiedades, con el metodo set elimino las repetidas y dejo solo el primer elemento encontrado, el resto lo descarta
    
    var categorias = [...datosArray] //guardo el dato obtenido con el metodo anterior en la variable categorias
    
    var imputCheckbox= ""
    categorias.forEach(categorias => {
        imputCheckbox += `
        <div class="form-check form-check-inline">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="${categorias}"/> ${categorias}
            </label>
        </div>`
    })
    //Creo el template de html para poder incorporarle el valor de cada uno de los elementos recorridos en el metodo forEach
    checkboxes.innerHTML = imputCheckbox //Imprimo el resultado en html

    var id = 1
    data.events.map(eventos => eventos.id = id++)
    console.log(data.events)
}
categoriasXD()

var checkBox = document.querySelectorAll("input[type=checkbox]");
console.log(checkBox)

checkBox.forEach(check=> check.addEventListener("click" , (event)=>{
    var checked = event.target.checked
    if(checked){
        checkboxSelected.push(event.target.value)
        arrayFiltrado() //aca va una fn que filtra las posibilidades de busqueda
console.log(checkboxSelected);
    } else {
        checkboxSelected = checkboxSelected.filter(cadaCheck => cadaCheck !== event.target.value)
        arrayFiltrado() //aca va una fn que filtra las uncheck
console.log(checkboxSelected);
    }
}))

var searchinput = document.querySelector("#search")
searchinput.addEventListener("keyup",(event) => {
    textSearch = event.target.value
    arrayFiltrado() //fn xd
})

//Comparar las entradas de busqueda con los datos
function arrayFiltrado(){
    let datos = [];
    if (checkboxSelected.length > 0 && textSearch !== "") {
        checkboxSelected.map(selected => {
            datos.push(...data.events.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && evento.category == selected))
            
        })
    }
    else if (checkboxSelected.length > 0 && textSearch === ""){
        checkboxSelected.map(selected => {
            datos.push(...data.events.filter(evento => evento.category==selected))
        })
    }
    else if (checkboxSelected.length == 0 && textSearch !== "") {
        datos.push(...data.events.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }
    else {datos.push(...data.events) }

    cartitasxd(datos)
}
arrayFiltrado()

function cartitasxd(eventito) {
    var templateHtml = ""
    if(eventito.length !== 0){
        for(let i = 0; i < eventito.length; i++){
            templateHtml += `
            <div class="col pb-3">
            <div class="card h-100">
            <img src="${eventito[i].image} " class="card-img-top xd" alt=" ${eventito[i].name} " />
            <div class="card-body">
            <h5 class="card-title"> ${eventito[i].name} </h5>
            <p class="card-text">Description: ${eventito[i].description} </p>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
            <small class="text"> Price: $${eventito[i].price}</small>
            <a href="./html/details.html?id=${eventito[i]._id} " class="btn boton-rosita btn-sm">See More</a>
            </div>
            </div>
            </div>
            `
        }
        document.querySelector("#cartinias").innerHTML = templateHtml
    }
    else{
        document.querySelector("#cartinias").innerHTML = `
        <div class="d-flex flex-column pt-2 justify-content-center align-items-center">
            <h2> Event not found😎</h2>
            <img src="data:image/jpeg;base64,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" alt="xd">
        </div>
            `
    }
}
