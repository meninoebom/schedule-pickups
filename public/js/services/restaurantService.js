App.factory('restaurantService', function(  ){

    var restaurants =  {
      "r1": {
        "name": "Chicken Run",
        "menuItems": {
          1: {
            "name": "Chicken Sandwich",
            "price": "5.00"
          },
          2: {
            "name": "Chicken Salad",
            "price": "5.00"
          },
          3: {
            "name": "Waffle Fries",
            "price": "5.00"
          },
          4: {
            "name": "Lemonade",
            "price": "5.00"
          }
        }
      },
      "r2": {
        "name": "Burger Queen",
        "menuItems": {
          1: {
            "name": "Classic Burger",
            "price": "5.00"
          },
          2: {
            "name": "Bacon Burger",
            "price": "5.00"
          },
          3: {
            "name": "Double Pattie Burger",
            "price": "5.00"
          },
          4: {
            "name": "Veggie Burger",
            "price": "5.00"
          }
        }
      },
      "r3": {
        "name": "The Sub Station",
        "menuItems": {
          1: {
            "name": "Turkey Clue",
            "price": "5.00"
          },
          2: {
            "name": "Italian Sub",
            "price": "5.00"
          },
          3: {
            "name": "Veggie Classic",
            "price": "5.00"
          },
          4: {
            "name": "Roast Beast",
            "price": "5.00"
          }
        }
      },
      "r4": {
        "name": "Pizza House",
        "menuItems": {
          1: {
            "name": "Veggie Lovers Pizza",
            "price": "5.00"
          },
          2: {
            "name": "Pepporoni Pizza",
            "price": "5.00"
          },
          3: {
            "name": "Cheese Lovers Pizza",
            "price": "5.00"
          },
          4: {
            "name": "Pineapple Pizza",
            "price": "5.00"
          }
        }
      }
    }

    return {
      getRestaurant: function(restaurantId) {
        return restaurants[restaurantId];
      }
    }

});