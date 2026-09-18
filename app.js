const API_URL = "http://127.0.0.1:5000/api";

// 1. Relógio em tempo real na Topbar
function updateClock() {
  const clockElement = document.getElementById("live-clock");
  if (clockElement) {
    clockElement.textContent = new Date().toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
updateClock();

// 2. Utilitário de Logs no Console/Terminal do Dashboard
function logToConsole(msg, type = "info") {
  const consoleBody = document.getElementById("console-output");
  if (!consoleBody) return;

  const p = document.createElement("p");
  p.className = `log-${type}`;
  const time = new Date().toLocaleTimeString();
  p.textContent = `[${time}] ${msg}`;
  consoleBody.appendChild(p);
  consoleBody.scrollTop = consoleBody.scrollHeight;
}

// 3. Renderização Principal da Tabela e Indicadores (KPIs)
async function renderDashboard(filterText = "") {
  try {
    logToConsole("[API] Solicitando varredura de ativos ao servidor Python...", "info");
    const response = await fetch(`${API_URL}/assets`);
    
    if (!response.ok) throw new Error("Erro na resposta do servidor");
    
    const assetsData = await response.json();

    const tbody = document.getElementById("assets-list");
    tbody.innerHTML = "";

    let onlineCount = 0;
    let offlineCount = 0;
    let totalLatency = 0;

    const filteredAssets = assetsData.filter(a => 
      a.host.toLowerCase().includes(filterText.toLowerCase()) || 
      a.ip.includes(filterText)
    );

    filteredAssets.forEach(asset => {
      if (asset.status === "online") {
        onlineCount++;
        totalLatency += asset.latency;
      } else {
        offlineCount++;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <strong>${asset.host}</strong><br>
          <small style="color: #94a3b8; font-family: 'JetBrains Mono'">${asset.ip}</small>
        </td>
        <td>${asset.type}</td>
        <td>
          <span class="badge ${asset.status}">
            ${asset.status.toUpperCase()}
          </span>
        </td>
        <td style="font-family: 'JetBrains Mono'">${asset.status === 'online' ? asset.latency + ' ms' : '--'}</td>
        <td>
          <div style="display: inline-flex; align-items: center; gap: 8px;">
            <button class="btn-secondary" style="height: 32px; padding: 0 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; cursor: pointer;" onclick="pingAsset('${asset.ip}', '${asset.host}')">
              <i class="ph-bold ph-lightning"></i> Ping
            </button>
            <button class="btn-secondary" style="height: 32px; width: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; background: rgba(244, 63, 94, 0.15); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 6px; cursor: pointer;" onclick="deleteAsset(${asset.id}, '${asset.host}')" title="Excluir Ativo">
              <i class="ph-bold ph-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Atualização dos indicadores das cartas de resumo
    document.getElementById("online-count").textContent = onlineCount;
    document.getElementById("offline-count").textContent = offlineCount;
    const avg = onlineCount > 0 ? Math.round(totalLatency / onlineCount) : 0;
    document.getElementById("avg-latency").textContent = `${avg} ms`;

    logToConsole("[API] Telemetria atualizada com sucesso.", "success");
  } catch (error) {
    logToConsole("[ERRO] Falha ao conectar na API Python (5000). Verifique se o app.py está rodando.", "error");
  }
}

// 4. Ação de Ping Real sob demanda
async function pingAsset(ip, host) {
  logToConsole(`[ICMP] Disparando requisição de ping para ${host} (${ip})...`, "info");
  try {
    const res = await fetch(`${API_URL}/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip })
    });
    const data = await res.json();
    if (data.status === 'online') {
      logToConsole(`[REPLY] ${ip} respondeu em ${data.latency}ms`, "success");
    } else {
      logToConsole(`[TIMEOUT] ${ip} não respondeu aos pacotes ICMP.`, "error");
    }
  } catch (err) {
    logToConsole(`[ERRO] Não foi possível executar o ping via backend.`, "error");
  }
}

// 5. Exclusão de Ativos
async function deleteAsset(id, host) {
  if (!confirm(`Deseja realmente remover o ativo "${host}"?`)) return;

  logToConsole(`[DELETE] Solicitando remoção do ativo #${id} (${host})...`, "info");
  try {
    const res = await fetch(`${API_URL}/assets/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      logToConsole(`[SUCCESS] Ativo "${host}" removido com sucesso.`, "success");
      renderDashboard(); // Recarrega a tabela
    } else {
      logToConsole(`[ERRO] Falha ao deletar o ativo #${id}.`, "error");
    }
  } catch (err) {
    logToConsole(`[ERRO] Falha na comunicação ao tentar deletar.`, "error");
  }
}

// 6. Gráfico de Telemetria com Chart.js
let latencyChart;
function initChart() {
  const chartCanvas = document.getElementById('latencyChart');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');
  latencyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['19:00', '19:05', '19:10', '19:15', '19:20', '19:25'],
      datasets: [{
        label: 'Latência Média (ms)',
        data: [8, 12, 6, 14, 9, 7],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
      }
    }
  });
}

// 7. Modais e Eventos da Interface
const modal = document.getElementById("modal-add");
const btnOpenModal = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("btn-close-modal");

if (btnOpenModal) btnOpenModal.onclick = () => modal.classList.add("active");
if (btnCloseModal) btnCloseModal.onclick = () => modal.classList.remove("active");

const formAddAsset = document.getElementById("form-add-asset");
if (formAddAsset) {
  formAddAsset.onsubmit = async (e) => {
    e.preventDefault();
    const host = document.getElementById("host-name").value;
    const ip = document.getElementById("host-ip").value;
    const type = document.getElementById("host-type").value;

    try {
      const res = await fetch(`${API_URL}/assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, ip, type })
      });

      if (res.ok) {
        logToConsole(`[API] Ativo registrado no banco de memória: ${host} (${ip})`, "success");
        renderDashboard();
        modal.classList.remove("active");
        e.target.reset();
      }
    } catch (err) {
      logToConsole(`[ERRO] Falha ao cadastrar novo ativo.`, "error");
    }
  };
}

// Eventos de Busca, Recarregar e Limpar Console
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => renderDashboard(e.target.value));
}

const btnRefresh = document.getElementById("btn-refresh");
if (btnRefresh) {
  btnRefresh.onclick = () => {
    renderDashboard();
    logToConsole("[SYSTEM] Atualização manual disparada.", "info");
  };
}

const btnClearConsole = document.getElementById("btn-clear-console");
if (btnClearConsole) {
  btnClearConsole.onclick = () => {
    document.getElementById("console-output").innerHTML = "";
  };
}

// Inicialização da Aplicação
renderDashboard();
initChart();