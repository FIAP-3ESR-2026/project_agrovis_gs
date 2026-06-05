# Aplicativo Mobile — AgroVis

O aplicativo mobile do AgroVis foi desenvolvido com React Native, Expo e TypeScript.

O objetivo do app é traduzir os dados processados pela API em informações acessíveis para o agricultor, permitindo acompanhar plantações, alertas, leituras climáticas e recomendações operacionais diretamente pelo celular.

## Objetivo do aplicativo

O app AgroVis permite que o usuário:

- visualize o status geral da plantação;
- acompanhe alertas climáticos e agrícolas;
- consulte leituras climáticas registradas;
- cadastre novas leituras climáticas;
- escolha uma plantação padrão;
- salve preferências locais no dispositivo.

## Tecnologias utilizadas

- React Native;
- Expo;
- TypeScript;
- AsyncStorage;
- React Navigation;
- Consumo de API REST.

## Estrutura do projeto

```txt
frontend-mobile/
│
├── docs/
│
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
    │
    ├── App.tsx
    ├── package.json
    └── tsconfig.json