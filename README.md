# Vehicle Manufacturers Frontend

Un frontend moderno y profesional para visualizar fabricantes de vehículos, construido con **Vue 3**, **TypeScript**, **Pinia** y **Tailwind CSS**. 

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Vue 3** - Framework reactivo moderno
- **TypeScript** - Tipado estático
- **Pinia** - Estado global reactivo
- **Tailwind CSS** - Estilos utility-first
- **Vite** - Build tool ultra-rápido

### Estructura de Componentes
```
src/
├── components/
│   └── ManufacturerApp.vue     # Componente principal
├── stores/
│   └── manufacturers.ts        # Store de Pinia
├── assets/
│   └── main.css               # Estilos globales
└── App.vue                    # Componente raíz
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+
- npm o yarn
- Backend NestJS corriendo en `http://localhost:3001`

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repo]
cd trabajo-frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

### Variables de Entorno
El frontend está configurado para conectarse al backend en:
- **Desarrollo**: `http://localhost:3001`
- **Producción**: Configurable en el store


## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

**Desarrollado con ❤️ usando Vue 3 + TypeScript + Tailwind CSS**
