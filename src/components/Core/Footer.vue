<template>
  <v-footer :color="$store.getters['partner/color']" app>
       <v-snackbar 
        :timeout="$store.state.snackbar.timeout" 
        :color="$store.state.snackbar.color" 
        :multi-line="$store.state.snackbar.multiLine" 
        :vertical="$store.state.snackbar.vertical"
        v-model="$store.state.snackbar.show">
       {{ $store.state.snackbar.text }}
      <v-btn dark flat @click.native="closeSnackbar()">Close</v-btn>
    </v-snackbar>
      <span class="white--text">{{ text }} &copy; 2018</span>
  </v-footer>
</template>

<script>
export default {
  props: [ 'text' ],
  methods: {
    closeSnackbar() {
      this.$store.commit('snackbar/close')
    }
  }
}
</script>
