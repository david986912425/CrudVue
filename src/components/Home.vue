<template>
    <div id="main-container">
  
      <div class="encabezado">
        <div>
          <v-btn icon>
            <label for="file" class="nav-link"><v-icon>mdi-file-excel</v-icon></label>
            <input type="file" hidden name="file" id="file" @change="importarExcel()"/>
          </v-btn>
          
        </div>
        <v-btn icon @:click="addEmpresa()">
          <v-icon >mdi-database-plus</v-icon>
        </v-btn>
      </div>
      <table>
        <thead>
          <tr>
          <td v-for=" item in headers" :key="item" >{{ item.text }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for=" item in entry" :key="item">
          <td>{{ item.ruc }}</td>
          <td class="text-xs-right">{{ item.name }}</td>
          <td class="text-xs-right">{{ item.fecha }}</td>
          <td class="text-xs-right">{{ item.resolucion}}</td>
          <td class="text-xs-right"><button @:click="editarEmpresa(item.ruc)">Editar </button>|<button @:click="deleteEmpresa(item.ruc)"> Borrar</button></td>
          </tr>
        </tbody>
      </table>
  
      <v-dialog
        v-model="addDialog"
        width="500"
      >
      <v-card><AddComponents/></v-card>
      </v-dialog>


      <v-dialog
        v-model="dialogEditar"
        width="500"
        >
        <v-card><EditarComponents :editarEmpresa= "id" ref="editar" @editar="editar2"/></v-card>
        </v-dialog>
  
    </div>
  </template>
  
  <script>
  import app from "@/firebase/firebase"
  import AddComponents from "@/components/AddDialog.vue"
  import EditarComponents from "@/components/Editar.vue"
  import readExcel from "read-excel-file"
  let db = app.firestore();
  console.log(db);
  export default {
      name: 'Home',
      components: {
        AddComponents,
        EditarComponents,
      },
      data () {
          return {
          id : '',
          addDialog: false,
          dialogEditar: false,
          entry: [],
          dato : [],
          headers: [
          {text: 'Ruc',value: 'ruc'},
          { text: 'Nombre', value: 'nombre' },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Resolucion', value: 'resolucion' },
          { text: 'Opciones', value: 'opciones' },
          ],
          }
      },
      async mounted(){
        const res = await fetch(
            "http://localhost:5000/logindashboard-b14c2/us-central1/app/websites"
        );
        const data = await res.json();
        this.entry = data;
          
  
      },
      methods: {
        async loadentry(){
          const res = await fetch(
              "http://localhost:5000/logindashboard-b14c2/us-central1/app/websites"
          );
          const data = await res.json();
          this.entry = data;
        },
        async addEntry(data){
            await fetch('http://localhost:5000/logindashboard-b14c2/us-central1/app/websites/add', {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
              })
              .then((response) => response.json())

        },
        importarExcel(){
            
            const input = document.getElementById("file");
            readExcel(input.files[0]).then((rows) => {
            for (var i = 0; i < rows.length; i++){
              let row = rows[i];
              //console.log(data);
              let data = {ruc: row[0].toString(), name: row[1], fecha: row[2], resolucion: row[3]}
              try {
                db.collection('websites')
                .doc("/" + row[0] + "/")
                .set(data)
                console.log(data);
                
              } catch (error) {
                console.log(error)
              }
              

            }
            
            //websitesRef.push(rows);
            
            })
        },
        addEmpresa(){
          this.addDialog = true;
        },
        async deleteEmpresa(id){
            console.log(id);
            const resultado = await fetch('http://localhost:5000/logindashboard-b14c2/us-central1/app/websites/' + id, {
            method: 'DELETE',
            })

            console.log(resultado)
        },
        editarEmpresa(id){
            this.dialogEditar = true;
            this.id = id;

        },
        editar2(){
            this.loadentry();
            this.dialogEditar = false;
        }
    }
  
  
  }
  </script>
  
  <style scoped>
  .encabezado {
    margin: 10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  body{
      background-color: #632432;
      font-family: Arial;
  }
  
  #main-container{
      margin: 10px auto;
      width: 1100px;
  }
  table{
    margin-top: 40px;
      background-color: white;
      text-align: left;
      border-collapse: collapse;
      width: 100%;
  }
  th, td{
      padding: 20px;
  }
  thead{
      background-color: #246355;
      border-bottom: solid 5px #0F362D;
      color: white;
  }
  
  tr:nth-child(even){
      background-color: #ddd;
  }
  
  tr:hover td{
      background-color: #369681;
      color: white;
  }
  </style>