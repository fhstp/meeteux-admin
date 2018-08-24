<?php
include 'connect.php';

$result = $conn->query("SELECT a.id AS id, a.timestamp AS atimestamp, a.liked AS liked, a.dismissed AS dismissed, a.createdAt AS createdAt, a.updatedAt AS updatedAt, a.userId AS userId, users.name AS userName, a.locationId AS locationId, locations.description AS locationDesc FROM activities AS a JOIN users ON a.userId = users.id JOIN locations ON a.locationId = locations.id ORDER BY a.timestamp DESC");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"' . $rs["id"] . '",';
    $outp .= '"timestamp":"' . $rs["atimestamp"] . '",';
    $outp .= '"liked":"' . $rs["liked"] . '",';
    $outp .= '"dismissed":"' . $rs["dismissed"] . '",';
    $outp .= '"createdAt":"' . $rs["createdAt"] . '",';
    $outp .= '"updatedAt":"' . $rs["updatedAt"] . '",';
    $outp .= '"userId":"' . $rs["userId"] . '",';
    $outp .= '"userName":"' . $rs["userName"] . '",';
    $outp .= '"locationId":"' . $rs["locationId"] . '",';
    $outp .= '"locationDesc":"' . $rs["locationDesc"] . '"}';
}
$outp ='['.$outp.']';
$conn->close();

echo($outp);
?>