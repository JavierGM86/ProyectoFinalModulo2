//función para añadir una nueva palabra al diccionario

// const { Db } = require("mongodb")

if (document.querySelector("#addPalabra")) {
    document.querySelector("#addPalabra").addEventListener("click", function () {
        let nuevaPalabra = {
            castellano: document.querySelector("#castellano").value,
            ingles: document.querySelector("#ingles").value,
            descripcion: document.querySelector("#descripcion").value,
        }

        let fetchNuevaPalabra = {
            method: 'POST',
            body: JSON.stringify(nuevaPalabra),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("/addpalabra", fetchNuevaPalabra)
            .then(res => res.json())
            .then(datos => alert(datos.mensaje))
    })
}
;

//función para borrar palabra

if (document.querySelector("#borrarPalabra")) {
    document.querySelector("#borrarPalabra").addEventListener("click", function () {
        let borrarPalabra = {
            castellano: document.querySelector("#borrar").value
        }

        let fetchBorrarPalabra = {
            method: 'DELETE',
            body: JSON.stringify(borrarPalabra),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch("/deletepalabra", fetchBorrarPalabra)
            .then(res => res.json())
            .then(datos => alert(datos.mensaje))
    })
}
;

//función para crear un nuevo usuario

if (document.querySelector("#addNewUser")) {
    document.querySelector("#addNewUser").addEventListener("click", function () {
        let newUser = {
            newUserName: document.querySelector("#newUser").value,
            password: document.querySelector("#password").value,
        }
        let fetchNewUser = {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        fetch("/addNewUser", fetchNewUser)
            .then(res => res.json())
            .then(data => alert(data.mensaje))
    })
}
;

//función para loguearse
if (document.querySelector("#loginUser")) {
    document.querySelector("#loginUser").addEventListener("click", function () {
        let userLogin = {
            username: document.querySelector("#existantUser").value,
            password: document.querySelector("#password").value,
        }
        let fetchUserLogin = {
            method: 'POST',
            body: JSON.stringify(userLogin),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        fetch("/loginUser", fetchUserLogin)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    alert(data.mensaje)
                    location.href = "http://localhost:3000/flashcards.html"
                } else {
                    alert(data.mensaje)
                }
            })
    })
}

    //mostrar la tabla de las palabras 

    if (document.querySelector(".tablaDiccionario")) {

        fetch("/mydictionary/")

            .then(res => res.json())
            .then(datos => {
                datos.forEach(element => {

                    document.querySelector(".tablaDiccionarioFila").innerHTML += `<p class="tablaP">${element.castellano} · ${element.ingles} · ${element.descripcion}</p>`;

                    // document.querySelector(".tablaDiccionarioIngles").innerHTML += element.ingles;
                    // document.querySelector(".tablaDiccionarioDescripcion").innerHTML += element.descripcion;
                });
            }
            )
    }
    //hacer llamada GET 
    ;


    //funciones de la flashcard
    let card = document.querySelector('.card');
    if (card) {
        card.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
        });
    }

    if (document.querySelector(".card__face")) {
        fetch("/flashcards/")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                document.querySelector(".card__face--front").innerHTML = data.castellano;
                document.querySelector(".card__face--back").innerHTML = data.ingles;
                document.querySelector(".flashcardDescripcion").innerHTML = data.descripcion;
            })

    }
    ;

    //funciones para el slide del home
    var slideIndex = 0;
    showSlides();


    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 4000); // Change image every 2 seconds
    }







// castellano += 
//             `<td>
//             ${element.castellano}</td>`
//             ingles += `<td>
//             ${element.ingles} </td>`

//             descripcion += `<td>
//             ${element.descripcion}</td>
//             `
//             });
//             document.querySelector(".tablaDiccionarioCastellano").innerHTML = castellano;
//             document.querySelector(".tablaDiccionarioIngles").innerHTML = ingles;
//             document.querySelector(".tablaDiccionarioDescripcion").innerHTML = descripcion;