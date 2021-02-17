const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/mydictionary", function (req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("diccionario").find().toArray(function (error, datos) {
        if (error !== null) {
            console.log(error)
        } else {
            res.send(datos)
        }
    })
});

router.post("/addNewUser", function (req, res) {
    let nuevoUsuarioRegistrado = req.body.newUserName;
    let nuevoUsuarioPassword = req.body.password;
    console.log(nuevoUsuarioPassword, nuevoUsuarioRegistrado)
    let passwordCifrado = bcrypt.hashSync(nuevoUsuarioPassword, 10);
    console.log("contraseña cifrada:" + passwordCifrado);
    let coincidencia = bcrypt.compareSync(nuevoUsuarioPassword, passwordCifrado);
    console.log(coincidencia);
    if (coincidencia) {
        let dbConnection = req.app.locals.db;
        dbConnection.collection("diccionariousers").find({ username: nuevoUsuarioRegistrado }).toArray(function (err, tremendoDato) {
            if (tremendoDato.length == 0) {
                dbConnection.collection("diccionariousers").insertOne({ username: nuevoUsuarioRegistrado, password: passwordCifrado }, function (err, userUpdate) {//userUpdate es la respuesta
                    // console.log(userUpdate);
                    if (err !== null) {
                        res.send({ mensaje: "Ha habido un error" });
                    } else {
                        if (userUpdate.result.n > 0) {//en caso de uqe pueda hacer el insert, si lo hace correctamente o no
                            res.send({ mensaje: "Usuario creado" });
                        }
                    }
                })
            } else {
                res.send({ mensaje: "Este usuario ya existe" });
            }
        })
    }
});

router.post("/loginUser", function (req, res) {//ponemos nueva URL que recibe usuario y contraseña
    let username = req.body.username;
    let password = req.body.password;
    let dbConnection = req.app.locals.db;
    dbConnection.collection("diccionariousers")
        .find({ username: username })//haga un find del usuario
        .toArray(function (err, arrayUsuario) {//lo que era un objeto lo convierte en parte de un array
            // console.log(arrayUsuario);
            if (err !== null) {
                res.send({mensaje: "Ha habido un error", status: false});
            } else {
                if (arrayUsuario.length > 0) {//si encuentra un usuario en el find comparará que la contraseña que hemos metido será la misma que la del parámetro
                    if (bcrypt.compareSync(password, arrayUsuario[0].password)) {//si puede hacerla se logueará correctamente y si no, incorrecta.
                        res.send({ mensaje: "Logueado correctamente", status: true} );
                        } else {
                        res.send({ mensaje: "Contraseña incorrecta",  status: false});
                    }
                } else {
                    res.send({ mensaje: "El usuario no existe", status: false});
                }
            }
        });
});


router.post("/addpalabra", function (req, res) {
    let dbConnection = req.app.locals.db;
    let newWord = req.body.castellano;
    dbConnection.collection("diccionario").find({ castellano: newWord }).toArray(function (err, tremendoDato) {
        if (err !== null) {
            console.log(err)
        } else {
            if (tremendoDato.length == 0) {
                dbConnection.collection("diccionario").insertOne(req.body, function () {
                    res.send({ mensaje: "Palabra añadida correctamente a MyDictionary." })
                });
            } else {
                res.send({ mensaje: "Esa palabra ya está registrada!" })
            }
        }
    })
});

router.delete("/deletepalabra", function (req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("diccionario").find(req.body).toArray(function (err, tremendoDato) {
        if (err !== null) {
            console.log(err)
        } else {
            if (tremendoDato.length > 0) {
                dbConnection.collection("diccionario").deleteOne(req.body, function () {
                    res.send({ mensaje: "Palabra eliminada correctamente a MyDictionary." })
                });
            } else {
                res.send({ mensaje: "¡Esa palabra no está en MyDictionary!" })
            }
        }
    })
});

router.get("/flashcards", function (req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection.collection("diccionario").find().toArray(function (error, datos) {
        let randomNumber = Math.floor(Math.random() * (datos.length));
        console.log(randomNumber)
        res.send(datos[randomNumber])
    });

})

module.exports = router;    