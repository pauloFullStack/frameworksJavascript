<template>
  <button
    @click="$emit('toggle-add-task')"
    :style="{ background: color }"
    class="btn"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    text: String,
    color: String,
  },
};
</script>
