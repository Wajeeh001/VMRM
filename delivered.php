<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insert new delivered vehicle
    $vehicleId = $_POST['VehicleId'];
    $vehicleType = $_POST['VehicleType'];
    $changedParts = $_POST['ChangedParts'];
    $paidStatus = $_POST['PaidStatus'];
    $deliveryStatus = $_POST['DeliveryStatus'];

    $stmt = $conn->prepare("INSERT INTO VehicleStatus (VehicleId, VehicleType, ChangedParts, PaidStatus, DeliveryStatus) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $vehicleId, $vehicleType, $changedParts, $paidStatus, $deliveryStatus);
    $stmt->execute();
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get raw input data
    parse_str(file_get_contents("php://input"), $deleteData);
    $id = $deleteData['id'];

    $stmt = $conn->prepare("DELETE FROM VehicleStatus WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['message' => 'Deleted']);
    exit;
}


// Fetch delivered vehicles
$result = $conn->query("SELECT * FROM VehicleStatus");
$delivered = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

echo json_encode($delivered);
?>
