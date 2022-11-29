<template>
    <div>
        <v-card-title class="text-h5 grey lighten-2">Agregar</v-card-title>
        <v-card-text>
        <label>RUC</label>
        <input type="text" class="input"
        v-model="entry.ruc"
        />
        <v-spacer></v-spacer>
        <label>NOMBRE</label>
        <input type="text" class="input"
        v-model="entry.name"

        />
        <v-spacer></v-spacer>
        <label>FECHA</label>
        <input type="text" class="input"
        v-model="entry.fecha"
        />
        <v-spacer></v-spacer>
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
            Guardar
        </v-btn>
        
        </v-card-actions>

    </div>
    
</template>

<script>


export default {
    name: "AddComponents",
    data(){
        return {
            entry: [],
        }

    },
    methods: {
    async saveEntry(){
        let data = {ruc: this.entry.ruc, name: this.entry.name, fecha: this.entry.fecha, resolucion: this.entry.resolucion}
        console.log(data)

        await fetch('http://localhost:5000/logindashboard-b14c2/us-central1/app/websites/add', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        //.then((response) => response.json())
        .then((data) => {
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

</style>