var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
        console.log("Welcome to Bamazon!");
        start();
});


function start(){
  inquirer
   .prompt({
     name: "shopOrQuit",
     type: "list",
     message: "Would you like to [Shop] or [Exit]?",
     choices:["SHOP", "EXIT"]
   })
   .then(function(answer){
     if (answer.shopOrQuit === "SHOP"){
       chooseProduct();
     }
     else{
       connection.end();
     }
   });
}

function chooseProduct(){
  displayProduct();
  connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    inquirer
     .prompt([
       {
         name: "choice",
         type: "rawlist",
         choices: function(){
           var choicesArray=[];
           for (i = 0; i< results.length;i++){
             choicesArray.push(results[i].product_name);
           }
           return choicesArray;
         },
         message: "Please select the item you would like to buy."
       },
       {
         name: "quantity",
         type: "input",
         message: "How many of this item would you like to buy?"
       }
     ])
     .then(function(answer){
       var chosenProduct;
       for (i=0;i<results.length;i++){
         if (results[i].product_name === answer.choice){
           chosenProduct = results[i];
         }
       }

       var userQuantity = parseInt(answer.quantity);

       if (chosenProduct.stock_quantity > userQuantity){
         var newQuantity = chosenProduct.stock_quantity - userQuantity;
         connection.query(
           "UPDATE products SET ? WHERE ?",
           [
             {
               stock_quantity: newQuantity
             },
             {
               item_id: chosenProduct.item_id
             }
           ],
           function(error){
             if (error) throw err;
             console.log("Purchase Successful!");
             start();
           }
         );
       }
       else {
         console.log("Sorry, we do not have that much quantity");
         start();
       }
     })
  })
}

function displayProduct(){
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res){
    if (err) throw err;
    var table = new Table({
      head: ["ID", "Product", "Price", "Stock"]
      , colWidths: [5, 50, 10, 10]
    });
    var idArray = [];
    for (i=0;i<res.length;i++){
      table.push(
        [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
      );
      idArray.push(res[i].id);
    }
    console.log(table.toString());
  })
}