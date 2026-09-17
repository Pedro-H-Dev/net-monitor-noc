import platform
import subprocess
import re
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Habilita CORS explicitamente para todos os métodos
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "DELETE", "OPTIONS"]}})

# Inventário de ativos em memória
ASSETS = [
    {"id": 1, "host": "Gateway Principal (Router Core)", "ip": "192.168.1.1", "type": "Roteador", "status": "offline", "latency": 0},
    {"id": 2, "host": "DNS Público Google", "ip": "8.8.8.8", "type": "DNS External", "status": "offline", "latency": 0},
    {"id": 3, "host": "DNS Secundário Cloudflare", "ip": "1.1.1.1", "type": "DNS External", "status": "offline", "latency": 0},
    {"id": 4, "host": "Servidor Inexistente (Teste Error)", "ip": "192.168.254.254", "type": "Servidor", "status": "offline", "latency": 0}
]

def ping_host(ip):
    param = '-n' if platform.system().lower() == 'windows' else '-c'
    command = ['ping', param, '1', ip]
    
    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, universal_newlines=True, timeout=2)
        if "ttl=" in output.lower() or "tempo=" in output.lower() or "time=" in output.lower():
            match = re.search(r'(?:tempo|time)[=<](\d+)ms', output, re.IGNORECASE)
            latency = int(match.group(1)) if match else 5
            return "online", latency
    except Exception:
        pass
    return "offline", 0

@app.route('/api/assets', methods=['GET'])
def get_assets():
    for asset in ASSETS:
        status, latency = ping_host(asset['ip'])
        asset['status'] = status
        asset['latency'] = latency
    return jsonify(ASSETS)

@app.route('/api/assets', methods=['POST'])
def add_asset():
    data = request.json
    new_asset = {
        "id": len(ASSETS) + 1,
        "host": data.get("host"),
        "ip": data.get("ip"),
        "type": data.get("type", "Outro"),
        "status": "offline",
        "latency": 0
    }
    ASSETS.append(new_asset)
    return jsonify(new_asset), 201

@app.route('/api/ping', methods=['POST'])
def manual_ping():
    data = request.json
    ip = data.get('ip')
    status, latency = ping_host(ip)
    return jsonify({"ip": ip, "status": status, "latency": latency})

@app.route('/api/assets/<int:asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    global ASSETS
    ASSETS = [asset for asset in ASSETS if asset['id'] != asset_id]
    return jsonify({"message": f"Ativo {asset_id} removido", "assets": ASSETS}), 200

if __name__ == '__main__':
    print("🚀 NETMON NOC API rodando na porta 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)