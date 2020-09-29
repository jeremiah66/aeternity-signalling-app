<template>
  <div id="modal" :style="{ top: pageYOffset + 'px' }" @click.self="hide">
    <div id="modal-content">
      <div id="modal-header">
        <span id="modal-title" v-html="title"></span>
        <a href="javascript:void(0);" class="dismiss-btn" @click="hide" title="Close">&times;</a>
      </div>
      <div id="modal-main">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: ['title'],
    data() {
      return {
        pageYOffset: window.pageYOffset
      }
    },
    methods: {
      hide() {
        this.$root.$emit('hide-modal')
      }
    },
  }
</script>

<style scoped>
  #modal {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000
  }

  #modal-content {
    position: relative;
    width: 70%;
    margin: 5em auto 2.5em auto;
    min-height: 100%;
    background: #fff;
    box-shadow: 0 0 0.75em #666;
    border-radius: 10px;
    overflow: hidden
  }

  #modal-header {
    position: relative;
    padding: 0.75em;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--color-primary-dark);
    text-transform: uppercase;
    font-family: 'Quicksand', sans-serif
  }

  #modal-title {
    font-size: 120%
  }

  .dismiss-btn {
    position: absolute;
    right: 0.35em;
    top: 50%;
    font-size: 36px;
    width: 0.55em;
    height: 0.5em;
    margin-top: -0.25em;
    line-height: 0.45em;
    color: var(--color-accent)
  }

  #modal-main {
    padding: 0.75em
  }
</style>
