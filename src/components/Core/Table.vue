<template>
    <v-card>
        <v-card-title><h2>{{title}}</h2>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Keresés" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search" rows-per-page-text="Sor / oldal"
        :rows-per-page-items="rows_per_page" :must-sort="true">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left" v-for="h in headers" :key="h.value" v-if="h.value != 'actions'" >{{ props.item[h.value] }}</td>
          <td class="text-xs-right" v-else>
               <template v-for="action in actions">
                   <v-tooltip bottom color="grey darken-1" :key="action.icon">
                        <span slot="activator">
                            <v-btn flat icon :color="action.color" @click="action.click(props.item)"><v-icon>{{ action.icon }}</v-icon></v-btn>
                        </span>
                        <span>{{ action.tooltip }}</span>
                    </v-tooltip> 
               </template>
          </td>
        </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nincs találat a(z) "{{ search }}" kifejezésre.
          </v-alert>
        </v-data-table>
    </v-card>
</template>

<script>

export default {
    props: {
        title:          { type: String, default: "Table title", required: true },
        headers:        { type: Array, default: () => [], required: true },
        items:          { type: Array, default: () => [], required: true },
        actions:        { type: Array, default: () => [], required: false },
        rows_per_page:  { type: Array, default: () => [50, 100, 150, {text: "Mind",value:-1}], required: false },
    }, 
    data() {
        return {
            search: "",
        }
    },
}
</script>