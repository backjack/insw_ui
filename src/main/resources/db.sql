

create table admin (

adminId varchar(200) primary key,
adminName varchar(200),
adminPassword varchar(200),
isActive varchar(200)
);

create table client (

clientId int primary key,
clientName varchar(200),
clientShortName varchar(200),
clientAddress varchar(200),
clientTelno  varchar(200),
quotationNo varchar(200),
isActive varchar(200),
adminId varchar(200),
addedOn date,
FOREIGN KEY (adminId) REFERENCES admin(adminId)
);

create table invoice (
fyear int,
invoiceId varchar(200),
clientId  int,
invoiceDate date,
refrenceDate date,
quotationNo varchar(200),
totalAmount decimal,
adminId varchar(200),
primary key (fyyear,invoiceId),
foreign key(clientId) REFERENCES client(clientId),
FOREIGN KEY (adminId) REFERENCES admin(adminId)
);



create table invoice_item (
fyear int,
invoiceId varchar(200),
itemId varchar(200),
itemName varchar(200),
csgt decimal,
isgst decimal,
qty int,
price decimal,
sgst decimal,
primary key(fyyear,invoiceId,itemName),
FOREIGN KEY (fyyear,invoiceId) REFERENCES invoice(fyyear,invoiceId)
);

