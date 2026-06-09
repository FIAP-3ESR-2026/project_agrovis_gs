# 🌱 AgroVis — Modelo Preditivo de Secas

> **Global Solution 2026 — Space Connect**
> Disciplina: Inteligência Artificial & Machine Learning

Aplicação de machine learning para previsão de secas agrícolas com 7 dias de antecedência, utilizando dados meteorológicos de satélite da NASA POWER API.

---

## 👥 Integrantes

| Nome | RM |
|---|---|
| Augusto Rocha Silva | RM556316 |
| Erik Yuuta Goto | RM558076 |
| Guilherme Vieira Augusto | RM557264 |
| Wendell dos Santos Silva | RM558859 |

---

## 🎯 Objetivo

Prever, com **7 dias de antecedência**, se uma região agrícola brasileira entrará em condição de seca extrema — permitindo que produtores tomem ações preventivas como irrigação, antecipação de colheita ou acionamento de seguro agrícola.

**Abordagem:** Classificação binária supervisionada com variável alvo baseada no Percentil 20 histórico de umidade do solo na zona da raiz (`GWETROOT`), cobrindo 11 polos agrícolas estratégicos do Brasil.

---

## 📁 Estrutura do Repositório

```
ia-ml/
├── docs/
│   ├── nasa-power-parameters.csv       # Dicionário oficial dos parâmetros da NASA
│   └── agrovis_columns_description.csv # Descrição das colunas do dataset
├── pipeline/
│   ├── agrovis_ML_pipeline.ipynb       # Notebook principal
│   └── results/
│       └── individual_data/            # CSVs individuais por localidade
│           ├── dataset_agrovis_Cabrobo_PE_-8.51_-39.3.csv
│           ├── dataset_agrovis_Cascavel_PR_-24.95_-53.45.csv
│           ├── dataset_agrovis_Dourados_MS_-22.22_-54.82.csv
│           ├── dataset_agrovis_Eldorado_do_Sul_RS_-30.0_-51.61.csv
│           ├── dataset_agrovis_Juazeiro_BA_-9.42_-40.5.csv
│           ├── dataset_agrovis_Passo_Fundo_RS_-28.27_-52.41.csv
│           ├── dataset_agrovis_Petrolina_PE_-9.39_-40.5.csv
│           ├── dataset_agrovis_Ribeirao_Preto_SP_-21.17_-47.81.csv
│           ├── dataset_agrovis_Santarem_PA_-2.43_-54.71.csv
│           ├── dataset_agrovis_Sorriso_MT_-12.54_-55.72.csv
│           └── dataset_agrovis_Uruacu_GO_-14.52_-48.86.csv
└── requirements.txt                    # Dependências Python
```

---

## 🛰️ Dataset — NASA POWER API

Os dados são coletados via **NASA POWER API** (Prediction Of Worldwide Energy Resources), uma API pública de dados de satélite que fornece séries históricas meteorológicas diárias para qualquer ponto do planeta.

### Localidades cobertas (11 polos agrícolas)

| Cidade | Estado | Região | Destaque |
|---|---|---|---|
| Sorriso | MT | Centro-Oeste | Polo nacional da soja |
| Petrolina | PE | Nordeste | Fruticultura no semiárido |
| Ribeirão Preto | SP | Sudeste | Polo canavieiro |
| Passo Fundo | RS | Sul | Trigo e soja |
| Cabrobó | PE | Nordeste | Foco de seca extrema |
| Cascavel | PR | Sul | Grãos |
| Dourados | MS | Centro-Oeste | Agropecuária |
| Eldorado do Sul | RS | Sul | Arroz e soja |
| Juazeiro | BA | Nordeste | Fruticultura irrigada |
| Santarém | PA | Norte | Soja e pesca |
| Uruaçu | GO | Centro-Oeste | Cerrado produtivo |

### Parâmetros coletados

| Parâmetro | Descrição |
|---|---|
| `PRECTOTCORR` | Precipitação diária corrigida (mm) |
| `GWETROOT` | Umidade na zona da raiz do solo (0–1) |
| `GWETTOP` | Umidade superficial do solo (0–1) |
| `T2M_MAX` | Temperatura máxima diária (°C) |
| `RH2M` | Umidade relativa do ar a 2m (%) |
| `WS2M` | Velocidade do vento a 2m (m/s) |
| `ALLSKY_SFC_SW_DWN` | Radiação solar total na superfície (MJ/m²/dia) |

**Período:** 2015 a 2026 | **Total:** ~45.000 registros diários

---

## ⚙️ Pipeline

O notebook `agrovis_ML_pipeline.ipynb` está organizado em 6 seções:

### 1. Configurações e Imports
Centralização de todos os imports do projeto.

### 2. Extração — NASA POWER API
Coleta automatizada via endpoint `/point` da API para cada uma das 11 localidades. Os dados individuais são salvos em CSV por localidade e depois consolidados em um único dataset unificado.

### 3. Transformação — Pipeline de Dados
Sequência de transformações aplicadas via `.pipe()`:

| Etapa | Função | O que faz |
|---|---|---|
| 1 | `transform_date_columns` | Converte YEAR + DOY → DATA, ordena cronologicamente |
| 2 | `tratar_valores_nulos` | Substitui -999.0 (código de erro da NASA) por NaN, aplica ffill/bfill por localidade |
| 3 | `criar_features_temporais` | Cria acúmulos de chuva (7d, 30d), média de umidade (14d), ondas de calor e índice de estresse hídrico |
| 4 | `criar_variavel_alvo_dinamica_seca` | Define `ALVO_PREDITIVO` com Percentil 20 histórico por região + shift de 7 dias |
| 5 | `remover_colunas_intermediarias` | Extrai sazonalidade (`MES_DO_ANO`), remove colunas de metadados |

#### Como a variável alvo é definida
1. Para cada localidade, calcula-se o **Percentil 20 histórico** de `GWETROOT` — o nível de umidade que aquela região fica abaixo em apenas 20% dos dias históricos. Esse limiar é local: o que é "seco" em Santarém é diferente do que é "seco" em Petrolina.
2. Dias abaixo desse limiar são marcados como **Seca (1)**; os demais como **Normal (0)**.
3. Aplica-se um **shift de 7 dias**: o rótulo de cada dia é deslocado 7 posições para trás, fazendo com que os dados de hoje prevejam o estado daqui a uma semana.

### 4. Análise Exploratória (EDA)
- Estatísticas descritivas do dataset preparado
- Série temporal de chuva vs. umidade do solo (eixo duplo)
- Distribuição de classes (desbalanceamento Normal vs. Seca)

### 5. Treinamento do Modelo
Dois modelos treinados para comparação:

| Modelo | Configuração |
|---|---|
| **Random Forest** *(escolhido)* | `n_estimators=100`, `class_weight='balanced'`, `random_state=42` |
| **KNN** *(baseline)* | `n_neighbors=5` |

**Divisão temporal:**
- Treino: 2015 – 2024
- Teste: 2025 em diante *(dados que o modelo nunca viu)*

### 6. Avaliação e Métricas
Comparação entre modelos e avaliação detalhada do Random Forest com classification report e matriz de confusão.

---

## 📊 Resultados

### Comparação de modelos

| Métrica | Random Forest ✅ | KNN |
|---|---|---|
| Accuracy | **88%** | 79% |
| Precision — Seca | **84%** | 71% |
| Recall — Seca | **77%** | 64% |
| F1-score — Seca | **0.81** | 0.67 |
| Macro avg F1 | **0.84** | 0.73 |

### Por que o Recall é a métrica mais importante?
Recall mede quantas secas reais foram detectadas com antecedência. Um **falso negativo** (prever Normal quando é Seca) significa que o produtor não recebe alerta — esse é o erro de maior impacto real. O Random Forest foi escolhido por apresentar o maior Recall na classe Seca.

---

## 🚀 Como executar

### Pré-requisitos
```bash
pip install -r requirements.txt
```

### Dependências principais
```
requests
numpy
pandas
matplotlib
seaborn
scikit-learn
```

### Executar o notebook
```bash
jupyter notebook agrovis_ML_pipeline.ipynb
```

> **Atenção:** A célula de extração da NASA POWER API realiza chamadas HTTP para cada localidade. Se o dataset já foi gerado, carregue diretamente o arquivo `dataset_agrovis_unificado.csv` para pular essa etapa.

---

## 🌍 Contexto Espacial e Impacto

O AgroVis utiliza **dados de satélite da NASA** como fonte primária — posicionando o projeto diretamente no contexto da nova economia espacial. A NASA POWER API é alimentada por dados de instrumentos orbitais que monitoram continuamente a superfície terrestre.

**Impacto social:**
- 40 milhões de brasileiros dependem direta ou indiretamente da agricultura
- 7 dias de antecedência permitem irrigação emergencial, antecipação de colheita e acionamento de seguros agrícolas
- A definição de seca por percentil histórico local torna o modelo adaptável a qualquer região do planeta

**Próximos passos:**
- Integração com sensores IoT de solo para enriquecimento em tempo real
- Expansão para todas as regiões produtoras do Brasil
- Deploy via API REST para integração com sistemas de gestão agrícola
- Adição de módulo de previsão de inundação

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos — **Global Solution 2026, FIAP**.