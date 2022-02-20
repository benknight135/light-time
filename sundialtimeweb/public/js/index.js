var get_time_timer;

const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
}

function getInitPosition(position) {
    document.getElementById(`lat-text`).value = position.coords.latitude;
    document.getElementById(`long-text`).value = position.coords.longitude;
    sundial_get_time();
    startGetTimeTimer();
}

window.addEventListener('DOMContentLoaded', () => {
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(getInitPosition);
    // } else {
    sundial_get_time();
    startGetTimeTimer();
    //}
})

function sundial_get_time() {
    var lat = document.getElementById(`lat-text`).value
    var long = document.getElementById(`long-text`).value
    var date = new Date();
    var req = {
        lat: lat,
        long: long,
        date: date.getTime()
    };
    $.post("/api/gettime", req, function success(res) {
        var sundial_date = new Date(res.time);
        var date_str = date.toLocaleTimeString() + `.${date.getMilliseconds()}`;
        var sundial_date_str = sundial_date.toLocaleTimeString() + `.${sundial_date.getMilliseconds()}`;
        replaceText(`current-time`, date_str);
        replaceText(`sundial-time`, sundial_date_str);
    });
}

function startGetTimeTimer() {
    get_time_timer = setInterval(function() {
        sundial_get_time();
    }, 100);
}

function stopGetTimeTimer() {
    clearInterval(get_time_timer);
}