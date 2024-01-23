Vue.createApp({
  methods: {
    toggleLight() {
      const body = document.querySelector(".body");
      const btn = document.querySelector(".toggle-btn");
      if (body.className === "body") {
        body.className += " dark";
        btn.className += " lightenedBorder";
      } else if (body.className === "body dark") {
        body.className = "body light";
        btn.className = "toggle-btn";
      } else {
        body.className = "body dark";
        btn.className += " lightenedBorder";
      }
    },
  },
}).mount("#app");
