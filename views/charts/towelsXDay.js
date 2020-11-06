
const towelsXDayCanvas = document.getElementById('towelsXDay').getContext('2d');
const towelsXDay = new Chart(towelsXDayCanvas, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# de Toallas',
            data: [],
            backgroundColor: 'rgb(171,202,183)',
            borderWidth: 2,
            borderColor : 'rgb(1,34,65)',
            hoverBackgroundColor : 'rgb(1,34,65)'
        }]
    },
    options: {
        title: {
            display : true,
            padding : 20,
            fontSize : 24,
            fontStyle : "normal",
            fontColor : 'rgb(1,34,65)',
            text: "Consumo de toallas por día (últimos 7 días)"
        },
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(1,34,65)',
                fontSize : 18
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize : 15,
                    padding : 20,
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize : 15,
                },
                gridLines : {
                    display : false
                }
            }]
        }
    }
});

const loadTowelsXDayChart = (serverData) => {
    serverData.sort(custom_sort);
    for (object of Object.values(serverData)){
        let index = getElementIndex(object._id, towelsXDay);
        if(index == -1){
            towelsXDay.data.labels.push(object._id);
            towelsXDay.data.datasets[0].data.push(object.towels);
        }
        else towelsXDay.data.datasets[0].data[index] += object.towels;
    }
    towelsXDay.update();
};

socket.on('towelsXDay', function(object){
    let index = getElementIndex(object._id, towelsXDay);
    if(index == -1){
        towelsXDay.data.labels.push(object._id);
        towelsXDay.data.datasets[0].data.push(object.towels);
    }
    else towelsXDay.data.datasets[0].data[index] += object.towels;
    towelsXDay.update();
});