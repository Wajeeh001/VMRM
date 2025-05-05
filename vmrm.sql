CREATE DATABASE IF NOT EXISTS vmrm;
USE vmrm;

CREATE TABLE Inventory (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PartName VARCHAR(50),
    VehicleType VARCHAR(50),
    Price INT,
    Quantity INT,
    OrderedNumber VARCHAR(24),
    Status ENUM('Available', 'Out of Stock', 'Ordered')
);

INSERT INTO Inventory (PartName, VehicleType, Price, Quantity, OrderedNumber, Status) VALUES 
('Brake Pad', 'Car', 3000, 50, 'ORD123', 'Available'),
('Headlight', 'Motorcycle', 1500, 30, 'ORD124', 'Ordered'),
('Battery', 'Truck', 8000, 0, 'ORD125', 'Out of Stock'),
('Battery', 'Truck', 8000, 0, 'ORD125', 'Out of Stock');

select * from Inventory;

-- InserviceVehicle table with AUTO_INCREMENT
CREATE TABLE InserviceVehicle (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    VehicleId VARCHAR(10),
    TypeVehicle VARCHAR(25),
    ChangedParts VARCHAR(25),
    LabourCharges INT,
    PartsChangedCost INT,
    TotalCost INT GENERATED ALWAYS AS (PartsChangedCost + LabourCharges) STORED,
    DeliveryDate DATE
);

INSERT INTO InserviceVehicle (VehicleId, TypeVehicle, ChangedParts, LabourCharges, PartsChangedCost, DeliveryDate) VALUES 
('V001', 'Car', 'Brake Pad', 500, 3000, '2025-05-01'),
('V002', 'Truck', 'Battery', 1000, 8000, '2025-05-02'),
('V003', 'Motorcycle', 'Headlight', 300, 1500, '2025-05-03');

select * from InserviceVehicle;

-- VehicleStatus table with AUTO_INCREMENT
CREATE TABLE VehicleStatus (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    VehicleId VARCHAR(10) UNIQUE,
    VehicleType VARCHAR(25) NOT NULL,
    ChangedParts VARCHAR(50),
    TotalCost VARCHAR(50),
    PaidStatus ENUM('Paid', 'Not Paid') NOT NULL,
    DeliveryStatus ENUM('Delivered', 'Not Delivered') NOT NULL
);

INSERT INTO VehicleStatus (VehicleId, VehicleType, ChangedParts, TotalCost, PaidStatus, DeliveryStatus) VALUES 
('V001', 'Car', 'Brake Pad', '100', 'Paid', 'Delivered'),
('V002', 'Truck', 'Battery', '200', 'Not Paid', 'Not Delivered'),
('V003', 'Motorcycle', 'Headlight', '300', 'Paid', 'Delivered'),
('V004', 'Bus', 'Tires', '400', 'Not Paid', 'Not Delivered');

select * from VehicleStatus;

-- Customers table with AUTO_INCREMENT
CREATE TABLE Customers (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    VehicleType VARCHAR(30),
    VehicleID VARCHAR(30) NOT NULL,
    RemainingCharges INT,
    Address VARCHAR(100) NOT NULL
);

INSERT INTO Customers (Name, VehicleType, VehicleID, RemainingCharges, Address) VALUES
('John Doe', 'Car', 'V001', 1500, '123 Main Street, City A'),
('Ali Khan', 'Truck', 'V002', 2500, '456 Market Road, City B'),
('Emily Smith', 'Motorcycle', 'V003', 500, '789 Hill Avenue, City C'),
('Ahmed Raza', 'Bus', 'V004', 0, '101 Sunset Boulevard, City D');

select * from Customers;