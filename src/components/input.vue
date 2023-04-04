<template>
  <div>
    <input
      :class="['w-full text-bold', isInvalid ? 'is-invalid' : '']"
      @keyup="keyup($event)"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :disabled="disable"
      @input="trigger($event)"
      @focus="focus"
      :type="type"
      :id="id"
      class="rounded"
    />
    <p class="text-left text-xs text-error text-red-400" v-if="isInvalid">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    disable: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    type: {
      type: String,
      default: 'text'
    },
    isInvalid: {
      type: Boolean || String
    },
    errorMessage: {
      type: String
    },
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    keyup() {
      this.$emit('keyup')
    },
    trigger(e) {
      this.$emit('input', e.target.value)
      this.$emit('type', e.target.value)
    },
    focus() {}
  }
}
</script>
<style scoped lang="css">
input {
  height: 50px;
  border-width: 1px;
  font-size: 14px;
  border: 1px solid #c7c7c7;
  color: #a6a6a6;
  font-family: 'Avenir';
  line-height: 1.3;
  padding: 1rem;
}
.is-invalid {
  border: 1px solid red;
}
</style>
