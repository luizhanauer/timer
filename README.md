<div align="center">
  
  <img src="public/icons/icon-192.png" alt="Timer Logo" width="120" />

  # ⏳ Timer (PWA)

  **Um PWA minimalista de Temporizador e Cronômetro com estética Dark Neon.** <br>
  Construído com foco em performance, acessibilidade mobile e design limpo.

  [![Vue.js](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
  [![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)

</div>

<br>

## ✨ Funcionalidades Principais

- ⏱️ **Temporizador Dinâmico:** Gráfico de rosca SVG reativo com animação orbital fluida.
- ⏱️ **Cronômetro de Precisão:** Cálculo baseado em *timestamps* absolutos, garantindo precisão mesmo com o app em background.
- 🎨 **Tema "Dark Neon" Customizável:** Altere a cor de destaque principal, refletindo instantaneamente em botões, sombras, gráficos e até no favicon da guia do navegador.
- 🎹 **Sintetizador de Áudio Nativo:** Alarme totalmente gerado via *Web Audio API*. Personalize o tipo de onda (Sine, Square, Triangle, Sawtooth), frequência (Hz), duração e repetições.
- 📱 **Mobile-First & PWA:** Navegação por *Segmented Controls* (nativo e intuitivo), prompt customizado de instalação offline e suporte a Service Workers.
- 🚀 **Atalhos de Produtividade:** Botões de incremento rápido (+30s, +1m, +5m) que recalculam dinamicamente a proporção do gráfico.

<br>

## 🛠️ Stack Tecnológica & Arquitetura

Este projeto foi desenvolvido seguindo as melhores práticas de Engenharia de Software:
- **Clean Architecture & DDD:** Separação clara entre Domínio (Regras), Aplicação (Serviços/Web APIs) e UI (Componentes).
- **TypeScript Strict Mode:** Tipagem rigorosa em toda a base de código.
- **Object Calisthenics:** Código limpo, sem blocos `else`, métodos curtos e responsabilidades únicas.
- **Test-Driven:** Cobertura de testes unitários e de integração utilizando **Vitest** e **jsdom**.

<br>

## 📂 Estrutura de Diretórios

```text
src/
├── core/                # Regras de Negócio e Serviços Externos (Web Audio, Notifications)
├── shared/              # Recursos partilhados (Store, Composables de Tempo, PWA)
├── components/          # Componentes visuais UI (Botões Neon, Gráficos SVG)
├── App.vue              # Orquestrador principal da UI
└── main.ts              # Ponto de entrada

```

## 🚀 Como Executar Localmente

**Pré-requisitos:** Node.js v18+

1. Clone este repositório:
```bash
git clone https://github.com/luizhanauer/timer.git
```


2. Acesse a pasta do projeto:
```bash
cd timer
```


3. Instale as dependências:
```bash
npm install
```


4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```



## 🧪 Testes Automatizados

O projeto conta com uma suíte de testes robusta cobrindo formatação de tempo, gerência de estado e mock de Web APIs.

Para rodar os testes uma vez:

```bash
npm run test
```

Para gerar o relatório de cobertura (Coverage):

```bash
npm run test:coverage
```

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.

Desenvolvido com ☕ e código limpo.