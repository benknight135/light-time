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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getInitPosition);
    } else {
        sundial_get_time();
        startGetTimeTimer();
    }
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
        var sundial_date = new Date(res.sundial_time);
        var date_str = date.toLocaleTimeString() + `.${date.getMilliseconds()}`;
        var sundial_date_str = sundial_date.toLocaleTimeString() + `.${sundial_date.getMilliseconds()}`;
        replaceText(`current-time`, date_str);
        replaceText(`sundial-time`, sundial_date_str);
        var day_length_h = res.day_length / 60 / 60 / 1000;
        var night_length_h = res.night_length / 60 / 60 / 1000;
        replaceText(`sundial-day-length`, day_length_h.toFixed(2));
        replaceText(`sundial-night-length`, night_length_h.toFixed(2));
        var t = sundial_date.getHours();
        var time_color_square = document.getElementById(`time-color-sqaure`)
        if (t < 6) {
            time_color_square.className = "square night-square";
        } else if (t < 10) {
            time_color_square.className = "square morning-square";
        } else if (t < 3) {
            time_color_square.className = "square midday-square";
        } else if (t < 18) {
            time_color_square.className = "square evening-square";
        } else {
            time_color_square.className = "square night-square";
        }
    });
}

function startGetTimeTimer() {
    get_time_timer = setInterval(function() {
        sundial_get_time();
    }, 250);
}

function stopGetTimeTimer() {
    clearInterval(get_time_timer);
}