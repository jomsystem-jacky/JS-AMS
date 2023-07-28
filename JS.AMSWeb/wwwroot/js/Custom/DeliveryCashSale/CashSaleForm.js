"use strict";

var currentPage = 0;
function RunWizard(page) {

	if (page == undefined) {

		page = 1;
	}

	console.log(page, 123123123123);

	let wizard = new KTWizard('CashSale_Wizard', {
		startStep: 1,
		clickableSteps: false,
	});

	if (currentPage != undefined) {

		if (page < currentPage) {

			wizard.goTo(page);
			currentPage = page;

			return;
		}

		console.log(orderDTO);

		var isValid = Validation(currentPage);
		if (isValid) {
			wizard.goTo(page);
			currentPage = page;
		}
		else {

			console.log("Go back");
			wizard.goTo(currentPage);
		}

	}

}

jQuery(document).ready(function () {
	RunWizard();
});

function Validation(p) {

	if (p == 0) {

		return true;
	}

	if (p == 1) {

		var items = selectedItemInfo.length;
		if (items == 0) {
			swal.fire(
				'Error!',
				'Please at least select an item!',
				'error'
			)

			return false;
		}
	}

	if (p == 2) {

		var csInfo = GetCustomerInfo();

		if (csInfo.dCustomerName == "") {

			swal.fire(
				'Error!',
				'Please fill in customer name!',
				'error'
			)

			return false;
		}
		if (csInfo.dCustomerPhoneNo == "") {

			swal.fire(
				'Error!',
				'Please fill in customer phone number!',
				'error'
			)

			return false;
		}
		//if (csInfo.dCustomerCarBrand == "") {

		//	swal.fire(
		//		'Error!',
		//		'Please fill in customer car brand!',
		//		'error'
		//	)

		//	return false;
		//}
		//if (csInfo.dCustomerCarModel == "") {

		//	swal.fire(
		//		'Error!',
		//		'Please fill in customer car model!',
		//		'error'
		//	)

		//	return false;
		//}
		if (csInfo.dCustomerPlateNumber == "") {

			swal.fire(
				'Error!',
				'Please fill in customer car plate number!',
				'error'
			)

			return false;
		}
	}

	if (p == 3) {

		if (Object.keys(orderDTO.selectedPaymentMethod).length === 0) {

			swal.fire(
				'Error!',
				'Please select at least a Payment Method!',
				'error'
			)

			return false;
		}
	}

	UpdateWizard4();

	return true;
}

function UpdateFinalResult() {

	orderDTO = new Object();

	let totalSubtotal = Number(0);
	let totalDiscount = Number(0);

	for (var i = 0; i < selectedItemInfo.length; i++) {

		let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, selectedItemInfo[i].itemQuantity));

		totalSubtotal += Number(itemBeforeDiscount);

		if (selectedItemInfo[i].itemDiscountInfo.dItemDiscountType == "Amount") {

			totalDiscount += Number(selectedItemInfo[i].itemDiscountInfo.dItemDiscountAmount);
		}

		if (selectedItemInfo[i].itemDiscountInfo.dItemDiscountType == "Percentage") {

			// Convert the percentage discount to a decimal value
			var discountPercentage = selectedItemInfo[i].itemDiscountInfo.dItemDiscountAmount / 100;

			// Calculate the discount amount
			var discountAmount = (selectedItemInfo[i].itemInfo.pricing * selectedItemInfo[i].itemQuantity) * discountPercentage;

			totalDiscount += discountAmount;
		}

		//totalDiscount += Number(selectedItemInfo[i].itemDiscountInfo.dDiscountAmount);
	}

	let totalOrderAmount = Number(totalSubtotal);

	for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

		let tradeInAmount = Number(ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity));
		totalOrderAmount -= Number(tradeInAmount);
	}

	var finalDTO = {

		selectedItemInfo: selectedItemInfo,
		selectedTradeInItemInfo: selectedTradeInItemInfo,
		customerInfo: customerInfo,
		selectedPaymentMethod: selectedPaymentMethod,
		multiPaymentMethodInfo: multiPaymentMethodInfo,
		totalSubtotal: Number(totalSubtotal),
		totalOrderAmount: Number(totalOrderAmount - totalDiscount),
		totalDiscountAmount: Number(totalDiscount)
	}

	orderDTO = finalDTO;
}

function UpdateWizard3() {

	$("#W3_Order_Info div").remove();
	$("#W3_TradeIn_Info div").remove();

	let totalItemAmount_W3 = Number(orderDTO.totalSubtotal);
	let totalOrderAmount_W3 = Number(orderDTO.totalOrderAmount);
	let totalDiscount_W3 = Number(orderDTO.totalDiscountAmount);

	var orderInfoItemRow = $("<div />");

	$(orderInfoSection_W3).append(orderInfoItemRow);

	for (var i = 0; i < orderDTO.selectedItemInfo.length; i++) {

		let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, orderDTO.selectedItemInfo[i].itemQuantity));

		//totalItemAmount_W3 += itemBeforeDiscount;

		console.log(orderDTO);

		var warrantyText = orderDTO.selectedItemInfo[i].itemWarranty?.displayText ?? "No";

		orderInfoItemRow.append($("<div class='row pb-3'>"
			+ "<div class='col-7'>"
			+ "<a class=''>" + orderDTO.selectedItemInfo[i].itemInfo.brandName + " " + orderDTO.selectedItemInfo[i].itemInfo.name + "</a>"
			+ "</div>"
			+ "<div class='col-2'>"
			+ "<a class=''>x" + orderDTO.selectedItemInfo[i].itemQuantity + "</a>"
			+ "</div>"
			+ "<div class='col-3'>"
			+ "<a class='float-right'>RM " + itemBeforeDiscount.toFixed(2) + "</a>"
			+ "</div>"
			+ "<div class='col-7'>"
			+ "<a class='text-muted'>" + warrantyText + " Warranty</a>"
			+ "</div>"
			+ "</div>"
		));
	}

	var orderInfoTradeInItemRow = $("<div />");

	$(orderTradeInSection_W3).append(orderInfoTradeInItemRow);

	for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

		let tradeInAmount = Number(ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity));

		orderInfoTradeInItemRow.append($("<div class='row pb-3'>"
			+ "<div class='col-9'>"
			+ "<a class='text-muted'>x " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity + " " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemLabel + "</a>"
			+ "</div>"
			+ "<div class='col-3'>"
			+ "<a class='float-right'>-RM " + tradeInAmount.toFixed(2) + "</a>"
			+ "</div>"
			+ "</div>"
		));
	}

	console.log(totalItemAmount_W3);
	console.log(totalOrderAmount_W3);
	console.log(totalDiscount_W3);

	subtotal_W3.innerHTML = "RM " + totalItemAmount_W3.toFixed(2);
	orderTotal_W3.innerHTML = "RM " + totalOrderAmount_W3.toFixed(2);
	discountTotal_W3.innerHTML = "-RM " + totalDiscount_W3.toFixed(2);

}

function UpdateWizard4() {

	const today = new Date();

	const options = { day: 'numeric', month: 'short', year: 'numeric' };
	const formattedDate = today.toLocaleDateString('en-US', options);

	$("#W4_Customer_Info div").remove();
	$("#W4_Order_Info div").remove();
	$("#W4_TradeIn_Info div").remove();

	let totalItemAmount_W4 = Number(orderDTO.totalSubtotal);
	let totalOrderAmount_W4 = Number(orderDTO.totalOrderAmount);
	let totalDiscount_W4 = Number(orderDTO.totalDiscountAmount);

	var orderInfoItemRow = $("<div />");

	$(orderInfoSection_W4).append(orderInfoItemRow);

	for (var i = 0; i < orderDTO.selectedItemInfo.length; i++) {

		let itemBeforeDiscount = Number(ItemTotal(selectedItemInfo[i].itemInfo.pricing, orderDTO.selectedItemInfo[i].itemQuantity));

		//totalItemAmount_W3 += itemBeforeDiscount;

		console.log(orderDTO);

		var warrantyText = orderDTO.selectedItemInfo[i].itemWarranty?.displayText ?? "No";

		orderInfoItemRow.append($("<div class='row pb-3'>"
			+ "<div class='col-7'>"
			+ "<a class=''>" + orderDTO.selectedItemInfo[i].itemInfo.brandName + " " + orderDTO.selectedItemInfo[i].itemInfo.name + "</a>"
			+ "</div>"
			+ "<div class='col-2'>"
			+ "<a class=''>x" + orderDTO.selectedItemInfo[i].itemQuantity + "</a>"
			+ "</div>"
			+ "<div class='col-3'>"
			+ "<a class='float-right'>RM " + itemBeforeDiscount.toFixed(2) + "</a>"
			+ "</div>"
			+ "<div class='col-7'>"
			+ "<a class='text-muted'>" + warrantyText + " Warranty</a>"
			+ "</div>"
			+ "</div>"
		));
	}

	var orderInfoTradeInItemRow = $("<div />");

	$(orderTradeInSection_W4).append(orderInfoTradeInItemRow);

	for (var i = 0; i < selectedTradeInItemInfo.length; i++) {

		let tradeInAmount = Number(ItemTotal(selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemPrice, selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity));

		orderInfoTradeInItemRow.append($("<div class='row pb-3'>"
			+ "<div class='col-9'>"
			+ "<a class='text-muted'>x " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemQuantity + " " + selectedTradeInItemInfo[i].tradeInInfo.dTradeInItemLabel + "</a>"
			+ "</div>"
			+ "<div class='col-3'>"
			+ "<a class='float-right'>-RM " + tradeInAmount.toFixed(2) + "</a>"
			+ "</div>"
			+ "</div>"
		));
	}

	console.log(orderDTO);

	subtotal_W4.innerHTML = "RM " + totalItemAmount_W4.toFixed(2);
	orderTotal_W4.innerHTML = "RM " + totalOrderAmount_W4.toFixed(2);
	discountTotal_W4.innerHTML = "-RM " + totalDiscount_W4.toFixed(2);
	customerName_W4.innerHTML = customerInfo.dCustomerName;
	customerPhoneNo_W4.innerHTML = customerInfo.dCustomerPhoneNo;
	address_W4.innerHTML = customerInfo.dCustomerAddress;
	plateNumber_W4.innerHTML = customerInfo.dCustomerPlateNumber;
	orderDate_W4.innerHTML = formattedDate;
	orderID_W4.innerHTML = "1232A";
}