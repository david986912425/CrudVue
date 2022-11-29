<template>
  <div>
    <v-card-title class="text-h5 grey lighten-2">Editar</v-card-title>
    <v-card-text>
      <label>NOMBRE</label>
      <input type="text" class="input"
      v-model="entry.name"
      />
      <label>FECHA</label>
      <input type="text" class="input"
      v-model="entry.fecha"
      />
      <label>RESOLUCION</label>
      <input type="text" class="input"
      v-model="entry.resolucion"
      />

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="saveEntry"
      >
        Editar
      </v-btn>
      
    </v-card-actions>
  </div>
  
</template>

<script>

export default {
    name: 'EditarComponents',
    props: ['editarEmpresa'],
    data(){
      return {
        entry: []
      }
    },
    methods: {
      
      /*loadEntry(){
        //let message = this.editarEmpresa;
        const entry = this.getEntryById(this.editarEmpresa)
        this.entry = entry
        console.log(this.entry)
        
      },*/
      async saveEntry(){
        let id = this.editarEmpresa
        let data = {name: this.entry.name, fecha: this.entry.fecha, resolucion: this.entry.resolucion}
        console.log(data)

        await fetch('http://localhost:5000/logindashboard-b14c2/us-central1/app/websites/'+ id, {
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        //.then((response) => response.json())
        .then((data) => {
            this.$emit("editar")
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }
    },
}

</script>

<style>
.input{
  width: 100%;
}
</style>