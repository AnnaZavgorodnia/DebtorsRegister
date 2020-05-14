const reg_exp_more_than_one_space = /\s{2,}/;

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
    window.location = 'search-debtor';
});

$('#createForm').submit(async function (e) {

    e.preventDefault();

    let full_name = $('#fullName').val();
    let birth_date = new Date($('#birthDate').val()).toISOString();
    let passport_number = $('#passportNumber').val();
    let identification_code = $('#identificationCode').val();
    let chargeback_category = $('#categorySelect_33 option:selected').val();
    let debtor_bank_account_number = $('#debtorBankAccountNumber').val();
    let debtor_phone_number = $('#debtorPhoneNumber').val();
    let debtor_fax_number = $('#debtorFaxNumber').val();
    let debtor_email = $('#debtorEmail').val();
    let contractor_full_name = $('#contractorFullname').val();
    let contractor_bank_account_number = $('#contractorBankAccountNumber').val();
    let contractor_phone_number = $('#contractorPhoneNumber').val();
    let contractor_fax_number = $('#contractorFaxNumber').val();
    let contractor_email = $('#contractorEmail').val();
    let executive_document_arrival_date = new Date($('#executiveDocumentArrivalDate').val()).toISOString();
    let executive_document_receiver = $('#executiveDocumentReceiver').val();
    let cover_letter_present = !$('#coverLetterPresent').is(":checked");
    let cover_letter_correspondent = $('#coverLetterCorrespondent').val();
    let cover_letter_creation_date = $('#coverLetterCreationDate').val();
    let cover_letter_number = $('#coverLetterNumber').val();
    let executive_document_title = $('#executiveDocumentTitle').val();
    let executive_document_date = new Date($('#executiveDocumentDate').val()).toISOString();
    let executiveDocumentNumber = $('#executiveDocumentNumber').val();
    let issuer_state_agency = $('#issuerStateAgency').val();
    let issuer_full_name = $('#issuerFullname').val();
    let issuer_position = $('#issuerPosition').val();
    let document_date_of_entry_into_force = new Date($('#documentDateOfEntryIntoForce').val()).toISOString();
    let amount_of_money_to_be_recovered = $('#amountOfMoneyToBeRecovered').val();
    let decision_implementation_details = $('#decisionImplementationDetails').val();
    let is_legal_entity = $('#physicalDebtor').hasClass('ng-hide');


    let data = {
       obligorFullName: full_name,
       obligorBirthDate: birth_date,
       obligorPassportNumber: passport_number,
       obligorIdentificationCode: identification_code,
       chargebackCategory: chargeback_category,
       obligorBankAccountNumber: debtor_bank_account_number,
       obligorPhoneNumber: debtor_phone_number,
       obligorFaxNumber: debtor_fax_number,
       obligorEmail: debtor_email,
       contractorFullName: contractor_full_name,
       contractorBankAccountNumber: contractor_bank_account_number,
       contractorPhoneNumber: contractor_phone_number,
       contractorFaxNumber: contractor_fax_number,
       contractorEmail: contractor_email,
       executiveDocumentArrivalDate: executive_document_arrival_date,
       executiveDocumentReceiver: executive_document_receiver,
       coverLetterPresent: cover_letter_present,
       coverLetterCorrespondent: cover_letter_correspondent,
       coverLetterCreationDate: cover_letter_creation_date,
       coverLetterNumber: cover_letter_number,
       executiveDocumentTitle: executive_document_title,
       executiveDocumentDate: executive_document_date,
       executiveDocumentNumber: executiveDocumentNumber,
       issuerStateAgency: issuer_state_agency,
       issuerFullName: issuer_full_name,
       issuerPosition: issuer_position,
       documentDateOfEntryIntoForce: document_date_of_entry_into_force,
       amountOfMoneyToBeRecovered: amount_of_money_to_be_recovered,
       decisionImplementationDetails: decision_implementation_details,
       isLegalEntity: is_legal_entity
    };


    console.log("data:");
    console.log(data);

    await $.ajax({
         url: '/api/record',
         type: 'post',
         data: JSON.stringify(data),
         contentType: "application/json",
         success: function(data, textStatus, xhr) {
             console.log(xhr.status);
             console.log(data);
             window.location = `detailed-record-info?id=${data}`;
         },
         error: function(){
             $("#message").html("Перевірте правильність введених даних");
         }
     });
});

$('input[type=text]').keyup(function () {
    if($(this).prop('required')){
        let val = $(this).val();

        if ( val === ' ' || reg_exp_more_than_one_space.test(val))
            $(this).closest('fieldset').addClass('invalid');
        else
            $(this).closest('fieldset').removeClass('invalid');
    }
});
