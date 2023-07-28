function InitSelectIndividualClientOptions(selectId, individualClientId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/ClientAPI/GetIndividualClient",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, individualClient) {
                $(selectId).append('<option value="' + individualClient.id + '">' + individualClient.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof individualClientId != 'undefined')
                SetSelectIndividualClientValue(selectId, individualClientId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitSelectBrandExceptCurrentBrandOptions(selectId, individualClientId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "individualClientId": individualClientId
        },
        url: "/api/v1/ClientAPI/GetIndividualClient",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, individualClient) {
                $(selectId).append('<option value="' + individualClient.id + '">' + individualClient.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectIndividualClientValue(selectId, individualClientId) {
    $(selectId).val(individualClientId);
    $(selectId).selectpicker('refresh');
}