function LoadRooms()
{
	$.ajax(
		{
			url:'action.php?jsonid=get_all_rooms',
			type:'GET',
			success:function (oData)
			{
				var oData = JSON.parse(oData);
				$('.table tbody').empty();
				for(var i=0; i<oData.length; i++)
				{
					var sTr = 	'<tr>'+
									'<td>'+i+'.</td>'+
									'<td>'+oData[i].naziv+'</td>'+
									'<td>'+oData[i].opis+'</td>'+
									'<td>'+oData[i].kat+'</td>'+
									'<td>';
									for(var j=0; j<oData[i].Studenti.length; j++)
									{
										sTr += oData[i].Studenti[j].ime + ' ' + oData[i].Studenti[j].prezime;
									}
									
									sTr += '</td>'+'</tr>';
					$('.table tbody').append(sTr);
	
				}
			}
		});
};
$(document).ready(function ()
{
	LoadRooms();
});
