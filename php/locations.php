<?php
include 'connect.php';

$result = $conn->query("SELECT l.id AS id, l.description AS description, l.currentSeat AS currentSeat, l.maxSeat AS maxSeat, l.isStartPoint AS isStartPoint, l.parentId AS parentId, lt.description AS locationtype, s.description AS status FROM locations AS l  INNER JOIN statuses AS s ON l.statusId = s.id INNER JOIN locationtypes AS lt ON l.locationTypeId = lt.id ORDER BY l.id");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"' . $rs["id"] . '",';
    $outp .= '"description":"' . $rs["description"] . '",';
    if ($rs["currentSeat"] == "") $outp .= '"currentSeat":"0",';
    else $outp .= '"currentSeat":"' . $rs["currentSeat"] . '",';
    $outp .= '"maxSeat":"' . $rs["maxSeat"] . '",';
    $outp .= '"isStartPoint":"' . $rs["isStartPoint"] . '",';
    $outp .= '"parentId":"' . $rs["parentId"] . '",';
    $outp .= '"locationtype":"' . $rs["locationtype"] . '",';
    $outp .= '"status":"' . $rs["status"] . '"}';
}
$outp ='['.$outp.']';
$conn->close();

echo($outp);
?>