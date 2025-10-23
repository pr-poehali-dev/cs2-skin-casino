import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('games');
  const [balance] = useState(1234.56);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const [openedItem, setOpenedItem] = useState<any>(null);

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
    if (balance < caseItem.price) return;
    
    setIsOpeningCase(true);
    setOpenedItem(null);

    setTimeout(() => {
      const randomItem = caseItem.items[Math.floor(Math.random() * caseItem.items.length)];
      setOpenedItem(randomItem);
      setIsOpeningCase(false);
    }, 3000);
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
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto border-4 border-secondary rounded-full animate-spin border-t-transparent"></div>
                  </div>
                  <h3 className="text-3xl font-bold neon-glow text-secondary mb-4">ОТКРЫВАЕМ КЕЙС...</h3>
                  <Progress value={66} className="w-64 mx-auto" />
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
                      onClick={() => setOpenedItem(null)}
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
          <div className="text-center py-20">
            <Icon name="Package" className="mx-auto mb-4 text-primary" size={64} />
            <h2 className="text-4xl font-bold neon-glow text-primary mb-4">ИНВЕНТАРЬ</h2>
            <p className="text-xl text-muted-foreground">Здесь будут отображаться ваши скины</p>
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
