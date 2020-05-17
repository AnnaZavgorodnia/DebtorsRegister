const reg_exp_more_than_one_space = /\s{2,}/;

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

if (queryString) {

    if (id) {
        setEntitiesById(id);
    }
}

async function setEntitiesById(id) {

    let data = await $.ajax({
        url: `/api/user/${id}`,
        type: 'get',
        success: function(data, textStatus, xhr) {
            console.log(xhr.status);
            console.log(data);
        },
        error: function(){
            window.location='error';
        }
    });

    let parsed_data = [{
                    id: data.id,
                    fullname: data.fullName,
                    stateAgency: data.stateAgency,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    is_active: data.isActive
    }];

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

async function setEntities(email, stateAgency) {

    let data = await $.ajax({
        url: `/api/user?email=${email}&stateAgency=${stateAgency}`,
        type: 'get',
        success: function(data, textStatus, xhr) {
            console.log(xhr.status);
            console.log(data);
        },
        error: function(){
        }
    });

    let parsed_data = data.map(el=>({
        id: el.id,
        fullname: el.fullName,
        stateAgency: el.stateAgency,
        email: el.email,
        phoneNumber: el.phoneNumber,
        is_active: el.isActive
    }));

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

$('#searchBtn').click(function (e) {
    e.preventDefault();

    $('#result').empty();

    let email = $("#email").val();
    let stateAgency = $("#stateAgency").val();

    setEntities(email, stateAgency);
});

$('.closeModal').click(function () {
    $('#changeStatusModal').css('display', 'none');
});

$('#confirmChangeStatusBtn').click(async function () {
    let profileId = $(this).attr('data-id');
    let status = $(this).attr('data-status')

    let response = {};

    console.log(status)
    if (status === 'activate') {

        await $.ajax({
            url: `/api/user/${profileId}`,
            type: 'patch',
            success: function(data, textStatus, xhr) {
                console.log (xhr.status);
                console.log(data);
            },
            error: function(){
                response.message = 'Не вдалося активувати профіль';
            }
        });

    } else if (status === 'deactivate') {

        await $.ajax({
            url: `/api/user/${profileId}`,
            type: 'delete',
            success: function(data, textStatus, xhr) {
                console.log(xhr.status);
                console.log(data);
            },
            error: function(){
                response.message = 'Не вдалося деактивувати профіль';
            }
        });

    } else {
        response.message = 'Помилка 505'

    }
    if (response.message)
        $('#message').html('Виникла помилка. ' + response.message);
    else
        window.location = `search-registers-profile?id=${profileId}`;


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
    let input = $(this);

    if (validInputValue(input.val()) || $("#stateAgency").val().trim() !== '') {
        input.closest('fieldset').removeClass('invalid');
        $("#stateAgency").closest('fieldset').removeClass('invalid');

        $("#searchBtn").prop('disabled', false);
    } else {
        input.closest('fieldset').addClass('invalid');
        $("#searchBtn").prop('disabled', true);
    }

});

$("#stateAgency").keyup(function () {
    let input = $(this);

    if (validInputValue(input.val()) || $("#email").val().trim() !== '') {
        input.closest('fieldset').removeClass('invalid');
        $("#email").closest('fieldset').removeClass('invalid');

        $("#searchBtn").prop('disabled', false);
    } else {
        input.closest('fieldset').addClass('invalid');
        $("#searchBtn").prop('disabled', true);
    }


});

function validInputValue(value) {
    return !(value === ' ' || value.trim() === '' || reg_exp_more_than_one_space.test(value));
}