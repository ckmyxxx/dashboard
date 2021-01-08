let j = Number(localStorage.getItem('j')) || 0;
const photo = [
    "Amsterdam,Holland",
    "Bluecave,Iceland",
    "Bluelagoon,Iceland",
    "Hverfjall,Iceland",
    "Iceriver,Iceland",
    "Jökulsárlón,Iceland",
    "Luzern,Swiss",
    "Reykjavík,Iceland",
    "Seljalandsfoss,Iceland",
    "Varmahlíð,Iceland",
    "Zermatt,Swiss"
];

$(function () {
    // 綁定背景圖片
    $("#imgDescribe").click(changeImg);

    changeImg();
});

const changeImg = () => {

    if (j < photo.length - 1) {
        j++;
    } else {
        j = 0;
    }
    $("#background").attr("style", "background-image: url(./img/" + photo[j] + ".JPG)");
    $("#imgDescribe").text("@ " + photo[j]);
    localStorage.setItem("j", j);
};