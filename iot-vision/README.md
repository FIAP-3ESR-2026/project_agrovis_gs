# 🌿 AgroVis — Drone de Monitoramento Agrícola com IoT

Sistema de visão computacional embarcada que simula um drone agrícola capaz de detectar anomalias em lavouras (pragas, folhas secas, áreas comprometidas) em tempo real, com envio automático dos dados para a nuvem via IoT.

---

## 📋 Descrição da Solução

O AgroVis resolve um problema crítico do agronegócio: a fiscalização manual de grandes propriedades rurais é lenta, cara e propensa a falhas. A solução utiliza **Edge Computing** — o processamento de imagem acontece localmente no hardware do "drone", e apenas um pacote JSON enxuto com a contagem de anomalias é enviado para a nuvem a cada 5 segundos.

### Fluxo do sistema

```
Câmera / Vídeo → Frame → Conversão HSV → Máscara de cor → Detecção de contornos → HUD local + JSON → Webhook IoT
```

**Dois módulos principais:**

- **`calibrador_hsv.py`** — Ferramenta de calibração interativa com sliders para ajustar os limites de cor (HSV) que identificam anomalias nas condições de iluminação do campo.
- **`drone_vision.py`** — Motor de execução: processa o vídeo em tempo real, detecta e destaca anomalias no HUD (Heads-Up Display) e envia os dados consolidados para a nuvem.

---

## 🛠️ Bibliotecas Utilizadas

| Biblioteca | Finalidade |
|---|---|
| `opencv-python` | Captura de vídeo, processamento de imagem, detecção de contornos |
| `numpy` | Operações com arrays para criação das máscaras HSV |
| `requests` | Envio dos dados de telemetria para o endpoint IoT na nuvem |

---

## ▶️ Instruções de Execução

### Pré-requisitos

- Python 3.8 ou superior
- Arquivo de vídeo `simulacao_drone_agrovis.mp4` na mesma pasta dos scripts

### 1. Instalar as dependências

```bash
pip install -r requirements.txt
```

### 2. Calibrar os valores HSV (opcional)

Execute o calibrador para ajustar a detecção ao seu ambiente de vídeo:

```bash
python calibrador_hsv.py
```

Use os sliders para isolar a cor das anomalias. Ao pressionar `q`, os valores finais são exibidos no console. Copie-os para o `drone_vision.py` se necessário.

> **Controles:** `Espaço` para pausar o vídeo | `Q` para sair e exibir os valores

### 3. Executar o drone

```bash
python drone_vision.py
```

O sistema iniciará o processamento do vídeo, exibirá o HUD com as anomalias detectadas e enviará os dados para a nuvem a cada 5 segundos.

> **Para sair:** pressione `Q` na janela de vídeo

---

## 📁 Estrutura do Repositório

```
project_agrovis_gs/
├── calibrador_hsv.py          # Ferramenta de calibração HSV interativa
├── drone_vision.py            # Motor principal de visão e IoT
├── simulacao_drone_agrovis.mp4 # Vídeo de simulação da lavoura
├── requirements.txt           # Dependências do projeto
└── README.md                  # Este arquivo
```

---

## 👥 Integrantes do Grupo

| Nome | RM |
|---|---|
| Augusto Rocha Silva | RM556316 |
| Erik Yuuta Goto | RM558076 |
| Guilherme Vieira Augusto | RM557264 |
| Wendell dos Santos Silva | RM558859 |

---

## 🏫 Informações Acadêmicas

**Curso:** Engenharia de Software — FIAP  
**Disciplina:** Internet of Things & IoB  
**Semestre:** 5º Semestre — Global Solution 2026 - Space Connect
