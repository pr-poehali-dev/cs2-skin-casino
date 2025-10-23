import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('games');
  const [balance, setBalance] = useState(1234.56);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const [openedItem, setOpenedItem] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [selectedSkin, setSelectedSkin] = useState<any>(null);
  const [rouletteItems, setRouletteItems] = useState<any[]>([]);
  const [rouletteOffset, setRouletteOffset] = useState(0);
  const rouletteRef = useRef<HTMLDivElement>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [upgradeItem, setUpgradeItem] = useState<any>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<any>(null);
  const [contractItems, setContractItems] = useState<any[]>([]);
  const [isProcessingContract, setIsProcessingContract] = useState(false);
  const [contractResult, setContractResult] = useState<any>(null);

  const cases = [
    {
      id: 1,
      name: 'NEON WEAPON CASE',
      price: 125.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AK-47 | Neon Revolution', rarity: 'legendary', price: 450.00, color: '#FF6B00' },
        { name: 'AWP | Neo-Noir', rarity: 'epic', price: 280.00, color: '#9D4EDD' },
        { name: 'M4A4 | Cyber Security', rarity: 'rare', price: 120.00, color: '#00F0FF' },
        { name: 'Desert Eagle | Oxide Blaze', rarity: 'uncommon', price: 45.00, color: '#4ADE80' },
      ]
    },
    {
      id: 2,
      name: 'CYBER GLOVES',
      price: 250.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Sport Gloves | Superconductor', rarity: 'legendary', price: 890.00, color: '#FF6B00' },
        { name: 'Driver Gloves | King Snake', rarity: 'epic', price: 520.00, color: '#9D4EDD' },
        { name: 'Hand Wraps | Cobalt Skulls', rarity: 'rare', price: 310.00, color: '#00F0FF' },
        { name: 'Broken Fang Gloves | Fade', rarity: 'uncommon', price: 180.00, color: '#4ADE80' },
      ]
    },
    {
      id: 3,
      name: 'KNIFE COLLECTION',
      price: 500.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Karambit | Fade', rarity: 'legendary', price: 1850.00, color: '#FF6B00' },
        { name: 'Butterfly Knife | Doppler', rarity: 'epic', price: 1200.00, color: '#9D4EDD' },
        { name: 'M9 Bayonet | Gamma Doppler', rarity: 'rare', price: 780.00, color: '#00F0FF' },
        { name: 'Huntsman Knife | Slaughter', rarity: 'uncommon', price: 420.00, color: '#4ADE80' },
      ]
    },
    {
      id: 4,
      name: 'STARTER PACK',
      price: 50.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'USP-S | Cyber Noir', rarity: 'rare', price: 95.00, color: '#00F0FF' },
        { name: 'Glock-18 | Vogue', rarity: 'uncommon', price: 55.00, color: '#4ADE80' },
        { name: 'P250 | See Ya Later', rarity: 'uncommon', price: 38.00, color: '#4ADE80' },
        { name: 'Five-SeveN | Hyper Beast', rarity: 'common', price: 22.00, color: '#94A3B8' },
      ]
    },
    {
      id: 5,
      name: 'PREMIUM RIFLES',
      price: 350.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AK-47 | Fire Serpent', rarity: 'legendary', price: 1250.00, color: '#FF6B00' },
        { name: 'M4A1-S | Hyper Beast', rarity: 'epic', price: 680.00, color: '#9D4EDD' },
        { name: 'AWP | Asiimov', rarity: 'rare', price: 420.00, color: '#00F0FF' },
        { name: 'AUG | Chameleon', rarity: 'uncommon', price: 185.00, color: '#4ADE80' },
      ]
    },
    {
      id: 6,
      name: 'RARE SKINS',
      price: 750.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AWP | Dragon Lore', rarity: 'legendary', price: 3500.00, color: '#FF6B00' },
        { name: 'AK-47 | Wild Lotus', rarity: 'legendary', price: 2800.00, color: '#FF6B00' },
        { name: 'M4A4 | Howl', rarity: 'epic', price: 1950.00, color: '#9D4EDD' },
        { name: 'Desert Eagle | Blaze', rarity: 'rare', price: 890.00, color: '#00F0FF' },
      ]
    },
    {
      id: 7,
      name: 'SMG MADNESS',
      price: 85.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'MP9 | Starlight Protector', rarity: 'epic', price: 320.00, color: '#9D4EDD' },
        { name: 'P90 | Asiimov', rarity: 'rare', price: 180.00, color: '#00F0FF' },
        { name: 'UMP-45 | Primal Saber', rarity: 'uncommon', price: 95.00, color: '#4ADE80' },
        { name: 'MAC-10 | Neon Rider', rarity: 'common', price: 42.00, color: '#94A3B8' },
      ]
    },
    {
      id: 8,
      name: 'SNIPER ELITE',
      price: 280.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AWP | Gungnir', rarity: 'legendary', price: 2400.00, color: '#FF6B00' },
        { name: 'AWP | Medusa', rarity: 'epic', price: 1200.00, color: '#9D4EDD' },
        { name: 'SSG 08 | Dragonfire', rarity: 'rare', price: 340.00, color: '#00F0FF' },
        { name: 'SCAR-20 | Bloodsport', rarity: 'uncommon', price: 120.00, color: '#4ADE80' },
      ]
    },
    {
      id: 9,
      name: 'CLASSIC CASE',
      price: 95.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'M4A4 | Emperor', rarity: 'epic', price: 420.00, color: '#9D4EDD' },
        { name: 'AK-47 | Redline', rarity: 'rare', price: 185.00, color: '#00F0FF' },
        { name: 'Galil AR | Chatterbox', rarity: 'uncommon', price: 78.00, color: '#4ADE80' },
        { name: 'FAMAS | Neural Net', rarity: 'common', price: 35.00, color: '#94A3B8' },
      ]
    },
    {
      id: 10,
      name: 'PISTOL POWER',
      price: 65.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Desert Eagle | Code Red', rarity: 'epic', price: 240.00, color: '#9D4EDD' },
        { name: 'USP-S | Kill Confirmed', rarity: 'rare', price: 135.00, color: '#00F0FF' },
        { name: 'P2000 | Fire Elemental', rarity: 'uncommon', price: 68.00, color: '#4ADE80' },
        { name: 'Tec-9 | Fuel Injector', rarity: 'common', price: 28.00, color: '#94A3B8' },
      ]
    },
    {
      id: 11,
      name: 'DOPPLER DREAM',
      price: 620.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Karambit | Doppler Ruby', rarity: 'legendary', price: 4200.00, color: '#FF6B00' },
        { name: 'Bayonet | Doppler Sapphire', rarity: 'legendary', price: 3100.00, color: '#FF6B00' },
        { name: 'Flip Knife | Doppler', rarity: 'epic', price: 1450.00, color: '#9D4EDD' },
        { name: 'Gut Knife | Doppler', rarity: 'rare', price: 680.00, color: '#00F0FF' },
      ]
    },
    {
      id: 12,
      name: 'HEAVY ARTILLERY',
      price: 145.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'M249 | Aztec', rarity: 'rare', price: 280.00, color: '#00F0FF' },
        { name: 'Negev | Power Loader', rarity: 'rare', price: 195.00, color: '#00F0FF' },
        { name: 'XM1014 | Tranquility', rarity: 'uncommon', price: 88.00, color: '#4ADE80' },
        { name: 'Nova | Hyper Beast', rarity: 'common', price: 42.00, color: '#94A3B8' },
      ]
    },
    {
      id: 13,
      name: 'BLUE GEM',
      price: 890.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Karambit | Case Hardened', rarity: 'legendary', price: 5500.00, color: '#FF6B00' },
        { name: 'AK-47 | Case Hardened', rarity: 'legendary', price: 3200.00, color: '#FF6B00' },
        { name: 'Five-SeveN | Case Hardened', rarity: 'epic', price: 1100.00, color: '#9D4EDD' },
        { name: 'Blue Gem Souvenir', rarity: 'rare', price: 750.00, color: '#00F0FF' },
      ]
    },
    {
      id: 14,
      name: 'OPERATION DROP',
      price: 175.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AWP | Containment Breach', rarity: 'epic', price: 540.00, color: '#9D4EDD' },
        { name: 'M4A1-S | Printstream', rarity: 'rare', price: 320.00, color: '#00F0FF' },
        { name: 'Glock-18 | Gamma Doppler', rarity: 'uncommon', price: 145.00, color: '#4ADE80' },
        { name: 'MP5-SD | Phosphor', rarity: 'common', price: 65.00, color: '#94A3B8' },
      ]
    },
    {
      id: 15,
      name: 'ANCIENT LEGENDS',
      price: 420.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AK-47 | Gold Arabesque', rarity: 'legendary', price: 1850.00, color: '#FF6B00' },
        { name: 'Desert Eagle | Golden Koi', rarity: 'epic', price: 920.00, color: '#9D4EDD' },
        { name: 'M4A4 | Poseidon', rarity: 'rare', price: 520.00, color: '#00F0FF' },
        { name: 'AWP | Medusa', rarity: 'uncommon', price: 280.00, color: '#4ADE80' },
      ]
    },
    {
      id: 16,
      name: 'GAMMA ZONE',
      price: 195.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'M9 Bayonet | Gamma Doppler', rarity: 'legendary', price: 1420.00, color: '#FF6B00' },
        { name: 'Glock-18 | Gamma Doppler', rarity: 'epic', price: 650.00, color: '#9D4EDD' },
        { name: 'P90 | Shapewood', rarity: 'rare', price: 285.00, color: '#00F0FF' },
        { name: 'USP-S | Cyrex', rarity: 'uncommon', price: 125.00, color: '#4ADE80' },
      ]
    },
    {
      id: 17,
      name: 'FACTORY NEW',
      price: 520.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Butterfly Knife | Marble Fade', rarity: 'legendary', price: 2650.00, color: '#FF6B00' },
        { name: 'AK-47 | Vulcan', rarity: 'epic', price: 1180.00, color: '#9D4EDD' },
        { name: 'AWP | Lightning Strike', rarity: 'rare', price: 680.00, color: '#00F0FF' },
        { name: 'M4A4 | Desolate Space', rarity: 'uncommon', price: 340.00, color: '#4ADE80' },
      ]
    },
    {
      id: 18,
      name: 'SPECTRUM CASE',
      price: 225.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Talon Knife | Fade', rarity: 'legendary', price: 1680.00, color: '#FF6B00' },
        { name: 'AK-47 | Bloodsport', rarity: 'epic', price: 780.00, color: '#9D4EDD' },
        { name: 'M4A1-S | Decimator', rarity: 'rare', price: 395.00, color: '#00F0FF' },
        { name: 'CZ75-Auto | Red Astor', rarity: 'uncommon', price: 165.00, color: '#4ADE80' },
      ]
    },
    {
      id: 19,
      name: 'SHATTERED WEB',
      price: 295.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Specialist Gloves | Crimson Web', rarity: 'legendary', price: 1950.00, color: '#FF6B00' },
        { name: 'AWP | Chromatic Aberration', rarity: 'epic', price: 890.00, color: '#9D4EDD' },
        { name: 'MP7 | Bloodsport', rarity: 'rare', price: 420.00, color: '#00F0FF' },
        { name: 'P90 | Off World', rarity: 'uncommon', price: 185.00, color: '#4ADE80' },
      ]
    },
    {
      id: 20,
      name: 'PRISMA COLLECTION',
      price: 165.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Stiletto Knife | Fade', rarity: 'legendary', price: 1240.00, color: '#FF6B00' },
        { name: 'AK-47 | Phantom Disruptor', rarity: 'epic', price: 620.00, color: '#9D4EDD' },
        { name: 'M4A4 | The Emperor', rarity: 'rare', price: 310.00, color: '#00F0FF' },
        { name: 'R8 Revolver | Skull Crusher', rarity: 'uncommon', price: 140.00, color: '#4ADE80' },
      ]
    },
    {
      id: 21,
      name: 'HORIZON CASE',
      price: 185.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Ursus Knife | Doppler', rarity: 'legendary', price: 1380.00, color: '#FF6B00' },
        { name: 'AK-47 | Neon Rider', rarity: 'epic', price: 720.00, color: '#9D4EDD' },
        { name: 'Desert Eagle | Code Red', rarity: 'rare', price: 365.00, color: '#00F0FF' },
        { name: 'MP9 | Solar Eclipse', rarity: 'uncommon', price: 155.00, color: '#4ADE80' },
      ]
    },
    {
      id: 22,
      name: 'DANGER ZONE',
      price: 245.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Navaja Knife | Fade', rarity: 'legendary', price: 1520.00, color: '#FF6B00' },
        { name: 'AWP | Neo-Noir', rarity: 'epic', price: 840.00, color: '#9D4EDD' },
        { name: 'AK-47 | Asiimov', rarity: 'rare', price: 445.00, color: '#00F0FF' },
        { name: 'USP-S | Flashback', rarity: 'uncommon', price: 195.00, color: '#4ADE80' },
      ]
    },
    {
      id: 23,
      name: 'BREAKOUT CASE',
      price: 135.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'Butterfly Knife | Slaughter', rarity: 'legendary', price: 1680.00, color: '#FF6B00' },
        { name: 'M4A1-S | Cyrex', rarity: 'epic', price: 580.00, color: '#9D4EDD' },
        { name: 'Glock-18 | Water Elemental', rarity: 'rare', price: 275.00, color: '#00F0FF' },
        { name: 'CZ75-Auto | Pole Position', rarity: 'uncommon', price: 115.00, color: '#4ADE80' },
      ]
    },
    {
      id: 24,
      name: 'CHROMA COLLECTION',
      price: 315.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'M9 Bayonet | Marble Fade', rarity: 'legendary', price: 2280.00, color: '#FF6B00' },
        { name: 'AK-47 | Cartel', rarity: 'epic', price: 980.00, color: '#9D4EDD' },
        { name: 'Galil AR | Chatterbox', rarity: 'rare', price: 485.00, color: '#00F0FF' },
        { name: 'Dual Berettas | Urban Shock', rarity: 'uncommon', price: 220.00, color: '#4ADE80' },
      ]
    },
    {
      id: 25,
      name: 'WINTER OFFENSIVE',
      price: 105.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'M4A4 | Asiimov', rarity: 'epic', price: 720.00, color: '#9D4EDD' },
        { name: 'AWP | Redline', rarity: 'rare', price: 335.00, color: '#00F0FF' },
        { name: 'P2000 | Corticera', rarity: 'uncommon', price: 145.00, color: '#4ADE80' },
        { name: 'M4A1-S | Atomic Alloy', rarity: 'common', price: 58.00, color: '#94A3B8' },
      ]
    },
    {
      id: 26,
      name: 'PHOENIX CASE',
      price: 75.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: [
        { name: 'AK-47 | Redline', rarity: 'epic', price: 480.00, color: '#9D4EDD' },
        { name: 'AWP | Boom', rarity: 'rare', price: 245.00, color: '#00F0FF' },
        { name: 'Nova | Antique', rarity: 'uncommon', price: 95.00, color: '#4ADE80' },
        { name: 'MAG-7 | Heaven Guard', rarity: 'common', price: 38.00, color: '#94A3B8' },
      ]
    },
  ];

  const navItems = [
    { id: 'home', label: 'ГЛАВНАЯ', icon: 'Home' },
    { id: 'games', label: 'ИГРЫ', icon: 'Gamepad2' },
    { id: 'upgrade', label: 'АПГРЕЙД', icon: 'TrendingUp' },
    { id: 'contract', label: 'КОНТРАКТЫ', icon: 'FileSignature' },
    { id: 'inventory', label: 'ИНВЕНТАРЬ', icon: 'Package' },
    { id: 'deposit', label: 'ПОПОЛНЕНИЕ', icon: 'Wallet' },
    { id: 'withdraw', label: 'ВЫВОД', icon: 'ArrowUpFromLine' },
  ];

  const openCase = (caseItem: any) => {
    if (balance < caseItem.price || caseItem.items.length === 0) return;
    
    setIsOpeningCase(true);
    setOpenedItem(null);
    setBalance(prev => prev - caseItem.price);
    setRouletteOffset(0);

    const wonItem = {
      ...caseItem.items[Math.floor(Math.random() * caseItem.items.length)],
      id: Date.now(),
      openedAt: new Date().toISOString()
    };

    const rouletteArray: any[] = [];
    for (let i = 0; i < 50; i++) {
      const randomSkin = caseItem.items[Math.floor(Math.random() * caseItem.items.length)];
      rouletteArray.push({ ...randomSkin, uniqueId: `${i}-${Math.random()}` });
    }
    rouletteArray[45] = { ...wonItem, uniqueId: '45-won' };
    setRouletteItems(rouletteArray);

    setTimeout(() => {
      const itemWidth = 200;
      const targetOffset = -(45 * itemWidth - window.innerWidth / 2 + itemWidth / 2);
      setRouletteOffset(targetOffset);
    }, 100);

    setTimeout(() => {
      setOpenedItem(wonItem);
      setIsOpeningCase(false);
    }, 5000);
  };

  const addToInventory = () => {
    if (openedItem) {
      setInventory(prev => [openedItem, ...prev]);
      setOpenedItem(null);
      setActiveSection('inventory');
    }
  };

  const sellSkin = (skin: any) => {
    setInventory(prev => prev.filter(item => item.id !== skin.id));
    setBalance(prev => prev + skin.price);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'sell',
      amount: skin.price,
      description: `Продажа: ${skin.name}`,
      date: new Date().toISOString()
    }, ...prev]);
    setSelectedSkin(null);
  };

  const handleDeposit = (amount: number) => {
    setBalance(prev => prev + amount);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'deposit',
      amount: amount,
      description: 'Пополнение баланса',
      date: new Date().toISOString()
    }, ...prev]);
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= balance) {
      setBalance(prev => prev - amount);
      setTransactions(prev => [{
        id: Date.now(),
        type: 'withdraw',
        amount: amount,
        description: 'Вывод средств',
        date: new Date().toISOString()
      }, ...prev]);
      setWithdrawAmount('');
    }
  };

  const handleUpgrade = () => {
    if (!upgradeItem) return;
    
    setIsUpgrading(true);
    const chance = Math.random();
    const success = chance > 0.5;

    setTimeout(() => {
      if (success) {
        const newPrice = upgradeItem.price * (1.5 + Math.random() * 0.5);
        const upgradedItem = {
          ...upgradeItem,
          name: upgradeItem.name + ' (Upgraded)',
          price: newPrice,
          id: Date.now(),
          openedAt: new Date().toISOString()
        };
        setInventory(prev => prev.filter(item => item.id !== upgradeItem.id));
        setInventory(prev => [upgradedItem, ...prev]);
        setUpgradeResult({ success: true, item: upgradedItem });
        setTransactions(prev => [{
          id: Date.now(),
          type: 'upgrade',
          amount: newPrice - upgradeItem.price,
          description: `Апгрейд: ${upgradeItem.name}`,
          date: new Date().toISOString()
        }, ...prev]);
      } else {
        setInventory(prev => prev.filter(item => item.id !== upgradeItem.id));
        setUpgradeResult({ success: false, item: upgradeItem });
        setTransactions(prev => [{
          id: Date.now(),
          type: 'upgrade',
          amount: -upgradeItem.price,
          description: `Провал апгрейда: ${upgradeItem.name}`,
          date: new Date().toISOString()
        }, ...prev]);
      }
      setIsUpgrading(false);
      setUpgradeItem(null);
    }, 3000);
  };

  const handleContract = () => {
    if (contractItems.length !== 5) return;
    
    setIsProcessingContract(true);
    const totalValue = contractItems.reduce((sum, item) => sum + item.price, 0);
    const avgValue = totalValue / 5;
    
    setTimeout(() => {
      const allItems = cases.flatMap(c => c.items);
      const eligibleItems = allItems.filter(item => item.price >= avgValue * 0.8 && item.price <= avgValue * 2);
      const wonItem = eligibleItems[Math.floor(Math.random() * eligibleItems.length)] || allItems[0];
      
      const contractItem = {
        ...wonItem,
        id: Date.now(),
        openedAt: new Date().toISOString()
      };
      
      setInventory(prev => prev.filter(item => !contractItems.find(ci => ci.id === item.id)));
      setInventory(prev => [contractItem, ...prev]);
      setContractResult(contractItem);
      setTransactions(prev => [{
        id: Date.now(),
        type: 'contract',
        amount: contractItem.price - totalValue,
        description: `Контракт: ${contractItem.name}`,
        date: new Date().toISOString()
      }, ...prev]);
      setContractItems([]);
      setIsProcessingContract(false);
    }, 3000);
  };

  const toggleContractItem = (item: any) => {
    if (contractItems.find(ci => ci.id === item.id)) {
      setContractItems(prev => prev.filter(ci => ci.id !== item.id));
    } else if (contractItems.length < 5) {
      setContractItems(prev => [...prev, item]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center">
                <Icon name="Trophy" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold neon-glow text-primary">CS2 CASINO</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                <Icon name="Wallet" className="text-secondary" size={20} />
                <span className="font-semibold text-lg">${balance.toFixed(2)}</span>
              </div>
              
              <Button className="bg-primary hover:bg-primary/90 neon-border text-white font-semibold">
                <Icon name="LogIn" className="mr-2" size={18} />
                ВХОД ЧЕРЕЗ STEAM
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className={`
                  whitespace-nowrap font-semibold tracking-wide
                  ${activeSection === item.id 
                    ? 'bg-secondary text-white neon-border hover:bg-secondary/90' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'}
                `}
              >
                <Icon name={item.icon as any} className="mr-2" size={18} />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'games' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 neon-glow text-secondary">ОТКРЫТИЕ КЕЙСОВ</h2>
              <p className="text-muted-foreground">Попробуй удачу и выиграй легендарные скины</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id}
                  className="bg-card border-2 border-border hover:border-secondary transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => openCase(caseItem)}
                >
                  <div className="relative h-64 bg-muted/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90"></div>
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-white font-bold px-3 py-1 neon-border">
                        ${caseItem.price.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-primary neon-glow">{caseItem.name}</h3>
                    
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg neon-border"
                      disabled={balance < caseItem.price}
                    >
                      <Icon name="Unlock" className="mr-2" size={20} />
                      ОТКРЫТЬ КЕЙС
                    </Button>

                    {balance < caseItem.price && (
                      <p className="text-destructive text-sm mt-2 text-center">Недостаточно средств</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {isOpeningCase && (
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold neon-glow text-secondary mb-8">ОТКРЫВАЕМ КЕЙС...</h3>
                
                <div className="relative w-full max-w-6xl h-64 overflow-hidden">
                  <div 
                    className="absolute top-1/2 left-1/2 w-1 h-full bg-primary z-20 neon-glow"
                    style={{ transform: 'translate(-50%, -50%)' }}
                  />
                  
                  <div 
                    className="absolute top-1/2 left-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary z-20"
                    style={{ transform: 'translate(-50%, -200%)', filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }}
                  />
                  
                  <div 
                    ref={rouletteRef}
                    className="flex gap-4 absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-[4800ms] ease-out px-4"
                    style={{ transform: `translate(${rouletteOffset}px, -50%)` }}
                  >
                    {rouletteItems.map((item) => (
                      <Card 
                        key={item.uniqueId}
                        className="flex-shrink-0 w-48 h-56 bg-card border-2 flex flex-col items-center justify-center p-4"
                        style={{ borderColor: item.color }}
                      >
                        <Icon name="Crosshair" size={72} style={{ color: item.color }} className="mb-3" />
                        <Badge 
                          className="mb-2 text-xs font-bold px-2 py-0.5"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.rarity.toUpperCase()}
                        </Badge>
                        <p className="text-xs font-bold text-center leading-tight mb-2" style={{ color: item.color }}>
                          {item.name}
                        </p>
                        <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Progress value={80} className="w-64" />
                </div>
              </div>
            )}

            {openedItem && (
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full bg-card border-4 neon-border p-8 text-center animate-scale-in" style={{ borderColor: openedItem.color }}>
                  <div className="mb-6">
                    <Icon name="Sparkles" className="mx-auto text-6xl mb-4" size={64} style={{ color: openedItem.color }} />
                  </div>
                  
                  <Badge 
                    className="mb-4 text-sm font-bold px-4 py-1"
                    style={{ backgroundColor: openedItem.color }}
                  >
                    {openedItem.rarity.toUpperCase()}
                  </Badge>
                  
                  <h3 className="text-2xl font-bold mb-2 neon-glow" style={{ color: openedItem.color }}>
                    {openedItem.name}
                  </h3>
                  
                  <p className="text-4xl font-bold mb-8 text-primary">${openedItem.price.toFixed(2)}</p>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold neon-border"
                      onClick={addToInventory}
                    >
                      <Icon name="Package" className="mr-2" size={18} />
                      В ИНВЕНТАРЬ
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 border-2 hover:bg-muted font-bold"
                      onClick={() => setOpenedItem(null)}
                    >
                      <Icon name="X" className="mr-2" size={18} />
                      ЗАКРЫТЬ
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeSection === 'home' && (
          <div className="text-center py-20">
            <Icon name="Home" className="mx-auto mb-4 text-secondary" size={64} />
            <h2 className="text-4xl font-bold neon-glow text-secondary mb-4">ДОБРО ПОЖАЛОВАТЬ</h2>
            <p className="text-xl text-muted-foreground">Начни игру прямо сейчас!</p>
          </div>
        )}

        {activeSection === 'inventory' && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 neon-glow text-primary">ИНВЕНТАРЬ</h2>
                <p className="text-muted-foreground">Всего предметов: {inventory.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Общая стоимость</p>
                <p className="text-2xl font-bold text-primary">
                  ${inventory.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
              </div>
            </div>

            {inventory.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="Package" className="mx-auto mb-4 text-muted-foreground" size={64} />
                <h3 className="text-2xl font-bold mb-2 text-muted-foreground">Инвентарь пуст</h3>
                <p className="text-muted-foreground mb-6">Открой кейсы, чтобы получить скины</p>
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold neon-border"
                  onClick={() => setActiveSection('games')}
                >
                  <Icon name="Gamepad2" className="mr-2" size={18} />
                  ОТКРЫТЬ КЕЙСЫ
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {inventory.map((skin) => (
                  <Card 
                    key={skin.id}
                    className="bg-card border-2 hover:border-primary transition-all duration-300 overflow-hidden group cursor-pointer"
                    style={{ borderColor: `${skin.color}40` }}
                    onClick={() => setSelectedSkin(skin)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-center h-32 mb-3">
                        <Icon name="Crosshair" size={64} style={{ color: skin.color }} className="group-hover:scale-110 transition-transform" />
                      </div>
                      
                      <Badge 
                        className="mb-2 text-xs font-bold px-2 py-0.5"
                        style={{ backgroundColor: skin.color }}
                      >
                        {skin.rarity.toUpperCase()}
                      </Badge>
                      
                      <h4 className="font-bold mb-2 text-sm leading-tight" style={{ color: skin.color }}>
                        {skin.name}
                      </h4>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-xl font-bold text-primary">${skin.price.toFixed(2)}</span>
                        <Button 
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-white font-bold neon-border"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSkin(skin);
                          }}
                        >
                          <Icon name="DollarSign" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {selectedSkin && (
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card 
                  className="max-w-md w-full bg-card border-4 neon-border p-8 text-center animate-scale-in"
                  style={{ borderColor: selectedSkin.color }}
                >
                  <div className="mb-6">
                    <Icon name="Crosshair" className="mx-auto mb-4" size={96} style={{ color: selectedSkin.color }} />
                  </div>
                  
                  <Badge 
                    className="mb-4 text-sm font-bold px-4 py-1"
                    style={{ backgroundColor: selectedSkin.color }}
                  >
                    {selectedSkin.rarity.toUpperCase()}
                  </Badge>
                  
                  <h3 className="text-2xl font-bold mb-2 neon-glow" style={{ color: selectedSkin.color }}>
                    {selectedSkin.name}
                  </h3>
                  
                  <p className="text-4xl font-bold mb-2 text-primary">${selectedSkin.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Получен: {new Date(selectedSkin.openedAt).toLocaleString('ru-RU')}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold neon-border"
                      onClick={() => sellSkin(selectedSkin)}
                    >
                      <Icon name="DollarSign" className="mr-2" size={18} />
                      ПРОДАТЬ
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 border-2 hover:bg-muted font-bold"
                      onClick={() => setSelectedSkin(null)}
                    >
                      <Icon name="X" className="mr-2" size={18} />
                      ЗАКРЫТЬ
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeSection === 'deposit' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 neon-glow text-secondary">ПОПОЛНЕНИЕ БАЛАНСА</h2>
              <p className="text-muted-foreground">Выбери удобный способ пополнения</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[50, 100, 250, 500, 1000, 2500].map((amount) => (
                  <Card 
                    key={amount}
                    className="bg-card border-2 border-border hover:border-secondary transition-all duration-300 cursor-pointer group"
                    onClick={() => handleDeposit(amount)}
                  >
                    <div className="p-6 text-center">
                      <Icon name="Coins" className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" size={48} />
                      <p className="text-3xl font-bold text-primary mb-2">${amount}</p>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold neon-border">
                        ПОПОЛНИТЬ
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="bg-card border-2 border-border p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">ПРОИЗВОЛЬНАЯ СУММА</h3>
                <div className="flex gap-3">
                  <input 
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="flex-1 bg-muted border-2 border-border rounded-lg px-4 py-3 text-foreground font-semibold focus:border-secondary outline-none"
                  />
                  <Button 
                    className="bg-secondary hover:bg-secondary/90 text-white font-bold neon-border px-8"
                    onClick={() => handleDeposit(parseFloat(depositAmount) || 0)}
                    disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                  >
                    <Icon name="Plus" className="mr-2" size={20} />
                    ПОПОЛНИТЬ
                  </Button>
                </div>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { name: 'VISA/MC', icon: 'CreditCard' },
                  { name: 'CRYPTO', icon: 'Bitcoin' },
                  { name: 'QIWI', icon: 'Wallet' },
                  { name: 'STEAM', icon: 'Gamepad2' }
                ].map((method) => (
                  <Card key={method.name} className="bg-muted border border-border p-4 text-center">
                    <Icon name={method.icon as any} className="mx-auto mb-2 text-muted-foreground" size={32} />
                    <p className="text-sm font-semibold text-muted-foreground">{method.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'withdraw' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 neon-glow text-primary">ВЫВОД СРЕДСТВ</h2>
              <p className="text-muted-foreground">Доступно для вывода: ${balance.toFixed(2)}</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-2 border-border p-8">
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">СУММА ВЫВОДА</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      max={balance}
                      className="w-full bg-muted border-2 border-border rounded-lg px-4 py-4 text-2xl font-bold text-foreground focus:border-primary outline-none"
                    />
                    <Button 
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary font-bold"
                      onClick={() => setWithdrawAmount(balance.toString())}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[10, 50, 100, 500].map((amount) => (
                    <Button 
                      key={amount}
                      variant="outline"
                      className="border-2 hover:border-primary hover:bg-muted font-bold"
                      onClick={() => setWithdrawAmount(Math.min(amount, balance).toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">СПОСОБ ВЫВОДА</label>
                  <select className="w-full bg-muted border-2 border-border rounded-lg px-4 py-3 text-foreground font-semibold focus:border-primary outline-none">
                    <option>Steam Trade</option>
                    <option>VISA/MasterCard</option>
                    <option>Криптовалюта</option>
                    <option>QIWI Wallet</option>
                  </select>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 text-lg neon-border"
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
                >
                  <Icon name="ArrowUpFromLine" className="mr-2" size={20} />
                  ВЫВЕСТИ ${withdrawAmount || '0.00'}
                </Button>

                {parseFloat(withdrawAmount) > balance && (
                  <p className="text-destructive text-sm mt-3 text-center">Недостаточно средств</p>
                )}
              </Card>

              {transactions.length > 0 && (
                <Card className="bg-card border-2 border-border p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">ИСТОРИЯ ТРАНЗАКЦИЙ</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {transactions.slice(0, 10).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'deposit' ? 'bg-secondary/20' : 
                            tx.type === 'withdraw' ? 'bg-primary/20' : 
                            'bg-accent/20'
                          }`}>
                            <Icon 
                              name={tx.type === 'deposit' ? 'ArrowDown' : tx.type === 'withdraw' ? 'ArrowUp' : 'DollarSign'} 
                              size={20}
                              className={tx.type === 'deposit' ? 'text-secondary' : tx.type === 'withdraw' ? 'text-primary' : 'text-accent'}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(tx.date).toLocaleString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <p className={`text-lg font-bold ${
                          tx.type === 'deposit' ? 'text-secondary' : 
                          tx.type === 'withdraw' ? 'text-primary' : 
                          'text-accent'
                        }`}>
                          {tx.type === 'withdraw' ? '-' : '+'}{tx.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeSection === 'upgrade' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 neon-glow text-secondary">АПГРЕЙД СКИНОВ</h2>
              <p className="text-muted-foreground">Улучши свой скин с шансом 50% (в 1.5-2x раза)</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {!upgradeItem ? (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">ВЫБЕРИ СКИН ДЛЯ АПГРЕЙДА</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.map((skin) => (
                      <Card 
                        key={skin.id}
                        className="bg-card border-2 border-border hover:border-secondary transition-all cursor-pointer"
                        style={{ borderColor: `${skin.color}40` }}
                        onClick={() => setUpgradeItem(skin)}
                      >
                        <div className="p-4">
                          <Icon name="Crosshair" size={64} style={{ color: skin.color }} className="mx-auto mb-3" />
                          <Badge className="mb-2 text-xs font-bold" style={{ backgroundColor: skin.color }}>
                            {skin.rarity.toUpperCase()}
                          </Badge>
                          <h4 className="font-bold text-sm mb-2" style={{ color: skin.color }}>{skin.name}</h4>
                          <p className="text-xl font-bold text-primary">${skin.price.toFixed(2)}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {inventory.length === 0 && (
                    <div className="text-center py-20">
                      <Icon name="Package" className="mx-auto mb-4 text-muted-foreground" size={64} />
                      <p className="text-muted-foreground">Нет скинов для апгрейда</p>
                    </div>
                  )}
                </div>
              ) : (
                <Card className="bg-card border-4 neon-border p-8" style={{ borderColor: upgradeItem.color }}>
                  <div className="text-center">
                    <Icon name="TrendingUp" className="mx-auto mb-4" size={64} style={{ color: upgradeItem.color }} />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: upgradeItem.color }}>{upgradeItem.name}</h3>
                    <p className="text-3xl font-bold mb-6 text-primary">${upgradeItem.price.toFixed(2)}</p>
                    
                    <div className="bg-muted rounded-lg p-4 mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Возможная цена после апгрейда:</p>
                      <p className="text-2xl font-bold text-secondary">
                        ${(upgradeItem.price * 1.5).toFixed(2)} - ${(upgradeItem.price * 2).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold neon-border"
                        onClick={handleUpgrade}
                      >
                        <Icon name="Zap" className="mr-2" size={18} />
                        АПГРЕЙД (50%)
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 border-2"
                        onClick={() => setUpgradeItem(null)}
                      >
                        ОТМЕНА
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {isUpgrading && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto border-4 border-secondary rounded-full animate-spin border-t-transparent mb-6"></div>
                    <h3 className="text-3xl font-bold neon-glow text-secondary">АПГРЕЙД...</h3>
                  </div>
                </div>
              )}

              {upgradeResult && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <Card className="max-w-md w-full bg-card border-4 neon-border p-8 text-center">
                    {upgradeResult.success ? (
                      <>
                        <Icon name="CheckCircle2" className="mx-auto mb-4 text-secondary" size={96} />
                        <h3 className="text-3xl font-bold mb-4 text-secondary">УСПЕХ!</h3>
                        <p className="text-xl font-bold mb-2" style={{ color: upgradeResult.item.color }}>
                          {upgradeResult.item.name}
                        </p>
                        <p className="text-4xl font-bold mb-6 text-primary">${upgradeResult.item.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <>
                        <Icon name="XCircle" className="mx-auto mb-4 text-destructive" size={96} />
                        <h3 className="text-3xl font-bold mb-4 text-destructive">ПРОВАЛ</h3>
                        <p className="text-xl mb-6 text-muted-foreground">Скин потерян</p>
                      </>
                    )}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" onClick={() => setUpgradeResult(null)}>
                      ЗАКРЫТЬ
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'contract' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 neon-glow text-primary">КОНТРАКТЫ</h2>
              <p className="text-muted-foreground">Обменяй 5 скинов на 1 новый скин ({contractItems.length}/5)</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-5 gap-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="bg-card border-2 border-dashed border-border aspect-square flex items-center justify-center">
                    {contractItems[i] ? (
                      <div className="text-center p-2">
                        <Icon name="Crosshair" size={48} style={{ color: contractItems[i].color }} className="mx-auto mb-2" />
                        <p className="text-xs font-bold">${contractItems[i].price.toFixed(0)}</p>
                      </div>
                    ) : (
                      <Icon name="Plus" size={32} className="text-muted-foreground" />
                    )}
                  </Card>
                ))}
              </div>

              <div className="text-center mb-6">
                <Button 
                  className="bg-accent hover:bg-accent/90 text-white font-bold neon-border px-12 py-6 text-lg"
                  onClick={handleContract}
                  disabled={contractItems.length !== 5}
                >
                  <Icon name="FileSignature" className="mr-2" size={24} />
                  ОБМЕНЯТЬ ({contractItems.length}/5)
                </Button>
              </div>

              <h3 className="text-xl font-bold mb-4 text-primary">ВЫБЕРИ СКИНЫ ДЛЯ КОНТРАКТА</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {inventory.map((skin) => {
                  const isSelected = contractItems.find(ci => ci.id === skin.id);
                  return (
                    <Card 
                      key={skin.id}
                      className={`bg-card border-2 transition-all cursor-pointer ${
                        isSelected ? 'border-accent scale-95' : 'border-border hover:border-primary'
                      }`}
                      onClick={() => toggleContractItem(skin)}
                    >
                      <div className="p-3">
                        <Icon name="Crosshair" size={48} style={{ color: skin.color }} className="mx-auto mb-2" />
                        <Badge className="text-xs mb-1" style={{ backgroundColor: skin.color }}>
                          {skin.rarity.toUpperCase()}
                        </Badge>
                        <p className="text-xs font-bold mb-1 truncate" style={{ color: skin.color }}>{skin.name}</p>
                        <p className="text-sm font-bold text-primary">${skin.price.toFixed(0)}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {inventory.length === 0 && (
                <div className="text-center py-20">
                  <Icon name="Package" className="mx-auto mb-4 text-muted-foreground" size={64} />
                  <p className="text-muted-foreground">Нет скинов для контракта</p>
                </div>
              )}

              {isProcessingContract && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto border-4 border-primary rounded-full animate-spin border-t-transparent mb-6"></div>
                    <h3 className="text-3xl font-bold neon-glow text-primary">ОБРАБОТКА КОНТРАКТА...</h3>
                  </div>
                </div>
              )}

              {contractResult && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <Card className="max-w-md w-full bg-card border-4 neon-border p-8 text-center" style={{ borderColor: contractResult.color }}>
                    <Icon name="Sparkles" className="mx-auto mb-4" size={96} style={{ color: contractResult.color }} />
                    <Badge className="mb-4 text-sm font-bold px-4 py-1" style={{ backgroundColor: contractResult.color }}>
                      {contractResult.rarity.toUpperCase()}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2 neon-glow" style={{ color: contractResult.color }}>
                      {contractResult.name}
                    </h3>
                    <p className="text-4xl font-bold mb-6 text-primary">${contractResult.price.toFixed(2)}</p>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                      onClick={() => setContractResult(null)}
                    >
                      ЗАКРЫТЬ
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection !== 'games' && activeSection !== 'home' && activeSection !== 'inventory' && activeSection !== 'deposit' && activeSection !== 'withdraw' && activeSection !== 'upgrade' && activeSection !== 'contract' && (
          <div className="text-center py-20">
            <Icon name="Construction" className="mx-auto mb-4 text-accent" size={64} />
            <h2 className="text-4xl font-bold neon-glow text-accent mb-4">В РАЗРАБОТКЕ</h2>
            <p className="text-xl text-muted-foreground">Этот раздел скоро появится</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;