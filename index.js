const tl = new TimelineMax();

const gameContainer = document.getElementById("game-container");
const customMenu = document.getElementById("menu");
const menuBackground = document.getElementById("menu-background");

var width = window.innerWidth;
var height = window.innerHeight;

var innerWidth = width * (9 / 10);
var innerHeight = height * (9 / 10);

var landscape = false;
var menu = false;

initGame(50);

if (width > height)
    landscape = true;

function initGame(size) {
    for (var row = 0; row < size; row++) {
        var tableRow = document.createElement("tr");
        for (var col = 0; col < size; col++) {
            var temp = document.createElement("td");
            temp.style.backgroundColor = "#6f7570";

            if (row == 0 && col == 0)
                temp.style.borderTopLeftRadius = "1vw";
            if (row == 0 && col == size - 1)
                temp.style.borderTopRightRadius = "1vw";
            if (row == size - 1 && col == 0)
                temp.style.borderBottomLeftRadius = "1vw";
            if (row == size - 1 && col == size - 1)
                temp.style.borderBottomRightRadius = "1vw";

            if (landscape) {
                temp.style.width = `${innerHeight / size}px`;
                temp.style.height = `${innerHeight / size}px`;
            } else {
                temp.style.width = `${innerWidth / size}px`;
                temp.style.height = `${innerWidth / size}px`;
            }
            tableRow.appendChild(temp);
        }
        gameContainer.append(tableRow);
    }
}

async function toggleMenu() {
    menu = !menu;
    if(menu) {
        customMenu.style.display = "block";
        customMenu.style.opacity = 1;
        tl.fromTo(menuBackground, 0.25, { scale: 0, opacity: 0 }, { scale: 1, ease: Power2.easeOut, opacity: 1 });
    } else {
        tl.fromTo(customMenu, 0.25, {opacity: 1}, {ease: Power2.easeOut, opacity: 0});
        await sleep(250);
        customMenu.style.display = "none";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}