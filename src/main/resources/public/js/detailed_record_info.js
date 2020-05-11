$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (queryString) {
        if (id) {
            //TODO request get record by id

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
                "executiveDocumentNumber": "executiveDocumentNumber",
                "issuer_state_agency": "issuer_state_agency",
                "issuer_full_name": "issuer_full_name",
                "issuer_position": "issuer_position",
                "document_date_of_entry_into_force": "document_date_of_entry_into_force",
                "amount_of_money_to_be_recovered": "amount_of_money_to_be_recovered",
                "decision_implementation_details": "decision_implementation_details",
                "is_legal_entity": true
            };

            let data = "{\n" +
                "                \"full_name\": \"Вороніна Вероніка Анатоліївна\",\n" +
                "                \"birth_date\": \"09.10.1987\",\n" +
                "                \"passport_number\": \"АВ233246242435\",\n" +
                "                \"identification_code\": \"87643562962369\",\n" +
                "                \"chargeback_category\": \"стягнення коштів на користь держави\",\n" +
                "                \"debtor_bank_account_number\": \"25482753287792\",\n" +
                "                \"debtor_phone_number\": \"+380939393939\",\n" +
                "                \"debtor_fax_number\": \"4432885\",\n" +
                "                \"debtor_email\": \"debtor@gmail.com\",\n" +
                "                \"contractor_bank_account_number\": \"53454363462\",\n" +
                "                \"contractor_phone_number\": \"+380535353535\",\n" +
                "                \"contractor_fax_number\": \"6345663\",\n" +
                "                \"contractor_email\": \"contractor@gmail.com\",\n" +
                "                \"executive_document_arrival_date\": \"12.12.2019\",\n" +
                "                \"executive_document_receiver\": \"інший орган, посадова особа Корабельний РВ ДВС м Херсон\",\n" +
                "                \"cover_letter_present\": false,\n" +
                "                \"cover_letter_correspondent\": \"cover_letter_correspondent\",\n" +
                "                \"cover_letter_creation_date\": \"cover_letter_creation_date\",\n" +
                "                \"cover_letter_number\": \"cover_letter_number\",\n" +
                "                \"executive_document_title\": \"Назва виконавчого документу\",\n" +
                "                \"executive_document_date\": \"01.01.2019\",\n" +
                "                \"executiveDocumentNumber\": \"4234342\",\n" +
                "                \"issuer_state_agency\": \"Переяслав-Хмельницький міськрайонний відділ державної виконавчої служби Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
                "                \"issuer_full_name\": \"Марченко Ярослав Олександрович\",\n" +
                "                \"issuer_position\": \"Секретар\",\n" +
                "                \"document_date_of_entry_into_force\": \"01.02.2019\",\n" +
                "                \"amount_of_money_to_be_recovered\": \"35435345\",\n" +
                "                \"decision_implementation_details\": \"Не надано інформації\",\n" +
                "                \"is_legal_entity\":true\n" +
                "            }";


            let parsed_data = JSON.parse(data);


            let debtInfoHtml = `<div>
                             <fieldset>
                                <label class="physicalLabel ${parsed_data.is_legal_entity ? 'ng-hide' : ''}" for="fullName">ПIБ боржника:</label>
                                <label class="legalLabel ${parsed_data.is_legal_entity ? '' : 'ng-hide'}" for="fullName">Найменування:</label>
                                <div id="fullName">${parsed_data.full_name ? parsed_data.full_name : 'Дані відсутні'}</div>
                            </fieldset>

                    <fieldset id="physicalDebtor" class="${parsed_data.is_legal_entity ? 'ng-hide' : ''}">
                        <fieldset>
                            <label for="birthDate">Дата народження боржника:</label>
                            <div id="birthDate">${parsed_data.birth_date ? parsed_data.birth_date : 'Дані відсутні'}</div>
                        </fieldset>

                        <fieldset>
                            <label for="passportNumber">Реєстраційний номер облікової картки платника
                                податків або серія та номер паспорта боржника:</label>
                            <div id="passportNumber">${parsed_data.passport_number ? parsed_data.passport_number : 'Дані відсутні'}</div>
                        </fieldset>
                    </fieldset>

                    <fieldset>
                        <label class="physicalLabel ${parsed_data.is_legal_entity ? 'ng-hide' : ''}" for="identificationCode">Ідентифікаційний код
                            боржника:</label>
                        <label class="legalLabel ${parsed_data.is_legal_entity ? '' : 'ng-hide'}" for="identificationCode">Ідентифікаційний код
                            юридичної
                            особи:</label>
                        <div id="identificationCode">${parsed_data.identification_code ? parsed_data.identification_code : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="categorySelect_33">
                            Категорія стягнення:
                        </label>
                        <div id="categorySelect_33">${parsed_data.chargeback_category ? parsed_data.chargeback_category : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="debtorBankAccountNumber">Реквізити рахунків боржника(за
                            наявності):</label>
                        <div id="debtorBankAccountNumber">${parsed_data.debtor_bank_account_number ? parsed_data.debtor_bank_account_number : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="debtorPhoneNumber">Номер телефону боржника(за наявності):</label>
                        <div id="debtorPhoneNumber">${parsed_data.debtor_phone_number ? parsed_data.debtor_phone_number : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="debtorFaxNumber">Номер факсу боржника(за
                            наявності):</label>
                        <div id="debtorFaxNumber">${parsed_data.debtor_fax_number ? parsed_data.debtor_fax_number : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="debtorEmail">Адреса електронної пошти боржника:</label>
                        <div id="debtorEmail">${parsed_data.debtor_email ? parsed_data.debtor_email : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="contractorBankAccountNumber">Реквізити рахунків стягувача(за
                            наявності):</label>
                        <div id="contractorBankAccountNumber">${parsed_data.contractor_bank_account_number ? parsed_data.contractor_bank_account_number : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="contractorPhoneNumber">Номер телефону стягувача(за
                            наявності):</label>
                        <div id="contractorPhoneNumber">${parsed_data.contractor_phone_number ? parsed_data.contractor_phone_number : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="contractorFaxNumber">Номер факсу стягувача(за
                            наявності):</label>
                        <div id="contractorFaxNumber">${parsed_data.contractor_fax_number ? parsed_data.contractor_fax_number : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="contractorEmail">Адреса електронної пошти стягувача:</label>
                        <div id="contractorEmail">${parsed_data.contractor_email ? parsed_data.contractor_email : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="executiveDocumentArrivalDate">Дата надходження виконавчого
                            документу:</label>
                        <div id="executiveDocumentArrivalDate">${parsed_data.executive_document_arrival_date ? parsed_data.executive_document_arrival_date : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="executiveDocumentReceiver">Найменування органу державної виконавчої
                            служби або ПІБ приватного
                            виконавця, до якого надійшов виконавчий
                            документ:</label>
                        <div id="executiveDocumentReceiver">${parsed_data.executive_document_reciever ? parsed_data.executive_document_reciever : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset class="${parsed_data.cover_letter_present ? 'ng-hide' : ''}">
                        <div class="checkbox">
                            <input type="checkbox" id="coverLetterPresent"
                                   tabindex="16" disabled checked>
                            <label for="coverLetterPresent"
                                   style="margin-left: 30px;margin-top: -3px;">
                                Виконавчий документ надійшов без заяви
                                (супровідного листа)</label>
                        </div>
                    </fieldset>


                    <fieldset id="coverLetterInfo" class="${parsed_data.cover_letter_present ? '' : 'ng-hide'}">
                        <fieldset>
                            <label for="coverLetterCorrespondent">Кореспондент заяви (супровідного листа)
                                про відкриття виконавчого провадження :</label>
                            <div id="coverLetterCorrespondent">${parsed_data.cover_letter_correspondent ? parsed_data.cover_letter_correspondent : 'Дані відсутні'}</div>
                        </fieldset>

                        <fieldset>
                            <label for="coverLetterCreationDate">Дата створення заяви (супровідного листа)
                                про відкриття виконавчого провадження:</label>
                            <div id="coverLetterCreationDate">${parsed_data.cover_letter_creation_date ? parsed_data.cover_letter_creation_date : 'Дані відсутні'}</div>
                        </fieldset>

                        <fieldset>
                            <label for="coverLetterNumber">Номер заяви (супровідного листа)
                                про відкриття виконавчого провадження:</label>
                            <div id="coverLetterNumber">${parsed_data.cover_letter_number ? parsed_data.cover_letter_number : 'Дані відсутні'}</div>
                        </fieldset>

                    </fieldset>


                    <fieldset>
                        <label for="executiveDocumentTitle">Назва виконавчого документу:</label>
                        <div id="executiveDocumentTitle">${parsed_data.executive_document_title ? parsed_data.executive_document_title : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="executiveDocumentDate">Дата видачі виконавчого документу:</label>
                        <div id="executiveDocumentDate">${parsed_data.executive_document_date ? parsed_data.executive_document_date : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="executiveDocumentNumber">Номер виконавчого документу:</label>
                        <div id="executiveDocumentNumber">${parsed_data.executiveDocumentNumber ? parsed_data.executiveDocumentNumber : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="issuerStateAgency">Найменування органу, що видав документ:</label>
                        <div id="issuerStateAgency">${parsed_data.issuer_state_agency ? parsed_data.issuer_state_agency : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="issuerFullname">ПІБ посадової особи, що видав(ла) документ:</label>
                        <div id="issuerFullname">${parsed_data.issuer_full_name ? parsed_data.issuer_full_name : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="issuerPosition">Посада посадової особи, що видав(ла)
                            документ:</label>
                        <div id="issuerPosition">${parsed_data.issuer_position ? parsed_data.issuer_position : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="documentDateOfEntryIntoForce">Дата набрання рішенням законної
                            (юридичної) сили:</label>
                        <div id="documentDateOfEntryIntoForce">${parsed_data.document_date_of_entry_into_force ? parsed_data.document_date_of_entry_into_force : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="amountOfMoneyToBeRecovered">Резолютивна частина рішення (у тому
                            числі сума грошових коштів,
                            яка підлягає стягненню за виконавчим документом):</label>
                        <div id="amountOfMoneyToBeRecovered">${parsed_data.amount_of_money_to_be_recovered ? parsed_data.amount_of_money_to_be_recovered : 'Дані відсутні'}</div>
                    </fieldset>

                    <fieldset>
                        <label for="decisionImplementationDetails">Відомості про негайне виконання
                            рішення (за наявності):</label>
                        <div id="decisionImplementationDetails">${parsed_data.decision_implementation_details ? parsed_data.decision_implementation_details : 'Дані відсутні'}</div>
                    </fieldset>
                </div>`;

            $('#debtInfo').append(debtInfoHtml);

        } else {
            //invalid query
            window.location = 'search_debtor.html';
        }

    }
});

