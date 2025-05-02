<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insert new customer
    $name = $_POST['Name'];
    $vehicleType = $_POST['VehicleType'];
    $vehicleID = $_POST['VehicleID'];
    $remainingCharges = $_POST['RemainingCharges'];
    $address = $_POST['Address'];

    $stmt = $conn->prepare("INSERT INTO Customers (Name, VehicleType, VehicleID, RemainingCharges, Address) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssds", $name, $vehicleType, $vehicleID, $remainingCharges, $address);
    $stmt->execute();
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get raw input data
    parse_str(file_get_contents("php://input"), $deleteData);
    $id = $deleteData['id'];

    $stmt = $conn->prepare("DELETE FROM Customers WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['message' => 'Deleted']);
    exit;
}

// Fetch customers
$result = $conn->query("SELECT * FROM Customers");
$customers = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

echo json_encode($customers);
?>
