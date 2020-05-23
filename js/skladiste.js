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