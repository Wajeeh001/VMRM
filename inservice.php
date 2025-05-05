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
            $stmt = $conn->prepare("DELETE FROM InserviceVehicle WHERE ID = ?");
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
        $stmt = $conn->prepare("INSERT INTO InserviceVehicle (VehicleId, TypeVehicle, ChangedParts, LabourCharges, PartsChangedCost, DeliveryDate) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiis",
            $_POST['VehicleId'],
            $_POST['TypeVehicle'],
            $_POST['ChangedParts'],
            $_POST['LabourCharges'],
            $_POST['PartsChangedCost'],
            $_POST['DeliveryDate']
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
$result = $conn->query("SELECT * FROM InserviceVehicle");
$data = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();
echo json_encode($data);
?>
