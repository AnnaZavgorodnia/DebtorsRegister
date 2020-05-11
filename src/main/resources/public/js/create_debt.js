$('input:radio[name="debtorType"]').change(
    function () {
        if ($(this).val() === 'physical') {
            $('#physicalDebtor').removeClass('ng-hide');

            $('.physicalLabel').removeClass('ng-hide');
            $('.legalLabel').addClass('ng-hide');

        } else if ($(this).val() === 'legal') {
            $('#physicalDebtor').addClass('ng-hide');

            $('.legalLabel').removeClass('ng-hide');
            $('.physicalLabel').addClass('ng-hide');
        }
    });
$('#coverLetterPresent').change(function () {
    if ($(this).is(":checked"))
        $('#coverLetterInfo').addClass('ng-hide');

    else
        $('#coverLetterInfo').removeClass('ng-hide');
});

$('#cleanForm').click(function (e) {
    $('#createForm')[0].reset();
    e.preventDefault();
});

$('#cancelCreate').click(function () {
    window.location = 'search_debtor.html';
});

$('#createForm').submit(function (e) {

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
    // запрос на створення запису

    let id = 1111; // з твого респонсу
    window.location = `detailed_record_info.html?id=${id}`;

});
