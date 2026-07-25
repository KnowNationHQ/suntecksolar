export interface Appliance {
  id: string;
  name: string;
  watts: number;
  description: string;
}

export const APPLIANCES = [
  { id: "lights", name: "LED Lights", watts: 50, description: "Energy-saving LED bulbs" },
  { id: "fans", name: "Ceiling Fans", watts: 75, description: "Standard ceiling fans" },
  { id: "tv", name: "TV", watts: 120, description: "LED/LCD television" },
  { id: "fridge", name: "Fridge", watts: 150, description: "Energy-efficient refrigerator" },
  { id: "freezer", name: "Freezer", watts: 200, description: "Chest/standing freezer" },
  { id: "pump", name: "Water Pump", watts: 500, description: "Borehole/booster pump" },
  { id: "ac", name: "Air Conditioner", watts: 1500, description: "1.5HP split AC" },
] as const satisfies readonly Appliance[];

export const PRICING = {
  costPerKw: 150000,
  depositRate: 0.20,
  generatorFuelPerKwh: 450,
  paymentTerms: [3, 6, 12, 18] as const,
} as const;
