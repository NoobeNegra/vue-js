var divProduct = new Vue({
    el: '#divProduct',
    data: {
        product: 'Socks',
        description: 'This socks will not suck',
        selectedColor: 0,
        details: ["100% coton", "You will not sweat", "Excellent for ski"],
        sizes: ["30-34", "35-37", "38-41", "42-45"],
        colors: [{
            name: "#405184",
            image: "./img/vmSocks-blue-onWhite.jpg",
            alt: 'A nice pair of blue socks',
            stock: 20
        }, {
            name: "#199E4F",
            image: "./img/vmSocks-green-onWhite.jpg",
            alt: 'A nice pair of green socks',
            stock: 10
        }
        ],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
            this.colors[this.selectedColor].stock--;
        },
        removeFromCart: function () {
            if (this.cart > 0) {
                this.cart -= 1;
                this.colors[this.selectedColor].stock++;
            }
        },
        changeImage: function (index) {
            this.selectedColor = index;
        }
    },
    computed: {
        image() { return this.colors[this.selectedColor].image },
        imageDescription() { return this.colors[this.selectedColor].alt },
        inventory() { return this.colors[this.selectedColor].stock }
    }
});