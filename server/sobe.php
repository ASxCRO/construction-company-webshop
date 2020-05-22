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

<?php
	include 'classes.php';

	

?>
    <div class="container">
        <div class="jumbotron">
            <h1>Sobe</h1>
        </div>
        <div class="row">
        </div>
    </div>


<div class="container-fluid">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Rbr.</th>
					<th>Naziv sobe</th>
					<th>Opis sobe</th>
					<th>Kat</th>
					<th>Studenti</th>

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

	<script src="./js/sobe.js"></script>

</body>
</html>