const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/3852b6403b5e3a08e6ba5576368ee10e/${lat},${long}?lang=az&exclude=[hourly,flags]`;
    request({url, json: true}, (err,res) => {
        if(err){
            callback('Unable to connect',undefined);
        } else if(res.body.error){
            callback('Coordinates not found',undefined);
        } else {
            const {currently} = res.body;
            callback(undefined, `${res.body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% cahnce of rain`);
        }
    })
};

module.exports = forecast;