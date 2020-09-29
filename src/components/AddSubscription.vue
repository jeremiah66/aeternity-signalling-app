<template>
  <Modal title="Add Subscription">
    <div class="section">
      <div class="input-group">
        <span class="label">App Name*</span>
        <input type="text" class="string" v-model.lazy.trim="appName" placeholder="eg. Node.js" maxlength="30">
      </div>
      <div class="input-group">
        <span class="label">Version Command*</span>
        <input type="text" class="string" v-model.lazy.trim="versionCommand" placeholder="eg. node --version" maxlength="50">
      </div>
      <div class="input-group">
        <span class="label">Latest Release API*</span>
        <input type="text" class="string" v-model.lazy.trim="releaseApi" placeholder="https://api.github.com/repos/{owner}/{repo}/releases/latest" maxlength="255">
      </div>
    </div>
    <br>
    <div class="section text-center">
      <button class="btn text-upper" type="button" v-enabled="submissionEnabled" @click="submit">Submit</button>
    </div>
    <br>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  import axios from 'axios'

  export default {
    name: 'AddSubscription',
    props: ['data', 'context'],
    components: {
      Modal
    },
    data() {
      return {
        submissionEnabled: true,
        appName: undefined,
        versionCommand: undefined,
        releaseApi: undefined,
      }
    },
    methods: {
      submit() {
        let self = this, vAlert = self.$parent.$refs.alert
        let data = {
          app_name: self.appName,
          version_command: self.versionCommand,
          latest_release_github_api: self.releaseApi
        }

        if (!data.app_name) {
          vAlert.showError('App name is required.')
          return false
        }

        if (!data.version_command) {
          vAlert.showError('Version command is required.')
          return false
        }

        if (!data.latest_release_github_api) {
          vAlert.showError('Latest release API is required.')
          return false
        }

        vAlert.showProgress('Please wait...')
        self.submissionEnabled = false

        axios.post('http://localhost:1440/subscriptions/add', JSON.stringify({added: data, current: self.context.subscriptions}))
          .then(response => {
            vAlert.showSuccess(response.data.message)
            self.$root.$emit('hide-modal', true)
            self.context.load()

            self.context.$on('subs-loaded', code => {
              vAlert.showSuccess(response.data.message)
              self.context.$off('subs-loaded')
            })

            self.submissionEnabled = true
          })
          .catch(error => {
            vAlert.showError('Something went wrong.');
            self.submissionEnabled = true
          })
      }
    }
  }
</script>
