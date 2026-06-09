# AgroVis — Global Solution 2026 | FIAP

## Integrantes do Grupo


| Nome | RM / Matrícula | Função no Projeto |
|---|---|---|
| Augusto Rocha Silva | RM556316 | Desenvolvimento Front-end |
| Guilherme Vieira Augusto | RM557264 | Desenvolvimento Back-end |
| Erik Yuuta Goto | RM558076 | UX/UI e Prototipação |
| Wendell dos Santos Silva | RM558859 | Testes e Validação |

---

## 🛰️🌱 O Elo Tecnológico entre o Cosmos e o Campo

O **AgroVis** é uma plataforma inovadora concebida para conectar os avanços da Nova Economia Espacial aos desafios reais da agricultura na Terra.

Alinhado diretamente aos Objetivos de Desenvolvimento Sustentável de Fome Zero e Agricultura Sustentável (**ODS 2**) e Ação contra a Mudança Global do Clima (**ODS 13**), o projeto visa reduzir perdas nas safras, otimizar recursos e antecipar desastres climáticos por meio de um ecossistema tecnológico integrado.

A proposta do AgroVis é transformar dados climáticos, visuais e agrícolas em informações acessíveis, permitindo que produtores rurais acompanhem o status de suas plantações, recebam alertas de risco e tomem decisões mais rápidas diante de cenários críticos, como seca, calor extremo, chuvas intensas e ventos fortes.

---

## Objetivo do Projeto

O objetivo do AgroVis é oferecer uma solução tecnológica capaz de apoiar o agricultor no monitoramento de plantações, utilizando dados espaciais, climáticos e preditivos como base para geração de alertas inteligentes.

A plataforma foi pensada para funcionar como um ecossistema integrado, no qual dados são coletados, processados, armazenados e exibidos ao usuário final de forma clara e objetiva.

Entre os principais objetivos do projeto estão:

* reduzir perdas agrícolas causadas por eventos climáticos extremos;
* antecipar riscos relacionados à seca, temperatura, chuva e vento;
* centralizar informações agrícolas em uma API robusta;
* disponibilizar uma interface mobile simples para o agricultor;
* permitir armazenamento de histórico climático e alertas;
* apoiar a tomada de decisão no campo por meio de indicadores visuais.

---

## 🚀 Arquitetura do Ecossistema

Para que a solução funcione de ponta a ponta, o projeto divide-se em componentes modulares e complementares:

1. **Monitorização Visual (IoT & Visão Computacional):** sistemas em Python com OpenCV/MediaPipe que simulam a visão orbital de satélites ou drones, realizando inferências visuais em tempo real para detecção de pragas, seca e anomalias visuais.

2. **Análise Climática (IA & Machine Learning):** modelos preditivos em Python baseados em algoritmos clássicos, como Random Forest, Regressão e KNN, treinados com datasets climáticos para prever anomalias de temperatura, umidade e risco climático.

3. **Core API (SOA & WebServices):** backend em .NET/C# responsável por orquestrar as regras de negócio, centralizar o processamento dos alertas, tratar dados recebidos, persistir históricos e disponibilizar WebServices para consumo externo.

4. **Interface Mobile (Mobile Development):** aplicação mobile desenvolvida em React Native com Expo, que permite ao agricultor visualizar dashboard, alertas, leituras climáticas, plantações e preferências locais.

5. **Governação & Infraestrutura (Operating Systems & Engenharia de Software):** ambiente de rede corporativo e documentação arquitetural voltada à governança, segurança, infraestrutura e organização da solução.

> Observação: neste repositório, o desenvolvimento implementado concentra-se principalmente nos módulos **Core API** e **Interface Mobile**, que representam a integração entre processamento, persistência, comunicação via WebServices e entrega das informações ao usuário final.

---

## 📂 Estrutura de Pastas do Repositório

O repositório está organizado para isolar o escopo de cada módulo do ecossistema AgroVis:

```text
├── /backend             # API Core em .NET/C#, DTOs, Services, Repositories e persistência
├── /frontend-mobile     # Aplicação React Native com Expo, telas, navegação e AsyncStorage
├── /iot-vision          # Scripts em Python para visão computacional e simulação de captura visual
├── /ia-ml               # Notebooks e análises preditivas relacionadas a dados climáticos
├── /cybersecurity       # Documentação de segurança, ativos, ameaças e análises técnicas
├── /docs-governanca     # Documentação de arquitetura, governança e relatórios complementares
└── README.md            # Documentação geral do projeto
```

---

## Módulo C — Core API em .NET/C#

O módulo de backend representa o motor principal do AgroVis.

Ele foi desenvolvido como uma **API ASP.NET Core em C#**, responsável por processar as regras de negócio, armazenar dados históricos e fornecer endpoints para o aplicativo mobile.

### Principais responsabilidades

* cadastrar e consultar plantações;
* cadastrar e consultar satélites;
* registrar leituras climáticas;
* gerar alertas automáticos com base em regras de risco;
* filtrar alertas por plantação, tipo, nível de risco e status;
* disponibilizar um dashboard consolidado para o aplicativo mobile;
* persistir os dados em banco relacional;
* organizar o fluxo entre Controllers, Services, Repositories, DTOs e Entities.

### Estrutura do backend

```text
backend/
└── src/
    └── AgroVis.Api/
        ├── Controllers/
        ├── Data/
        ├── Dtos/
        ├── Entities/
        ├── Enums/
        ├── Repositories/
        ├── Services/
        ├── Program.cs
        └── appsettings.json
```

### Entidades principais

| Entidade           | Descrição                                                          |
| ------------------ | ------------------------------------------------------------------ |
| `Plantacao`        | Representa uma área agrícola monitorada                            |
| `Satelite`         | Representa uma fonte espacial ou sensor de coleta                  |
| `LeituraClimatica` | Armazena dados climáticos como temperatura, umidade, vento e chuva |
| `Alerta`           | Representa alertas gerados automaticamente ou manualmente pela API |

---

## Funcionalidades da API

### Plantações

A API permite cadastrar, listar, consultar, atualizar e excluir plantações.

Endpoints principais:

```http
GET /api/plantacoes
GET /api/plantacoes/{id}
POST /api/plantacoes
PUT /api/plantacoes/{id}
DELETE /api/plantacoes/{id}
```

### Satélites

A API permite gerenciar satélites e sensores usados como origem das leituras climáticas.

Endpoints principais:

```http
GET /api/satelites
GET /api/satelites/{id}
POST /api/satelites
PUT /api/satelites/{id}
DELETE /api/satelites/{id}
```

### Leituras Climáticas

As leituras climáticas armazenam dados ambientais importantes para análise da plantação.

Endpoints principais:

```http
GET /api/leituras-climaticas
GET /api/leituras-climaticas/{id}
POST /api/leituras-climaticas
```

Exemplo de cadastro de leitura:

```json
{
  "temperaturaCelsius": 39.5,
  "umidadePercentual": 24.0,
  "velocidadeVentoKmh": 32.0,
  "precipitacaoMm": 0.0,
  "observacaoVisual": "Solo seco e baixa cobertura de nuvens identificada por imagem.",
  "sateliteId": 1,
  "plantacaoId": 1
}
```

### Alertas Automáticos

Ao cadastrar uma leitura climática, a API avalia os dados recebidos e pode gerar alertas automaticamente.

| Condição                                                         | Alerta gerado       | Nível de risco |
| ---------------------------------------------------------------- | ------------------- | -------------- |
| Umidade menor ou igual a 30% e precipitação menor ou igual a 2mm | Risco de seca       | Alto           |
| Temperatura maior ou igual a 38°C                                | Temperatura extrema | Alto           |
| Precipitação maior ou igual a 80mm                               | Risco de alagamento | Crítico        |
| Velocidade do vento maior ou igual a 70 km/h                     | Vento forte         | Médio          |

Endpoints principais:

```http
GET /api/alertas
GET /api/alertas/{id}
POST /api/alertas
PATCH /api/alertas/{id}/resolver
```

Filtros disponíveis:

```http
GET /api/alertas?plantacaoId=1
GET /api/alertas?tipo=Seca
GET /api/alertas?nivelRisco=Alto
GET /api/alertas?resolvido=false
```

### Dashboard Agrícola

O endpoint de dashboard foi criado para facilitar o consumo dos dados pelo aplicativo mobile.

Endpoint:

```http
GET /api/dashboard/plantacao/{plantacaoId}
```

Exemplo de retorno:

```json
{
  "plantacaoId": 1,
  "nomePropriedade": "Fazenda Sol Nascente",
  "cultura": "Soja",
  "localizacao": "Ribeirão Preto - SP",
  "areaHectares": 120.5,
  "totalAlertas": 3,
  "alertasPendentes": 2,
  "alertasResolvidos": 1,
  "alertasCriticos": 0,
  "alertasAltos": 2,
  "ultimaTemperaturaCelsius": 39.5,
  "ultimaUmidadePercentual": 24.0,
  "ultimaVelocidadeVentoKmh": 32.0,
  "ultimaPrecipitacaoMm": 0.0,
  "statusGeral": "Atenção",
  "recomendacaoOperacional": "Acompanhe os alertas de alto risco e verifique as condições da plantação nas próximas horas."
}
```

---

## Módulo D — Aplicativo Mobile em React Native

O módulo mobile representa a interface do agricultor com o AgroVis.

A aplicação foi desenvolvida com **React Native**, **Expo** e **TypeScript**, oferecendo uma experiência mobile organizada, visual e de fácil utilização.

### Principais funcionalidades

* dashboard com resumo da plantação;
* listagem de alertas pendentes;
* resolução de alertas pelo aplicativo;
* cadastro de leituras climáticas;
* listagem de plantações;
* seleção da plantação padrão;
* tela de preferências;
* armazenamento local com AsyncStorage;
* navegação por abas;
* header e footer personalizados;
* consumo da API REST do backend.

### Estrutura do mobile

```text
frontend-mobile/
└── app/
    ├── src/
    │   ├── components/
    │   ├── config/
    │   ├── navigation/
    │   ├── screens/
    │   ├── services/
    │   ├── storage/
    │   ├── styles/
    │   └── types/
    ├── App.tsx
    └── package.json
```

### Telas implementadas

| Tela         | Descrição                                                                |
| ------------ | ------------------------------------------------------------------------ |
| Dashboard    | Exibe status geral, recomendação operacional, alertas e dados climáticos |
| Alertas      | Lista alertas pendentes e permite marcar como resolvido                  |
| Leituras     | Permite cadastrar e consultar leituras climáticas                        |
| Plantações   | Lista plantações e permite escolher a plantação padrão                   |
| Preferências | Permite salvar dados locais do usuário com AsyncStorage                  |

---

## Tecnologias Utilizadas

### Backend

* C#
* .NET / ASP.NET Core
* Entity Framework Core
* SQLite
* REST API
* DTOs
* Interfaces
* Injeção de Dependência
* Programação Orientada a Objetos

### Mobile

* React Native
* Expo
* TypeScript
* AsyncStorage
* React Navigation
* Expo Vector Icons
* Consumo de API REST

### Documentação e Organização

* Git e GitHub
* Markdown
* Conventional Commits
* Branches por funcionalidade
* Pull Requests

---

## Requisitos Técnicos Atendidos

O projeto contempla os principais requisitos técnicos solicitados:

| Requisito                       | Aplicação no projeto                                                 |
| ------------------------------- | -------------------------------------------------------------------- |
| API Core                        | Backend desenvolvido em ASP.NET Core                                 |
| Modelagem de domínio            | Entidades como Plantação, Satélite, Alerta e Leitura Climática       |
| Programação Orientada a Objetos | Classes, métodos, encapsulamento e organização por responsabilidades |
| Interfaces                      | Services e Repositories usam interfaces                              |
| Injeção de Dependência          | Configurada no `Program.cs`                                          |
| DTOs                            | Utilizados para entrada e saída de dados                             |
| Banco de Dados                  | Persistência com Entity Framework Core e SQLite                      |
| WebServices                     | Endpoints REST consumidos pelo app mobile                            |
| Manipulação de datas            | Uso de `DateTime` em alertas, leituras e histórico                   |
| Modularização                   | Separação em Controllers, Services, Repositories, DTOs e Entities    |
| Mobile                          | Aplicativo React Native com Expo                                     |
| Armazenamento local             | AsyncStorage para preferências do usuário                            |

---

## Como Executar o Backend

Acesse a pasta da API:

```bash
cd backend/src/AgroVis.Api
```

Execute o projeto:

```bash
dotnet run --urls "http://0.0.0.0:5234"
```

A API ficará disponível em:

```text
http://localhost:5234
```

Teste o dashboard:

```text
http://localhost:5234/api/dashboard/plantacao/1
```

---

## Como Executar o App Mobile

Acesse a pasta do aplicativo:

```bash
cd frontend-mobile/app
```

Instale as dependências:

```bash
npm install
```

Execute com Expo:

```bash
npx expo start
```

---

## Configuração da API no Mobile

A configuração da URL da API fica em:

```text
frontend-mobile/app/src/config/apiConfig.ts
```

Para testes no navegador, pode ser usado:

```text
http://localhost:5234
```

Para testes em celular físico, utilize o IP local da máquina onde a API está rodando.

Exemplo:

```text
http://192.168.0.105:5234
```

Nesse caso, execute o backend com:

```bash
dotnet run --urls "http://0.0.0.0:5234"
```

---

## Fluxo de Funcionamento

```text
Usuário acessa o app mobile
        ↓
App consulta o dashboard da plantação padrão
        ↓
API busca dados no banco relacional
        ↓
Services processam regras de negócio
        ↓
Repositories acessam os dados persistidos
        ↓
API retorna alertas, leituras e status geral
        ↓
App exibe as informações ao agricultor
```

Fluxo de geração automática de alertas:

```text
Usuário cadastra leitura climática
        ↓
API recebe temperatura, umidade, vento e chuva
        ↓
Service avalia as condições de risco
        ↓
Caso exista risco, um alerta é criado
        ↓
Alerta fica disponível para consulta no app
        ↓
Usuário pode marcar o alerta como resolvido
```

---

## Evidências de Execução

As evidências de execução devem ser adicionadas na documentação do projeto, incluindo prints como:

* API rodando no terminal;
* endpoint `/api/dashboard/plantacao/1` retornando JSON;
* endpoint `/api/alertas` retornando alertas;
* tela Dashboard do app mobile;
* tela Alertas;
* tela Leituras Climáticas;
* tela Plantações;
* tela Preferências;
* teste de cadastro de leitura climática;
* teste de resolução de alerta.

Sugestão de pasta:

```text
docs-governanca/evidencias/
```

ou:

```text
backend/docs/evidencias/
frontend-mobile/docs/evidencias/
```

---

## Fluxo de Versionamento

O desenvolvimento do projeto utilizou um fluxo baseado em branches, evitando alterações diretas na branch principal.

Branches principais:

| Branch        | Finalidade                                     |
| ------------- | ---------------------------------------------- |
| `main`        | Versão estável para entrega final              |
| `dev`         | Ambiente de integração                         |
| `feature/...` | Desenvolvimento de funcionalidades específicas |

Exemplos de commits utilizados:

```text
feat: implementa fluxo inicial de alertas na API
feat: implementa CRUD de plantacoes na API
feat: cria endpoint de dashboard agricola
feat: cria setup inicial do app mobile
feat: adiciona navegacao e telas mobile
style: adiciona header footer e navegacao profissional
docs: documenta funcionamento do app mobile
```

---

## Considerações Finais

O AgroVis demonstra como tecnologias modernas podem ser aplicadas à agricultura para criar soluções mais inteligentes, acessíveis e sustentáveis.

A integração entre backend, banco de dados, WebServices e aplicativo mobile permite transformar dados climáticos em informações úteis para o agricultor, apoiando decisões estratégicas e reduzindo riscos no campo.

Com isso, o projeto se posiciona como uma solução alinhada aos desafios da Nova Economia Espacial, da agricultura sustentável e da ação climática.
