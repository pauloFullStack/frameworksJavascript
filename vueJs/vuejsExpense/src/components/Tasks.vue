<template>
  <div :key="task.id" v-for="task in tasks">
    <AppTask
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      :task="task"
    />
  </div>
</template>

<script>
import AppTask from "./Task";

export default {
  name: "AppTasks",
  props: {
    tasks: Array,
  },
  components: {
    AppTask,
  },
  emits: ["delete-task", "toggle-reminder"],
};
</script>
