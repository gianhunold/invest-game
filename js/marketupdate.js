var graph;
const anteile = [0,0,0,0,0,0] /*First Place in Array not used*/

const aktienmaster = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]

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

        aktienmaster[listid][0] = aktienmaster[listid][1];
        aktienmaster[listid][1] = aktienmaster[listid][2];
        aktienmaster[listid][2] = aktienmaster[listid][3];
        aktienmaster[listid][3] = aktienmaster[listid][4];
        aktienmaster[listid][4] = aktienmaster[listid][5];
        aktienmaster[listid][5] = aktienmaster[listid][6];
        aktienmaster[listid][6] = aktienmaster[listid][7];
        aktienmaster[listid][7] = aktienmaster[listid][8];
        aktienmaster[listid][8] = aktienmaster[listid][9]; 
        aktienmaster[listid][9] = newprice;
}

function changeView_Aktie(listid) {
    document.getElementById("market").style.display = "none";
    document.getElementById("aktienansicht").style.display = "block";
    document.getElementById("orderhistory").style.display = "block";

    /*Add functional Elements*/
    document.getElementById("aktienansicht").innerHTML += "<h2 id='aktienname'></h2>";
    document.getElementById("aktienansicht").innerHTML += "<canvas id='aktiengraph'></canvas>"
    document.getElementById("aktienansicht").innerHTML += "<button id='back' onclick='exitaktie(" + listid + ")'>Zurück</button>";
    document.getElementById("aktienansicht").innerHTML += "<div id='aktienorder'></div>";
    /*Add Elements for ordering*/
    document.getElementById("aktienorder").innerHTML += "<p id='createorder'>Order Erstellen</p>";
    document.getElementById("aktienorder").innerHTML += "<input type='radio' name='operation' value='buy' checked>Kaufen</input>";
    document.getElementById("aktienorder").innerHTML += "<input type='radio' name='operation' value='sell'>Verkaufen</input>";
    document.getElementById("aktienorder").innerHTML += "<input type='number' name='count' value='1'></input>";
    document.getElementById("aktienorder").innerHTML += "<input type='button' value='Place Order' onclick='aktienorder(" + listid + ")'></input>";
    document.getElementById("aktienorder").innerHTML += "<p id='aktienpreis'></p>";

    var aktienname = document.getElementById("marketview").rows[listid].cells[0].innerHTML;
    var preis = Number(document.getElementById("marketview").rows[listid].cells[1].innerHTML);

    document.getElementById("aktienname").innerHTML = aktienname;
    document.getElementById("aktienpreis").innerHTML = preis;

    graph = setInterval(updateaktienview, 1000, listid);
}

function insuficentfunds() {
    document.getElementById("account").style.color = "red";
    setTimeout(() => {  document.getElementById("account").style.color = "black"; }, 1000);
}

function aktienorder(listid)
{
    var operation = document.querySelector('input[name="operation"]:checked').value;
    var ammount = document.querySelector('input[name="count"]').value;
    var aktiengrundpreis = Number(document.getElementById("aktienpreis").innerHTML);
    var kontostand = Number(document.getElementById("account").innerHTML);

    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    var aktienpreis = aktiengrundpreis * ammount;

    if (operation == "buy")
    {   
        if (kontostand >= aktienpreis) {
            kontostand = kontostand - aktienpreis;
            document.getElementById("account").innerHTML = kontostand;
            anteile[listid] = anteile[listid] + Number(ammount);
            document.getElementById("orderhistory").innerHTML ="<p>" + datetime + " Aktie1 gekauft " + ammount + " x Mal zu " + aktiengrundpreis + "</p>" + document.getElementById("orderhistory").innerHTML;
        }
    
        if (kontostand < aktienpreis) {
            insuficentfunds();
        } 
    } else if (operation == "sell")
    {    
        if (anteile[listid] >= ammount) 
        {
            kontostand = kontostand + aktienpreis;
            document.getElementById("account").innerHTML = kontostand;
            anteile[listid] = anteile[listid] - Number(ammount);
            document.getElementById("orderhistory").innerHTML ="<p>" + datetime + " Aktie1 verkauft " + ammount + " x Mal zu " + aktiengrundpreis + "</p>" + document.getElementById("orderhistory").innerHTML;
        }
    }    

}

function exitaktie(listid) {

    document.getElementById("market").style.display = "block";
    document.getElementById("aktienansicht").style.display = "none";
    document.getElementById("orderhistory").style.display = "none";

    document.getElementById("aktienansicht").innerHTML = "";

    document.getElementById("marketview").rows[listid].cells[2].innerHTML = anteile[listid];

    clearInterval(graph);
}

function drawgraph(listid) {

    var canvas = document.getElementById("aktiengraph");
    var ctx = canvas.getContext("2d");

    // get hightest Value
    const highest = Math.max(...aktienmaster[listid]);
    // get lowest Value
    const lowest = Math.min(...aktienmaster[listid]);

    var diff = highest -lowest;

    ctx.clearRect(0, 0, 250, 150);
    var i = 0;
    while (i < 10)
    {
        ctx.beginPath();
        ctx.moveTo(i * 25, 100 - ((aktienmaster[listid][i] - lowest)/diff * 10));
        ctx.lineTo((i+1) * 25, 100 - ((aktienmaster[listid][i+1] - lowest)/diff * 10));
        if (aktienmaster[listid][i+1] > aktienmaster[listid][i])
        {
            ctx.strokeStyle = '#49FF00';
        }
        else if (aktienmaster[listid][i+1] < aktienmaster[listid][i])
        {
            ctx.strokeStyle = '#FF0000';
        }
        else if (aktienmaster[listid][i+1] == aktienmaster[listid][i])
        {
            ctx.strokeStyle = '#000000';
        }
        ctx.stroke();
        i++;
    }
}

function updateaktienview(listid) {
    drawgraph(listid);
    console.log("graph");
    var preis = Number(document.getElementById("marketview").rows[listid].cells[1].innerHTML);
    document.getElementById("aktienpreis").innerHTML = preis;
}