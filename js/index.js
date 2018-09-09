var app = new Vue({
    el : '#app',
    data: {
       products : [],
       cart : []
    },
    created(){
        var _this = this 
        
        //products
        fetch('./data/products.json')
             .then(function(response){
                 return response.json();
             })
             .then(function(json){
                  _this.products = json.products
             })
        
        // cart
        fetch('./data/cart.json')
             .then(function(response){
                 return response.json();
             })
             .then(function(json){
                  _this.cart = json.cart
             })
        
    },
    computed : {
        total_quantity(){
            return this.cart.reduce(function(sum,product){
                return sum + product.quantity;
            },0)
        },
        total_prices(){
            return this.cart.reduce(function(sum,product){
                return sum + (product.quantity * product.price );
            },0)
        } 
    },
    methods : {
        add_one(index){
            this.cart[index].quantity += 1; 
        },
        remove_one(index){
            if(this.cart[index].quantity > 0){
                this.cart[index].quantity -= 1; 
            }
        },
        delete_item(index){
            this.cart.splice(index,1)
        },
        add_to_cart(product,index){
            var cart_item = this.cart.find(obj => {
                return obj.id === product.id;
            })
            if(typeof cart_item == "undefined"){
                //console.log('add a new product to the cart')
                this.cart.push({
                  "id": product.id,
                  "title": product.title,
                  "view": product.view,
                  "quantity" : 1,
                  "price" : product.price
                });
            }else{
                //console.log('update current product count')
                cart_item.quantity++; 
            }
        }
        
    }
    
});