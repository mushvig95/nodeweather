const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibXVzaHZpZzk1IiwiYSI6ImNrNTVsMjQzdjA0cnAzbG81MXRhaHNhM24ifQ.qGNvwPssXjsgMwgOUZfs1A&limit=1`;
    request({url, json: true}, (err,res) => {
        if(err){
            callback('Unable to connect', undefined);
        } else if(res.body.features.length === 0) {
            callback('No such location',undefined);
        }else {
            callback(
                undefined,
                {
                    latitude: res.body.features[0].geometry.coordinates[0],
                    longitude: res.body.features[0].geometry.coordinates[0],
                    location: res.body.features[0].place_name
                }
            )
        }
    })
};

module.exports = geoCode;