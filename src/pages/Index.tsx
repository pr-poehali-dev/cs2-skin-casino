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
      items: []
    },
    {
      id: 3,
      name: 'KNIFE COLLECTION',
      price: 500.00,
      image: 'https://v3b.fal.media/files/b/lion/TWB0O0y-bcovoPW2A7XLw_output.png',
      items: []
    },
  ];

  const navItems = [
    { id: 'home', label: 'ГЛАВНАЯ', icon: 'Home' },
    { id: 'games', label: 'ИГРЫ', icon: 'Gamepad2' },
    { id: 'inventory', label: 'ИНВЕНТАРЬ', icon: 'Package' },
    { id: 'deposit', label: 'ПОПОЛНЕНИЕ', icon: 'Wallet' },
    { id: 'withdraw', label: 'ВЫВОД', icon: 'ArrowUpFromLine' },
    { id: 'profile', label: 'ПРОФИЛЬ', icon: 'User' },
    { id: 'support', label: 'ПОДДЕРЖКА', icon: 'MessageCircle' },
    { id: 'rules', label: 'ПРАВИЛА', icon: 'FileText' },
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
    setSelectedSkin(null);
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

        {activeSection !== 'games' && activeSection !== 'home' && activeSection !== 'inventory' && (
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