function priceUpdate() {

    var priceTable = document.getElementById("marketview");
    var currentprice = priceTable.rows[1].cells[1].innerHTML;
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
    
    priceTable.rows[1].cells[1].classList.remove("priceinc");
    priceTable.rows[1].cells[1].classList.remove("pricedec");

    if (currentprice << newprice)
    {
        priceTable.rows[1].cells[1].innerHTML = newprice;
        priceTable.rows[1].cells[1].classList.add("priceinc");
    }
    if (currentprice >> newprice)
    {
        priceTable.rows[1].cells[1].innerHTML = newprice;
        priceTable.rows[1].cells[1].classList.add("pricedec");
    }
}