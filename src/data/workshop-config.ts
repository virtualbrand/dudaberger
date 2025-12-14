// Definição de tipos
interface Lot {
  number: number;
  originalPrice: number;
  currentPrice: number;
  installmentPrice: string;
  soldPercentage: number;
  paymentLink: string;
}

interface WorkshopConfig {
  currentLotNumber: number;
  lots: Lot[];
  event: {
    date: string;
  };
}

// Configuração de todos os lotes
export const workshopConfig: WorkshopConfig = {
  currentLotNumber: 2, // Altere apenas este número para mudar o lote ativo
  event: {
    date: "17 E 18 DE JANEIRO | NO ZOOM | AO VIVO"
  },
  lots: [
    {
      number: 1,
      originalPrice: 147,
      currentPrice: 32,
      installmentPrice: "8 x de R$ 4,61",
      soldPercentage: 0,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=5cuo1pho"
    },
    {
      number: 2,
      originalPrice: 147,
      currentPrice: 37,
      installmentPrice: "8 x de R$ 5,33",
      soldPercentage: 67.3,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=kzn7moqq"
    },
    {
      number: 3,
      originalPrice: 147,
      currentPrice: 42,
      installmentPrice: "8 x de R$ 6,05",
      soldPercentage: 0,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=tmesww54"
    },
    {
      number: 4,
      originalPrice: 147,
      currentPrice: 47,
      installmentPrice: "8 x de R$ 6,77",
      soldPercentage: 0,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=oy7km1t6"
    },
    {
      number: 5,
      originalPrice: 147,
      currentPrice: 52,
      installmentPrice: "8 x de R$ 7,49",
      soldPercentage: 0,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=5d68vs6t"
    },
    {
      number: 6,
      originalPrice: 147,
      currentPrice: 57,
      installmentPrice: "8 x de R$ 8,21",
      soldPercentage: 99.3,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=armkuaxb"
    },
    {
      number: 7,
      originalPrice: 147,
      currentPrice: 62,
      installmentPrice: "8 x de R$ 9,02",
      soldPercentage: 0,
      paymentLink: "https://pay.hotmart.com/U102307449V?checkoutMode=10&off=jy0e2oiu"
    }
  ]
};

// Função para obter o lote atual
export const getCurrentLot = (): Lot => {
  const lot = workshopConfig.lots.find(l => l.number === workshopConfig.currentLotNumber);
  if (!lot) {
    throw new Error(`Lote ${workshopConfig.currentLotNumber} não encontrado`);
  }
  return lot;
};

// Função helper para formatar o texto do progresso
export const getProgressText = () => {
  const { soldPercentage, currentPrice } = getCurrentLot();
  return `${soldPercentage}% dos ingressos vendidos a R$${currentPrice}`;
};

// Função helper para formatar o texto do botão principal
export const getPrimaryButtonText = () => {
  const { number } = getCurrentLot();
  return number === 7 ? `Comprar ingresso | Último lote` : `Comprar ingresso | Lote ${number}`;
};

// Função helper para formatar o texto do hover
export const getHoverButtonText = () => {
  const { originalPrice, currentPrice } = getCurrentLot();
  return `De R$ ${originalPrice} por R$ ${currentPrice}`;
};

// Função helper para obter o link de pagamento
export const getPaymentLink = () => {
  return getCurrentLot().paymentLink;
};

// Função helper para obter o preço parcelado
export const getInstallmentPrice = () => {
  return getCurrentLot().installmentPrice;
};