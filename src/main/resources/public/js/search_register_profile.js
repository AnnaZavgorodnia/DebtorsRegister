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
        "id": "1",
        "fullname": "Манасерян Айкуі Арамівна",
        "stateAgency": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
        "email": "vdvs.obolon@ukr.net",
        "phoneNumber": " 426-62-70",
        "password": "superparol123",
        "is_active": false
    }];

    let testData = "[{\n" +
        "        \"id\" : \"1\",\n" +
        "        \"fullname\": \"Манасерян Айкуі Арамівна\",\n" +
        "        \"stateAgency\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "        \"email\": \"vdvs.obolon@ukr.net\",\n" +
        "        \"phoneNumber\": \" 426-62-70\",\n" +
        "        \"password\": \"superparol123\",\n" +
        "        \"is_active\": true\n" +
        "    }]";


    let parsed_data = JSON.parse(testData);

    {
        let email = parsed_data[0].email;
        let stateAgency = parsed_data[0].stateAgency;

        $("#email").val(email).trigger('keyup');
        $("#stateAgency").val(stateAgency).trigger('keyup');
        $("#searchBtn").prop('disabled', false);
    }

    let resTable = $('#resultsTable');

    resTable.removeClass('ng-hide');

    {
        let today = new Date();
        let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        $('#searchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
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
        let profileId = $(this).attr('data-id');
        let status = $(this).attr('data-status');


        if (status === 'deactivate')
            $('#deactivateQuestion').removeClass('ng-hide');
        else if (status === 'activate')
            $('#activateQuestion').removeClass('ng-hide');

        $('#changeStatusModal').css('display', 'block');

        $('#confirmChangeStatusBtn').attr('data-id', profileId).attr('data-status', status);
    });

    $('.update-btn').bind('click', function () {
        let profileId = $(this).attr('data-id');

        window.location = `update-profile?id=${profileId}`;
    });


    $('html, body').animate({
        scrollTop: resTable.offset().top
    }, 1000);

}

function setEntities(email, stateAgency) {
    //TODO
    // запрос на сервер за профілем по email i stateAgency

    let data = [{
        "id": "1",
        "fullname": "Манасерян Айкуі Арамівна",
        "stateAgency": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
        "email": "vdvs.obolon@ukr.net",
        "phoneNumber": " 426-62-70",
        "password": "superparol123",
        "is_active": false
    }];

    let testData = "[{\n" +
        "        \"id\" : \"1\",\n" +
        "        \"fullname\": \"Манасерян Айкуі Арамівна\",\n" +
        "        \"stateAgency\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "        \"email\": \"vdvs.obolon@ukr.net\",\n" +
        "        \"phoneNumber\": \" 426-62-70\",\n" +
        "        \"password\": \"superparol123\",\n" +
        "        \"is_active\": true\n" +
        "    }]";


    let parsed_data = JSON.parse(testData);

    let resTable = $('#resultsTable');

    resTable.removeClass('ng-hide');

    {
        let today = new Date();
        let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        $('#searchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
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
        let profileId = $(this).attr('data-id');
        let status = $(this).attr('data-status');


        if (status === 'deactivate')
            $('#deactivateQuestion').removeClass('ng-hide');
        else if (status === 'activate')
            $('#activateQuestion').removeClass('ng-hide');

        $('#changeStatusModal').css('display', 'block');

        $('#confirmChangeStatusBtn').attr('data-id', profileId).attr('data-status', status);
    });

    $('.update-btn').bind('click', function () {
        let profileId = $(this).attr('data-id');

        window.location = `update_profile?id=${profileId}`;
    });


    $('html, body').animate({
        scrollTop: resTable.offset().top
    }, 1000);
}

$('#searchBtn').click(function (e) {
    e.preventDefault();

    $('#result').empty();

    let email = $("#email").val();
    let stateAgency = $("#stateAgency").val();

    setEntities(email, stateAgency);
});

$('#confirmChangeStatusBtn').click(function () {
    let profileId = $(this).attr('data-id');
    let status = $(this).attr('data-status')

    let response = {};

    console.log(status)
    if (status === 'activate') {
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
        window.location = `search-register-profile?id=${profileId}`;


    $(this).attr('data-id', '').attr('data-status', '');
    $('#changeStatusModal').css('display', 'none');
    $('#deactivateQuestion').addClass('ng-hide');
    $('#activateQuestion').addClass('ng-hide');


});

$('#cleanForm').click(function (e) {
    $('#searchForm')[0].reset();
    e.preventDefault();
});

$("#email").keyup(function () {

    if ($(this).val() !== '' || $("#stateAgency").val() !== '')
        $("#searchBtn").prop('disabled', false);
    else
        $("#searchBtn").prop('disabled', true);
});

$("#stateAgency").keyup(function () {
    if ($(this).val() !== '' || $("#email").val() !== '')
        $("#searchBtn").prop('disabled', false);
    else
        $("#searchBtn").prop('disabled', true);
});