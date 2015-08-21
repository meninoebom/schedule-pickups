point of sale system
===

> Arun is a student at UC Berkeley. Arun eats his lunch at the campus cafeteria daily. He has classes in the morning from

> Everyday, Arun has to choose between rushing through/missing his lunch or missing the class. If there is a mechanism which will let him pre-order his food and allow scheduled pickups it would make his and his fellow students life a lot smoother.

> UC Berkeley's cafeteria has made the cafeteria menu available through an API.

> The cafeteria has 4 stores, each with a defined menu for the day. Each menu has 4 items to choose from. 
You can hard code any information that you want or use any form of storage that you are comfortable with. For e.g. it can be browser's local  storage or services like firebase. 
Build a web app which will let Arun browse through the menu and place an order for the food and schedule a pick up time.
Build a point of sale(POS) system for the cafeteria cashier which will list the time of pickup, student's name, food ordered and a mechanism to indicate whether the order has been picked up or missed. The POS runs on an iPad's Safari web browser.

# Getting Started

Install tools we need
```sh
$ brew install node
$ brew install postgres
$ brew install heroku-toolbelt
$ npm i -g bower nodemon // nodemon will restart the server whenever you make server side changes
```

Set up postgres locally and start the server
```
$ cd schedule-pickings
$ npm i && bower install
$ nodemon server
```

Required packages are defined in **package.json** and **bower.json**

in your web browser go to:
    http://localhost:3000/

## Customer Views

The customer path starts at http://localhost:3000/

## POS System Views

The POS path starts at http://localhost:3000/#/pos/

## Deploy to heroku

```sh
$ heroku create schedule-pickups
// add and commit changes
$ git push heroku master
$ heroku addons:add heroku-postgresql:dev

```