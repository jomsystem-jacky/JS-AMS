let scrapBatteryResult = new Array();
let addedTradeInItems = new Array();

let isGetTradeInBatteryRunning = false;

async function GetTradeInBattery() {

    try {

        if (isGetTradeInBatteryRunning) {
            return;
        }

        isGetTradeInBatteryRunning = true;

        const postData = {
            companyBranchId: initCashSaleFormInfo.companyBranchId,
            priceBookId: initCashSaleFormInfo.priceBookId
        };

        const response = await fetch("/api/v1/ProductModule/Product/GetScrapBatteryList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        const scrapBatteries = await response.json();

        isProductContainerOpen = true;

        const tradeInSelectionContainer = document.getElementById('TradeInSelectionContainer');
        tradeInSelectionContainer.innerHTML = '';

        scrapBatteries.forEach(scrapBattery => {
            const scrapBatteryElement = document.createElement('div');
            scrapBatteryElement.classList.add('row');
            scrapBatteryElement.classList.add('pt-3');

            scrapBatteryElement.innerHTML = `
                    <div class="card p-5 mb-3 w-100" onclick="SelectScrapBattery('${scrapBattery.id}')">
                        <a>${scrapBattery.name}</a>
                    </div>
            `;

            tradeInSelectionContainer.appendChild(scrapBatteryElement);

            scrapBatteryResult.push(scrapBattery);
        });

        if (scrapBatteries.length == 0) {
            const scrapBatteryElement = document.createElement('div');

            scrapBatteryElement.innerHTML = `
                <div>
                    <a>No product found</a>
                </div>
            `;

            tradeInSelectionContainer.appendChild(scrapBatteryElement);
        }
    }
    catch (error) {

        Swal.fire({
            title: 'Success!',
            text: 'Operation completed successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

    } finally {
        isGetTradeInBatteryRunning = false;
    }
}

function SelectScrapBattery(id) {

    var closeButton = document.getElementById("TradeInItemModalCloseBtn");
    closeButton.click();

    var scrapBattery = scrapBatteryResult.find((scrapBattery) => scrapBattery.id === id);

    DrawSelectedTradeInBattery(scrapBattery);

    tempSelectedScrapBattery.push(scrapBattery);
}

function DrawSelectedTradeInBattery(scrapBattery) {

    var tradeInCheckbox = document.getElementById("W1_HasTradeIn");
    tradeInCheckbox.setAttribute("disabled", true);

    var tradeInAddBtnSection = document.getElementById("W1_TradeIn_AddBtnSection");
    tradeInAddBtnSection.classList.remove("d-none");

    const selectedTradeInContainer = document.getElementById('SelectedTradeInContainer');

    var scrapBatteryRow = `"TradeInRow-${scrapBattery.id}"`;

    const scrapBatteryElement = document.createElement('div');
    scrapBatteryElement.classList.add('row');
    scrapBatteryElement.setAttribute("id", scrapBatteryRow);

    scrapBatteryElement.innerHTML = `
        <div class="pl-3 pb-3">
            <span class="svg-icon svg-icon-danger" onclick="RemoveTradeIn('${scrapBattery.id}')" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
                        <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
                        <rect fill="#000000" x="6" y="11" width="12" height="2" rx="1"/>
                    </g>
                </svg>
            </span>
            <a class=pl-3>${scrapBattery.name}</a>
        </div>
    `;

    selectedTradeInContainer.appendChild(scrapBatteryElement);
}

function RemoveTradeIn(scrapBatteryId) {

    var scrapBattery = tempSelectedScrapBattery.find((scrapBattery) => scrapBattery.id === scrapBatteryId);
    if (scrapBattery) {

        const indexToRemove = tempSelectedScrapBattery.findIndex(scrapBattery => scrapBattery.id === scrapBatteryId);

        if (indexToRemove !== -1) {
            tempSelectedScrapBattery.splice(indexToRemove, 1);
        }
    }

    var scrapBatteryRowId = `"TradeInRow-${scrapBattery.id}"`;

    var scrapBatteryRow = document.getElementById(scrapBatteryRowId);
    if (scrapBatteryRow) {

        const selectedTradeInContainer = document.getElementById('SelectedTradeInContainer');
        selectedTradeInContainer.removeChild(scrapBatteryRow);

        if (tempSelectedScrapBattery.length == 0) {

            var tradeInCheckbox = document.getElementById("W1_HasTradeIn");
            tradeInCheckbox.checked = false;
            tradeInCheckbox.removeAttribute("disabled");

            var tradeInAddBtnSection = document.getElementById("W1_TradeIn_AddBtnSection");
            tradeInAddBtnSection.classList.add("d-none");
        }
    }

    if (!scrapBatteryRow) {
        console.log('cannot find');
    }
}