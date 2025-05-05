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
            $stmt = $conn->prepare("DELETE FROM Inventory WHERE ID = ?");
            $stmt->bind_param("i", $id);
            $success = $stmt->execute();
            $stmt->close();
            
            echo json_encode([
                "success" => $success,
                "message" => $success ? "Item deleted successfully" : "Failed to delete item"
            ]);
            exit;
        }
        
        // Handle insert/update
        $stmt = $conn->prepare("INSERT INTO Inventory (PartName, VehicleType, Price, Quantity, OrderedNumber, Status) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssiiss", 
            $_POST['PartName'], 
            $_POST['VehicleType'], 
            $_POST['Price'], 
            $_POST['Quantity'], 
            $_POST['OrderedNumber'], 
            $_POST['Status']
        );
        
        $success = $stmt->execute();
        $insertId = $conn->insert_id;
        $stmt->close();
        
        echo json_encode([
            "success" => $success,
            "message" => $success ? "Item saved successfully" : "Failed to save item",
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

// Fetch data
$result = $conn->query("SELECT * FROM Inventory");
$data = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();
echo json_encode($data);
?>