# 🚜 Heavy Machine Monitoring
Sistema completo de monitoramento para máquinas pesadas desenvolvido como desafio técnico para vaga de Pessoa Desenvolvedora Sustentação (Full Stack).

✨ Funcionalidades
🔧 Backend (.NET 7)
API RESTful completa para gerenciamento de máquinas

Cadastro de Máquinas com nome, localização e status

Consultas Flexíveis - listagem geral e filtrada por status

Banco em Memória com Entity Framework Core para fácil execução

Swagger Integrado para documentação e teste interativo da API

🎨 Frontend (Angular 16)
Dashboard Interativo com lista em tempo real das máquinas

Sistema de Filtros por status (Operating, Maintenance, Stopped)

Página de Detalhes com informações completas de cada máquina

Formulário de Cadastro com validações reativas

Design Responsivo com CSS puro e interface limpa

Comunicação em Tempo Real com a API backend

🚀 Como Executar
Pré-requisitos
.NET 7 SDK ou superior

Node.js 18+ e npm

Angular CLI 16+

📥 Clone o Repositório
bash
git clone https://github.com/Terrcius/HeavyMachineMonitoring.git
cd HeavyMachineMonitoring
⚙️ Executando o Backend
bash
# Navegue para a pasta do backend
cd Backend/HeavyMachineMonitoring

# Execute a aplicação
dotnet run
📌 A API estará disponível em: https://localhost:7084
📖 Swagger/OpenAPI: https://localhost:7084/swagger

🖥️ Executando o Frontend
bash
# Em um novo terminal, navegue para a pasta do frontend
cd Frontend

# Instale as dependências
npm install

# Execute a aplicação
ng serve
🌐 Frontend disponível em: http://localhost:4200

🏗️ Estrutura do Projeto
Backend (.NET 7)
text
Backend/HeavyMachineMonitoring/
├── Controllers/          # Controladores da API
├── Data/                 # Contexto do Entity Framework
├── DTOs/                 # Data Transfer Objects
├── Entities/             # Modelos de domínio
├── Interfaces/           # Contratos para repositórios
├── Repositories/         # Implementações de acesso a dados
└── Services/             # Lógica de negócio
Frontend (Angular 16)
text
Frontend/src/app/
├── models/               # Interfaces e tipos TypeScript
├── pages/                # Componentes de página
│   ├── dashboard/        # Dashboard principal
│   ├── machine-details/  # Página de detalhes
│   └── add-machine/      # Formulário de cadastro
├── services/             # Serviços de API
└── shared/               # Componentes compartilhados
🔧 Configuração
Portas e URLs
API Backend: Porta 7084 (configurável via appsettings.json)

Frontend Angular: Porta 4200

CORS já configurado para desenvolvimento local

⚠️ Importante
Caso a porta da API seja diferente, edite o arquivo:

text
Frontend/src/app/services/machine.service.ts
E atualize a variável apiUrl conforme necessário.

🛠️ Tecnologias Utilizadas
Backend: .NET 7, Entity Framework Core, Swagger/OpenAPI

Frontend: Angular 16, TypeScript, Reactive Forms, CSS3

Banco de Dados: Entity Framework In-Memory Database

Ferramentas: Angular CLI, .NET CLI, Git

📋 Status do Projeto
✅ Backend - Completo e funcional
✅ Frontend - Completo e responsivo
✅ Integração - Comunicação API totalmente implementada
✅ Documentação - Swagger e README completos

👨‍💻 Desenvolvido por
[João Antônio Pereira de Araújo Tercius] - [joaotercius@gmail.com]

