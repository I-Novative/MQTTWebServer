var waterXRoomCanvas = document.getElementById('waterXRoom').getContext('2d');

var waterXRoom = new Chart(waterXRoomCanvas, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Litros de agua',
            data: [],
            // Custom field to show each room capacity for each tooltip
            capacity : [],
            backgroundColor: 'rgb(39, 33, 146, 0.85)',
            borderWidth: 1,
            borderColor : 'rgb(0,0,0)',
            hoverBackgroundColor : 'rgb(39, 33, 146, 0.6)'
        }]
    },
    options: {
        tooltips : {
            callbacks : {
                title: function(tooltipItems, data) {
                    return tooltipItems[0].xLabel + ' Capacidad: ' + 
                    data.datasets[0].capacity[tooltipItems[0].index] + ' pers';
                }
            }
        },
        title: {
            display : true,
            padding : 20,
            fontSize : 24,
            fontStyle : "normal",
            text: "Consumo de agua por habitación activa"
        },
        legend: {
            display: true,
            labels: {
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

const loadWaterXRoomChart = (serverData) => {
    // Fill data, capacity, and labels array
    for (_id of Object.keys(serverData)){
        const object = serverData[_id];
        const roomNumber = parseInt(_id);
        let index = getElementIndex(`Hab-${roomNumber}`, waterXRoom);
        if(index == -1){
            waterXRoom.data.labels.push(`Hab-${roomNumber}`);
            waterXRoom.data.datasets[0].data.push(object.consumption);
            waterXRoom.data.datasets[0].capacity.push(object.capacity);
        }
        else waterXRoom.data.datasets[0].data[index] += object.consumption;
    }
    waterXRoom.update();
};

socket.on('waterXRoom', function(data){
    let index = getElementIndex(`Hab-${data._id}`, waterXRoom);
    if(index == -1){
        waterXRoom.data.labels.push(`Hab-${data._id}`);
        waterXRoom.data.datasets[0].data.push(data.consumption);
        waterXRoom.data.datasets[0].capacity.push(object.capacity);
    }
    else waterXRoom.data.datasets[0].data[index] += data.consumption;
    waterXRoom.update();
});