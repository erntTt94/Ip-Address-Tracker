const map = L.map('map', { zoomControl: false }).setView([42.73, 25.48], 8);
const mapIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [40, 45],
    iconAnchor: [22, 94]
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const ip = form.elements.ip.value;
    let url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_1nFga2OJO13wSoved40ClF4H8f2gW';
    if (ip) {
        url += `&ipAddress=${ip}`;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data) {
            document.querySelector('#ipData').textContent = data.ip;
            document.querySelector('#locationData').textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
            document.querySelector('#timeData').textContent = data.location.timezone;
            document.querySelector('#organizationData').textContent = data.isp;
            map.setView([data.location.lat, data.location.lng]);
            L.marker([data.location.lat, data.location.lng], { icon: mapIcon }).addTo(map);
        }
    } catch (error) {
        console.log(error);
    }
})










