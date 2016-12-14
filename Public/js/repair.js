var count = 0;

function getRepairs() {
    $.getJSON("/api/repairs", function (repairs) { 
        for (var i = 0; i < repairs.length; i++) {
            addRepair(repairs[i]);
        }
    });
}

function addClicked() {
    var serialInput = document.getElementById("serialInput");
    var displayCheckbox = document.getElementById("displayCheckbox");
    var soundCheckbox = document.getElementById("soundCheckbox");
    var powerCheckbox = document.getElementById("powerCheckbox");
    var connectorsCheckbox = document.getElementById("connectorsCheckbox");
    var otherCheckbox = document.getElementById("otherCheckbox");
    var commentInput = document.getElementById("commentInput");
    var statusSelect = document.getElementById("statusSelect");
    $("#updateModal").modal("show");
    $("#updateTitle")[0].innerHTML = "New repair order";
    $("#saveButton")[0].onclick = function() { saveClicked(); };

    serialInput.value = "";
    displayCheckbox.checked = false;
    soundCheckbox.checked = false;
    powerCheckbox.checked = false;
    connectorsCheckbox.checked = false;
    otherCheckbox.checked = false;
    commentInput.value = "";
    statusSelect.value = "Arrived";

    serialInput.disabled = false;    
    displayCheckbox.disabled = false;
    soundCheckbox.disabled = false;
    powerCheckbox.disabled = false;
    connectorsCheckbox.disabled = false;
    otherCheckbox.disabled = false;
    commentInput.disabled = false;
}

function addRepair(repair) {
    count++;   
    var table = document.getElementById("openTable");
    var row = table.insertRow(-1);
    updateRow(row, repair);
    $.post("/api/repairs", repair);
}

function rowClicked(row, repair) {
    var serialInput = document.getElementById("serialInput");
    var displayCheckbox = document.getElementById("displayCheckbox");
    var soundCheckbox = document.getElementById("soundCheckbox");
    var powerCheckbox = document.getElementById("powerCheckbox");
    var connectorsCheckbox = document.getElementById("connectorsCheckbox");
    var otherCheckbox = document.getElementById("otherCheckbox");
    var commentInput = document.getElementById("commentInput");
    var statusSelect = document.getElementById("statusSelect");
    $("#updateModal").modal("show");
    $("#updateTitle")[0].innerHTML = "Update repair order";
    $("#saveButton")[0].onclick = function() { saveClicked(row, repair); };

    serialInput.value = repair.serial;
    displayCheckbox.checked = repair.display;
    soundCheckbox.checked = repair.sound;
    powerCheckbox.checked = repair.power;
    connectorsCheckbox.checked = repair.connectors;
    otherCheckbox.checked = repair.other;
    commentInput.value = repair.comments;
    statusSelect.value = repair.status;

    serialInput.disabled = true;    
    displayCheckbox.disabled = true;
    soundCheckbox.disabled = true;
    powerCheckbox.disabled = true;
    connectorsCheckbox.disabled = true;
    otherCheckbox.disabled = true;
    commentInput.disabled = true;
}

function saveClicked(row, repair) {
    var serialInput = document.getElementById("serialInput");
    var displayCheckbox = document.getElementById("displayCheckbox");
    var soundCheckbox = document.getElementById("soundCheckbox");
    var powerCheckbox = document.getElementById("powerCheckbox");
    var connectorsCheckbox = document.getElementById("connectorsCheckbox");
    var otherCheckbox = document.getElementById("otherCheckbox");
    var commentInput = document.getElementById("commentInput");
    var statusSelect = document.getElementById("statusSelect");

    var newRepair = { 
        "serial": serialInput.value,
        "display": displayCheckbox.checked,
        "sound": soundCheckbox.checked,
        "power": powerCheckbox.checked,
        "connectors": connectorsCheckbox.checked,
        "other": otherCheckbox.checked,
        "comments": commentInput.value,
        "status": statusSelect.value,
    };
    if (row) {
        updateRepair(row, repair, newRepair);
    } else {
        addRepair(newRepair);
    }
}

function updateRepair(row, repair, newRepair) {
    for (var v in newRepair) {
        repair[v] = newRepair[v];
    }
    updateRow(row, repair);
    $.post("/api/repairs/" + repair["serial"], repair);
}

function updateRow(row, repair) {
    if (repair.status === "Closed") {
        row.remove();
        count--;
    } else {
        row.innerHTML = "";
        row.insertCell(-1).innerHTML = repair.serial;
        row.insertCell(-1).innerHTML = repair.display ? "✔" : "";
        row.insertCell(-1).innerHTML = repair.sound ? "✔" : "";
        row.insertCell(-1).innerHTML = repair.power ? "✔" : "";
        row.insertCell(-1).innerHTML = repair.connectors ? "✔" : "";
        row.insertCell(-1).innerHTML = repair.other ? "✔" : "";
        row.insertCell(-1).innerHTML = repair.comments;
        row.insertCell(-1).innerHTML = repair.status;
        row.insertCell(-1).innerHTML = (repair.dateAdded || new Date()).toLocaleDateString();
        row.insertCell(-1).innerHTML = (repair.updated || new Date()).toLocaleDateString();
        row.onclick = () => { rowClicked(row, repair)}; 
    }
    updateTable();    
}

function updateTable() {
    var table = document.getElementById("openTable");
    if (count > 0) {
        table.style.display = "block";
    } else {
        table.style.display = "none"; //Also show text saying no open orders.
    }
}