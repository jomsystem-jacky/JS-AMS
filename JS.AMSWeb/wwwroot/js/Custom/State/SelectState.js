function InitStateSelectOptions(selectId) {
    var formData = { name: "" };
    $.ajax({
        async: true,
        method: 'POST',
        data: JSON.stringify(formData),
        url: "/Administration/AreaManagement/State/GetAllStates",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof stateId != 'undefined')
                SetStateSelectValue();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function InitStateByCountrySelectOptions(countryId, selectId,stateId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: { "countryId": countryId },
        url: "/api/v1/StateAPI/AllByCountry",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof stateId != 'undefined')
                SetStateSelectValue(selectId,stateId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetStateSelectValue(selectId, stateId) {
    $(selectId).val(stateId);
    $(selectId).selectpicker('refresh');
}
