<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insert new inservice vehicle
    $vehicleId = $_POST['VehicleId'];
    $typeVehicle = $_POST['TypeVehicle'];
    $changedParts = $_POST['ChangedParts'];
    $labourCharges = $_POST['LabourCharges'];
    $partsChangedCost = $_POST['PartsChangedCost'];
    $deliveryDate = $_POST['DeliveryDate'];

    $stmt = $conn->prepare("INSERT INTO InserviceVehicle (VehicleId, TypeVehicle, ChangedParts, LabourCharges, PartsChangedCost, DeliveryDate) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssdds", $vehicleId, $typeVehicle, $changedParts, $labourCharges, $partsChangedCost, $deliveryDate);
    $stmt->execute();
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get raw input data
    parse_str(file_get_contents("php://input"), $deleteData);
    $id = $deleteData['id'];

    $stmt = $conn->prepare("DELETE FROM InserviceVehicle WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['message' => 'Deleted']);
    exit;
}

// Fetch inservice vehicles
$result = $conn->query("SELECT * FROM InserviceVehicle");
$inservice = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

echo json_encode($inservice);
?>
