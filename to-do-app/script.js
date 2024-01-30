Vue.createApp({
  data() {
    return {
      todos: [],
      descriptionValue: "",
      deleteInput: "",
      url: "http://localhost:4730/todos/",
      filterSelected: "all",
    };
  },
  computed: {
    hasFiveOrMoreChars() {
      return this.descriptionValue.length >= 5;
    },
    filteredTodos() {
      switch (true) {
        case this.filterSelected === "done":
          return this.doneToDos;
        case this.filterSelected === "open":
          return this.openToDos;
        default:
          return this.todos;
      }
    },
    doneToDos() {
      return Vue.toRaw(this.todos).filter((todo) => todo.done === true);
    },
    openToDos() {
      return Vue.toRaw(this.todos).filter((todo) => todo.done === false);
    },
  },
  methods: {
    async createToDo(item) {
      const response = await fetch(this.url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: item,
          done: false,
        }),
      });
      const data = await response.json();
      this.todos.push({
        description: data.description,
        id: data.id,
        done: false,
      });
      this.descriptionValue = "";
    },
    async readToDos() {
      const response = await fetch(this.url);
      const data = await response.json();
      this.todos.push(...data);
    },
    async updateToDo(id, update) {
      await fetch(this.url + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(update),
      });
    },
    async deleteToDo(id) {
      await fetch(this.url + id, {
        method: "DELETE",
      });
    },
    async deleteToDoByName(description) {
      const id = this.getToDoIdByDescription(description);
      if (id <= 0) {
        alert("To-Do ist nicht vorhanden!");
      } else {
        await fetch(this.url + id, {
          method: "DELETE",
        });
        this.todos.splice(
          Vue.toRaw(this.todos.map((todo) => todo.id).indexOf(id)),
          1
        );
      }
      this.deleteInput = "";
    },
    getToDoIdByDescription(description) {
      let id = 0;
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].description === description) {
          id = this.todos[i].id;
        }
      }
      return id;
    },
    deleteAllToDos() {
      this.todos.forEach((todo) => {
        if (todo.done === true) {
          this.deleteToDo(todo.id);
        }
      });
      this.todos = Vue.toRaw(this.todos).filter((todo) => todo.done === false);
    },
  },
  async created() {
    await this.readToDos();
  },
}).mount("#app");
