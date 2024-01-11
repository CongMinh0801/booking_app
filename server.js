const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000
const baseUrl = "https://apim.dev.vietjetict.com"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/TravelOptions', (req, res) => {
    const { cityPair, departure, currency, adultCount, childCount, infantCount, daysBeforeDeparture, daysAfterDeparture } = req.query;
  
    var request = require('request');
    var options = {
      "rejectUnauthorized": false, 
      'method': 'GET',
      'url': `${baseUrl}/TravelOptions?cityPair=${cityPair}&departure=${departure}&currency=${currency}&adultCount=${adultCount}&childCount=${childCount}&infantCount=${infantCount}&daysBeforeDeparture=${daysBeforeDeparture}&daysAfterDeparture=${daysAfterDeparture}`,
      'headers': {
        'Accept': 'application/json',
        'Ocp-Apim-Subscription-Key': '2b536c1646434785b1660d8adc716805'
      }
    };
  
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.setHeader('Content-Type', 'application/json');

        data = JSON.parse(response.body)
        
        let resData = []
        
        for (let i = 0; i < data.length; i++){
            let flightCount = data[i].flights.length
            let flightList = []
            for(let j = 0; j < flightCount; j++) {
                let flight = {
                    flightNumber: data[i].flights[j].flightNumber,
                    departure: {
                        airportName: data[i].flights[j].departure.airport.name,
                        airportCode: data[i].flights[j].departure.airport.code,
                        utcOffset: data[i].flights[j].departure.airport.utcOffset,
                        scheduledTime: data[i].flights[j].departure.scheduledTime,
                        localScheduledTime: data[i].flights[j].departure.localScheduledTime
                    },
                    arrival: {
                        airportName: data[i].flights[j].arrival.airport.name,
                        airportCode: data[i].flights[j].arrival.airport.code,
                        utcOffset: data[i].flights[j].arrival.airport.utcOffset,
                        scheduledTime: data[i].flights[j].arrival.scheduledTime,
                        localScheduledTime: data[i].flights[j].arrival.localScheduledTime
                    },
                    airlineCode: data[i].flights[j].airlineCode.code,
                    aircraftModel: {
                        name: data[i].flights[j].aircraftModel.name,
                        identifier: data[i].flights[j].aircraftModel.identifier,
                    }
                }
                flightList = [...flightList, flight]
            }

            let fareOptions = []
            const optionsCount = data[i].fareOptions.length
            for (let j = 0; j < optionsCount; j++){
                let priceAdult = 0
                let priceChild = 0
                let priceInfant = 0
                for(let k = 0; k < data[i].fareOptions[j].fareCharges.length; k++) {
                    if (data[i].fareOptions[j].fareCharges[k].chargeType.code != "SA") {
                        if (data[i].fareOptions[j].fareCharges[k].passengerApplicability.adult) {
                            priceAdult += data[i].fareOptions[j].fareCharges[k].currencyAmounts[0].totalAmount
                        }
                        if (data[i].fareOptions[j].fareCharges[k].passengerApplicability.child) {
                            priceChild += data[i].fareOptions[j].fareCharges[k].currencyAmounts[0].totalAmount
                        }
                        if (data[i].fareOptions[j].fareCharges[k].passengerApplicability.infant) {
                            priceInfant += data[i].fareOptions[j].fareCharges[k].currencyAmounts[0].totalAmount
                        }
                    }
                }

                let option = {
                    bookingCode: {
                        code: data[i].fareOptions[j].bookingCode.code,
                        description: data[i].fareOptions[j].bookingCode.description,
                        key: data[i].fareOptions[j].bookingKey
                    }, 
                    cabinClass: {
                        code: data[i].fareOptions[j].cabinClass.code,
                        description: data[i].fareOptions[j].cabinClass.description,
                    },
                    fareClass: {
                        code: data[i].fareOptions[j].fareClass.code,
                        description: data[i].fareOptions[j].fareClass.description,
                    },
                    priceAdult: priceAdult,
                    priceChild: priceChild,
                    priceInfant: priceInfant,
                }

                fareOptions = [...fareOptions, option]
            }

            let item = {
                flights: flightList,
                numberOfStops: data[i].numberOfStops,
                numberOfChanges: data[i].numberOfChanges,
                fareOptions: fareOptions,
            }

            resData = [...resData, item]
        }
        res.send(resData);
    });
});


app.post('/reservations', (req, res) => {
    const body = req.body;
  
    var request = require('request');
    var options = {
      "rejectUnauthorized": false, 
      'method': 'POST',
      'url': `${baseUrl}/reservations`,
      'headers': {
        'Accept': 'application/json',
        'Ocp-Apim-Subscription-Key': '2b536c1646434785b1660d8adc716805',
        'Authorization': 'Basic QVBJT1RBMDI6VmpldEAxMjM0NQ=='
      },
      'json': body
    };
    
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.setHeader('Content-Type', 'application/json');

        res.send(response.body);
    });
});  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
