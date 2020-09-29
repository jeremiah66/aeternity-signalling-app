<template>
  <div v-if="shown" class="rounded alert" :class="css">
    <div v-if="css.indexOf('alert-progress') !== -1" class="spinner"></div>
    <div class="alert-msg" v-html="message"></div>
    <a class="dismiss-btn" v-if="css.indexOf('alert-dismissable') !== -1" href="javascript:void(0);" @click="hide" title="Close">&times;</a>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    data() {
      return {
        shown: false,
        message: undefined,
        css: undefined
      }
    },
    methods: {
      show(message, css) {
        this.message = message
        this.css = css
        this.shown = true
      },
      showProgress(message) {
        message = message || 'Loading...'
        this.show(message, 'alert-progress')
      },
      showWarning(message) {
        this.show(message, 'alert-warning alert-dismissable')
      },
      showError(message) {
        this.show(message, 'alert-error alert-dismissable')
      },
      showSuccess(message) {
        this.show(message, 'alert-success alert-dismissable')
      },
      hide() {
        this.message = undefined
        this.css = undefined
        this.shown = false
      }
    },
  }
</script>
