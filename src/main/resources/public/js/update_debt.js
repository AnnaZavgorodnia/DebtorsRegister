const reg_exp_more_than_one_space = /\s{2,}/;

$(document).ready(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ID = urlParams.get('id');
    let id_code;

    if (queryString) {
        if (ID) {

            let datag = await $.ajax({
                url: `/api/record/${ID}`,
                type: 'get',
                success: function (data, textStatus, xhr) {
                    console.log(xhr.status);
                    console.log(data);
                },
                error: function () {
                    window.location="error";
                }
            });

            let parsed_data = {
                full_name: datag.obligor.fullName,
                birth_date: datag.obligor.birthDate,
                passport_number: datag.obligor.passportNumber,
                identification_code: datag.obligor.identificationCode,
                chargeback_category: datag.chargebackCategory.id,
                debtor_bank_account_number: datag.obligor.bankAccountNumber,
                debtor_phone_number: datag.obligor.phoneNumber,
                debtor_fax_number: datag.obligor.faxNumber,
                debtor_email: datag.obligor.email,
                contractor_bank_account_number: datag.contractor.bankAccountNumber,
                contractor_phone_number: datag.contractor.phoneNumber,
                contractor_fax_number: datag.contractor.faxNumber,
                contractor_email: datag.contractor.email,
                contractor_full_name: datag.contractor.fullName,
                executive_document_arrival_date: datag.executiveDocumentArrivalDate,
                cover_letter_present: datag.coverLetterPresence,
                cover_letter_correspondent: datag.coverLetterCorrespondent,
                cover_letter_creation_date: datag.coverLetterCreationDate,
                cover_letter_number: datag.coverLetterNumber,
                executive_document_title: datag.executiveDocumentTitle,
                executive_document_reciever: datag.executiveDocumentReceiver,
                executive_document_date: datag.executiveDocumentDate,
                executive_document_number: datag.executiveDocumentNumberOfIssue,
                issuer_state_agency: datag.executiveDocumentIssuer.stateAgency,
                issuer_full_name: datag.executiveDocumentIssuer.fullName,
                issuer_position: datag.executiveDocumentIssuer.position,
                document_date_of_entry_into_force: datag.documentDateOfEntryIntoForce,
                amount_of_money_to_be_recovered: datag.moneyAmountToBeRecovered,
                decision_implementation_details: datag.informationAboutImplementationOfDecision,
                is_legal_entity: datag.obligor.isLegalEntity
            }

            console.log("parsed_data:");
            console.log(parsed_data);



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
            window.location = 'search-debtor';
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
        window.location = `search-debtor?id_code=${id_code}&type=${type}`;
    });

    $('#updateForm').submit(async function (e) {

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

        await $.ajax({
            url: `/api/record/${ID}`,
            type: 'put',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data, textStatus, xhr) {
                console.log(xhr.status);
                console.log(data);
                window.location = `detailed-record-info?id=${ID}`
            },
            error: function(){
                $("#message").html("Перевірте правильність введених даних");
            }
        });

    });

    $("#deleteBtn").click(function () {
        $('#deleteModal').css('display', 'block');
    });

    $('.closeModal').click(function () {
        $('#deleteModal').css('display', 'none');
    });

    $('#confirmDeleteBtn').click(async function () {

        await $.ajax({
            url: `/api/record/${ID}`,
            type: 'delete'
        });

        $('#deleteModal').css('display', 'none');

        window.location = `search-debtor`;

    });

    $('input[type=text]').keyup(function () {
        if($(this).prop('required')) {
            let val = $(this).val();

            if (val === ' ' || reg_exp_more_than_one_space.test(val))
                $(this).closest('fieldset').addClass('invalid');
            else
                $(this).closest('fieldset').removeClass('invalid');
        }
    });

});

