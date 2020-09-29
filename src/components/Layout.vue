<template>
  <div id="global-container">
    <header class="header top">
      <div class="hint text-left">v1.0</div>
    </header>
    <aside>
      <div class="header heading" id="app-brand">
        <div id="logo"><img src="/images/logo.png"></div>
        <div id="app-name">SignalingApp</div>
      </div>
      <ul id="side-nav">
        <li>
          <router-link to="/" :class="{'active': $route.path === '/'}">Scan</router-link>
        </li>
        <li>
          <router-link to="/subscriptions" :class="{'active': $route.path === '/subscriptions'}">
            Subscriptions
          </router-link>
        </li>
      </ul>
    </aside>
    <main>
      <slot/>
    </main>
    <component :is="modal.component" :data="modal.data" :context="modal.context"/>
    <Alert ref="alert"/>
  </div>
</template>

<script>
  import Alert from './Alert.vue'

  export default {
    name: 'Layout',
    components: {
      Alert
    },
    data() {
      return {
        modal: {
          component: undefined,
          data: undefined,
          context: undefined
        },
      }
    },
    methods: {
      showModal(component, data, context) {
        let self = this
        self.modal.component = component
        self.modal.data = data
        self.modal.context = context
      },
      hideModal() {
        this.$root.$emit('hide-modal')
      },
    },
    mounted() {
      let self = this
      self.$root.$on('hide-modal', () => {
        self.modal.component = undefined
        self.modal.data = undefined
        self.modal.context = undefined
      })
    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    padding: var(--padding);
    border-bottom: 1px solid var(--border-color)
  }

  .header.top {
    background-color: var(--color-primary-dark);
    padding: 0 var(--padding);
    position: fixed;
    width: 100%;
    height: var(--header-height);
    line-height: var(--header-height);
    z-index: 999
  }

  #app-brand {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center
  }

  #logo {
    width: 50px;
    margin-right: var(--padding)
  }

  #logo img {
    width: 100%
  }

  aside {
    position: fixed;
    top: var(--header-height);
    width: 25%;
    border-right: 1px solid var(--border-color);
    background-color: var(--color-primary-dark);
    min-height: 100vh
  }

  main {
    position: absolute;
    top: var(--header-height);
    left: 25%;
    width: 75%;
    padding: var(--padding);
    background-color: var(--color-primary);
    min-height: calc(100% - var(--header-height))
  }

  #side-nav {
    list-style: none;
    padding: var(--padding)
  }

  #side-nav a {
    display: block;
    padding: var(--padding);
    border-bottom: 1px solid var(--border-color)
  }

  #side-nav a.active {
    color: var(--color-accent)
  }
</style>
