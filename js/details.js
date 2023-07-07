let data = []
async function getData(){
    await fetch('/js/amazingEvents.json')
        .then(Response => Response.json())
        .then(json=> data = json)
let eventos = data.events
return eventos
}
data =  await getData()

function trabajadorPublicoDeLimpieza(){
    var id = location.search.split("?id=")
    console.log(id);

    var idselected = id[1]
    console.log(idselected);
    console.log(data);
    var evento = data.find( evento=> evento._id == idselected) 
console.log(evento);
    var templateHtml = `
    <div class="col-md-6 col-sm-8 pl-5 d-flex p-2 justify-content-center align-items-center">
        <img src=" ${evento.image} " class="img-details" alt="img-details">
    </div>
    <div class="col-md-6">
        <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <div class="card-text">
                <ul>
                    <li class="pb-2">Date: ${evento.date}</li>
                    <li class="pb-2">Description: ${evento.description}</li>
                    <li class="pb-2">Category: ${evento.category}</li>
                    <li class="pb-2">Place: ${evento.place}</li>
                    <li class="pb-2">Capacity: ${evento.capacity}</li>
                    <li class="pb-2">Price: $${evento.price}</li>
                </ul>
            </div>
        </div>
    </div>
    `
    document.querySelector(`#cartGrandotaxd`).innerHTML = templateHtml
}
trabajadorPublicoDeLimpieza()