let data = []

async function getDataFromAPI() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    const headers = new Headers();
    headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.log("Error al realizar la petición:", error.message);
    }
}
data = await getDataFromAPI()

function trabajadorPublicoDeLimpieza() {
    let id = location.search.split("?id=")
    let idselected = id[1]
    let evento = data.events.find(evento => evento._id == idselected)
    let templateHtml = `
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