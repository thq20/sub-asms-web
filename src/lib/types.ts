export const STATUS_LABEL: Record<string, string> = { UN_USED: "Chưa sử dụng", IN_USED: "Đang sử dụng", BROKEN: "Hỏng", MAINTENANCE: "Bảo trì" };
export const MASTER_LABEL: Record<string, string> = { LOCATION: "Location", FLOOR: "Floor", OWNER: "Owner", PURCHASING_UNIT: "Purchasing Unit", ASSET_TYPE: "Asset Type" };
export const ASSET_FIELDS = ["barcode","asmsBarcode","serialNumber","invoiceId","status","locationId","floorId","seatCode","ownerId","purchasingUnitId","assetTypeId","originalCost","description","ticketId","purchaseDate","warrantyExpiry","note"] as const;
