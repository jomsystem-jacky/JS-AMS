function InitCityByStateSelectOptions(stateId, selectId, cityId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: { "stateId": stateId },
        url: "/api/v1/CityAPI/AllByState",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof cityId != 'undefined')
                SetCitySelectValue(selectId, cityId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetCitySelectValue(selectId, cityId) {
    $(selectId).val(cityId);
    $(selectId).selectpicker('refresh');
}
