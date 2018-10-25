<template v-if="show">
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >

      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="light-blue">mdi-account</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title color="red">{{actualUserData.firstName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
                value="true"
                v-for="(item, i) in items" v-if="actualUserData.id != 0"
                :key="i.title"  router exact :to="item.to">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar v-if="actualUserData.id != 0" @click="logout()">
          <v-list-tile-avatar>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Kilépés</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>mdi-arrows-left-right-bold-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; Bobby</span>
    </v-footer>
  </v-app>
</template>

<script>

import VListTile from "vuetify/lib/components/VList/VListTile";
import VListTileAction from "vuetify/lib/components/VList/VListTileAction";

export default {
    components: {
        VListTileAction,
        VListTile},
    name: 'App',
  data () {
    return {
        show: true,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
          { divider: true, inset: false },
          { title: 'Új könyv felvétele', icon: 'mdi-owl', to: { name: 'book'}},
          { title: 'Kölcsönzés', icon: 'mdi-book',  to: { name: 'rent'}}],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Digitális Könyvtár'
    }
  },
    computed: {
        actualUserData () {
                return this.$store.state.actualUser
        }
    },
    methods: {
            logout(){
                this.$store.dispatch('logout')
                this.$router.push({name: 'login'})
            }
    }
}
</script>
