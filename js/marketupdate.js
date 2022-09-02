function marketupdate() {
    setInterval(priceUpdate, 1000);
}

function priceUpdate() {

    var priceTable = document.getElementById("marketview");
    var currentprice = Number(priceTable.rows[1].cells[1].innerHTML);
    var newprice = 0;

    var change = Math.floor(Math.random() * 10);
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

    priceTable.rows[1].cells[1].classList.remove("priceinc");
    priceTable.rows[1].cells[1].classList.remove("pricedec");

    if (currentprice < newprice)
    {
        priceTable.rows[1].cells[1].innerHTML = newprice;
        priceTable.rows[1].cells[1].classList.add("priceinc");
    }
    if (currentprice > newprice)
    {
        priceTable.rows[1].cells[1].innerHTML = newprice;
        priceTable.rows[1].cells[1].classList.add("pricedec");
    }
}

function changeView_Aktie(aktienname, preis) {
    document.getElementById("market").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("aktienansicht").style.display = "block";

    document.getElementById("aktienname").innerHTML = aktienname;
    document.getElementById("aktienpreis").innerHTML = preis;
}

function insuficentfunds() {
    document.getElementById("account").style.color = "red";
    setTimeout(() => {  document.getElementById("account").style.color = "black"; }, 1000);
}

function aktiekaufen() {
    var aktienpreis = Number(document.getElementById("aktienpreis").innerHTML);
    var kontostand = Number(document.getElementById("account").innerHTML);

    if (kontostand > aktienpreis) {
        kontostand = kontostand - aktienpreis;
        document.getElementById("account").innerHTML = kontostand;
    }

    if (kontostand < aktienpreis) {
        insuficentfunds();
    }

}