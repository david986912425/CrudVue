const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://logindashboard-b14c2-default-rtdb.firebaseio.com"
});

const db = admin.firestore()


app.post('/websites/add', async(req, res)=>{
    try {
        await db.collection('websites')
        .doc("/" + req.body.ruc + "/")
        .create({ 
            ruc: req.body.ruc,
            name: req.body.name,
            fecha: req.body.fecha,
            resolucion: req.body.resolucion })
        return res.status(204).json()

    } catch (error) {
        return res.status(500).send(error)
    }
    
});


app.get("/websites", async (req, res) => {
    try {
      let query = db.collection("websites");
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
  
      const response = docs.map((doc) => ({
        
        ruc: doc.data().ruc,
        name: doc.data().name,
        fecha: doc.data().fecha,
        resolucion: doc.data().resolucion
      }));
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
});

app.delete("/websites/:ruc_id", async (req, res) => {
    try {
      const doc = db.collection("websites").doc(req.params.ruc_id);
      await doc.delete();
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
});

app.put("/websites/:ruc_id", async (req, res) => {
    try {
      const document = db.collection("websites").doc(req.params.ruc_id);
      await document.update({
        name: req.body.name,
        fecha: req.body.fecha,
        resolucion: req.body.resolucion
      });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json();
    }
});



exports.app = functions.https.onRequest(app)


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

