export const MOCK_USERS = [
  { id: 'u1', name: 'James Pierre',   email: 'james.pierre@uscem.lc',    role: 'warehouse_manager', org: 'AILA',            password: 'demo' },
  { id: 'u2', name: 'Marie Joseph',   email: 'marie.joseph@uscem.lc',     role: 'warehouse_clerk',   org: 'Brand St. Lucia', password: 'demo' },
  { id: 'u3', name: 'David Charles',  email: 'david.charles@uscem.lc',    role: 'warehouse_clerk',   org: 'Marquis Estate',  password: 'demo' },
  { id: 'u4', name: 'Sandra Felix',   email: 'sandra.felix@uscem.lc',     role: 'cfo',               org: 'USCEM Group',     password: 'demo' },
  { id: 'u5', name: 'Paul Emmanuel',  email: 'paul.emmanuel@uscem.lc',    role: 'purchasing',        org: 'USCEM Group',     password: 'demo' },
  { id: 'u6', name: 'Anne Charlemagne', email: 'anne.c@uscem.lc',         role: 'chairman',          org: 'USCEM Group',     password: 'demo' },
]

export const ORGS = [
  { id: 'org1', code: 'AILA',    name: 'AILA',            color: '#0F6E56' },
  { id: 'org2', code: 'BRAND',   name: 'Brand St. Lucia', color: '#185FA5' },
  { id: 'org3', code: 'MARQUIS', name: 'Marquis Estate',  color: '#854F0B' },
]

export const WAREHOUSES = [
  { id: 'wh1', org_id: 'org1', name: 'AILA Logistics Hub',     type: 'Main Warehouse' },
  { id: 'wh2', org_id: 'org1', name: 'AILA Electrical WH',     type: 'FF&E Warehouse' },
  { id: 'wh3', org_id: 'org1', name: 'AILA Plumbing WH',       type: 'FF&E Warehouse' },
  { id: 'wh4', org_id: 'org2', name: 'Brand SL PPE Store',     type: 'Site Storage'   },
  { id: 'wh5', org_id: 'org2', name: 'Brand SL Electrical WH', type: 'FF&E Warehouse' },
  { id: 'wh6', org_id: 'org3', name: 'Marquis Main Store',     type: 'Main Warehouse' },
]

export const PRODUCTS = [
  { id: 'p1',  code: 'PRD-001', name: 'Smoke Detector',     category: 'Electrical', unit: 'Unit',  criticality: 'Critical',  asset_type: 'Consumable', status: 'Approved' },
  { id: 'p2',  code: 'PRD-002', name: 'Circuit Breaker 20A',category: 'Electrical', unit: 'Unit',  criticality: 'Critical',  asset_type: 'Consumable', status: 'Approved' },
  { id: 'p3',  code: 'PRD-003', name: 'PVC Pipe 4"',        category: 'Plumbing',   unit: 'Length',criticality: 'Standard',  asset_type: 'Consumable', status: 'Approved' },
  { id: 'p4',  code: 'PRD-004', name: 'White Paint 5L',     category: 'Finishing',  unit: 'Tin',   criticality: 'Standard',  asset_type: 'Consumable', status: 'Approved' },
  { id: 'p5',  code: 'PRD-005', name: 'Safety Helmet',      category: 'PPE',        unit: 'Unit',  criticality: 'Critical',  asset_type: 'Consumable', status: 'Approved' },
  { id: 'p6',  code: 'PRD-006', name: 'Safety Vest Hi-Vis', category: 'PPE',        unit: 'Unit',  criticality: 'Important', asset_type: 'Consumable', status: 'Approved' },
  { id: 'p7',  code: 'PRD-007', name: 'Nitrile Gloves',     category: 'PPE',        unit: 'Box',   criticality: 'Standard',  asset_type: 'Consumable', status: 'Approved' },
  { id: 'p8',  code: 'PRD-008', name: 'Electrical Cable 2.5mm', category: 'Electrical', unit: 'Metre', criticality: 'Important', asset_type: 'Consumable', status: 'Approved' },
  { id: 'p9',  code: 'PRD-009', name: 'Electrical Cable 4mm',   category: 'Electrical', unit: 'Metre', criticality: 'Important', asset_type: 'Consumable', status: 'Pending Validation' },
]

export const INVENTORY: InventoryBalance[] = [
  { id: 'i1',  product_id: 'p1', org_id: 'org1', warehouse_id: 'wh1', location: 'A-04-02', status: 'Available', qty: 45, reserved: 7,  avg_cost: 28.00 },
  { id: 'i2',  product_id: 'p1', org_id: 'org2', warehouse_id: 'wh5', location: 'B-01-01', status: 'Available', qty: 8,  reserved: 8,  avg_cost: 28.00 },
  { id: 'i3',  product_id: 'p1', org_id: 'org3', warehouse_id: 'wh6', location: 'C-02-05', status: 'Available', qty: 55, reserved: 8,  avg_cost: 28.00 },
  { id: 'i4',  product_id: 'p2', org_id: 'org1', warehouse_id: 'wh2', location: 'A-01-03', status: 'Available', qty: 120,reserved: 10, avg_cost: 14.50 },
  { id: 'i5',  product_id: 'p2', org_id: 'org3', warehouse_id: 'wh6', location: 'C-01-02', status: 'Available', qty: 40, reserved: 0,  avg_cost: 14.50 },
  { id: 'i6',  product_id: 'p3', org_id: 'org1', warehouse_id: 'wh3', location: 'A-03-01', status: 'Available', qty: 200,reserved: 20, avg_cost: 8.75  },
  { id: 'i7',  product_id: 'p3', org_id: 'org3', warehouse_id: 'wh6', location: 'C-03-01', status: 'Available', qty: 80, reserved: 0,  avg_cost: 8.75  },
  { id: 'i8',  product_id: 'p4', org_id: 'org1', warehouse_id: 'wh1', location: 'A-02-04', status: 'Available', qty: 60, reserved: 0,  avg_cost: 22.00 },
  { id: 'i9',  product_id: 'p5', org_id: 'org2', warehouse_id: 'wh4', location: 'B-02-01', status: 'Available', qty: 8,  reserved: 0,  avg_cost: 12.00 },
  { id: 'i10', product_id: 'p5', org_id: 'org1', warehouse_id: 'wh1', location: 'A-05-01', status: 'Available', qty: 40, reserved: 5,  avg_cost: 12.00 },
  { id: 'i11', product_id: 'p6', org_id: 'org2', warehouse_id: 'wh4', location: 'B-02-02', status: 'Available', qty: 100,reserved: 0,  avg_cost: 9.50  },
  { id: 'i12', product_id: 'p7', org_id: 'org2', warehouse_id: 'wh4', location: 'B-02-03', status: 'Available', qty: 150,reserved: 0,  avg_cost: 6.25  },
  { id: 'i13', product_id: 'p8', org_id: 'org1', warehouse_id: 'wh2', location: 'A-01-05', status: 'Available', qty: 500,reserved: 50, avg_cost: 3.20  },
]

export type InventoryBalance = {
  id: string; product_id: string; org_id: string; warehouse_id: string
  location: string; status: string; qty: number; reserved: number; avg_cost: number
}

export const MOVEMENTS = [
  { id: 'm1', type: 'IN',       product_id: 'p1', qty: 20,  from_wh: null,  to_wh: 'wh1', date: '2026-05-29', user: 'James Pierre',  note: 'GRN-2026-0041' },
  { id: 'm2', type: 'TRANSFER', product_id: 'p1', qty: 15,  from_wh: 'wh1', to_wh: 'wh5', date: '2026-05-27', user: 'Marie Joseph',  note: 'TRF-2026-0038' },
  { id: 'm3', type: 'OUT',      product_id: 'p1', qty: 8,   from_wh: 'wh6', to_wh: null,  date: '2026-05-25', user: 'David Charles', note: 'Marquis Phase 2 install' },
  { id: 'm4', type: 'IN',       product_id: 'p5', qty: 50,  from_wh: null,  to_wh: 'wh1', date: '2026-05-28', user: 'James Pierre',  note: 'GRN-2026-0040' },
  { id: 'm5', type: 'OUT',      product_id: 'p5', qty: 22,  from_wh: 'wh4', to_wh: null,  date: '2026-05-26', user: 'Marie Joseph',  note: 'Site issue — Block A' },
  { id: 'm6', type: 'IN',       product_id: 'p2', qty: 60,  from_wh: null,  to_wh: 'wh2', date: '2026-05-24', user: 'James Pierre',  note: 'GRN-2026-0036' },
  { id: 'm7', type: 'TRANSFER', product_id: 'p3', qty: 40,  from_wh: 'wh3', to_wh: 'wh6', date: '2026-05-22', user: 'David Charles', note: 'TRF-2026-0031' },
]

export const ALERTS = [
  { id: 'a1', type: 'low_stock',  product_id: 'p1', org_id: 'org2', message: 'Smoke Detector — Brand SL only 8 units',    severity: 'danger'  },
  { id: 'a2', type: 'low_stock',  product_id: 'p5', org_id: 'org2', message: 'Safety Helmet — Brand SL PPE Store 8 units', severity: 'danger'  },
  { id: 'a3', type: 'approval',   product_id: 'p9', org_id: 'org1', message: 'Electrical Cable 4mm — pending approval',    severity: 'warning' },
  { id: 'a4', type: 'transfer',   product_id: 'p3', org_id: 'org1', message: 'PVC Pipe 4" — AILA → Marquis in progress',  severity: 'info'    },
]

export const ROLE_LABELS: Record<string, string> = {
  chairman:          'Chairman',
  executive:         'Executive',
  cfo:               'CFO',
  finance:           'Finance',
  purchasing:        'Purchasing',
  warehouse_manager: 'Warehouse Manager',
  warehouse_clerk:   'Warehouse Clerk',
  brand_rep:         'Brand Representative',
  marquis_rep:       'Marquis Representative',
}

export function getProduct(id: string) {
  return PRODUCTS.find(p => p.id === id)
}

export function getOrg(id: string) {
  return ORGS.find(o => o.id === id)
}

export function getWarehouse(id: string) {
  return WAREHOUSES.find(w => w.id === id)
}

export function getInventoryForProduct(productId: string) {
  return INVENTORY.filter(i => i.product_id === productId).map(i => ({
    ...i,
    transferable: Math.max(0, i.qty - i.reserved),
    total_value: i.qty * i.avg_cost,
    org: getOrg(i.org_id)!,
    warehouse: getWarehouse(i.warehouse_id)!,
  }))
}

export function getKPIs() {
  const totalValue = INVENTORY.reduce((s, i) => s + i.qty * i.avg_cost, 0)
  const totalUnits = INVENTORY.reduce((s, i) => s + i.qty, 0)
  const todayIn  = MOVEMENTS.filter(m => m.type === 'IN'  && m.date === '2026-05-29').reduce((s, m) => s + m.qty, 0)
  const todayOut = MOVEMENTS.filter(m => m.type === 'OUT' && m.date === '2026-05-29').reduce((s, m) => s + m.qty, 0)
  return { totalValue, totalUnits, todayIn, todayOut, pendingApprovals: 7 }
}
