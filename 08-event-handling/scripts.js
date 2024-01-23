Vue.createApp({
  data() {
    return {
      x: 12,
      y: 4,
      fruitBasket: [
        "🍏 Apple",
        "🍌 Banana",
        "🍉 Melon",
        "🫐 Blueberry",
        "🍓 Strawberry",
        "🍍 Ananas",
        "🥭 Mango",
      ],
    };
  },
  methods: {
    displayCoordinates(event) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
    removeFruit(fruit) {
      return this.fruitBasket.splice(this.fruitBasket.indexOf(fruit), 1);
    },
  },
}).mount("#app");
