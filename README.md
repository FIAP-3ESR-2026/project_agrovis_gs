# AgroVis — Global Solution 2026 | FIAP

## 🛰️🌱 O Elo Tecnológico entre o Cosmos e o Campo

O **AgroVis** é uma plataforma inovadora concebida para conectar os avanços da Nova Economia Espacial aos desafios reais da agricultura na Terra. Alinhado diretamente aos Objetivos de Desenvolvimento Sustentável de Fome Zero e Agricultura Sustentável (**ODS 2**) e Ação contra a Mudança Global do Clima (**ODS 13**), o projeto visa reduzir perdas nas safras, otimizar recursos e antecipar desastres climáticos por meio de um ecossistema tecnológico integrado.

---

## 🚀 Arquitetura do Ecossistema

Para que a solução funcione de ponta a ponta, o projeto divide-se em componentes modulares e complementares:

1. **Monitorização Visual (IoT & Visão Computacional):** Sistemas em Python com OpenCV/MediaPipe que simulam a visão orbital de satélites ou drones, realizando inferências visuais em tempo real (deteção de pragas e seca) via webcam.
2. **Análise Climática (IA & Machine Learning):** Modelos preditivos em Python baseados em algoritmos clássicos (Random Forest/Regressão/KNN) treinados com datasets de Mudanças Climáticas para prever anomalias de temperatura e humidade.
3. **Core API (SOA & WebServices):** Backend robusto em .NET (C#) que orquestra as regras de negócio, centraliza o processamento dos alertas, trata exceções e persiste os históricos num banco de dados relacional.
4. **Interface Mobile (Mobile Development):** Aplicação para o agricultor construída em React Native (Expo), que oferece navegação fluida entre telas, consumo da API e persistência de dados local (AsyncStorage).
5. **Governação & Infraestrutura (Operating Systems & Engenharia de Software):** Ambiente de rede corporativo simulado em Windows Server (Active Directory, GPOs, DNS, IIS) e mapeamento arquitetural estruturado sob o framework TOGAF no ARCHI.

---

## 📂 Estrutura de Pastas do Repositório

O repositório está organizado para isolar o escopo de cada disciplina avaliada:

```text
├── /backend             # API Core em .NET (C#), DTOs e persistência
├── /frontend-mobile     # Aplicação React Native (Expo) e navegação
├── /iot-vision          # Scripts em Python (OpenCV) e requisitos de câmera
├── /ia-ml               # Notebooks Jupyter (.ipynb) e análise preditiva
├── /cybersecurity       # Documentação teórica STRIDE e scripts hands-on
├── /docs-governanca     # Arquitetura TOGAF (.ZIP/.PDF) e relatórios de OS
└── README.md            # Documentação geral do repositório