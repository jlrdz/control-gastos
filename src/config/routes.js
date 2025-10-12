import {
  Home,
  HandCoins,
  PiggyBank,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
  { path: "/", key: "home", icon: Home },
  { path: "/expenses", key: "expenses", icon: HandCoins },
  { path: "/budgets", key: "budgets", icon: ChartNoAxesCombined },
  { path: "/goals", key: "goals", icon: PiggyBank },
  { path: "/settings", key: "settings", icon: Settings },
];
