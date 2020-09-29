<template>
  <div id="home-container" class="text-center">
    <div class="subscriptions-list">
      <div class="subs-item text-left" v-for="(s, i) in subscriptions" :key="i.toString()">
        <div class="subs-item-marker text-center">
          <span :class="{'red': s.current_version !== s.latest_version, 'green': s.current_version === s.latest_version}"></span>
        </div>
        <div class="subs-item-content text-left">
          <div class="heading">{{ s.app_name }}</div>
          <div class="hint row-group"><span class="label">Current Version</span><span class="value">{{ s.current_version }}</span></div>
          <div class="hint row-group"><span class="label">Latest Version</span><span class="value">{{ s.latest_version }}</span></div>
        </div>
      </div>
      <div class="subs-actions text-left" v-show="! scanning">
        <div class="subs-actions-spacer"></div>
        <div class="subs-actions-content">
          <button class="btn" type="button" @click="scan">Scan for Updates</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => {
      return {
        scanning: false,
        subscriptions: [],
      }
    },
    mounted() {
      this.scan()
    },
    methods: {
      scan() {
        let self = this, vAlert = self.$parent.$refs.alert
        vAlert.showProgress('Scanning')
        self.scanning = true

        let socket = new WebSocket('ws://localhost:1445/')

        socket.onmessage = event => {
          self.subscriptions = JSON.parse(event.data)
          self.scanning = false
          vAlert.hide()
        }

        socket.onerror = event => {
          self.scanning = false
          vAlert.showError('Something went wrong.')
        }
      }
    }
  }
</script>

<style scoped>
  #home-container {
    padding: var(--padding)
  }
</style>
