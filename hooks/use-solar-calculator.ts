import { APPLIANCES, PRICING } from "@/lib/pricing";

interface CalculatorInputs {
  quantities: Record<string, number>;
  months: 3 | 6 | 12 | 18;
}

interface PaymentPlan {
  totalWatts: number;
  systemKw: number;
  systemCost: number;
  deposit: number;
  monthlyPayment: number;
  totalFinanced: number;
  generatorMonthlyCost: number;
  monthlySavings: number;
}

interface ApplianceLine {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  subtotal: number;
}

export function computePlan(inputs: CalculatorInputs): PaymentPlan {
  const totalWatts = Object.entries(inputs.quantities).reduce((sum, [id, qty]) => {
    const appliance = APPLIANCES.find((a) => a.id === id);
    return sum + (appliance ? appliance.watts * qty : 0);
  }, 0);
  const systemKw = Math.ceil(totalWatts / 1000);
  const systemCost = systemKw * PRICING.costPerKw;
  const deposit = Math.round(systemCost * PRICING.depositRate);
  const remaining = systemCost - deposit;
  const monthlyPayment = Math.round(remaining / inputs.months);
  const totalFinanced = deposit + monthlyPayment * inputs.months;

  const monthlyKwh = totalWatts * 8 * 30 / 1000;
  const generatorMonthlyCost = Math.round(monthlyKwh * PRICING.generatorFuelPerKwh);

  return {
    totalWatts,
    systemKw,
    systemCost,
    deposit,
    monthlyPayment,
    totalFinanced,
    generatorMonthlyCost,
    monthlySavings: generatorMonthlyCost - monthlyPayment,
  };
}

export function getApplianceLines(quantities: Record<string, number>): ApplianceLine[] {
  return APPLIANCES.map((a) => ({
    id: a.id,
    name: a.name,
    watts: a.watts,
    quantity: quantities[a.id] || 0,
    subtotal: a.watts * (quantities[a.id] || 0),
  })).filter((l) => l.quantity > 0);
}

