$('#showInfo').click(function () {

    let info = $('#info');

    if (info.hasClass('ng-hide'))
        info.removeClass('ng-hide')
    else
        info.addClass('ng-hide');
});

function uniqueBy(a, cond) {
  return a.filter((e, i) => a.findIndex(e2 => cond(e, e2)) === i);
}

$(document).ready(async function () {

     let data = await  $.ajax({
             url: '/api/record?chargebackCategory=3',
             type: 'get'
         });

     let temp = data.map(el => ({
                                      fullname: el.obligor.fullName,
                                      birth_date: el.obligor.birthDate
                             }));

    let parsed_data = uniqueBy(temp, (o1, o2) => o1.fullname === o2.fullname);

    console.log("parsed_data:");
    console.log(parsed_data);

    $('#numberOfRecords').text(`Кількість записів в реєстрі: ${parsed_data.length}`);

    let index = 1;

    parsed_data.forEach(function (entity) {
        let entityElement = `<tr class="print-no-page-break">
                    <td data-title="№"><span class="cell-content">${index}</span></td>
                    <td data-title="Прізвище, ім’я, по батькові"><span
                            class="cell-content">${entity.fullname}</span>
                    </td>
                    <td data-title="Дата народження"><span class="cell-content">${entity.birth_date}</span></td>
                    <td data-title="Детально">
                        <span class="cell-content">
                        <a tabindex="12" href="search-debtor?fullname=${entity.fullname}&type=physical">
                            Шукати у єдиному реєстрі боржників
                        </a>
                        </span>
                    </td>
                </tr>`;

        $("#results").append(entityElement);

        index++;
    });

});
