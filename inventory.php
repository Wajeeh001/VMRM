<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'delete') {
        $id = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM Inventory WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
    } else {
        // Insert
        $partName = $_POST['PartName'];
        $vehicleType = $_POST['VehicleType'];
        $price = $_POST['Price'];
        $quantity = $_POST['Quantity'];
        $orderedNumber = $_POST['OrderedNumber'];
        $status = $_POST['Status'];

        $stmt = $conn->prepare("INSERT INTO Inventory (PartName, VehicleType, Price, Quantity, OrderedNumber, Status) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssiiss", $partName, $vehicleType, $price, $quantity, $orderedNumber, $status);
        $stmt->execute();
        $stmt->close();
    }
}

// Always return updated data
$result = $conn->query("SELECT * FROM Inventory");
$inventory = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

echo json_encode($inventory);
?>
