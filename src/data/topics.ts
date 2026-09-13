export interface Topic {
  id: string;
  name: string;
  year: number;
}

export const topics: Topic[] = [
  // 10º Ano
  { id: "geometria-10", name: "Geometria no Plano e no Espaço", year: 10 },
  { id: "funcoes-gerais-10", name: "Funções Reais de Variável Real", year: 10 },
  { id: "funcoes-quadraticas-10", name: "Função Quadrática", year: 10 },
  { id: "estatistica-10", name: "Estatística", year: 10 },
  { id: "sequencias-10", name: "Sequências e Regularidades", year: 10 },

  // 11º Ano
  { id: "trigonometria-11", name: "Trigonometria", year: 11 },
  { id: "funcoes-racionais-11", name: "Funções Racionais", year: 11 },
  { id: "sucessoes-11", name: "Sucessões", year: 11 },
  { id: "geometria-analitica-11", name: "Geometria Analítica", year: 11 },
  { id: "probabilidades-11", name: "Probabilidades e Combinatória", year: 11 },

  // 12º Ano
  { id: "funcoes-exponenciais-12", name: "Funções Exponenciais e Logarítmicas", year: 12 },
  { id: "limites-12", name: "Limites e Continuidade", year: 12 },
  { id: "derivadas-12", name: "Derivadas e Aplicações", year: 12 },
  { id: "primitivas-12", name: "Primitivas e Cálculo Integral", year: 12 },
  { id: "probabilidades-12", name: "Probabilidades e Distribuições", year: 12 },
];

export const getTopicsByYear = (year: number) => topics.filter(t => t.year === year);

export const yearDescriptions: Record<number, string> = {
  10: "Geometria, funções, estatística e sequências — as bases fundamentais.",
  11: "Trigonometria, sucessões, geometria analítica e probabilidades.",
  12: "Exponenciais, limites, derivadas, primitivas e distribuições.",
};
