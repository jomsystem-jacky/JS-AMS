function InitDebtorOptions(companyId, selectId, debtorId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
        },
        url: "/api/v1/DebtorAPI/GetDebtorByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, debtor) {
                $(selectId).append('<option value="' + debtor.id + '">' + debtor.debtorCodeAndName + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof debtorId != 'undefined')
                SetSelectDebtorValue(selectId, debtorId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectDebtorValue(selectId, debtorId) {
    $(selectId).val(debtorId);
    $(selectId).selectpicker('refresh');
}
