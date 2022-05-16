<template>
  <div
    class="form_element"
    :class="{ active: active }"
  >
    <input
      @focus="() => { active = true }"
      @blur="() => { active = false }"
      v-model="inputText"
      :placeholder="placeholder"
      :name="id"
      :id="id"
      :type="type"
      @input="$emit('customInput', $event.target.value, idx)"
      autocomplete="off"
      :class="className"
      :value="'KL'"
    >
    <span class="placeholder">
      {{ placeholder }}
    </span>
  </div>
</template>

<script>

  export default {
    name: "index",
    props: {
      type: {
        type: String,
        default: 'text'
      },
      defaultValue: {
        type: String || Number,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      dropdown: {
        type: Boolean,
        default: false
      },
      current: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      },
      idx: {
        type: Number,
        default: 0
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        active: false,
        inputText: this.defaultValue
      }
    },
    watch: {
      current: {
        handler(newVal) {
          this.inputText = newVal
        },
        deep:true
      },
      inputText: {
        handler(newVal) {
          this.$emit('customValue', newVal, this.id)
        }, deep: true
      }
    },
    created() {
      this.inputText = this.defaultValue
    }
  }
</script>

<style scoped lang="sass">
  input:not([type=submit])
    padding-top: 0
  input
    &::placeholder
      color: #757575

  .placeholder
    text-align: center
</style>
