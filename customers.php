<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Handle delete action
        if (isset($_POST['action']) && $_POST['action'] === 'delete') {
            $id = (int)$_POST['id'];
            $stmt = $conn->prepare("DELETE FROM Customers WHERE ID = ?");
            $stmt->bind_param("i", $id);
            $success = $stmt->execute();
            $stmt->close();

            echo json_encode([
                "success" => $success,
                "message" => $success ? "Customer deleted successfully" : "Failed to delete customer"
            ]);
            exit;
        }

        // Handle insert
        $stmt = $conn->prepare("INSERT INTO Customers (Name, VehicleType, VehicleID, RemainingCharges, Address) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssis",
            $_POST['Name'],
            $_POST['VehicleType'],
            $_POST['VehicleID'],
            $_POST['RemainingCharges'],
            $_POST['Address']
        );

        $success = $stmt->execute();
        $insertId = $conn->insert_id;
        $stmt->close();

        echo json_encode([
            "success" => $success,
            "message" => $success ? "Customer added successfully" : "Failed to add customer",
            "insert_id" => $insertId
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
    exit;
}

// Fetch all customers
$result = $conn->query("SELECT * FROM Customers");
$data = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();
echo json_encode($data);
?>
