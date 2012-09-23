////Model defined from here
//product class
function Product(name,price,desc,quantity){
    this.name = name;
    this.basePrice = price;
    this.crtPrice = price;
    this.desc = desc;
    this.quantity = quantity;
    this.title = "There are " + this.quantity + " " + this.name + " left in stock. "
}
//discount method for products
Product.prototype.discount = function(pcntOff){
    this.crtPrice = this.basePrice*(1-pcntOff);
}


//stock class
function Stock(products){
    this.products = products;
}
//display method of 
Stock.prototype.display = function(){
}
//add new method for stock adding products
Stock.prototype.addProduct = function(newP){
    this.products.push(newP);
    //set the id for the product in the array for deletion
    newP.id = this.products.indexOf(newP);
}
//delete product from stock
Stock.prototype.delProduct = function(delId){
    this.products.splice(delId,1);
}
////Model define end

////view helper method from here
//helper method to modify DOM element
function newDiv(html){
        var newdiv = document.createElement("li");
        return newdiv.innerHTML = html;
}

function updateTotal(){
    var total = document.getElementById("total") ;
    return total.innerHTML = "Current " + gStock.products.length.toString() + " type of products are in stock" ;
}
////view helper method end

////controller start from here
//initialize an empty stock object as global variable
var gStock = new Stock([]);
//function to run on document load
window.onload = function(){
    updateTotal();
    
    //alert("new function page");
    document.getElementById("newpBtn").addEventListener('click',function(e){
        e.preventDefault();
        //alert("hey");
        //get all form elements for later processing
        var namefield = document.getElementById("name");
        var pricefield = document.getElementById("price");
        var descfield = document.getElementById("desc");
        var quantityfield = document.getElementById("quantity");
        //get form values
        var name = namefield.value;
        var price = pricefield.value;
        var desc = descfield.value;
        var quantity = quantityfield.value;
        //alert(name + price + desc + quantity);
        
        //create a new product and add it to the current stock
        var newP = new Product(name,price,desc,quantity);
        gStock.addProduct(newP); //newP.id is generate from this line
        //alert(gStock.products.length);
        
        //get the location where new product goes
        var parent = document.getElementById("display")
        var newdiv = document.createElement("li");
        newdiv.innerHTML = newP.title;
        //add a delete button for each product
        var delbtn = document.createElement("a");
        delbtn.setAttribute('href', 'Javascript:void(0)');
        delbtn.setAttribute('id', newP.id);
        delbtn.innerHTML = "x";
        delbtn.addEventListener('click',function(){
            gStock.delProduct(newP.id);
            alert("beforedel");
            updateTotal();
            alert(gStock.products.length);
            alert("afterdel");
            newdiv.parentNode.removeChild(newdiv);
            //alert(gStock.products.length);
            },false);
        //attach the delete function to the delete button
        newdiv.appendChild(delbtn);
        
        //reinitialize form after adding new entry
        namefield.value="";
        namefield.focus();
        pricefield.value="";
        descfield.value="";
        quantityfield.value="";
        
        //attach new product information to the display div
        parent.appendChild(newdiv);
        //total.innerHTML = "Current " + gStock.products.length.toString() + " type of products are in stock" ;
        updateTotal();
        console.log(gStock);
        },false);
}
























