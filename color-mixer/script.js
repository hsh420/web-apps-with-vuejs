Vue.createApp({
  data() {
    return {
      red: 50,
      green: 130,
      blue: 255,
    };
  },
  computed: {
    displayRgbCode() {
      return this.red + " " + this.green + " " + this.blue;
    },
  },
  methods: {
    changeColor() {
      const apiRgb = fetch("https://dummy-apis.netlify.app/api/color");
      apiRgb
        .then((response) => {
          if (response.ok === true) {
            return response.json();
          }
        })
        .then((data) => {
          this.red = data.rgb.r;
          this.green = data.rgb.g;
          this.blue = data.rgb.b;
        });
    },
  },
}).mount("#app");
