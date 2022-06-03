
let urlApi = "https://amazing-events.herokuapp.com/api/events"
let dataArray;
async function getData() {
    await fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(json => dataApi = json)
dataArray = dataApi.events;
console.log(dataArray);

let cardDate = dataApi.currentDate
let arrayPast = dataArray.filter(e => cardDate > e.date)
let arrayFuture = dataArray.filter(e => cardDate < e.date)
console.log(cardDate);
console.log(arrayPast);
console.log(arrayFuture);

//ANCHOR PRIMER Tabla
let porcentajes = []
arrayPast.map(eventos => {
    porcentajes.push({
        eventos: eventos.name,
        porAssistance: (eventos.assistance*100/eventos.capacity).toFixed(2)
    })
})
console.log(porcentajes);


let max = porcentajes.sort((a,b) => b.porAssistance - a.porAssistance)[0]
console.log(max);
let min = porcentajes.sort((a,b) => a.porAssistance - b.porAssistance)[0]
console.log(min);

let capacity = arrayPast.filter(e=> e.capacity).sort((a,b)=> b.capacity - a.capacity)[0]
console.log(capacity);


//ANCHOR FUTUROS

const categoryAssistFuture = arrayFuture.map(eventos => eventos.category)
const categorySetFuture = new Set(categoryAssistFuture)
const categorysFuture = [...categorySetFuture]

const categoryValueFuture = []

categorysFuture.map(category =>
    categoryValueFuture.push({
            category:category,
            eventos: arrayFuture.filter(evento =>evento.category=== category),
        })
    )

console.log(categoryValueFuture);

let estimateAndCapacityFuture = []
    categoryValueFuture.map(datos => {
        estimateAndCapacityFuture.push({
            category: datos.category,
            estimate: datos.eventos.map(item => item.estimate),
            capacity: datos.eventos.map(item => item.capacity),
            estimateRevenue: datos.eventos.map(item => item.estimate * item.price)
    })
})
console.log(estimateAndCapacityFuture);

estimateAndCapacityFuture.forEach(category =>{
    let totalEstimate = 0
    category.estimate.forEach(estimate => totalEstimate += Number(estimate))
    category.estimate = totalEstimate

    let totalcapacityFut = 0
    category.capacity.forEach(capacity => totalcapacityFut += Number(capacity))
    category.capacity = totalcapacityFut

    let  totalEstimateRevenue = 0
    category.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue))
    category.estimateRevenue = totalEstimateRevenue

    category.porcentaje = ((totalEstimate * 100)/ totalcapacityFut).toFixed(2)
})
console.log(estimateAndCapacityFuture);


//NOTE se van pa abajo
//ANCHOR PASADOS
const categoryAssist = arrayPast.map(eventos=>eventos.category)
const categorySet = new Set(categoryAssist)
const categorys = [...categorySet]


const categoryValue = []
categorys.map(category =>
    categoryValue.push({
            category:category,
            eventos: arrayPast.filter(evento =>evento.category=== category),
            
        })
    )
console.log(categoryValue);


let assistAndCapacityPast = []
    categoryValue.map(datos => {
        assistAndCapacityPast.push({
            category: datos.category,
            assistance: datos.eventos.map(item => item.assistance),
            capacity: datos.eventos.map(item => item.capacity),
            revenue: datos.eventos.map(item => item.assistance * item.price)
    })
})
console.log(assistAndCapacityPast);

assistAndCapacityPast.forEach(category =>{
    let totalAssit = 0
    category.assistance.forEach(assistance => totalAssit += Number(assistance))
    category.assistance = totalAssit

    let totalcapacity = 0
    category.capacity.forEach(capacity => totalcapacity += Number(capacity))
    category.capacity = totalcapacity

    let  totalRevenue = 0
    category.revenue.forEach(revenue => totalRevenue += Number(revenue))
    category.revenue = totalRevenue

    category.porcentaje = ((totalAssit * 100)/totalcapacity).toFixed(2)
})
console.log(assistAndCapacityPast);
console.log(categoryValue);

//ANCHOR Imprimir TABLAS

function displeyTable(){
    let conteiner = `
    <td>${max.eventos} with <b>${max.porAssistance}%</b> of assistance </td>
    <td>${min.eventos} with <b>${min.porAssistance}%</b> of assistance </td>
    <td>${capacity.name}: ${capacity.capacity}</td>
    `
    document.getElementById("tableEventsStatistics").innerHTML = conteiner
}
displeyTable()

function displeyTableDos(){
    let conteiner = `                    
<tr>
    <td><b>Categories<b></td>
    <td><b>Estimate<b></td>
    <td><b>Percentage of attendance<b></td>
</tr>
`
estimateAndCapacityFuture = estimateAndCapacityFuture.sort((x,d)=> d.estimateRevenue - x.estimateRevenue )
    estimateAndCapacityFuture.forEach(e => {
        e.estimateAndCapacityFuture
        conteiner += `
    <tr>
        <td>${e.category}</td>
        <td>Estimated $${(new Intl.NumberFormat('de-DE').format(e.estimateRevenue))}</td>
        <td>Estimated ${e.porcentaje}%</td>
    </tr>
    `
    })
    document.getElementById("tableDos").innerHTML = conteiner
}
displeyTableDos()

function displeyTableTres(){
    let conteiner = `                    
<tr>
    <td><b> Categories <b> </td>
    <td><b> Revenues <b></td>
    <td><b> Percentage of attendance <b></td>
</tr>
`
assistAndCapacityPast = assistAndCapacityPast.sort((x,d)=> d.revenue - x.revenue)
    assistAndCapacityPast.forEach(e => {
        e.assistAndCapacityPast
        conteiner += `
    <tr>
        <td>${e.category}</td>
        <td>$${(new Intl.NumberFormat('de-DE').format(e.revenue))}</td>
        <td>${e.porcentaje}%</td>
    </tr>
    `
    })
    document.getElementById("tableTres").innerHTML = conteiner
}
displeyTableTres()

}
getData()


// (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number))