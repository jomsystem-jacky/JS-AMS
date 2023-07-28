function InitCurrencySelectOptions(selectId, currencyId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/CurrencyAPI/All",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, country) {
                $(selectId).append('<option value="' + country.id + '">' + country.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof currencyId != 'undefined')
                SetCurrencySelectValue(selectId, currencyId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetCurrencySelectValue(selectId, currencyId) {
    $(selectId).val(currencyId);
    $(selectId).selectpicker('refresh');
}
