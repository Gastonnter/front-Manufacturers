# Vehicle Manufacturers Frontend

Un frontend moderno y profesional para visualizar fabricantes de vehículos, construido con **Vue 3**, **TypeScript**, **Pinia** y **Tailwind CSS**. 

## ✨ Características Principales

- 🎨 **Diseño Profesional**: Interfaz moderna con glassmorphism y gradientes
- 📱 **100% Responsivo**: Optimizado para desktop, tablet y móvil
- 🔍 **Búsqueda Avanzada**: Filtros por nombre, país y tipo de vehículo
- 🎭 **Animaciones Suaves**: Transiciones y efectos visuales modernos
- ⚡ **Rendimiento Optimizado**: Paginación y carga eficiente de datos
- 🌐 **API Integration**: Conexión perfecta con el backend NestJS
- 🎯 **TypeScript**: Tipado fuerte para mayor confiabilidad
- 🔄 **Estado Reactivo**: Gestión de estado con Pinia

## 🖥️ Vista Previa

### Desktop
- Layout a pantalla completa con sidebar de filtros
- Grid responsivo de 2-7 columnas según el tamaño de pantalla
- Navegación fluida y paginación completa

### Mobile
- Interfaz adaptada para pantallas táctiles
- Filtros colapsables y controles optimizados
- Modal de detalles a pantalla completa

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

### Funcionalidades Implementadas

#### 🔍 Sistema de Filtros
- **Búsqueda por texto**: Búsqueda en tiempo real en nombres
- **Filtro por país**: Dropdown con banderas y nombres
- **Filtro por tipo de vehículo**: Categorización completa
- **Estado de filtros**: Visualización de filtros activos

#### 📊 Visualización de Datos
- **Tarjetas informativas**: Diseño moderno con información clave
- **Badges de estado**: Indicadores visuales de tipo principal
- **Iconografía SVG**: Iconos personalizados sin dependencias
- **Modal de detalles**: Vista expandida con información completa

#### 🎨 Diseño y UX
- **Glassmorphism**: Efectos de vidrio moderno
- **Gradientes**: Colores atractivos y profesionales
- **Animaciones**: Transiciones suaves y efectos hover
- **Loading states**: Indicadores de carga personalizados

## 📱 Responsividad Completa

### Breakpoints
- **xs**: < 640px (móviles)
- **sm**: 640px+ (móviles grandes)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (laptops)
- **xl**: 1280px+ (desktops)
- **2xl**: 1536px+ (pantallas grandes)

### Adaptaciones por Dispositivo
- **Móvil**: Grid de 1 columna, controles táctiles grandes
- **Tablet**: Grid de 2-3 columnas, navegación híbrida
- **Desktop**: Grid de 4-7 columnas, hover effects completos

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

## 🎯 Funcionalidades Destacadas

### 1. Búsqueda Inteligente
- Debounce automático (300ms)
- Búsqueda en tiempo real
- Highlighting de resultados

### 2. Filtros Avanzados
- Combinación múltiple de filtros
- Estado persistente de filtros
- Limpieza rápida de filtros

### 3. Paginación Eficiente
- Navegación completa (primera, anterior, siguiente, última)
- Indicador de página actual
- Scroll automático al cambiar página

### 4. Vista de Detalles
- Modal responsive
- Información completa del fabricante
- Lista detallada de tipos de vehículos
- Indicadores de tipo principal

## 📊 Gestión de Estado

### Store de Manufacturers (Pinia)
```typescript
interface Manufacturer {
  country: string
  commonName: string | null
  legalName: string
  vehiclesType: VehicleType[]
}

interface ManufacturersState {
  manufacturers: Manufacturer[]
  loading: boolean
  error: string | null
  searchTerm: string
  selectedCountry: string
  selectedVehicleType: string
}
```

### Acciones Principales
- `loadAllManufacturers()` - Carga inicial de datos
- `updateFilters()` - Aplicación de filtros
- `clearFilters()` - Limpieza de filtros

## 🎨 Personalización de Estilos

### Tailwind Config
Configuración extendida con:
- Breakpoints personalizados
- Animaciones personalizadas
- Colores de la marca
- Utilidades específicas

### CSS Custom
- Scroll personalizado
- Efectos de glassmorphism
- Animaciones de entrada
- Estados de hover/focus

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

## 📦 Dependencias Principales

```json
{
  "vue": "^3.4.0",
  "pinia": "^2.1.0",
  "vue-router": "^4.2.0",
  "@tailwindcss/forms": "^0.5.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
```

## 🌟 Mejoras Implementadas

### Sin Dependencias Externas de UI
- ❌ Eliminado PrimeVue completamente
- ✅ Componentes nativos HTML + Tailwind
- ✅ SVG icons personalizados
- ✅ CSS puro para animaciones

### Optimización de Rendimiento
- ✅ Lazy loading de imágenes
- ✅ Debounce en búsquedas
- ✅ Paginación eficiente
- ✅ Memoización de computeds

### Accesibilidad (A11y)
- ✅ Navegación por teclado
- ✅ ARIA labels apropiados
- ✅ Contraste de colores óptimo
- ✅ Focus management

## 🐛 Solución de Problemas

### Backend no disponible
- Verificar que el servidor NestJS esté ejecutándose
- Comprobar puerto 3001 disponible
- Revisar configuración de CORS

### Errores de build
- Limpiar `node_modules` y reinstalar
- Verificar versión de Node.js
- Comprobar sintaxis TypeScript

## 📈 Rendimiento

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

### Optimizaciones Aplicadas
- Bundle splitting automático
- Tree shaking de Tailwind
- Compresión de assets
- Caché estratégico

## 🔮 Funcionalidades Futuras

- [ ] Export de datos (CSV, PDF)
- [ ] Gráficos de estadísticas
- [ ] Modo oscuro/claro
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)
- [ ] Favoritos de usuario

## 👥 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ usando Vue 3 + TypeScript + Tailwind CSS**
