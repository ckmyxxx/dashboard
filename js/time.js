function ShowTime() {
    var Hours = String(new Date().getHours());
    var Minutes = String(new Date().getMinutes());
    // console.log(Hours.length)
    var H = paddingLeft(Hours, 2);
    var M = paddingLeft(Minutes, 2);
    var time = H + ":" + M;
    var i = "day";
    if (Hours < 12 && Hours > 4) {
        i = "morning";
    } else if (Hours >= 12 && Hours < 18) {
        i = "afternoon";
    } else {
        i = "evening";
    }
    document.getElementById('showbox').innerHTML = time;
    document.getElementById('showbox').innerHTML += "<p>Good " + i + "</p>";
    setTimeout('ShowTime()', 3000);
}

function paddingLeft(str, length) {
    if (str.length >= length)
        return str;
    else
        return paddingLeft("0" + str, length);
}
ShowTime();