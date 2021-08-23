$(document).ready(function () {
    $("#filter-employee").on("change", function () {
        var value = $(this).val().toLowerCase();
        $("#ts-list tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

document.getElementById('clear').onclick = function () {
    var select = document.getElementById('filter-employee');
    select.selectedIndex = 0;
    var value = $(this).val().toLowerCase();
    $("#ts-list tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    };
