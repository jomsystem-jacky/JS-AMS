"use strict";

var currentTab = 0;
ShowTab(currentTab);

function ShowTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("PrevBtn").style.display = "none";
    } else {
        document.getElementById("PrevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("NextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("NextBtn").innerHTML = "Next";
    }

    var w = document.getElementsByClassName("wizard-bg");

    FixStepIndicator(n)
}

function FixStepIndicator(n) {
    var i, x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";

    var w, y = document.getElementsByClassName("wizard-bg");

    for (w = 0; w < y.length; w++) {

        y[w].className = y[w].className.replace(" bg-white", "");
    }

    console.log(n);

    y[n].className += " bg-white";
}

function NextPrev(n) {
    var x = document.getElementsByClassName("tab");

    x[currentTab].style.display = "none";

    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        return false;
    }
    ShowTab(currentTab);
}