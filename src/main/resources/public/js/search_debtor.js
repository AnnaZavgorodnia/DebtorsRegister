$(document).ready(function () {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    let identification_code = urlParams.get('id_code');
    let fullname = urlParams.get('fullname');
    let type = urlParams.get('type');

    if ((fullname || identification_code) && type) {

        if (type === 'physical') {
            if (fullname) {
                let fullname_parts = fullname.split(' ');

                $("#inputSurname").val(fullname_parts[0]).trigger('keyup');
                $("#inputName").val(fullname_parts[1]).trigger('keyup');
                $("#inputPatro").val(fullname_parts[2]);
            }
            if (identification_code) {
                $("#inputPersonCode").val(identification_code).trigger('keyup');
            }

            $("#radioPhysical").prop('checked', 'checked');
            $('#searchBtnPhysical').trigger('click');

        } else if (type === 'legal') {

            if (identification_code) {
                $("#inputFirmCode").val(identification_code).trigger('keyup');
            }

            $('input:radio[name="debtorType"]').trigger('change');

            $("#radioLegalEntity").prop('checked', 'checked');
            $('#searchBtnLegal').trigger('click');
        }
    } else if (id) {
        setEntitiesById(id);
    }
});

async function setEntitiesById(id) {

    let debtorData = await getDebtorInfo(id);

    if (debtorData.isLegalEntity === true)
        setLegalEntities(debtorData.fullName, debtorData.identificationCode, null);
    else
        setPhysicalEntities(debtorData.fullName, null, debtorData.identificationCode, null);


}

function getDebtorInfo(id){
    console.log(`id: ${id}`);
    return $.ajax({
             url: `/api/search-debtor/${id}`,
             type: 'get',
             success: function(data, textStatus, xhr) {
                 console.log(xhr.status);
                 console.log(data);
             }
         });
}

async function setPhysicalEntities(fullname, birthday, identification_code, chargeback_category) {

    let data = await getData(fullname, identification_code, chargeback_category, false);

    let parsed_data = data.map(el => ({
        id: el.id,
        full_name: el.obligor.fullName,
        birth_date: el.obligor.birthDate,
        executive_document_receiver: el.executiveDocumentReceiver,
        issuer_state_agency: el.executiveDocumentIssuer.stateAgency,
        issuer_full_name: el.executiveDocumentIssuer.fullName,
        issuer_email: el.executiveDocumentIssuer.email,
        issuer_phone_number: el.executiveDocumentIssuer.phoneNumber,
        executive_document_number_of_issue: el.executiveDocumentNumberOfIssue,
        chargeback_category: el.chargebackCategory.title,
        is_active: el.isActive
    }));

    console.log("parsed_data:");
    console.log(parsed_data);

    let resTable = $('#physicalResultsTable');

    let all_are_not_active = parsed_data.every((el) => !el.is_active);

    if (parsed_data.length !== 0 && (!all_are_not_active || (MY_APP.user && MY_APP.user.role === 'REGISTER'))) {

        resTable.removeClass('ng-hide');
        $("#physicalResultsMessage").addClass('ng-hide');

        {
            let today = new Date();
            let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

            $('#physicalSearchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
        }


        parsed_data.forEach(function (entity) {
            let buttons = entity.is_active
                ? `<td>
                       <button type="button" class="btn btn--color-negative delete-btn" data-id="${entity.id}" data-toggle="modal" data-target="#deleteModal">Видалити</button>
                       <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">Редагувати</button>
                   </td>`
                : '';
            let html_for_register = (MY_APP.user && MY_APP.user.role === 'REGISTER')
                ? `<td class="${entity.is_active ? 'active' : 'archived'}">
                    ${entity.is_active ? 'Активний' : 'Архівований'}
                </td>
              ${buttons}
              <td data-title="Детально" >
                                  <span class="cell-content">
                                            <a href="detailed-record-info?id=${entity.id}">
                                                Детальна інформація
                                            </a>
                                  </span>
               </td>`
                : '';

            let entityElement = `<tr class="print-no-page-break">
                            <td>${entity.full_name}</td>
                            <td>${entity.birth_date}</td>
                            <td>${entity.executive_document_receiver}</td>
                            <td class="wide-column">${entity.issuer_state_agency}
                                <br>
                                <br> ${entity.issuer_full_name}
                                <br>
                                <span> тел: <a href="tel:${entity.issuer_phone_number}">${entity.issuer_phone_number}</a></span>
                                <br>
                                <span> email: <a
                                        href="mailto:${entity.issuer_email}">${entity.issuer_email}</a></span>
                            </td>
                            <td>${entity.executive_document_number_of_issue}</td>
                            <td>${entity.chargeback_category}</td>
                            ${html_for_register}
                        </tr>`;


            if (MY_APP.user && MY_APP.user.role === 'REGISTER')
                $("#physicalResults").append(entityElement);
            else if (entity.is_active)
                $("#physicalResults").append(entityElement);


        });

        $('.delete-btn').bind('click', function () {
            $('#deleteModal').css('display', 'block');

            let entityId = $(this).attr('data-id');

            $('#confirmDeleteBtn').attr('data-delete_id', entityId);
        });

        $('.update-btn').bind('click', function () {
            let entityId = $(this).attr('data-id');

            window.location = `update-debt?id=${entityId}&type=physical`;
        });


        $('html, body').animate({
            scrollTop: resTable.offset().top
        }, 1000);
    } else {
        $("#physicalResultsMessage").removeClass('ng-hide');

        $('html, body').animate({
            scrollTop: $("#physicalResultsMessage").offset().top
        }, 1000);
    }
}

async function setLegalEntities(fullname, identification_code, chargeback_category) {

    let data = await getData(fullname,identification_code, chargeback_category, true);

    let parsed_data = data.map(el => ({
                                 id: el.id,
                                 full_name: el.obligor.fullName,
                                 executive_document_receiver: el.executiveDocumentReceiver,
                                 issuer_state_agency: el.executiveDocumentIssuer.stateAgency,
                                 issuer_full_name: el.executiveDocumentIssuer.fullName,
                                 issuer_email: el.executiveDocumentIssuer.email,
                                 issuer_phone_number: el.executiveDocumentIssuer.phoneNumber,
                                 executive_document_number_of_issue: el.executiveDocumentNumberOfIssue,
                                 chargeback_category: el.chargebackCategory.title,
                                 is_active: el.isActive
                        }));

    console.log("parsed_data:");
    console.log(parsed_data);

    let resTable = $('#legalResultsTable');

    let all_are_not_active = parsed_data.every((el) => !el.is_active);

    if (parsed_data.length !== 0 && (!all_are_not_active || (MY_APP.user && MY_APP.user.role === 'REGISTER'))) {

        resTable.removeClass('ng-hide');
        $("#legalResultsMessage").addClass('ng-hide');

        {
            let today = new Date();
            let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

            $('#legalSearchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
        }

        parsed_data.forEach(function (entity) {
            let buttons = entity.is_active
                ? `<td >
                                            <button type="button" class="btn btn--color-negative delete-btn" data-id="${entity.id}" data-toggle="modal" data-target="#deleteModal">Видалити</button>
                                            <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">Редагувати</button>
               </td>`
                : '';
            let html_for_register = (MY_APP.user && MY_APP.user.role === 'REGISTER')
                ? `<td class="${entity.is_active ? 'active' : 'archived'}">
                    ${entity.is_active ? 'Активний' : 'Архівований'}
                </td>
                ${buttons}
                                        <td data-title="Детально" >
                                            <span class="cell-content">
                                            <a href="detailed-record-info?id=${entity.id}">
                                                Детальна інформація
                                            </a>
                                            </span>
                                        </td>`
                : '';

        let entityElement = `<tr class="print-no-page-break">
                                        <td>${entity.full_name}</td>
                                        <td>${entity.executive_document_receiver}</td>
                                        <td>${entity.issuer_state_agency}
                                            <br>
                                            <br> ${entity.issuer_full_name}
                                            <br>
                                            <span> тел: <a href="tel:${entity.issuer_phone_number}">${entity.issuer_phone_number}</a></span>
                                            <br>
                                            <span> email: <a href="mailto:${entity.issuer_email}">${entity.issuer_email}</a></span>
                                        </td>
                                        <td>${entity.executive_document_number_of_issue}</td>
                                        <td>${entity.chargeback_category}</td>
                                        ${html_for_register}
                                     </tr>`;

            if (MY_APP.user && MY_APP.user.role === 'REGISTER')
                $("#legalResults").append(entityElement);
            else if (entity.is_active)
                $("#legalResults").append(entityElement);
        });

        $('.delete-btn').bind('click', function () {
            $('#deleteModal').css('display', 'block');


            let entityId = $(this).attr('data-id');

            $('#confirmDeleteBtn').attr('data-delete_id', entityId);
        });

        $('.update-btn').bind('click', function () {
            let entityId = $(this).attr('data-id');

            window.location = `update-debt?id=${entityId}&type=legal`;
        });

        $('html, body').animate({
            scrollTop: resTable.offset().top
        }, 1000);
    } else {
        $("#legalResultsMessage").removeClass('ng-hide');

        $('html, body').animate({
            scrollTop: $("#legalResultsMessage").offset().top
        }, 1000);
    }
}

function getData(fullname, identification_code, chargeback_category, is_legal_entity){
    console.log(`fullname: ${fullname}`);
    console.log(`identification_code: ${identification_code}`);
    console.log(`chargeback_category: ${chargeback_category}`);
    console.log(`is_legal_entity: ${is_legal_entity}`);
    return $.ajax({
             url: '/api/search-debtor',
             type: 'get',
             data: $.param({fullName: fullname, identificationCode: identification_code, chargebackCategory: chargeback_category, isLegalEntity: is_legal_entity}),
             success: function(data, textStatus, xhr) {
                 console.log(xhr.status);
                 console.log(data);
             }
         });
}

$('input:radio[name="debtorType"]').change(
    function () {
        if ($(this).val() === 'physical') {
            $('#physicalPage').removeClass('ng-hide');
            $('#legalPage').addClass('ng-hide');
        } else if ($(this).val() === 'legal') {
            $('#legalPage').removeClass('ng-hide');
            $('#physicalPage').addClass('ng-hide');
        }
    });

//physical
$("#inputSurname").keyup(function () {
    let val = $(this).val();
    if (val.trim() !== '') {

        $('#surnameFieldset').removeClass('invalid');

        if ($('#nameFieldset').hasClass('invalid')) {
            $("#searchBtnPhysical").prop("disabled", true);

            if ($("#inputPersonCode").val() === '') {
                $('#codeFieldset').addClass('invalid');
            }
        } else {
            $("#searchBtnPhysical").prop("disabled", false);
            $('#codeFieldset').removeClass('invalid');
        }

    } else {
        $('#surnameFieldset').addClass('invalid');
        $("#searchBtnPhysical").prop("disabled", true);
    }
});

$("#inputName").keyup(function () {
    let val = $(this).val();
    if (val.trim() !== '') {
        $('#nameFieldset').removeClass('invalid');


        if ($('#surnameFieldset').hasClass('invalid')) {
            $("#searchBtnPhysical").prop("disabled", true);

            if ($("#inputPersonCode").val() === '') {
                $('#codeFieldset').addClass('invalid');
            }
        } else {
            $("#searchBtnPhysical").prop("disabled", false);
            $('#codeFieldset').removeClass('invalid');
        }

    } else {
        $('#nameFieldset').addClass('invalid');
        $("#searchBtnPhysical").prop("disabled", true);

    }
});

$("#inputPersonCode").keyup(function () {
    let val = $(this).val();
    if (val.trim() !== '') {
        $('#codeFieldset').removeClass('invalid');

        $('#nameFieldset').removeClass('invalid');
        $('#surnameFieldset').removeClass('invalid');

        $('#inputPersonCodeWarning').removeClass('ng-hide');

        $("#searchBtnPhysical").prop("disabled", false);

    } else {

        $('#inputPersonCodeWarning').addClass('ng-hide');

        $('#nameFieldset').addClass('invalid');
        $('#surnameFieldset').addClass('invalid');

        $("#searchBtnPhysical").prop("disabled", true);

        $('#codeFieldset').addClass('invalid');
    }
});

$('#cleanFormPhysical').click(function (e) {
    $('#physicalForm')[0].reset();

    $("#inputName").trigger('keyup');
    $("#inputSurname").trigger('keyup');
    $("#inputPersonCode").trigger('keyup');

    e.preventDefault();
});

$('#searchBtnPhysical').click(
    function (e) {
        e.preventDefault();
        $('#physicalResults').empty();

        $("#physicalResultsMessage").addClass('ng-hide');

        let surname = $("#inputSurname").val();
        let name = $("#inputName").val();
        let identification_code = $("#inputPersonCode").val();

        if (identification_code !== '' || (name !== '' && surname !== '')) {
            let patro = $('#inputPatro').val();
            let birth_date = $('#inputBirthDate').val();
            let chargeback_category = $('#categorySelect_33 option:selected').val();

            let fullname = [surname, name, patro].join(' ');

            setPhysicalEntities(fullname, birth_date, identification_code, chargeback_category);

        }
    }
);

//legal
$("#inputFirmName").keyup(function () {
    let val = $(this).val();
    if (val.trim() !== '') {

        $('#searchBtnLegal').prop('disabled', false);

    } else {
        if ($("#inputFirmCode").val().trim() !== '') {
            $('#searchBtnLegal').prop('disabled', false);
        } else
            $('#searchBtnLegal').prop('disabled', true);
    }
});

$("#inputFirmCode").keyup(function () {
    let val = $(this).val();
    if (val.trim() !== '') {

        $('#searchBtnLegal').prop('disabled', false);

    } else {
        if ($("#inputFirmName").val().trim() !== '') {
            $('#searchBtnLegal').prop('disabled', false);
        } else
            $('#searchBtnLegal').prop('disabled', true);
    }
});

$('#cleanFormLegal').click(function (e) {
    $('#legalForm')[0].reset();

    $("#inputFirmName").trigger('keyup');
    $("#inputFirmCode").trigger('keyup');

    e.preventDefault();
});

$('#searchBtnLegal').click(
    function (e) {
        e.preventDefault();

        $('#legalResults').empty();
        $("#legalResultsMessage").addClass('ng-hide');

        let firmName = $("#inputFirmName").val().trim();
        let identification_code = $("#inputFirmCode").val().trim();

        if (identification_code !== '' || firmName !== '') {
            let chargeback_category = $('#categorySelect_164 option:selected').val();

            setLegalEntities(firmName, identification_code, chargeback_category);
        } else {
        }
    }
);

// modal
$('.closeModal').click(function () {
    $('#deleteModal').css('display', 'none');
});

$('#confirmDeleteBtn').click(async function () {
    let id_to_delete = $(this).attr('data-delete_id');

    ($(`[data-id="${id_to_delete}"]`).closest('tr')).remove();

    $(this).attr('data-delete_id', '');
    $('#deleteModal').css('display', 'none');

    console.log(`id to delete : ${id_to_delete}`);

    await $.ajax({
               url: `/api/record/${id_to_delete}`,
               type: 'delete'
           });
});