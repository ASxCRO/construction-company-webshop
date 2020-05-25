$('.menu .item')
.tab()
;

function RemoveActiveTab()
{
  var activeTabHeader = $('.item.active')[0];
  var activeTabContent= $('.segment.active')[0];
  $(activeTabHeader).removeClass('active');
  $(activeTabContent).removeClass('active');
}

function RedirectToStanjeTab()
{
  RemoveActiveTab();
  let stanjeTabHeader = $('#stanjeTabHeader');
  let stanjeTabContent = $('#stanjeTabContent');
  $(stanjeTabHeader).addClass('active');
  $(stanjeTabContent).addClass('active');

}

function RedirectToDokumentiTab()
{
  RemoveActiveTab();
  let dokumentiTabHeader = $('#dokumentiTabHeader');
  let dokumentiTabContent = $('#dokumentiTabContent');
  $(dokumentiTabHeader).addClass('active');
  $(dokumentiTabContent).addClass('active');
}


$.extend( true, $.fn.dataTable.defaults, {
  "ordering": false,
      "info":     false,
      "filter": false,
      "search": false,
      "lengthChange": true,
      order: [[ 2, "desc" ]],
      stateSave: true,
      "language": {
        "decimal": ",",
        "thousands": ".",
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Croatian.json"
      },
      "dom": '<"top"i>t<"bottom"flp><"clear">',
      "lengthMenu": [[2, 4, 6,8], [2, 4, 6,8]],
} );

$(document).ready(function() {
  $('#stanjeTablica').DataTable();
});