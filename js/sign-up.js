$(document).ready(function ()
{
	LoadStudente();
});

function LoadStudente()
{
	$.ajax(
	{
		url:'action.php?jsonid=get_all_students',
		type:'GET',
		success:function (oData)
		{
			var oData = JSON.parse(oData);
			console.log(oData);
			$('.table tbody').empty();
			for(var i=0; i<oData.length; i++)
			{
				var sTr = 	'<tr>'+
								'<td>'+i+'.</td>'+
								'<td>'+oData[i].JMBAG+'</td>'+
								'<td>'+oData[i].ime+'</td>'+
								'<td>'+oData[i].prezime+'</td>'+
								'<td>'+oData[i].adresa+'</td>'+
								'<td>'+oData[i].postanskiBroj+'</td>'+
								'<td>'+oData[i].godinaStudija+'</td>'+
								'<td>'+oData[i].ostvareniECTSbodovi+'</td>'+
								'<td>'+oData[i].prosjekOcjena+'</td>'+
								'<td>'+oData[i].Soba.naziv+'</td>'+
							'</tr>';
				
				$('.table tbody').append(sTr);

			}
		}
	});
}

