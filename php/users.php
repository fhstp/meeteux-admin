<?php
include 'connect.php';

$result = $conn->query("SELECT u.id AS id, u.name AS name, u.isGuest AS isGuest, u.currentLocation AS curLocId, l.description AS curLocDesc, u.avatar AS avatar, u.deviceAddress AS deviceAdd, u.ipAddress AS ipAdd, u.deviceOS AS deviceOs, u.deviceVersion AS deviceVersion, u.deviceModel AS deviceModel
FROM users AS u LEFT JOIN locations AS l ON l.id = u.currentLocation ORDER BY u.id");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"' . $rs["id"] . '",';
    $outp .= '"name":"' . $rs["name"] . '",';
    if ($rs["isGuest"] == "1") $outp .= '"isGuest":"Guest",';
    else $outp .= '"isGuest":"",';
    $outp .= '"curLocId":"' . $rs["curLocId"] . '",';
    $outp .= '"curLocDesc":"' . $rs["curLocDesc"] . '",';
    $outp .= '"avatar":"' . $rs["avatar"] . '",';
    $outp .= '"deviceAdd":"' . $rs["deviceAdd"] . '",';
    $outp .= '"ipAdd":"' . $rs["ipAdd"] . '",';
    $outp .= '"deviceOs":"' . $rs["deviceOs"] . '",';
    $outp .= '"deviceVersion":"' . $rs["deviceVersion"] . '",';
    $outp .= '"deviceModel":"' . $rs["deviceModel"] . '"}';
}
$outp ='['.$outp.']';
$conn->close();

echo($outp);
?>