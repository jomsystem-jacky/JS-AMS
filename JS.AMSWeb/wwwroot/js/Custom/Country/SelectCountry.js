function InitCountrySelectOptions(selectId, countryId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/CountryAPI/All",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof countryId != 'undefined')
                SetCountrySelectValue(selectId, countryId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetCountrySelectValue(selectId, countryId) {
    $(selectId).val(countryId);
    $(selectId).selectpicker('refresh');
}
