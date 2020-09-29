<template>
  <div id="subs-container" class="text-center">
    <div class="subscriptions-list">
      <div class="subs-item text-left" v-for="(s, i) in subscriptions" :key="i.toString()">
        <div class="subs-item-marker text-center">
          <span class="green"></span>
        </div>
        <div class="subs-item-content text-left">
          <div class="heading">{{ s.app_name }}</div>
          <div class="hint row-group"><span class="label">Version Command</span><span class="value">{{ s.version_command }}</span></div>
          <div class="hint row-group"><span class="label">Latest Release API</span><span class="value">{{ s.latest_release_github_api }}</span></div>
          <br>
          <button type="button" class="btn btn-txt" @click="showModal('delete', s)">unsubscribe</button>
        </div>
      </div>
      <div class="subs-actions text-left">
        <div class="subs-actions-spacer"></div>
        <div class="subs-actions-content">
          <button class="btn" type="button" @click="showModal('add', {})">Add New</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AddSubscription from './AddSubscription.vue'
  import Unsubscribe from './Unsubscribe.vue'
  import axios from 'axios'

  export default {
    name: 'Subscriptions',
    data() {
      return {
        subscriptions: [],
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      load() {
        let self = this, vAlert = self.$parent.$refs.alert
        vAlert.showProgress()

        axios.get('http://localhost:1440/subscriptions')
          .then(response => {
            vAlert.hide()
            self.subscriptions = response.data

            self.$emit('subs-loaded', 200)
          })
          .catch(error => {
            vAlert.showError('Something went wrong.')
            self.$emit('subs-loaded', 503)
          })
      },
      showModal(component, data) {
        switch (component) {
          case 'add':
            this.$parent.showModal(AddSubscription, data, this)
            break
          case 'delete':
            this.$parent.showModal(Unsubscribe, data, this)
            break
        }
      }
    }
  }
</script>

<style scoped>
  #subs-container {
    padding: var(--padding)
  }

  .subs-item-content .row-group {
    width: 60%;
    min-width: 300px
  }
</style>
