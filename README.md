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
- [Como Executar](#-como-executar)
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
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos
- **Python 3.x** instalado.
- Navegador moderno (Chrome, Edge, Firefox, etc.).

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Pedro-H-Dev/net-monitor-noc.git](https://github.com/Pedro-H-Dev/net-monitor-noc.git)
cd net-monitor-noc
```

### 2. Configurar e Iniciar o Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
> O servidor iniciará em `http://127.0.0.1:5000`.

### 3. Executar o Frontend
Basta abrir o arquivo `frontend/index.html` diretamente no seu navegador de preferência ou utilizar a extensão **Live Server** no VS Code.

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

Desenvolvido por **Pedro Henrique**.

- **GitHub:** [@Pedro-H-Dev](https://github.com/Pedro-H-Dev)
- **LinkedIn:** [pedro-h-devv](https://linkedin.com/in/pedro-h-devv)

---

## 📤 Comandos Git para Envio da Documentação

Para salvar a documentação no projeto e subir para o GitHub, execute no terminal do VS Code:

git add README.md
git commit -m "docs: atualiza README.md com estrutura completa de documentacao"
git push
