import {
  Home, Users, LayoutGrid, GraduationCap, Gift, Wallet, Settings,
  BookOpen, DoorOpen, Building, UserCheck, AlertCircle, Shield,
  Coins, Send, HelpCircle, ShieldCheck,
} from 'lucide-react';

const iconMap = {
  home: Home,
  users: Users,
  'layout-grid': LayoutGrid,
  'graduation-cap': GraduationCap,
  gift: Gift,
  wallet: Wallet,
  settings: Settings,
  'book-open': BookOpen,
  'door-open': DoorOpen,
  building: Building,
  'user-check': UserCheck,
  'alert-circle': AlertCircle,
  shield: Shield,
  coins: Coins,
  send: Send,
  'help-circle': HelpCircle,
  'shield-check': ShieldCheck,
};

export function getIcon(name) {
  return iconMap[name] || Home;
}
