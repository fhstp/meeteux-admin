<?php
header("Access-Control-Allow-Origin: *"); // remove in production?
header("Content-Type: application/json; charset=latin1");

$conn = new mysqli("localhost", "root", "Meeteux#G0D", "meeteux_test");
//$conn = new mysqli("god.meeteux.fhstp.ac.at", "god", "Meeteux#G0D", "meeteux_test"); // ?
?>