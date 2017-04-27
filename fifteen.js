/**
 * Created by Yan on 2017/4/23.
 */
window.onload = function () {

    addPuzzle();
    var btn = document.getElementById("shufflebutton");
    btn.addEventListener("click", shuffle);
    emptyPos[0] = 300;
    emptyPos[1] = 300;

}
var emptyPos = new Array();
var puzzles = new Array();

var addMouseClickListeners = function () {
    var arrPuzzles = document.querySelectorAll("#puzzlearea div");
    addMouseOverListeners();
    for (var i = 0; i < arrPuzzles.length; i++) {
        arrPuzzles[i].addEventListener("click", function () {

            move(this.offsetLeft, this.offsetTop);

        });
    }
}
var addMouseOverListeners = function () {
    var arrPuzzles = document.querySelectorAll("#puzzlearea div");
    for (var i = 0; i < arrPuzzles.length; i++) {
        arrPuzzles[i].addEventListener("mouseover", function () {

            if (Math.abs(this.offsetLeft + this.offsetTop - emptyPos[0] - emptyPos[1]) == 100) {
                this.classList.add("changecursor");
            }
        });
    }
}
var move = function (Left, Top) {
    ///   alert(1);
    if (Math.abs(Left + Top - emptyPos[0] - emptyPos[1]) == 100) {
        //    alert(1);
        var selected = getDomByPos(Left, Top);


        var s = selected.innerHTML;
        var t = s - '0';
        //  alert(2);
        var newObj = createObjByPos(emptyPos[0], emptyPos[1], (t - 1) % 4 * 100, Math.floor((t - 1) / 4) * 100, s);
        document.getElementById("puzzlearea").appendChild(newObj);
        emptyPos[0] = Left;
        emptyPos[1] = Top;
        document.getElementById("puzzlearea").removeChild(selected);
        addMouseClickListeners();
    }
}


function addPuzzle() {

    for (var i = 0; i < 15; i++) {
        puzzles[i] = document.createElement("div");

        if (!puzzles[i].classList.contains("invalid")) {
            puzzles[i].classList.add("puzzlestyle");
            var x = (i % 4) * 100;
            var y = Math.floor(i / 4) * 100;

            var idX = Math.floor(i / 4) + 1;
            var idY = (i % 4) + 1;
            puzzles[i].id = "Square_" + idX + "_" + idY;
            puzzles[i].style.left = x + 'px';
            puzzles[i].style.top = y + 'px';

            puzzles[i].innerHTML = i + 1;
            //// puzzles[i].style.backgroundImage="url('background.jpg')";
            puzzles[i].style.backgroundPosition = (-x) + "px " + (-y) + "px";

            document.getElementById("puzzlearea").appendChild(puzzles[i]);

        }

    }

}
var createObjByPos = function (x, y, X1, Y1, s) {
    var Obj = document.createElement("div");
    Obj.style.left = x + 'px';
    Obj.style.top = y + 'px';
    Obj.style.backgroundPosition = (-X1) + "px " + (-Y1) + "px";
    var idX = y / 100 + 1;
    var idY = x / 100 + 1;
    Obj.innerHTML = s;
    Obj.classList.add("puzzlestyle");
    Obj.id = "Square_" + idX + "_" + idY;
    return Obj;

}
var getDomByPos = function (x, y) {
    var idX = y / 100 + 1;
    var idY = x / 100 + 1;
    var id = "Square_" + idX + "_" + idY;
    return document.getElementById(id);
}
var show = function () {
    var arr = document.querySelectorAll("#puzzlearea div");
    for (var t = 0; t < arr.length; t++) {
        console.log(arr[t].id + ' ' + arr[t].innerHTML);
        console.log(arr[t].offsetTop + ' ' + arr[t].offsetLeft);
    }

}

var shuffle = function () {

    // console.log(getDomByPos(200,0).id+' '+getDomByPos(200,0).innerHTML)

    var Pos1 = new Array();
    var Pos2 = new Array();
    var Pos3 = new Array();
    var Pos4 = new Array();
    var Neighbors = new Array();
//    alert(Neighbors.length);

    //   console.log(getDomByPos(300,300).innerHTML);
    for (var i = 0; i < 1000; i++) {
        //left from emptysquare
        Pos1[0] = emptyPos[0] - 100;
        Pos1[1] = emptyPos[1];
        if (Pos1[0] >= 0) Neighbors.push(Pos1);
        //right from emptysquare
        Pos2[0] = emptyPos[0] + 100;
        Pos2[1] = emptyPos[1];
        if (Pos2[0] <= 300) Neighbors.push(Pos2);
        //beyond the emptysquare
        Pos3[0] = emptyPos[0];
        Pos3[1] = emptyPos[1] - 100;
        if (Pos3[1] >= 0) Neighbors.push(Pos3);
        //below the emptysquare
        Pos4[0] = emptyPos[0];
        Pos4[1] = emptyPos[1] + 100;

        if (Pos4[1] <= 300) Neighbors.push(Pos4);
        var ran = Math.floor(Math.random() * Neighbors.length);
        var selected = getDomByPos(Neighbors[ran][0], Neighbors[ran][1]);

        var s = selected.innerHTML;
        var t = s - '0';
        var newObj = createObjByPos(emptyPos[0], emptyPos[1], (t - 1) % 4 * 100, Math.floor((t - 1) / 4) * 100, s);

        document.getElementById("puzzlearea").appendChild(newObj);
        document.getElementById("puzzlearea").removeChild(selected);
        emptyPos[0] = Neighbors[ran][0];
        emptyPos[1] = Neighbors[ran][1];
        Neighbors.splice(0, Neighbors.length);

    }
    addMouseClickListeners();
    //  show();
}
