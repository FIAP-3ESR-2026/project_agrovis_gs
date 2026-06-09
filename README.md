# 🌿 AgroVis — Global Solution 2026 | FIAP

Plataforma de monitoramento agrícola inteligente desenvolvida para a **Global Solution 2026** da FIAP com o tema **Space Connect**.

Alinhado aos ODS 2 (Fome Zero e Agricultura Sustentável) e ODS 13 (Ação contra a Mudança Global do Clima), o AgroVis é composto por módulos independentes que exploram, cada um à sua forma, como tecnologia espacial e computacional pode apoiar o produtor rural — da detecção visual de anomalias à previsão de secas com dados de satélite, passando por uma API de monitoramento e um aplicativo mobile.

---

## 👥 Integrantes

| Nome | RM | Função |
|---|---|---|
| Augusto Rocha Silva | RM556316 | Desenvolvimento Front-end |
| Guilherme Vieira Augusto | RM557264 | Desenvolvimento Back-end |
| Erik Yuuta Goto | RM558076 | UX/UI e Prototipação |
| Wendell dos Santos Silva | RM558859 | Testes e Validação |

> **Curso:** Engenharia de Software — FIAP | Turma 3ESR | 2026

---

## 🛰️ Contexto — Space Connect

A Global Solution é o projeto semestral integrador da FIAP, onde todas as disciplinas convergem em torno de um mesmo tema. No tema **Space Connect**, o desafio é explorar como tecnologias inspiradas na Nova Economia Espacial podem resolver problemas reais na Terra.

O AgroVis aborda esse desafio sob diferentes perspectivas em cada disciplina, todas voltadas ao mesmo problema central: o monitoramento inteligente de lavouras.

---

## 📂 Estrutura do Repositório

Cada pasta é uma entrega independente de uma disciplina da grade semestral, com seu próprio `README.md`, instruções de execução e contexto técnico.

```
project_agrovis_gs/
│
├── /ia-ml               # Cognitive & Analytics
│                        # Previsão de seca com 7 dias de antecedência
│                        # Dados reais da NASA POWER API · Random Forest · 88% accuracy
│
├── /iot-vision          # IoT & IoB
│                        # Detecção visual de anomalias em lavouras com OpenCV
│                        # Edge Computing + envio de telemetria para a nuvem
│
├── /backend             # SOA & WebServices + Engenharia de Software
│                        # API Core em .NET/C# com alertas automáticos
│                        # CRUD de plantações, satélites, leituras e alertas
│
├── /frontend-mobile     # Mobile Development
│                        # App React Native + Expo consumindo a API do backend
│                        # Dashboard · Alertas · Leituras · Plantações
│
└── README.md            # Este arquivo
```

> **Observação:** os módulos `ia-ml` e `iot-vision` são entregas independentes de suas respectivas disciplinas e não possuem integração direta com o backend ou entre si. O backend e o frontend-mobile são integrados entre si via API REST.

---

## 📋 O que cada módulo entrega

### `ia-ml` — Cognitive & Analytics
Pipeline completo de Machine Learning usando dados reais da **NASA POWER API** — alimentada por instrumentos orbitais de monitoramento da superfície terrestre. Coleta variáveis meteorológicas diárias de 11 polos agrícolas brasileiros (2015–2026) e treina um modelo de classificação binária para prever, com 7 dias de antecedência, se uma região entrará em condição de seca extrema.

- **Fonte:** NASA POWER API (dados de satélite)
- **Algoritmo escolhido:** Random Forest com `class_weight='balanced'`
- **Baseline de comparação:** KNN
- **Divisão:** treino até 2024 / teste em dados de 2025 em diante

| Métrica | Random Forest | KNN |
|---|---|---|
| Accuracy | **88%** | 79% |
| Precision — Seca | **84%** | 71% |
| Recall — Seca | **77%** | 64% |
| F1-score — Seca | **0.81** | 0.67 |

---

### `iot-vision` — IoT & IoB
Sistema de visão computacional em Python que simula um drone sobrevoando a lavoura. Processa o vídeo localmente frame a frame (Edge Computing), detecta anomalias visuais por cor calibrada em HSV e exibe os resultados em HUD em tempo real. A cada 5 segundos, envia um JSON com a contagem de anomalias para um endpoint na nuvem via `requests`.

- **Ferramenta de calibração:** `calibrador_hsv.py` — sliders interativos para ajustar o intervalo de cor das anomalias
- **Motor de execução:** `drone_vision.py` — detecção de contornos com filtro de área + envio IoT
- **Resiliência:** `timeout=1s` garante que falhas de rede não interrompam o processamento visual

---

### `backend` — SOA & WebServices
API RESTful em **ASP.NET Core / C#** com arquitetura em camadas (Controller → Service → Repository → DbContext). Gerencia plantações, satélites, leituras climáticas e alertas. Ao receber uma leitura, avalia automaticamente as condições de risco e pode gerar alertas sem intervenção manual.

| Condição | Alerta | Nível |
|---|---|---|
| Umidade ≤ 30% e precipitação ≤ 2mm | Risco de Seca | Alto |
| Temperatura ≥ 38°C | Temperatura Extrema | Alto |
| Precipitação ≥ 80mm | Risco de Alagamento | Crítico |
| Vento ≥ 70 km/h | Vento Forte | Médio |

Endpoint de dashboard consolidado (`GET /api/dashboard/plantacao/{id}`) retorna status geral, contagem de alertas e recomendação operacional para consumo pelo app mobile.

---

### `frontend-mobile` — Mobile Development
Aplicativo mobile em **React Native + Expo + TypeScript** com 5 telas que consomem a API REST do backend. O Dashboard exibe o status geral e a recomendação operacional da plantação. Alertas lista os eventos pendentes com resolução em um toque. Leituras permite cadastro manual de dados climáticos. Plantações gerencia as áreas monitoradas. Preferências persiste configurações locais via AsyncStorage.

---

## 🛠️ Tecnologias por Módulo

| Módulo | Disciplina | Tecnologias |
|---|---|---|
| `ia-ml` | Cognitive & Analytics | Python, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, Jupyter |
| `iot-vision` | IoT & IoB | Python, OpenCV, NumPy, Requests |
| `backend` | SOA & WebServices | C#, .NET, ASP.NET Core, Entity Framework Core, SQLite |
| `frontend-mobile` | Mobile Development | React Native, Expo, TypeScript, AsyncStorage, React Navigation |

---

## 🔗 Repositório

[github.com/FIAP-3ESR-2026/project_agrovis_gs](https://github.com/FIAP-3ESR-2026/project_agrovis_gs)
