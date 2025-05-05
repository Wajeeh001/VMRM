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
            $stmt = $conn->prepare("DELETE FROM VehicleStatus WHERE ID = ?");
            $stmt->bind_param("i", $id);
            $success = $stmt->execute();
            $stmt->close();

            echo json_encode([
                "success" => $success,
                "message" => $success ? "Record deleted successfully" : "Failed to delete record"
            ]);
            exit;
        }

        // Handle insert/update
        $stmt = $conn->prepare("INSERT INTO VehicleStatus (VehicleId, VehicleType, ChangedParts, TotalCost, PaidStatus, DeliveryStatus) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss",
            $_POST['VehicleId'],
            $_POST['VehicleType'],
            $_POST['ChangedParts'],
            $_POST['TotalCost'],
            $_POST['PaidStatus'],
            $_POST['DeliveryStatus']
        );

        $success = $stmt->execute();
        $insertId = $conn->insert_id;
        $stmt->close();

        echo json_encode([
            "success" => $success,
            "message" => $success ? "Record saved successfully" : "Failed to save record",
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

// Fetch all data
$result = $conn->query("SELECT * FROM VehicleStatus");
$data = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();
echo json_encode($data);
?>
