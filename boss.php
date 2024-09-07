<?php
if(isset($_GET['BossName'])) {
  $bossname = $_GET['BossName'];
} else {
  $bossname = "NaN";
}
if(isset($_GET['MaxHP'])) {
  $hp = $_GET['MaxHP'];
} else {
  $hp = 0;
}
if(isset($_GET['ShowHP'])) {
  $showHP = TRUE;
} else {
  $showHP = FALSE;
}
?>


<html>
<head>
  <title><?echo $bossname?></title>
  <link rel="icon" href="Icon.png" type="image/gif" sizes="16x16">
  <link rel="stylesheet" href="Main.css">
</head>

<body style="background-color:#fefefe; color:#111;">
<table class="main">
  <tr>
    <td rowspan="2">
      <img width="70%" height="70%">
    </td>
    <td>
      <h1><?echo $bossname?></h1>
      Hp......
    </td>
  </tr>
  <tr>
    <td>
      cose...
      ....
      .
      .....
      ..
    </td>
  </tr>
  </table>

  <script type="text/javascript" src="Main.js"></script>
</body>
</html>