<template>
<v-app id="inspire">
  <Navigation />
  <Toolbar @side-icon-click="toggleNav()"/>
   
    <v-content>
      
        <v-container fluid grid-list-md>
          <router-view /> 
        </v-container>
      
    </v-content>
    
  <Footer text="Tanfield Service Manager"/>
</v-app>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation'
import Toolbar from '@/components/Core/Toolbar'
import Footer from '@/components/Core/Footer'

export default {
  components: {
    Navigation,
    Toolbar,
    Footer
  },
  methods: {
    toggleNav() {
      this.$store.commit("navigation/toggleNav");
    }
  }
};
</script>