console.log('JS loaded');
const weather = document.querySelector('form');
const text = document.querySelector('.message1');

weather.addEventListener('submit', (e)=> {
    e.preventDefault();
    text.textContent='Loading ...'
    const search = document.querySelector('input').value;

    fetch(`/weather?address=${search}`)
    .then(res => res.json())
    .then(data=>
        {console.log(data)
        text.textContent = !data.error ?
            `latitude is ${data.latitude} and longitude is ${data.longitude} and location is ${data.location}`
        : data.error}
    )
})
