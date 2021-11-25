<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Confirmation</title>
	<style type="text/css">
		body{
			padding: 0;
			margin: 0;
			font-family: "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
		}
		.container{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.header {
			display: flex;
			background: #15ABA5;
			width: 100%;
			padding: 10px 0;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.header img{
			display: inline;
			height: 80px;
			width: 80px;
		}
		.content{
			padding: 50px;
		}
		.content > h4{
			color: #15ABA5;
			margin-bottom: 25px;
			font-size: 18px;
		}
		b{
			margin-top: 25px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<img src="<?php echo base_url('public/img/logo.svg'); ?>" alt="TeamHyk Logo">
		</div>
		<div class="content">
			<h4>Congratulations!</h4>
			<p>Your registration for TeamHyk's All Round Hiking has been confirmed.</p>
			<p>Remember to share the registration link with your friends so they can register</p>
			<p>Thanks</p>
			<b>&copy; TeamHyk<b>
		</div>
	</div>
</body>
</html>