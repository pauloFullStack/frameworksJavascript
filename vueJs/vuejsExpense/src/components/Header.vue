<template>
  <header>
    <h3>{{ title }}</h3>
    <AppButton
      v-show="homePage"
      :text="showAddTask ? 'Fechar' : 'Add Tarefa'"
      :color="showAddTask ? 'red' : 'green'"
      @toggle-add-task="$emit('toggle-add-task')"
    />
  </header>
</template>

<script>
import AppButton from "./Button";

export default {
  name: "AppHeader",
  props: {
    title: {
      type: String,
      default: "Titulo",
    },
    showAddTask: Boolean,
  },
  components: {
    AppButton,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
