<template>
  <Modal title="Unsubscribe">
    <div class="section">
      <div class="heading">Unsubscribe {{ data.app_name }} ?</div>
    </div>
    <br>
    <div class="section text-center">
      <button class="btn text-upper btn-sec" type="button" @click="$parent.hideModal">No</button>
      &nbsp;
      <button class="btn text-upper" type="button" v-enabled="submissionEnabled" @click="submit">Yes</button>
    </div>
    <br>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'
  import axios from 'axios'

  export default {
    name: 'Unsubscribe',
    props: ['data', 'context'],
    components: {
      Modal
    },
    data() {
      return {
        submissionEnabled: true,
      }
    },
    methods: {
      submit() {
        let self = this, vAlert = self.$parent.$refs.alert
        let data = []

        self.context.subscriptions.forEach((e) => {
          if (e.app_id !== self.data.app_id) {
            data[data.length] = e
          }
        })

        vAlert.showProgress('Please wait...')
        self.submissionEnabled = false

        axios.post('http://localhost:1440/subscriptions/update', JSON.stringify(data))
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
