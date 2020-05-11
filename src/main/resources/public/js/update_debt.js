const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID = urlParams.get('id');
let id_code;

if (queryString) {
    if (ID) {
        //TODO
        // запрос на отримання запису по айді

        let testData = {
            "full_name": "full_name",
            "birth_date": "birth_date",
            "passport_number": "passport_number",
            "identification_code": "identification_code",
            "chargeback_category": "chargeback_category",
            "debtor_bank_account_number": "debtor_bank_account_number",
            "debtor_phone_number": "debtor_phone_number",
            "debtor_fax_number": "debtor_fax_number",
            "debtor_email": "debtor_email",
            "contractor_full_name": "contractor_full_name",
            "contractor_bank_account_number": "contractor_bank_account_number",
            "contractor_phone_number": "contractor_phone_number",
            "contractor_fax_number": "contractor_fax_number",
            "contractor_email": "contractor_email",
            "executive_document_arrival_date": "executive_document_arrival_date",
            "cover_letter_present": false,
            "cover_letter_correspondent": "cover_letter_correspondent",
            "cover_letter_creation_date": "cover_letter_creation_date",
            "cover_letter_number": "cover_letter_number",
            "executive_document_title": "executive_document_title",
            "executive_document_reciever": "executive_document_reciever",
            "executive_document_date": "executive_document_date",
            "executive_document_number": "executiveDocumentNumber",
            "issuer_state_agency": "issuer_state_agency",
            "issuer_full_name": "issuer_full_name",
            "issuer_position": "issuer_position",
            "document_date_of_entry_into_force": "document_date_of_entry_into_force",
            "amount_of_money_to_be_recovered": "amount_of_money_to_be_recovered",
            "decision_implementation_details": "decision_implementation_details",
            "is_legal_entity": true
        };

        let data = "{\n" +
            "            \"full_name\": \"full_name\",\n" +
            "            \"birth_date\": \"12.12.2020\",\n" +
            "            \"passport_number\": \"passport_number\",\n" +
            "            \"identification_code\": \"identification_code\",\n" +
            "            \"chargeback_category\": \"4\",\n" +
            "            \"debtor_bank_account_number\": \"debtor_bank_account_number\",\n" +
            "            \"debtor_phone_number\": \"debtor_phone_number\",\n" +
            "            \"debtor_fax_number\": \"debtor_fax_number\",\n" +
            "            \"debtor_email\": \"debtor_email\",\n" +
            "            \"contractor_full_name\": \"contractor_full_name\",\n" +
            "            \"contractor_bank_account_number\": \"contractor_bank_account_number\",\n" +
            "            \"contractor_phone_number\": \"contractor_phone_number\",\n" +
            "            \"contractor_fax_number\": \"contractor_fax_number\",\n" +
            "            \"contractor_email\": \"contractor_email\",\n" +
            "            \"executive_document_arrival_date\": \"executive_document_arrival_date\",\n" +
            "            \"cover_letter_present\": false,\n" +
            "            \"cover_letter_correspondent\": \"cover_letter_correspondent\",\n" +
            "            \"cover_letter_creation_date\": \"cover_letter_creation_date\",\n" +
            "            \"cover_letter_number\": \"cover_letter_number\",\n" +
            "            \"executive_document_title\": \"executive_document_title\",\n" +
            "            \"executive_document_reciever\": \"executive_document_reciever\",\n" +
            "            \"executive_document_date\": \"executive_document_date\",\n" +
            "            \"executive_document_number\": \"executiveDocumentNumber\",\n" +
            "            \"issuer_state_agency\": \"issuer_state_agency\",\n" +
            "            \"issuer_full_name\": \"issuer_full_name\",\n" +
            "            \"issuer_position\": \"issuer_position\",\n" +
            "            \"document_date_of_entry_into_force\": \"document_date_of_entry_into_force\",\n" +
            "            \"amount_of_money_to_be_recovered\": \"amount_of_money_to_be_recovered\",\n" +
            "            \"decision_implementation_details\": \"decision_implementation_details\",\n" +
            "            \"is_legal_entity\": true\n" +
            "        }";

        let parsed_data = JSON.parse(data);

        $('#fullName').val(parsed_data.full_name);
        $('#birthDate').val(parsed_data.birth_date);
        $('#passportNumber').val(parsed_data.passport_number);
        $('#identificationCode').val(parsed_data.identification_code);
        $(`#categorySelect_33 option[value=${parsed_data.chargeback_category}]`).attr('selected', 'selected');
        $('#debtorBankAccountNumber').val(parsed_data.debtor_bank_account_number);
        $('#debtorPhoneNumber').val(parsed_data.debtor_phone_number);
        $('#debtorFaxNumber').val(parsed_data.debtor_fax_number);
        $('#debtorEmail').val(parsed_data.debtor_email);

        $('#contractorFullname').val(parsed_data.contractor_full_name);
        $('#contractorBankAccountNumber').val(parsed_data.contractor_bank_account_number);
        $('#contractorPhoneNumber').val(parsed_data.contractor_phone_number);
        $('#contractorFaxNumber').val(parsed_data.contractor_fax_number);
        $('#contractorEmail').val(parsed_data.contractor_email);

        $('#coverLetterNotPresent').prop('checked', !parsed_data.cover_letter_present);
        if (!parsed_data.cover_letter_present)
            $('#coverLetterInfo').addClass('ng-hide');

        $('#coverLetterCorrespondent').val(parsed_data.cover_letter_correspondent);
        $('#coverLetterCreationDate').val(parsed_data.cover_letter_creation_date);
        $('#coverLetterNumber').val(parsed_data.cover_letter_number);

        $('#executiveDocumentArrivalDate').val(parsed_data.executive_document_arrival_date);
        $('#executiveDocumentReceiver').val(parsed_data.executive_document_reciever);
        $('#executiveDocumentTitle').val(parsed_data.executive_document_title);
        $('#executiveDocumentDate').val(parsed_data.executive_document_date);
        $('#executiveDocumentNumber').val(parsed_data.executive_document_number);

        $('#issuerStateAgency').val(parsed_data.issuer_state_agency);
        $('#issuerFullname').val(parsed_data.issuer_full_name);
        $('#issuerPosition').val(parsed_data.issuer_position);

        $('#documentDateOfEntryIntoForce').val(parsed_data.document_date_of_entry_into_force);
        $('#amountOfMoneyToBeRecovered').val(parsed_data.amount_of_money_to_be_recovered);
        $('#decisionImplementationDetails').val(parsed_data.decision_implementation_details);

        if (parsed_data.is_legal_entity) {
            $('#physicalDebtor').addClass('ng-hide');

            $('.legalLabel').removeClass('ng-hide');
            $('.physicalLabel').addClass('ng-hide');
        } else {
            $('#physicalDebtor').removeClass('ng-hide');

            $('.physicalLabel').removeClass('ng-hide');
            $('.legalLabel').addClass('ng-hide');
        }

        id_code = parsed_data.identification_code;


    } else {
        //invalid query
        window.location = 'search_debtor.html';
    }

}

$('#coverLetterPresent').change(function () {
    if ($(this).is(":checked"))
        $('#coverLetterInfo').addClass('ng-hide');
    else
        $('#coverLetterInfo').removeClass('ng-hide');
});

$('#cancelUpdate').click(function (e) {
    e.preventDefault();

    let type = $('.legalLabel').hasClass('ng-hide') ? 'physical' : 'legal';
    window.location = `search_debtor.html?id_code=${id_code}&type=${type}`;
});

$('#updateForm').submit(function (e) {

    e.preventDefault();


    let full_name = $('#fullName').val();
    let birth_date = $('#birthDate').val();
    let passport_number = $('#passportNumber').val();
    let identification_code = $('#identificationCode').val();
    let chargeback_category = $('#categorySelect_33 option:selected').text()
    let debtor_bank_account_number = $('#debtorBankAccountNumber').val();
    let debtor_phone_number = $('#debtorPhoneNumber').val();
    let debtor_fax_number = $('#debtorFaxNumber').val();
    let debtor_email = $('#debtorEmail').val();
    let contractor_full_name = $('#contractorFullname').val();
    let contractor_bank_account_number = $('#contractorBankAccountNumber').val();
    let contractor_phone_number = $('#contractorPhoneNumber').val();
    let contractor_fax_number = $('#contractorFaxNumber').val();
    let contractor_email = $('#contractorEmail').val();
    let executive_document_arrival_date = $('#executiveDocumentArrivalDate').val();
    let executive_document_receiver = $('#executiveDocumentReceiver').val();
    let cover_letter_present = !$('#coverLetterPresent').is(":checked");
    let cover_letter_correspondent = $('#coverLetterCorrespondent').val();
    let cover_letter_creation_date = $('#coverLetterCreationDate').val();
    let cover_letter_number = $('#coverLetterNumber').val();
    let executive_document_title = $('#executiveDocumentTitle').val();
    let executive_document_date = $('#executiveDocumentDate').val();
    let executiveDocumentNumber = $('#executiveDocumentNumber').val();
    let issuer_state_agency = $('#issuerStateAgency').val();
    let issuer_full_name = $('#issuerFullname').val();
    let issuer_position = $('#issuerPosition').val();
    let document_date_of_entry_into_force = $('#documentDateOfEntryIntoForce').val();
    let amount_of_money_to_be_recovered = $('#amountOfMoneyToBeRecovered').val();
    let decision_implementation_details = $('#decisionImplementationDetails').val();
    let is_legal_entity = $('#physicalDebtor').hasClass('ng-hide');

    let data = {
        full_name,
        birth_date,
        passport_number,
        identification_code,
        chargeback_category,
        debtor_bank_account_number,
        debtor_phone_number,
        debtor_fax_number,
        debtor_email,
        contractor_full_name,
        contractor_bank_account_number,
        contractor_phone_number,
        contractor_fax_number,
        contractor_email,
        executive_document_arrival_date,
        executive_document_receiver,
        cover_letter_present,
        cover_letter_correspondent,
        cover_letter_creation_date,
        cover_letter_number,
        executive_document_title,
        executive_document_date,
        executiveDocumentNumber,
        issuer_state_agency,
        issuer_full_name,
        issuer_position,
        document_date_of_entry_into_force,
        amount_of_money_to_be_recovered,
        decision_implementation_details,
        is_legal_entity
    };


    //TODO
    // запрос на апдейт

    window.location = `detailed_record_info.html?id=${ID}`;

});

$("#deleteBtn").click(function () {
    $('#deleteModal').css('display', 'block');
});

$('.closeModal').click(function () {
    $('#deleteModal').css('display', 'none');
});

$('#confirmDeleteBtn').click(function () {
    //TODO
    // запрос на видалення запису

    $('#deleteModal').css('display', 'none');

    let ok = true;

    if (ok) {
        window.location = `search_debtor.html`;
    } else {
        $("#message").html("Виникла помилка. Не вдалося видалити запис!");
    }

});