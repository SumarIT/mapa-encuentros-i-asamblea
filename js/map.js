
const map = L.map('map').setView([39.8376017, -4.3978819], 6);
L.tileLayer.provider('CartoDB.Voyager').addTo(map);

const markers = [];

let popup = null;

const iconOk = L.icon({
    iconUrl: 'img/marker-icon-magenta.png', iconAnchor: [12.5, 41]
});
const iconPass = L.icon({
    iconUrl: 'img/marker-icon-grey.png', iconAnchor: [12.5, 41]
});

d3.csv("data/encuentros.csv", (data) => {
    const dates = data.Fecha.split('/');
    const times = data.Hora.split(':');
    const date = new Date(dates[2], dates[1] - 1, dates[0], times[0], times[1]);
    const icon = date > new Date() || isNaN(date) ? iconOk : iconPass;
    const hasLink = date > new Date() && data.Link;
    const popupTitle = hasLink
        ? `<a href="${data.Link}" target="_blank" rel="noopener noreferrer">${data['Título']}</a>`
        : `<span>${data['Título']}</span>`;
    const popupDate = isNaN(date)
        ? '<span class="grey">Próximamente</span>'
        : `<span>${date.toLocaleDateString()} - ${data.Hora}</span>`;
    const marker = L.marker([data.Latitud, data.Longitud], { icon });
    marker.addTo(map);
    marker.bindPopup(`${popupTitle}${popupDate}`);
    markers.push(marker);
});
