import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorState } from '@/types/calculadora';
import { calculateProductsWithPercentages, formatCurrency, formatPercentage } from './calculatorUtils';

export const generatePDF = async (state: CalculatorState) => {
  const doc = new jsPDF();
  const { products, fixedCosts, summary } = state;

  if (!summary) {
    throw new Error('Summary data is missing');
  }

  const calculations = calculateProductsWithPercentages(products);
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(236, 72, 153); // Pink
  doc.text('Análise Financeira - Confeitaria', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128); // Gray
  doc.text('Margem de Contribuição e Ponto de Equilíbrio', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 5;
  doc.setFontSize(10);
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Data de geração: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;

  // Seção 1: Produtos Cadastrados
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('1. Produtos Cadastrados', 14, yPosition);
  yPosition += 5;

  const productData = calculations.map(calc => [
    calc.name,
    formatCurrency(calc.salePrice),
    formatCurrency(calc.totalVariableCost),
    formatCurrency(calc.contributionMarginValue),
    formatPercentage(calc.contributionMarginPercent),
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Produto', 'Preço', 'Custo Var.', 'MC (R$)', 'MC (%)']],
    body: productData,
    theme: 'grid',
    headStyles: { fillColor: [236, 72, 153] },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Seção 2: Custos Fixos
  doc.setFontSize(14);
  doc.text('2. Custos Fixos Mensais', 14, yPosition);
  yPosition += 5;

  const fixedCostData = fixedCosts.map(cost => [
    cost.description,
    formatCurrency(cost.value),
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Descrição', 'Valor']],
    body: fixedCostData,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 5;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total de Custos Fixos: ${formatCurrency(summary.totalFixedCosts)}`, 14, yPosition);
  
  yPosition += 15;

  // Nova página se necessário
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Seção 3: Resumo Financeiro
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('3. Resumo Financeiro', 14, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  const summaryLines = [
    `Faturamento Total Mensal: ${formatCurrency(summary.totalRevenue)}`,
    `(-) Custos Variáveis Totais: ${formatCurrency(summary.totalVariableCosts)}`,
    `(=) Margem de Contribuição Total: ${formatCurrency(summary.totalContributionMargin)} (${formatPercentage(summary.averageContributionMarginPercent)})`,
    `(-) Custos Fixos: ${formatCurrency(summary.totalFixedCosts)}`,
  ];

  summaryLines.forEach(line => {
    doc.text(line, 14, yPosition);
    yPosition += 7;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const profitColor = summary.profitOrLoss >= 0 ? [16, 185, 129] : [239, 68, 68];
  doc.setTextColor(profitColor[0], profitColor[1], profitColor[2]);
  doc.text(`(=) Lucro/Prejuízo: ${formatCurrency(summary.profitOrLoss)}`, 14, yPosition);
  
  yPosition += 15;
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  // Seção 4: Ponto de Equilíbrio
  doc.setFontSize(14);
  doc.text('4. Ponto de Equilíbrio', 14, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.text(`PE em Faturamento: ${formatCurrency(summary.breakEvenPoint)}/mês`, 14, yPosition);
  yPosition += 7;
  doc.text(`Faturamento necessário por dia: ${formatCurrency(summary.breakEvenPointDaily)}`, 14, yPosition);
  yPosition += 7;

  if (summary.totalRevenue > 0) {
    const statusText = summary.isAboveBreakEven
      ? `✓ Você está ${Math.abs(summary.distanceFromBreakEvenPercent).toFixed(1)}% acima do PE`
      : `⚠ Falta ${formatCurrency(Math.abs(summary.distanceFromBreakEven))} para atingir o PE`;
    doc.text(statusText, 14, yPosition);
  }

  yPosition += 15;

  // Nova página se necessário
  if (yPosition > 230) {
    doc.addPage();
    yPosition = 20;
  }

  // Seção 5: Análise por Produto
  doc.setFontSize(14);
  doc.text('5. Análise por Produto (Ranking por MC%)', 14, yPosition);
  yPosition += 5;

  const sortedCalcs = [...calculations].sort(
    (a, b) => b.contributionMarginPercent - a.contributionMarginPercent
  );

  const productAnalysisData = sortedCalcs.map(calc => [
    calc.name,
    formatPercentage(calc.contributionMarginPercent),
    formatCurrency(calc.contributionMarginValue),
    calc.quantity?.toString() || '0',
    formatCurrency(calc.totalContribution),
    formatPercentage(calc.revenuePercentage),
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Produto', 'MC %', 'MC Unit.', 'Qtd', 'Contrib.', '% Fat.']],
    body: productAnalysisData,
    theme: 'grid',
    headStyles: { fillColor: [236, 72, 153] },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Insights
  const mostProfitable = sortedCalcs[0];
  const topContributor = [...calculations].sort((a, b) => b.totalContribution - a.totalContribution)[0];
  const lowMargin = calculations.filter(c => c.contributionMarginPercent < 50 && c.contributionMarginPercent > 0);

  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Insights:', 14, yPosition);
  yPosition += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  if (mostProfitable && mostProfitable.contributionMarginPercent > 0) {
    doc.text(
      `• Produto mais rentável: ${mostProfitable.name} (MC: ${formatPercentage(mostProfitable.contributionMarginPercent)})`,
      14,
      yPosition
    );
    yPosition += 6;
  }

  if (topContributor && topContributor.totalContribution > 0) {
    doc.text(
      `• Produto que mais contribui: ${topContributor.name} (${formatCurrency(topContributor.totalContribution)})`,
      14,
      yPosition
    );
    yPosition += 6;
  }

  if (lowMargin.length > 0) {
    doc.text(
      `• Produtos com MC abaixo de 50%: ${lowMargin.map(p => p.name).join(', ')}`,
      14,
      yPosition,
      { maxWidth: pageWidth - 28 }
    );
  }

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(
      'Gerado por Calculadora Financeira - Duda Berger',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      'Este relatório é uma simulação baseada nos dados fornecidos',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 6,
      { align: 'center' }
    );
  }

  // Salvar PDF
  doc.save(`analise-financeira-${new Date().toISOString().split('T')[0]}.pdf`);
};
