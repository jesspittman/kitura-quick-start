var repairs = [];

function getRepairs() {
    var table = document.getElementById("openTable");
    tableUpdated();
    //GET request for open items to server.
    //After request -> clear table -> add rows for each item.
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

    serialInput.value = "";
    displayCheckbox.checked = false;
    soundCheckbox.checked = false;
    powerCheckbox.checked = false;
    connectorsCheckbox.checked = false;
    otherCheckbox.checked = false;
    commentInput.value = "";
    statusSelect.value = "";

    serialInput.disabled = false;    
    displayCheckbox.disabled = false;
    soundCheckbox.disabled = false;
    powerCheckbox.disabled = false;
    connectorsCheckbox.disabled = false;
    otherCheckbox.disabled = false;
    commentInput.disabled = false;
}

function addRepair(item) {
    repairs.push(item);    
    var table = document.getElementById("openTable");
    var row = table.insertRow(-1);
    row.insertCell(-1).innerHTML = item.serial;
    row.insertCell(-1).innerHTML = item.display ? "✔" : "";
    row.insertCell(-1).innerHTML = item.sound ? "✔" : "";
    row.insertCell(-1).innerHTML = item.power ? "✔" : "";
    row.insertCell(-1).innerHTML = item.connectors ? "✔" : "";
    row.insertCell(-1).innerHTML = item.other ? "✔" : "";
    row.insertCell(-1).innerHTML = item.comments;
    row.insertCell(-1).innerHTML = item.status;
    row.insertCell(-1).innerHTML = item.added.toLocaleDateString();
    row.insertCell(-1).innerHTML = item.updated.toLocaleDateString();
    row.addEventListener("click", () => { rowClicked(row, item)});
    tableUpdated();
}

function rowClicked(row, item) {
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

    serialInput.value = item.serial;
    displayCheckbox.checked = item.display;
    soundCheckbox.checked = item.sound;
    powerCheckbox.checked = item.power;
    connectorsCheckbox.checked = item.connectors;
    otherCheckbox.checked = item.other;
    commentInput.value = item.comments;
    statusSelect.value = item.status;

    serialInput.disabled = true;    
    displayCheckbox.disabled = true;
    soundCheckbox.disabled = true;
    powerCheckbox.disabled = true;
    connectorsCheckbox.disabled = true;
    otherCheckbox.disabled = true;
    commentInput.disabled = true;
}

function saveClicked(row, item) {
    var serialInput = document.getElementById("serialInput");
    var displayCheckbox = document.getElementById("displayCheckbox");
    var soundCheckbox = document.getElementById("soundCheckbox");
    var powerCheckbox = document.getElementById("powerCheckbox");
    var connectorsCheckbox = document.getElementById("connectorsCheckbox");
    var otherCheckbox = document.getElementById("otherCheckbox");
    var commentInput = document.getElementById("commentInput");
    var statusSelect = document.getElementById("statusSelect");

    var repair = { 
        "serial": serialInput.value,
        "display": displayCheckbox.checked,
        "sound": soundCheckbox.checked,
        "power": powerCheckbox.checked,
        "connectors": connectorsCheckbox.checked,
        "other": otherCheckbox.checked,
        "comments": commentInput.value,
        "status": statusSelect.value,
        "added": new Date(),
        "updated": new Date()
    };
    if (row) {
        updateRepair(row, item, repair);
    } else {
        addRepair(repair);
    }
}

function updateRepair(row, oldItem, newItem) {
    tableUpdated();
}

function tableUpdated() {
    var table = document.getElementById("openTable");
    if (repairs.length > 0) {
        table.style.display = "block";
    } else {
        table.style.display = "none"; //Also show text saying no open orders.
    }
}