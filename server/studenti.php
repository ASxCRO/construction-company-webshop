<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf‐8">
    <meta name="viewport" content="width=device‐width, initial‐scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="jumbotron">
            <h1>Studenti</h1>
        </div>
        <div class="row">
        </div>
    </div>

	<div class="container-fluid">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Rbr.</th>
					<th>JMBAG</th>
					<th>Ime</th>
					<th>Prezime</th>
					<th>Adresa</th>
					<th>Poštanski broj</th>
					<th>Godina studija</th>
					<th>Ostvareni ECTS bodovi</th>
					<th>Prosjek ocjena</th>
					<th>Naziv sobe</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>

	<div class="modal" id="modals" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      
	    </div>
	  </div>
	</div>

	<script src="./js/studenti.js"></script>
</body>
</html>