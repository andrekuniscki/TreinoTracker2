PROJETO MOBILE CODING UNINASSAU 2026.1
Andre Kuniscki Monteiro de Albuquerque Junior
Matricula: 01406148

# Treino-Tracker

Um aplicativo mobile completo e funcional desenvolvido com React Native e Expo para rastrear e gerenciar exercícios de forma profissional e intuitiva.

## Funcionalidades Principais

### Aplicativo Completo e Funcional

- App mobile real desenvolvido com React Native + Expo
- Interface profissional e responsiva
- Propósito claro: rastreamento e gerenciamento de exercícios

### Múltiplas Telas (5 telas)

#### 1. **Tela Inicial (HomeScreen)**

- Apresentação do app com categorias de exercícios
- Navegação para outras funcionalidades
- Menu inferior com acesso às 5 telas principais
- Informações principais do aplicativo

#### 2. **Tela de Listagem (ListScreen)**

- FlatList otimizado com 10+ exercícios
- Cards com design profissional
- Imagens animadas (GIF) de cada exercício
- Informações de musculatura e dificuldade
- Ao tocar, navega para detalhes do exercício
- Renderização otimizada com useMemo e useCallback

#### 3. **Tela de Detalhes (DetailScreen)**

- Recebe dados via navegação por parâmetros
- Exibe informações completas do exercício
- Imagem do exercício em alta resolução
- Descrição detalhada
- Nível de dificuldade
- Botão para adicionar ao treino
- Navegação fluida com React Navigation

#### 4. **Tela de Perfil (ProfileScreen)**

- Informações do usuário
- Metas e progresso de treino
- Barras de progresso visual
- Acesso a outras funcionalidades

#### 5. **Tela de Sensores (SensorScreen)**

- Explore funcionalidades avançadas do dispositivo

### Integração de Sensores do Dispositivo

#### **Geolocalização (GPS)**

- Obter localização atual com precisão alta
- Exibir latitude, longitude e altitude
- Permissões de localização solicitadas ao usuário
- Integração com Expo Location API
- Feedback visual do carregamento

#### **Câmera & Galeria**

- Capturar fotos com a câmera do dispositivo
- Selecionar imagens da galeria
- Preview da imagem selecionada/capturada
- Permissões de câmera gerenciadas automaticamente
- Integração com Expo ImagePicker

#### **Acelerômetro (Sensor de Movimento)**

- Detectar movimento e aceleração em 3 eixos (X, Y, Z)
- Monitoramento em tempo real
- Detecção de "shake" (movimento brusco)
- Feedback visual quando movimento é detectado
- Integração com Expo Sensors

### Navegação Profissional

#### React Navigation Implementado

- **Stack Navigator**: Navegação em pilha para telas de detalhes
- **Tab Navigator (Bottom Tabs)**: Navegação por abas com 5 telas
- Passagem de parâmetros entre telas
- Headers personalizados com cores harmônicas
- Navegação fluida e intuitiva

### Componentes React Bem Estruturados

#### Componentes Reutilizáveis

- **Button.js**: Componente botão customizável
- **Cards.js**: Card otimizado para exercícios
- **SensorFeatures.js**: Componente para funcionalidades de sensores

#### Uso Correto de Hooks

- `useState`: Gerenciamento de estado local
- `useEffect`: Efeitos colaterais e subscriptions
- `useCallback`: Otimização de callbacks
- `useMemo`: Otimização de renderização
- `useNavigation`: Navegação programática

### Interface Profissional e Responsiva

#### Design Moderno

- Paleta de cores coerente (#da291c, #f5f5f5, #323131)
- Tipografia clara e hierárquica
- Espaçamento adequado
- Ícones intuitivos
- Animações suaves

#### Responsividade

- Funciona em diferentes tamanhos de tela
- Layout adaptativo
- Feedback visual para ações do usuário
- Cross-platform (Android, iOS, Web)

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma de desenvolvimento e distribuição
- **React Navigation**: Navegação entre telas (Stack Navigator + Tab Navigator)
- **Expo Location**: Geolocalização via GPS
- **Expo ImagePicker**: Acesso à câmera e galeria
- **Expo Sensors**: Acelerômetro e outros sensores
- **Lucide React Native**: Ícones
- **StyleSheet**: Estilos React Native

## 📋 Requisitos Obrigatórios Atendidos

| Requisito              | Status | Descrição                              |
| ---------------------- | ------ | -------------------------------------- |
| Aplicativo Completo    | ✅     | App funcional e sem crashes            |
| Múltiplas Telas (4+)   | ✅     | 5 telas implementadas                  |
| React Navigation       | ✅     | Stack + Tab Navigators                 |
| FlatList (10+ itens)   | ✅     | 10+ exercícios com design otimizado    |
| Sensores (1+)          | ✅     | GPS, Câmera, Acelerômetro (3 sensores) |
| Componentes React      | ✅     | Componentes reutilizáveis e hooks      |
| Interface Profissional | ✅     | Design moderno e responsivo            |

## 🚀 Como Instalar

```bash
# Clone o repositório
git clone https://github.com/andrekuniscki/treino-tracker.git
cd treino-tracker

# Instale as dependências
npm install
```

## ▶️ Como Executar

```bash
# Inicie o servidor Expo
npx expo start

# Para Android (no terminal, depois de npx expo start)
a

# Para iOS (no terminal)
i

# Para Web (no terminal)
w
```

Ou escaneie o QR code com o app Expo Go no seu dispositivo móvel.

## Estrutura do Projeto

```
treino-tracker/
├── App.js (arquivo principal com navegação)
├── app.json (configuração Expo com permissões)
├── package.json (dependências)
├── README.md (documentação)
├── screens/ (telas)
│   ├── HomeScreen.js
│   ├── ListScreen.js
│   ├── DetailScreen.js
│   ├── ProfileScreen.js
│   └── SensorScreen.js (novo!)
├── components/ (componentes reutilizáveis)
│   ├── Button.js
│   ├── Cards.js
│   └── SensorFeatures.js (novo!)
├── data/ (dados mockados)
│   ├── mockExercises.js
│   └── exercises.js
├── constants/ (constantes)
│   └── theme.js
├── hooks/ (hooks customizados)
│   ├── use-color-scheme.js
│   └── use-theme.js
└── assets/ (imagens e ícones)
    ├── images/
    │   ├── exercícios (GIFs)
    │   ├── icon.png
    │   └── tabIcons/
    │       ├── inicio.png
    │       ├── treinos.png
    │       └── perfil.png
    └── expo.icon/
```

## Sensores Implementados

### 1. **Geolocalização (GPS)**

- **Funcionalidade**: Obter coordenadas atuais do dispositivo
- **Permissão**: ACCESS_FINE_LOCATION (Android), NSLocationWhenInUseUsageDescription (iOS)
- **API**: Expo Location
- **Informações**: Latitude, Longitude, Altitude
- **Uso**: Ao tocar o botão, o app solicita permissão e exibe as coordenadas

### 2. **Câmera & Galeria**

- **Funcionalidade**: Capturar fotos com câmera ou selecionar da galeria
- **Permissão**: CAMERA (Android), NSCameraUsageDescription (iOS)
- **API**: Expo ImagePicker
- **Recursos**: Edição de imagem antes de salvar, preview
- **Uso**: Dois botões separados para capturar ou selecionar

### 3. **Acelerômetro (Sensor de Movimento)**

- **Funcionalidade**: Detectar movimento em tempo real
- **Dados**: Aceleração em 3 eixos (X, Y, Z)
- **API**: Expo Sensors (Accelerometer)
- **Detecção**: Shake (movimento brusco > 2.5 magnitude)
- **Uso**: Exibe valores do acelerometro e feedback visual quando movimento é detectado

## Critérios de Avaliação Atendidos

| Critério               | Descrição                                      | Evidência                                    |
| ---------------------- | ---------------------------------------------- | -------------------------------------------- |
| **Funcionalidade**     | App completamente funcional, sem crashes       | Todas as telas funcionam perfeitamente       |
| **Navegação**          | React Navigation bem implementado, 5 telas     | Stack + Tab Navigator com 5 abas             |
| **Sensores**           | 3+ sensores funcionando corretamente           | GPS, Câmera, Acelerômetro implementados      |
| **FlatList**           | Lista otimizada com 10+ itens                  | 10 exercícios com renderização otimizada     |
| **Código/Componentes** | Código limpo, componentes reutilizáveis, hooks | Componentes bem estruturados e reutilizáveis |
| **Interface/Design**   | UI profissional, cores harmônicas, responsivo  | Design moderno com paleta consistente        |

## Informações do Desenvolvedor

**Nome Completo**: André Kuniscki Monteiro de Albuquerque Júnior  
**Matrícula**: 01406148

## Paleta de Cores

- **Primária**: `#da291c` (Vermelho)
- **Fundo**: `#f5f5f5` (Cinza claro)
- **Texto**: `#323131` (Cinza escuro)
- **Border**: `#e0e0e0` (Cinza médio)

## Documentação

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [Expo Sensors](https://docs.expo.dev/versions/latest/sdk/sensors/)
