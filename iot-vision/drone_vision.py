import cv2
import numpy as np
import requests
import time

# ==========================================
# CONFIGURAÇÕES DE IOT (NUVEM)
# ==========================================
IOT_URL = "https://webhook.site/e1a2af55-a80f-4ed9-9d42-7009a755ed38"
IOT_HEADERS = {"Content-Type": "application/json"}

# Temporizador para não travar a câmara
last_send_time = time.time()
send_interval = 5.0  # Envia os dados a cada 5 segundos

# ==========================================
# INÍCIO DO DRONE
# ==========================================
cap = cv2.VideoCapture("simulacao_drone_agrovis.mp4")

print("Drone AgroVis online. A capturar vídeo...")

while True:
    ret, frame = cap.read()
    if not ret:
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        continue

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Limites calibrados para deteção de pragas/folhas secas
    lower_anomaly = np.array([15, 170, 102])
    upper_anomaly = np.array([35, 255, 255])

    mask = cv2.inRange(hsv, lower_anomaly, upper_anomaly)
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    anomaly_count = 0

    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 800:
            x, y, w, h = cv2.boundingRect(cnt)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv2.putText(frame, "Anomalia", (x, y - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
            anomaly_count += 1

    # HUD Local
    hud_text = f"Anomalias Detectadas: {anomaly_count}"
    hud_color = (0, 255, 255) if anomaly_count > 0 else (0, 255, 0)
    cv2.putText(frame, hud_text, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, hud_color, 2)

    # ==========================================
    # MOTOR DE COMUNICAÇÃO IOT (ENVIO PARA A NUVEM)
    # ==========================================
    current_time = time.time()
    if current_time - last_send_time > send_interval:
        # Prepara o pacote de dados (JSON)
        payload = {"anomalias": anomaly_count}

        try:
            # Tenta enviar os dados para a nuvem em background (timeout curto de 1s para não travar o vídeo)
            response = requests.post(IOT_URL, json=payload, headers=IOT_HEADERS, timeout=1)
            print(f"[IoT] Dados enviados: {payload} | Status: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"[IoT Aviso] Falha ao enviar dados para a nuvem. Sem ligação? Erro: {e}")

        # Reinicia o cronómetro independentemente do sucesso
        last_send_time = current_time

    cv2.imshow("AgroVis - Visao do Drone", frame)

    if cv2.waitKey(100) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()