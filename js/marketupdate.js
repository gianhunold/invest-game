var graph;
var ordernmr = 0;
const anteile = [0,0,0,0,0,0] /*First Place in Array not used*/

const aktienmaster = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]

function marketupdate() {
    setInterval(priceUpdate, 1000, 1);
    setInterval(priceUpdate, 1000, 2);
    setInterval(priceUpdate, 1000, 3);
    setInterval(priceUpdate, 1000, 4);
    setInterval(priceUpdate, 1000, 5);
}

function checkorders() {
    var orderstable = document.getElementById("orders");
    var priceTable = document.getElementById("marketview");
    var geld = Number(document.getElementById("geld").innerHTML);

    var aktienpreise = [0,0,0,0,0,0];

    aktienpreise[1] = priceTable.rows[1].cells[1].innerHTML;
    aktienpreise[2] = priceTable.rows[2].cells[1].innerHTML;
    aktienpreise[3] = priceTable.rows[3].cells[1].innerHTML;
    aktienpreise[4] = priceTable.rows[4].cells[1].innerHTML;
    aktienpreise[5] = priceTable.rows[5].cells[1].innerHTML;

    //Fullfill Buy Orders
    var i = 1;

    while (i <= ordernmr)
    {
        var option = orderstable.rows[i].cells[0].innerHTML;
        if (option == "B")
        {
            var aktie = orderstable.rows[i].cells[1].innerHTML;
            var preis = orderstable.rows[i].cells[3].innerHTML;
            var aktienammount = orderstable.rows[i].cells[2].innerHTML;

            if (aktienpreise[aktie] <= preis)
            {
                orderstable.deleteRow(i);
                geld = geld - (preis * aktienammount);
                var newtotal = Number(anteile[i]) + Number(aktienammount);
                alert(newtotal);
                anteile[i] = newtotal;
                document.getElementById("geld").innerHTML = geld;
                ordernmr = ordernmr - 1;

            }

        }
        i = i+1;
    }
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

        checkorders();
}

function changeView_Aktie(listid) {

    var aktienname = document.getElementById("marketview").rows[listid].cells[0].innerHTML;
    var preis = Number(document.getElementById("marketview").rows[listid].cells[1].innerHTML);

    document.getElementById("market").style.display = "none";
    //document.getElementById("news").style.display = "none";
    document.getElementById("aktienansicht").style.display = "block";

    /*Add functional Elements*/
    document.getElementById("aktienansicht").innerHTML += "<h2 id='aktienname'></h2>";
    document.getElementById("aktienansicht").innerHTML += "<canvas id='aktiengraph'></canvas>"
    document.getElementById("aktienansicht").innerHTML += "<button id='back' onclick='exitaktie(" + listid + ")'>Zurück</button>";
    document.getElementById("aktienansicht").innerHTML += "<div id='aktienorder'></div>";

    document.getElementById("aktienorder").innerHTML += "<p id='createorder'>Order Erstellen</p>";
    document.getElementById("aktienorder").innerHTML += "<input type='radio' name='operation' value='buy' checked>Kaufen</input>";
    document.getElementById("aktienorder").innerHTML += "<input type='radio' name='operation' value='sell'>Verkaufen</input>";
    document.getElementById("aktienorder").innerHTML += "<label>Anzahl</label>";
    document.getElementById("aktienorder").innerHTML += "<input type='number' name='count' value='1'></input>";
    document.getElementById("aktienorder").innerHTML += "<label>Max Preis</label>";
    document.getElementById("aktienorder").innerHTML += "<input type='number' name='max-price' value='" + preis + "'></input>";
    document.getElementById("aktienorder").innerHTML += "<input type='button' value='Place Order' onclick='aktienorder(" + listid + ")'></input>";
    document.getElementById("aktienorder").innerHTML += "<p id='aktienpreis'></p>";



    document.getElementById("aktienname").innerHTML = aktienname;
    document.getElementById("aktienpreis").innerHTML = preis;

    graph = setInterval(updateaktienview, 1000, listid);
}

function insuficentfunds() {
    document.getElementById("finanzrahmen").style.color = "red";
    setTimeout(() => {  document.getElementById("finanzrahmen").style.color = "black"; }, 1000);
}

function aktienorder(listid)
{
    ordernmr++;
    var operation = document.querySelector('input[name="operation"]:checked').value;
    var ammount = document.querySelector('input[name="count"]').value;
    var preis = document.querySelector('input[name="max-price"]').value;
    var kontostand = Number(document.getElementById("finanzrahmen").innerHTML);
    

    var ordertable = document.getElementById("orders");
    var row = ordertable.insertRow(ordernmr);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    var aktienpreis = preis * ammount;

    if (operation == "buy")
    {   
        if (kontostand >= aktienpreis) {
            kontostand = kontostand - aktienpreis;
            document.getElementById("finanzrahmen").innerHTML = kontostand;

            cell1.innerHTML = "B";
            cell2.innerHTML = listid;
            cell3.innerHTML = ammount;
            cell4.innerHTML = preis;
        }
    
        if (kontostand < aktienpreis) {
            insuficentfunds();
        } 
    } else if (operation == "sell")
    {    
        if (anteile[listid] >= ammount) 
        {
            cell1.innerHTML = "S";
            cell2.innerHTML = listid;
            cell3.innerHTML = ammount;
            cell4.innerHTML = preis;
        }
    }    

}

function exitaktie(listid) {

    document.getElementById("market").style.display = "block";
    document.getElementById("aktienansicht").style.display = "none";

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