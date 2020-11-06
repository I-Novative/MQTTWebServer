const towelsXAgeCanvas = document.getElementById('towelsXAge').getContext('2d');
const towelsXAge = new Chart(towelsXAgeCanvas, {
    type: 'bar',
    data: {
        labels: ['< 20','20 - 30','31 - 40','41 - 50','51 - 60','61 - 70', '> 70'],
        datasets: [{
            label: '# de Toallas',
            data: [0, 0, 0, 0, 0, 0, 0],
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
            text: "Consumo de toallas por edad"
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

const loadTowelsXAgeChart = (serverData) =>{
    for (guestData of Object.values(serverData)){
        const index = getAgeIndex(guestData.guest.age);
        towelsXAge.data.datasets[0].data[index] += guestData.towels;
    }
    towelsXAge.update();
};

socket.on('towelsXAge', function(data){
    towelsXAge.data.datasets[0].data[data.index] += data.towels;
    towelsXAge.update();
});