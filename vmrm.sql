create database vmrm;

USE vmrm;

CREATE TABLE Inventory (
    ID INT PRIMARY KEY,
    PartName VARCHAR(50),
    VehicleType VARCHAR(50),
    Price INT,
    Quantity INT,
    OrderedNumber varchar(24),
    Status ENUM('Available', 'Out of Stock', 'Ordered')
);

INSERT INTO Inventory (ID, PartName, VehicleType, Price, Quantity, OrderedNumber, Status)
VALUES 
(1, 'Brake Pad', 'Car', 3000, 50, 'ORD123', 'Available'),
(2, 'Headlight', 'Motorcycle', 1500, 30, 'ORD124', 'Ordered'),
(3, 'Battery', 'Truck', 8000, 0, 'ORD125', 'Out of Stock'),
(4, 'Battery', 'Truck', 8000, 0, 'ORD125', 'Out of Stock');

select * from Inventory;


CREATE TABLE InserviceVehicle (
    ID INT PRIMARY KEY,
    VehicleId VARCHAR(10),
    TypeVehicle VARCHAR(25),
    ChangedParts VARCHAR(25),
    LabourCharges INT,
    PartsChangedCost INT,
    TotalCost INT GENERATED ALWAYS AS (PartsChangedCost + LabourCharges) STORED,
    DeliveryDate DATE
);

INSERT INTO InserviceVehicle (ID, VehicleId, TypeVehicle, ChangedParts, LabourCharges, PartsChangedCost, DeliveryDate)
VALUES 
(1, 'V001', 'Car', 'Brake Pad', 500, 3000, '2025-05-01'),
(2, 'V002', 'Truck', 'Battery', 1000, 8000, '2025-05-02'),
(3, 'V003', 'Motorcycle', 'Headlight', 300, 1500, '2025-05-03');

SELECT * FROM InserviceVehicle;

CREATE TABLE VehicleStatus (
    ID INT PRIMARY KEY,
    VehicleId VARCHAR(10) UNIQUE,
    VehicleType VARCHAR(25) NOT NULL,
    ChangedParts VARCHAR(50),
    TotalCost varchar (50),
    PaidStatus ENUM('Paid', 'Not Paid') NOT NULL,
    DeliveryStatus ENUM('Delivered', 'Not Delivered') NOT NULL
);

INSERT INTO VehicleStatus (ID, VehicleId, VehicleType, ChangedParts, TotalCost, PaidStatus, DeliveryStatus)
VALUES 
(1, 'V001', 'Car', 'Brake Pad','100', 'Paid', 'Delivered'),
(2, 'V002', 'Truck', 'Battery', '200', 'Not Paid', 'Not Delivered'),
(3, 'V003', 'Motorcycle', 'Headlight','300', 'Paid', 'Delivered'),
(4, 'V004', 'Bus', 'Tires','400', 'Not Paid', 'Not Delivered');

Select * from  VehicleStatus;

CREATE TABLE Customers (
    ID INT PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    VehicleType VARCHAR(30),
    VehicleID VARCHAR(30) NOT NULL,
    RemainingCharges INT,
    Address VARCHAR(100) NOT NULL
);

INSERT INTO Customers (ID, Name, VehicleType, VehicleID, RemainingCharges, Address)
VALUES
(1, 'John Doe', 'Car', 'V001', 1500, '123 Main Street, City A'),
(2, 'Ali Khan', 'Truck', 'V002', 2500, '456 Market Road, City B'),
(3, 'Emily Smith', 'Motorcycle', 'V003', 500, '789 Hill Avenue, City C'),
(4, 'Ahmed Raza', 'Bus', 'V004', 0, '101 Sunset Boulevard, City D');

select * from Customers;