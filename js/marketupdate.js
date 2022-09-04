const anteile = [0,0,0,0,0,0] /*First Place in Array not used*/

const aktie1prices = [0,0,0,0,0,0,0,0,0,0]

function marketupdate() {
    setInterval(priceUpdate, 1000, 1);
    setInterval(priceUpdate, 1000, 2);
    setInterval(priceUpdate, 1000, 3);
    setInterval(priceUpdate, 1000, 4);
    setInterval(priceUpdate, 1000, 5);
}

function priceUpdate(listid) {

    var priceTable = document.getElementById("marketview");
    var currentprice = Number(priceTable.rows[listid].cells[1].innerHTML);
    var newprice = 0;

    var change = Math.round(Math.random() * 10);
    var changedirection = Math.floor(Math.random() * 2);
    if (changedirection == 0)
    {
        newprice = currentprice - change;
    }
    if (changedirection == 1)
    {
        newprice = currentprice + change;
    }

    if (newprice < 1) /*Prevent Value from Dropping to 0 or below*/
    {
        newprice = 1;
    }

    priceTable.rows[listid].cells[1].classList.remove("priceinc");
    priceTable.rows[listid].cells[1].classList.remove("pricedec");

    if (currentprice < newprice)
    {
        priceTable.rows[listid].cells[1].innerHTML = newprice;
        priceTable.rows[listid].cells[1].classList.add("priceinc");
    }
    if (currentprice > newprice)
    {
        priceTable.rows[listid].cells[1].innerHTML = newprice;
        priceTable.rows[listid].cells[1].classList.add("pricedec");
    }

    if (listid == 1)
    {
        aktie1prices[0] = aktie1prices[1];
        aktie1prices[1] = aktie1prices[2];
        aktie1prices[2] = aktie1prices[3];
        aktie1prices[3] = aktie1prices[4];
        aktie1prices[4] = aktie1prices[5];
        aktie1prices[5] = aktie1prices[6];
        aktie1prices[6] = aktie1prices[7];
        aktie1prices[7] = aktie1prices[8];
        aktie1prices[8] = aktie1prices[9]; 
        aktie1prices[9] = newprice;
    }
}

function changeView_Aktie(listid) {
    document.getElementById("market").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("aktienansicht").style.display = "block";

    /*Add functional Elements*/
    document.getElementById("aktienansicht").innerHTML += "<h2 id='aktienname'></h2>";
    document.getElementById("aktienansicht").innerHTML += "<canvas id='aktiengraph'></canvas>"
    document.getElementById("aktienansicht").innerHTML += "<button id='back' onclick='exitaktie(" + listid + ")'>Zurück</button>";
    document.getElementById("aktienansicht").innerHTML += "<button id='aktieverkaufen' onclick='aktieverkaufen(" + listid +")'>Verkaufen</button>";
    document.getElementById("aktienansicht").innerHTML += "<button id='aktiekaufen' onclick='aktiekaufen(" + listid + ")'>Kaufen</button>";
    document.getElementById("aktienansicht").innerHTML += "<p id='aktienpreis'></p>";

    var aktienname = document.getElementById("marketview").rows[listid].cells[0].innerHTML;
    var preis = Number(document.getElementById("marketview").rows[listid].cells[1].innerHTML);

    document.getElementById("aktienname").innerHTML = aktienname;
    document.getElementById("aktienpreis").innerHTML = preis;

    setInterval(updateaktienview, 1000, listid);
}

function insuficentfunds() {
    document.getElementById("account").style.color = "red";
    setTimeout(() => {  document.getElementById("account").style.color = "black"; }, 1000);
}

function aktiekaufen(listid) {
    var aktienpreis = Number(document.getElementById("aktienpreis").innerHTML);
    var kontostand = Number(document.getElementById("account").innerHTML);

    if (kontostand >= aktienpreis) {
        kontostand = kontostand - aktienpreis;
        document.getElementById("account").innerHTML = kontostand;
        anteile[listid] = anteile[listid] + 1;
    }

    if (kontostand < aktienpreis) {
        insuficentfunds();
    }

}

function aktieverkaufen(listid) {
    var aktienpreis = Number(document.getElementById("aktienpreis").innerHTML);
    var kontostand = Number(document.getElementById("account").innerHTML);

    if (anteile[listid] >= 1) 
    {
        kontostand = kontostand + aktienpreis;
        document.getElementById("account").innerHTML = kontostand;
        anteile[listid] = anteile[listid] - 1;
    }
}

function exitaktie(listid) {
    document.getElementById("market").style.display = "block";
    document.getElementById("news").style.display = "block";
    document.getElementById("aktienansicht").style.display = "none";

    document.getElementById("aktienansicht").innerHTML = "";

    document.getElementById("marketview").rows[listid].cells[2].innerHTML = anteile[listid];
}

function drawgraph() {
    var canvas = document.getElementById("aktiengraph");

    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 250, 150);
    var i = 0;
    while (i < 10)
    {
        ctx.beginPath();
        ctx.moveTo(i * 25, 150 - aktie1prices[i]);
        ctx.lineTo((i+1) * 25, 150 - aktie1prices[i+1]);
        if (aktie1prices[i+1] > aktie1prices[i])
        {
            ctx.strokeStyle = '#49FF00';
        }
        else if (aktie1prices[i+1] < aktie1prices[i])
        {
            ctx.strokeStyle = '#FF0000';
        }
        else if (aktie1prices[i+1] == aktie1prices[i])
        {
            ctx.strokeStyle = '#000000';
        }
        ctx.stroke();
        i++;
    }
}

function updateaktienview(listid) {
    drawgraph();
    var preis = Number(document.getElementById("marketview").rows[listid].cells[1].innerHTML);
    document.getElementById("aktienpreis").innerHTML = preis;
}