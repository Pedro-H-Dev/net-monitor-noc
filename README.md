# 🛰️ NETMON NOC — Infra & Network Monitoring Suite

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

Uma aplicação Full Stack corporativa para monitoramento de ativos de rede em tempo real. O sistema combina uma interface responsiva em estilo **Cyber-Dark/Glassmorphism** com um backend funcional em Python, realizando pings ICMP reais no sistema operacional para telemetria de latência e controle dinâmico de infraestrutura.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura & Tecnologias](#-arquitetura--tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Autor](#-autor)

---

## 💻 Visão Geral

O **NETMON NOC** foi desenvolvido para simular o ambiente de um Centro de Operações de Rede (NOC). A aplicação permite cadastrar, filtrar, testar e remover ativos de rede, entregando métricas de disponibilidade, gráficos de latência em tempo real e um terminal de logs interativo.

---

## ⚡ Funcionalidades

- **Monitoramento ICMP Real (Ping):** Execução de chamadas `ping` no nível do sistema operacional para verificação de disponibilidade e cálculo de latência (ms).
- **Gerenciamento Dinâmico de Ativos:** Inclusão e remoção de hosts/IPs diretamente pela interface, atualizando o inventário em tempo real.
- **Painel NOC Cyber-Dark:** Interface moderna com KPIs operacionais (Ativos Operacionais, Incidentes Críticos, Latência Média e SLA/Uptime).
- **Telemetria & Output Terminal:** Terminal embutido para exibição de logs de requisições e gráficos de tendência via Chart.js.
- **Filtro em Tempo Real:** Pesquisa rápida de ativos por nome de host ou endereço IP.

---

## 🛠️ Arquitetura & Tecnologias

### Frontend
- **HTML5 & CSS3:** Layout responsivo construído com CSS Grid, Flexbox e efeitos de Glassmorphism.
- **JavaScript (ES6+):** Manipulação assíncrona do DOM via `fetch` API.
- **Chart.js & Phosphor Icons:** Renderização gráfica de telemetria e iconografia moderna.

### Backend
- **Python 3:** Lógica de backend e execução de subprocessos do sistema (`subprocess`).
- **Flask & Flask-CORS:** API RESTful leve estruturada para integração Cross-Origin com o frontend.

---

## 📁 Estrutura do Projeto

```text
net-monitor-noc/
├── backend/
│   ├── app.py                # Servidor Flask e rotas da API ICMP
│   └── requirements.txt      # Dependências do Python (Flask, CORS)
├── frontend/
│   ├── index.html            # Estrutura do Painel Dashboard NOC
│   ├── style.css             # Estilização Cyber-Dark/Glassmorphism
│   └── app.js                # Consumo de API e gráficos Chart.js
├── .gitignore
└── README.md
```

---

## 💻 Como Executar o Projeto

### Pré-requisitos

* **Python 3.x** instalado.
* **Git** instalado.

### Passo a Passo

1. **Clonar o repositório:** `git clone https://github.com/Pedro-H-Dev/net-monitor-noc.git`

2. **Acessar o diretório do projeto:** `cd net-monitor-noc`

3. **Iniciar o backend Python:** `cd backend` && `pip install -r requirements.txt` && `python app.py`

4. **Executar a aplicação:** Abra o arquivo `frontend/index.html` em qualquer navegador.

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/assets` | Lista todos os ativos e executa a varredura de ping em lote |
| `POST` | `/api/assets` | Cadastra um novo ativo de rede |
| `DELETE` | `/api/assets/<id>` | Remove um ativo cadastrado por ID |
| `POST` | `/api/ping` | Dispara um ping ICMP individual para um IP específico |

---

## 👨‍💻 Autor

Desenvolvido por **Pedro Henrique**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/pedro-h-devv)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pedro-H-Dev)
