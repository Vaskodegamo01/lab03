$(()=>{
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(user !== null) {
        $('#log').hide();
        $('#reg').hide();
    }else{
        $('#reg').hide();
        $('#logout').hide();
        $('#but').hide();
    }
    $("#register").click((e)=>{
        e.preventDefault();
        const data = new FormData(document.getElementById("formRegister"));
        console.log(data);
        $.ajax({
            url: 'http://localhost:3333/users',
            data: data,
            processData: false,
            contentType: false,
            type: 'POST'
        }).then(response => {
            console.log(response);
            location.reload();
        })
    });

    $("#login").click((e)=>{
        e.preventDefault();
        const data = new FormData(document.getElementById("formLogin"));

        $.ajax({
            url: 'http://localhost:3333/users/sessions',
            data: data,
            processData: false,
            contentType: false,
            type: 'POST'
        }).then(response => {
            localStorage.setItem('user', JSON.stringify(response));
            location.reload();
        })
    });

    $("#logout").click((e)=>{
        e.preventDefault();
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null){
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/users/sessions',
                headers: header,
                processData: false,
                contentType: false,
                type: 'DELETE'
            }).then(() => {
                localStorage.removeItem('user');
                location.reload();
            })
        }
    });

    $("#bregister").click((e)=>{
        e.preventDefault();
        $('#reg').show();
        $('#log').hide();
    });

    function fotoRendring(){

        let application = $("#application");
        application.empty();
        let result_form = $(`<div id="result_form">`);
        let form = $(`<div id="form">`);
        let form_id = $(`<form method="post" id="ajax_form" action="">`).click((e)=> artistHandler(e));
        let mydiv = $(`<div id="mydiv">`);
        application.append(result_form,form,form_id,mydiv);
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/users/foto',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET',
                dataType: 'html'
            }).then(response => {
                document.getElementById('ajax_form').innerHTML = response;
                getAllpostsArtists();
            });
        }
    };

    fotoRendring();




    const Artists =(response)=>{
        let  div = $(`<div id=${response._id} class="mydiv">`);
        let image = $(`<img  width="200" alt=""/>`).attr('src', `http://localhost:3333/uploads/${response.image}`).click((e)=> PopUpFoto(response.image,e));
        let name = $(`<p>`).text(`Имя исполнителя: ${response.name}`);
        let information = $(`<p>`).text(`Информация: ${response.information}`);
        if(response.button === "1") {
            let deleteArtists = $(`<button type="button" class="btn btn-default">Delete by ID</button>`).click((e)=> deleteArtistsById(response._id,e));
            div.append(image, name, information, deleteArtists);
        }else{
            div.append(image, name, information);
        }
        return div;
    };

    const deleteArtistsById = (id,e) =>{
        e.preventDefault();
        let result_form = $("#result_form");
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: `http://localhost:3333/fotos/delete/${id}`,
                headers: header,
                type: 'DELETE'
            }).then(response => {
                result_form.empty();
                result_form.text(JSON.stringify(response));
                mydiv.empty();
                getAllpostsArtists();
            });
        }
    };

    const getAllpostsArtists = () => {
        let mydiv = $("#mydiv");
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user !== null) {
            const header = {"Token": user.token};
            $.ajax({
                url: 'http://localhost:3333/fotos',
                headers: header,
                processData: false,
                contentType: false,
                type: 'GET'
            }).then((response) => {
                const artists = response.map((artist) => {
                    return Artists(artist);
                });
                mydiv.html(artists);
            });
        }
    };


    const artistHandler =(e) =>{
        if(e.target.id == "btn_artist"){
            let idForm = $("#ajax_form");
            if(!idForm[0].checkValidity()){
                $('<input type="submit">').hide().appendTo(idForm).click().remove();
                return;
            }
            e.preventDefault();
            let result_form = $("#result_form");
            let mydiv = $("#mydiv");
            const data = new FormData(document.getElementById("ajax_form"));
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
            if(user !== null) {
                const header = {"Token": user.token};
                $.ajax({
                    url: 'http://localhost:3333/fotos',
                    data: data,
                    headers: header,
                    processData: false,
                    contentType: false,
                    type: 'POST'
                }).then((response) => {
                    result_form.empty();
                    result_form.text(JSON.stringify(response));
                    mydiv.empty();
                    getAllpostsArtists();
                });
            }
        }

     };

    const PopUpFoto =(id,e) =>{
        e.preventDefault();
        console.log(id);
        $('#myModal').modal(focus)
        $('#fotoId').attr('src', `http://localhost:3333/uploads/${id}`)
    };
});