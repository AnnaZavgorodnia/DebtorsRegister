let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

if (queryString) {

    if (id) {
        setEntitiesById(id);
    }
}

function setEntitiesById(id) {
    //TODO
    // запрос на сервер за профілем по id

    let data = [{
        "fullName": "Анатолій Сергійович Санжаровський",
        "stateAgency": "Кропивницький районний участок чого то там",
        "email": "cool_email#@mail.ru",
        "phoneNumber": "+380939393093",
        "password": "qwerty123456",
        "is_active": true
    }];

    let testData = "[{\n" +
        "        \"fullName\": \"Анатолій Сергійович Санжаровський\",\n" +
        "        \"stateAgency\": \"Кропивницький районний участок чого то там\",\n" +
        "        \"email\": \"cool_email#@mail.ru\",\n" +
        "        \"phoneNumber\": \"+380939393093\",\n" +
        "        \"password\": \"qwerty123456\",\n" +
        "        \"is_active\": true\n" +
        "    }]";


    let parsed_data = JSON.parse(testData);

    let resTable = $('#resultsTable');

    resTable.removeClass('ng-hide');

    {
        let today = new Date();
        let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        $('#physicalSearchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
    }


    parsed_data.forEach(function (entity) {
        let buttonsHtml = entity.is_active
            ? `<button class="btn btn--color-negative changeStatus" data-status="deactivate" data-id="${entity.id}" data-toggle="modal" data-target="#changeStatusModal">
                            Деактивувати профіль
                </button>`
            : `<button class="btn btn--color-positive changeStatus" data-status="activate" data-id="${entity.id}" data-toggle="modal" data-target="#changeStatusModal">
                            Активувати профіль
               </button>`;

        let entityElement = `<tr class="print-no-page-break">
                    <td>${entity.fullname}</td>
                    <td>${entity.stateAgency}</td>
                    <td>${entity.email}</td>
                    <td>${entity.phoneNumber}</td>
                    <td>${entity.password}</td>
                    <td>${entity.is_active ? 'Активний' : 'Деактивований'}</td>
                    <td>
                        ${buttonsHtml}
                        <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">
                            Редагувати
                        </button>
                    </td>
                </tr>`;

        $("#result").append(entityElement);
    });

    $('.changeStatus').bind('click', function () {
        $('#changeStatusModal').css('display', 'block');

        let profileId = $(this).attr('data-id');
        let status = $(this).attr('data-status')

        $('#confirmChangeStatusBtn').attr('data-id', profileId).attr('data-status', status);
    });

    $('.update-btn').bind('click', function () {
        let profileId = $(this).attr('data-id');

        window.location = `update_profile.html?id=${profileId}`;
    });


    $('html, body').animate({
        scrollTop: resTable.offset().top
    }, 1000);

}

function setEntities(email, stateAgency) {
    //TODO
    // запрос на сервер за профілем по email i stateAgency

    let data = [{
        "fullName": "Манасерян Айкуі Арамівна",
        "stateAgency": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
        "email": "vdvs.obolon@ukr.net",
        "phoneNumber": " 426-62-70",
        "password": "superparol123",
        "is_active": false
    }];

    let testData = "[{\n" +
        "        \"fullName\": \"Манасерян Айкуі Арамівна\",\n" +
        "        \"stateAgency\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "        \"email\": \"vdvs.obolon@ukr.net\",\n" +
        "        \"phoneNumber\": \" 426-62-70\",\n" +
        "        \"password\": \"superparol123\",\n" +
        "        \"is_active\": false\n" +
        "    }]";


    let parsed_data = JSON.parse(testData);

    let resTable = $('#resultsTable');

    resTable.removeClass('ng-hide');

    {
        let today = new Date();
        let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        $('#physicalSearchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
    }


    parsed_data.forEach(function (entity) {
        let buttonsHtml = entity.is_active
            ? `<button class="btn btn--color-negative changeStatus" data-status="deactivate" data-id="${entity.id}" data-toggle="modal" data-target="#changeStatusModal">
                            Деактивувати профіль
                </button>`
            : `<button class="btn btn--color-positive changeStatus" data-status="activate" data-id="${entity.id}" data-toggle="modal" data-target="#changeStatusModal">
                            Активувати профіль
               </button>`;

        let entityElement = `<tr class="print-no-page-break">
                    <td>${entity.fullname}</td>
                    <td>${entity.stateAgency}</td>
                    <td>${entity.email}</td>
                    <td>${entity.phoneNumber}</td>
                    <td>${entity.password}</td>
                    <td>${entity.is_active ? 'Активний' : 'Деактивований'}</td>
                    <td>
                        ${buttonsHtml}
                        <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">
                            Редагувати
                        </button>
                    </td>
                </tr>`;

        $("#result").append(entityElement);
    });

    $('.changeStatus').bind('click', function () {
        $('#changeStatusModal').css('display', 'block');

        let profileId = $(this).attr('data-id');
        let status = $(this).attr('data-status')

        $('#confirmChangeStatusBtn').attr('data-id', profileId).attr('data-status', status);
    });

    $('.update-btn').bind('click', function () {
        let profileId = $(this).attr('data-id');

        window.location = `update_profile.html?id=${profileId}`;
    });


    $('html, body').animate({
        scrollTop: resTable.offset().top
    }, 1000);
}

$('#confirmChangeStatusBtn').click(function () {
    let profileId = $(this).attr('data-id');
    let status = $(this).attr('data-status')

    let response = {};

    if (status === 'deactivate') {
        //TODO
        // запрос на активацію профілю

        response.message = 'Не вдалося активувати профіль тому, що....'

    } else if (status === 'deactivate') {
        //TODO
        // запрос на деактивацію профілю
        response.message = ''

    } else {
        response.message = 'Помилка 505'

    }
    if (response.message)
        $('#message').html('Виникла помилка. ' + response.message);
    else
        window.location = `search_register_profile.html?id=${profileId}`;


    $(this).attr('data-id', '').attr('data-status', '');
    $('#changeStatusModal').css('display', 'none');


});