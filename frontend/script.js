

const getData = async () => {
    let response = await fetch('http://localhost:5000');
    let json = await response.json()

    return json
}


// Writting displayGraph function to show data in bar graph
// Making myChart variable to access it later in another function
let myChart;
let ctx;
const displayGraph = (labels, data, type) => {
    ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Covid-19 Cases Comparison',
                data: data,
                backgroundColor: [
                    '#50BFE6',
                    '#0095B7',
                    '#2887C8'
                ],
                borderColor: [
                    '#d6ecfb'
                ],
                borderWidth: 0.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

};

// loadData function to load data from getData function and storing it in localstorage so that users don't have to reload page to get data and it increases the runtime speed of the code
const loadData = async () => {
    let data = await getData()
    window.localStorage.setItem("covidData", JSON.stringify(data))
}

// functions to show the data when users click on button
const showBarChart = async () => {

    let data = JSON.parse(localStorage.getItem("covidData"));
    let inputCountry = document.getElementById('countryInput').value;

    inputCountry = inputCountry.replace(/ +/g, '');
    inputCountry = inputCountry.split(',')

    let requiredData = []
    for (let i = 0; i < inputCountry.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if ((data[j].country_name).toLowerCase() == inputCountry[i].toLowerCase()) {
                requiredData.push(data[j]);
            }
        }

    }
    let displayLabels = []
    let displayData = []

    let displayDataInPercent = []

    for (let label = 0; label < requiredData.length; label++) {
        displayLabels.push(requiredData[label].country_name);
    }

    for (let data = 0; data < requiredData.length; data++) {
        let dataInNumbers = parseInt(requiredData[data].cases.replaceAll(',', ''));
        displayData.push(dataInNumbers);
    }


    let total = 0;
    for (let totalIndex = 0; totalIndex < displayData.length; totalIndex++) {
        total = total + parseInt(displayData[totalIndex]);
    }

    for (let i = 0; i < displayData.length; i++) {
        displayDataInPercent.push(displayData[i] / total)
    }

    myChart.destroy()

    displayGraph(displayLabels, displayData, 'bar');
}

const showPieChart = async () => {

    let data = JSON.parse(localStorage.getItem("covidData"));
    let inputCountry = document.getElementById('countryInput').value;

    inputCountry = inputCountry.replace(/ +/g, '');
    inputCountry = inputCountry.split(',')

    let requiredData = []
    for (let i = 0; i < inputCountry.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if ((data[j].country_name).toLowerCase() == inputCountry[i].toLowerCase()) {
                requiredData.push(data[j]);
            }
        }

    }
    let displayLabels = []
    let displayData = []

    let displayDataInPercent = []

    for (let label = 0; label < requiredData.length; label++) {
        displayLabels.push(requiredData[label].country_name);
    }

    for (let data = 0; data < requiredData.length; data++) {
        let dataInNumbers = parseInt(requiredData[data].cases.replaceAll(',', ''));
        displayData.push(dataInNumbers);
    }


    let total = 0;
    for (let totalIndex = 0; totalIndex < displayData.length; totalIndex++) {
        total = total + parseInt(displayData[totalIndex]);
    }

    for (let i = 0; i < displayData.length; i++) {
        displayDataInPercent.push(displayData[i] / total)
    }

    myChart.destroy()
    displayGraph(displayLabels, displayDataInPercent, 'pie');
}

displayGraph(["Countries"], [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 'bar')
loadData()








