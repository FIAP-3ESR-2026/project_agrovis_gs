import cv2
import numpy as np

def nothing(x):
    pass

# Inicialização das janelas
cv2.namedWindow("Calibracao HSV")
cv2.resizeWindow("Calibracao HSV", 400, 300)

cv2.createTrackbar("L - H", "Calibracao HSV", 0, 179, nothing)
cv2.createTrackbar("L - S", "Calibracao HSV", 100, 255, nothing)
cv2.createTrackbar("L - V", "Calibracao HSV", 100, 255, nothing)
cv2.createTrackbar("U - H", "Calibracao HSV", 35, 179, nothing)
cv2.createTrackbar("U - S", "Calibracao HSV", 255, 255, nothing)
cv2.createTrackbar("U - V", "Calibracao HSV", 255, 255, nothing)

video_path = "simulacao_drone_agrovis.mp4"
cap = cv2.VideoCapture(video_path)

pausado = False
print("Calibrador ativo. Use ESPAÇO para pausar e 'q' para sair.")

while True:
    if not pausado:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        l_h = cv2.getTrackbarPos("L - H", "Calibracao HSV")
        l_s = cv2.getTrackbarPos("L - S", "Calibracao HSV")
        l_v = cv2.getTrackbarPos("L - V", "Calibracao HSV")
        u_h = cv2.getTrackbarPos("U - H", "Calibracao HSV")
        u_s = cv2.getTrackbarPos("U - S", "Calibracao HSV")
        u_v = cv2.getTrackbarPos("U - V", "Calibracao HSV")

        lower_bound = np.array([l_h, l_s, l_v])
        upper_bound = np.array([u_h, u_s, u_v])

        mask = cv2.inRange(hsv, lower_bound, upper_bound)
        result = cv2.bitwise_and(frame, frame, mask=mask)

        # Exibição das três janelas
        cv2.imshow("Video Original", frame)  # Nova janela adicionada
        cv2.imshow("Mascara", mask)
        cv2.imshow("Resultado", result)

        key = cv2.waitKey(1) & 0xFF
        if key == ord(' '):
            pausado = not pausado
        if key == ord('q'):
            # Exibição dos valores capturados no console
            print(f"\nValores finais: Lower={list(lower_bound)}, Upper={list(upper_bound)}")
            break

cap.release()
cv2.destroyAllWindows()