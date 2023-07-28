function InitStorageAreaByCompanyId(companyId, selectId, storageId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
        },
        url: "/api/v1/StorageAreaAPI/GetStorageAreaByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, storageArea) {
                $(selectId).append('<option value="' + storageArea.id + '">' + storageArea.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof branchId != 'undefined')
                SetSelectStorageAreaValue(selectId, storageId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectStorageAreaValue(selectId, storageId) {
    $(selectId).val(storageId);
    $(selectId).selectpicker('refresh');
}
