import DataGenerator from "./dataGenerator.js";
import ChartGenerator from "./chartGenerator.js";
let dataGenerator = null;
let datos = null;
let labels = null;
generateData();
let chartGenerator = new ChartGenerator(labels, datos, 'line', 'myChart', 'Mi gráfica');
generateChart();

document.querySelector('#type').addEventListener('change', (e) => {
    e.preventDefault();
    changeType();
});

function changeType(){
    let type = document.querySelector('#type').value;
    console.log(type);
    chartGenerator.destroy();
    chartGenerator = new ChartGenerator(labels, datos, type, 'myChart', 'Mi gráfica');
    chartGenerator.generate();

}

function generateData(){
    let form = document.getElementById('data-form');
    let min = parseInt(form.min.value);
    let max = parseInt(form.max.value);
    let qty = parseInt(form.qty.value);
    let direction = form.direction.value;
    let trend = form.trend.value;

    console.log(min, max, qty, direction, type,trend)
    dataGenerator = new DataGenerator(qty, min, max, direction,trend);
    datos = dataGenerator.generate();
    labels = dataGenerator.generateLabels();

}
function generateChart(){
    if(chartGenerator) chartGenerator.destroy();
    let type = document.querySelector('#type').value;
    chartGenerator = new ChartGenerator(labels, datos, type, 'myChart', 'Mi gráfica');
    chartGenerator.generate();
}

document.getElementById('data-form').addEventListener('submit', (e) => {
    e.preventDefault();
    generateData();
    generateChart();
});

  