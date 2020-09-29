<template>
  <div id="app">
    <component :is="$root.layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import Layout from './components/Layout.vue'

  export default {
    name: 'App',
    components: {
      Layout,
    },
  }
</script>

<style>
  @font-face {
    font-family: 'Open Sans';
    src: url('../src/assets/fonts/open-sans.ttf');
    font-weight: normal;
    font-style: normal
  }

  @font-face {
    font-family: 'Quicksand';
    src: url('../src/assets/fonts/quicksand.ttf');
    font-weight: normal;
    font-style: normal
  }

  :root {
    --header-height: 40px;
    --padding: 10px;
    --text-color: #000;
    --color-primary: #fbfbfb;
    --color-primary-dark: #eee;
    --color-secondary: #002e4a;
    --color-hint: #999;
    --color-accent: #c8426c;
    --color-transparent: rgba(255, 255, 255, 0.1);
    --color-danger: #ff0000;
    --color-success: #42c662;
    --border-color: #ccc
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box !important;
    outline: none;
    border: none
  }

  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-color)
  }

  a, a:visited {
    text-decoration: none;
    color: var(--text-color)
  }

  a:hover, a:active {
    color: var(--color-accent)
  }

  .btn {
    display: inline-block;
    padding: calc(var(--padding) / 2) calc(var(--padding) * 2);
    background-color: var(--color-primary-dark);
    font-family: 'Quicksand', sans-serif;
    color: var(--color-accent);
    font-size: 14px;
    border: 1px solid var(--border-color);
    cursor: pointer
  }

  .btn.btn-sec {
    background-color: var(--color-secondary);
    border-color: transparent;
    color: #fff
  }

  .btn.btn-txt {
    background-color: transparent;
    font-size: 12px;
    padding: calc(var(--padding) / 2)
  }

  :disabled {
    cursor: not-allowed !important
  }

  .text-upper {
    text-transform: uppercase
  }

  input.string {
    width: 14em;
    height: 2.25em;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    padding: 0 var(--padding);
    font-family: 'Open Sans', sans-serif;
    font-size: 14px
  }

  input:focus {
    border-color: var(--color-accent)
  }

  .input-group {
    padding: var(--padding) 0;
    border-bottom: 1px solid var(--border-color)
  }

  .input-group:last-child {
    border-bottom: none
  }

  .input-group .label {
    font-family: 'Quicksand', sans-serif;
    display: block;
    margin-bottom: calc(var(--padding) / 2)
  }

  .input-group input.string {
    display: block;
    width: 50%
  }

  .heading {
    font-family: 'Quicksand', sans-serif;
    margin: calc(var(--padding) / 2) 0
  }

  .heading.bordered {
    margin: 0;
    padding: var(--padding) calc(var(--padding) / 2);
    border-bottom: 1px solid var(--color-primary-dark)
  }

  .text-left {
    text-align: left
  }

  .text-center {
    text-align: center
  }

  .hint {
    color: var(--color-hint);
    font-size: 13px
  }

  .rounded {
    border-radius: 3px
  }

  .image-circle {
    background-color: var(--color-transparent);
    border-radius: 60px;
    display: inline-block;
    width: 120px;
    height: 120px;
    position: relative
  }

  .image-circle img {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: 50%;
    margin-left: -20px
  }

  .section {
    padding: var(--padding);
    border: 1px solid var(--border-color)
  }

  .spinner {
    width: 30px;
    height: 30px;
    margin: 100px auto;
    border: 4px solid #fff;
    border-top-color: var(--color-secondary);
    border-radius: 100%;
    animation: spin 1.0s infinite linear
  }

  .alert {
    color: #fff;
    padding: 0.5em 1.75em;
    box-shadow: 0 0 1px var(--color-accent);
    background-color: var(--color-secondary);
    min-width: 14em;
    border-radius: 4px;
    position: fixed;
    bottom: 2.85em;
    left: 2.85em;
    width: 35%;
    height: auto;
    z-index: 9999
  }

  .alert.alert-progress {
    text-align: center
  }

  .alert.alert-progress .spinner {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5em 0 0
  }

  .alert.alert-progress .spinner {
    border-top-color: var(--color-accent)
  }

  .alert-progress .alert-msg {
    padding: 0;
    display: inline-block;
  }

  .alert.alert-warning,
  .alert.alert-error {
    border: 1px solid #ff9999;
    background: #ffcccc;
    color: var(--color-secondary)
  }

  .alert.alert-success {
    border: 1px solid #36b555;
    background: #acfdbf;
    color: var(--color-secondary)
  }

  .alert .alert-msg {
    margin-right: 3em;
    word-break: break-all
  }

  .alert.alert-dismissable .dismiss-btn {
    position: absolute;
    right: 1em;
    top: 50%;
    margin-top: -0.7em;
    font-size: 1.75em;
    display: block;
    color: var(--color-primary)
  }

  .alert.alert-warning.alert-dismissable .dismiss-btn,
  .alert.alert-error.alert-dismissable .dismiss-btn {
    color: #ff9999
  }

  .alert.alert-success.alert-dismissable .dismiss-btn {
    color: #36b555
  }

  .subscriptions-list {
    padding: calc(var(--padding) * 2)
  }

  .subs-item {
    padding: var(--padding);
    display: flex;
    align-items: center
  }

  .subs-item-marker {
    flex: 1
  }

  .subs-item-marker span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: var(--color-accent)
  }

  .subs-item-marker span.red {
    background-color: var(--color-danger)
  }

  .subs-item-marker span.green {
    background-color: var(--color-success)
  }

  .subs-item-marker span.accent {
    background-color: var(--color-accent)
  }

  .subs-item-content {
    flex: 9;
    padding-bottom: var(--padding);
    border-bottom: 1px solid var(--border-color)
  }

  .subs-item-content .row-group {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    width: 50%
  }

  .subs-item-content .row-group .label {
    width: 40%;
    min-width: 10em
  }

  .subs-item-content .row-group .value {
    width: 60%
  }

  .subs-actions {
    padding: var(--padding);
    display: flex;
    align-items: center
  }

  .subs-actions-spacer {
    flex: 1
  }

  .subs-actions-content {
    flex: 9;
    padding-bottom: var(--padding)
  }

  @keyframes spin {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(359deg)
    }
  }
</style>
