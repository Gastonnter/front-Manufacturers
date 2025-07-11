<template>
  <div class="h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col overflow-hidden">
    <!-- Header profesional ocupando todo el ancho -->
    <header class="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 flex-shrink-0">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3 lg:space-x-4">
            <div class="p-2 lg:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <svg class="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 17h2c.6 0 1-.4 1-1s-.4-1-1-1h-2v-3h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v3H2c-.6 0-1 .4-1 1s.4 1 1 1h2c0 .6.4 1 1 1h14c.6 0 1-.4 1-1zM6 12V6h12v6H6zm1 3h10v2H7v-2z"/>
              </svg>
            </div>
            <div class="text-center sm:text-left">
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Vehicle Manufacturers</h1>
              <p class="text-sm lg:text-base text-gray-600">Directorio global de fabricantes de vehículos</p>
            </div>
          </div>
          <div class="text-center sm:text-right">
            <div class="text-xs lg:text-sm text-gray-500">Total disponible</div>
            <div class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {{ totalDisplayCount }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal con scroll -->
    <main class="flex-1 overflow-y-auto">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <!-- Panel de filtros adaptativo -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-gray-200/50 p-4 lg:p-8 mb-6 lg:mb-8">
          <div class="mb-4 lg:mb-6">
            <h2 class="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Filtros de búsqueda</h2>
            <p class="text-sm lg:text-base text-gray-600">Encuentra fabricantes por nombre, país o tipo de vehículo</p>
          </div>
          
          <!-- Filtros responsivos -->
          <div class="space-y-4 lg:space-y-6">
            <!-- Primera fila: Búsqueda principal -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <!-- Búsqueda general -->
              <div class="lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  Buscar por nombre
                </label>
                <div class="relative">
                  <input
                    v-model="localSearchTerm"
                    type="text"
                    placeholder="Ej: Toyota, Ford, BMW..."
                    class="w-full pl-4 pr-12 py-3 lg:py-4 border-0 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base lg:text-lg"
                    @input="handleSearchInput"
                  />
                  <button
                    v-if="localSearchTerm"
                    @click="clearSearch"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Filtro por país -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  País
                </label>
                <select
                  v-model="localSelectedCountry"
                  @change="handleFiltersChange"
                  class="w-full py-3 lg:py-4 px-4 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base lg:text-lg border-0"
                >
                  <option value="">Todos los países</option>
                  <option 
                    v-for="country in countryOptions.slice(1)" 
                    :key="country.value" 
                    :value="country.value"
                  >
                    {{ country.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Segunda fila: Filtros adicionales -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <!-- Filtro por tipo de vehículo -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Tipo de vehículo
                </label>
                <select
                  v-model="localSelectedVehicleType"
                  @change="handleFiltersChange"
                  class="w-full py-3 lg:py-4 px-4 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base lg:text-lg border-0"
                >
                  <option value="">Todos los tipos</option>
                  <option 
                    v-for="type in vehicleTypeOptions.slice(1)" 
                    :key="type.value" 
                    :value="type.value"
                  >
                    {{ type.label }}
                  </option>
                </select>
              </div>

              <!-- Botones de acción -->
              <div class="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                <button
                  @click="clearAllFilters"
                  class="flex-1 py-3 lg:py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  Limpiar filtros
                </button>
                <button
                  @click="applyFilters"
                  :disabled="loading"
                  class="flex-1 py-3 lg:py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                  </svg>
                  {{ loading ? 'Aplicando...' : 'Aplicar filtros' }}
                </button>
              </div>
            </div>

            <!-- Resumen de filtros activos -->
            <div v-if="hasActiveFilters" class="pt-4 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div class="text-sm text-gray-600">
                  Filtros activos:
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span v-if="localSearchTerm" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      </svg>
                      {{ localSearchTerm }}
                    </span>
                    <span v-if="localSelectedCountry" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {{ getCountryLabel(localSelectedCountry) }}
                    </span>
                    <span v-if="localSelectedVehicleType" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {{ localSelectedVehicleType }}
                    </span>
                  </div>
                </div>
                <span class="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {{ manufacturers.length }} resultado{{ manufacturers.length !== 1 ? 's' : '' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Estados de carga y error -->
        <div v-if="loading" class="flex justify-center py-16 lg:py-20">
          <div class="text-center">
            <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-6"></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Cargando fabricantes...</h3>
            <p class="text-gray-600">Esto puede tomar unos segundos</p>
          </div>
        </div>

        <div 
          v-else-if="error" 
          class="mb-6 lg:mb-8 rounded-2xl bg-red-50 border border-red-200 p-4"
        >
          <div class="flex items-center text-red-800">
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm-1 8h2v6h-2v-6zm1 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
            <div>
              <div class="font-semibold">Error al cargar fabricantes</div>
              <div class="text-sm mt-1">{{ error }}</div>
            </div>
          </div>
        </div>

        <!-- Grid de resultados completamente responsivo -->
        <div v-else-if="manufacturers.length > 0" class="space-y-6 lg:space-y-8">
          <!-- Header de resultados -->
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 lg:p-6">
            <div>
              <h3 class="text-lg lg:text-xl font-semibold text-gray-900">
                {{ manufacturers.length }} fabricante{{ manufacturers.length !== 1 ? 's' : '' }} encontrado{{ manufacturers.length !== 1 ? 's' : '' }}
              </h3>
              <p class="text-gray-600 text-sm mt-1">
                {{ hasActiveFilters ? 'Resultados filtrados' : 'Mostrando todos los fabricantes disponibles' }}
              </p>
            </div>
            
            <!-- Ordenamiento -->
            <div class="flex items-center space-x-3 w-full lg:w-auto">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap">Ordenar por:</label>
              <select
                v-model="sortBy"
                @change="handleSortChange"
                class="w-full lg:w-48 py-2 px-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              >
                <option 
                  v-for="option in sortOptions" 
                  :key="option.value" 
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Grid completamente responsivo -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
            <div 
              v-for="(manufacturer, index) in paginatedManufacturers" 
              :key="`manufacturer-${index}`"
              class="group bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-md hover:shadow-xl border border-gray-200/50 hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              @click="selectManufacturer(manufacturer)"
            >
              <!-- Header de la tarjeta -->
              <div class="mb-4 lg:mb-5">
                <div class="flex items-start justify-between mb-3">
                  <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 17l5-5-5-5v10z"/>
                  </svg>
                </div>
                
                <h3 class="text-base lg:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                  {{ manufacturer.commonName || manufacturer.legalName }}
                </h3>
                
                <p v-if="manufacturer.commonName && manufacturer.legalName !== manufacturer.commonName" 
                   class="text-xs lg:text-sm text-gray-500 mt-1 line-clamp-2">
                  {{ manufacturer.legalName }}
                </p>
              </div>

              <!-- Información detallada -->
              <div class="space-y-3 lg:space-y-4">
                <!-- País -->
                <div v-if="manufacturer.country" class="flex items-center">
                  <div class="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-2 lg:mr-3 flex-shrink-0">
                    <svg class="w-3 h-3 lg:w-4 lg:h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs text-gray-500 uppercase tracking-wider">País</div>
                    <div class="font-semibold text-gray-900 truncate text-sm lg:text-base">{{ formatCountry(manufacturer.country) }}</div>
                  </div>
                </div>

                <!-- Tipos de vehículos -->
                <div v-if="manufacturer.vehiclesType && manufacturer.vehiclesType.length > 0">
                  <div class="flex items-start">
                    <div class="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-green-50 flex items-center justify-center mr-2 lg:mr-3 mt-1 flex-shrink-0">
                      <svg class="w-3 h-3 lg:w-4 lg:h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Vehículos</div>
                      <div class="flex flex-wrap gap-1">
                        <span 
                          v-for="(vehicleType, idx) in manufacturer.vehiclesType.slice(0, 2)" 
                          :key="idx"
                          :class="vehicleType.IsPrimary ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'"
                          class="px-2 py-1 rounded-md text-xs font-medium inline-flex items-center"
                        >
                          {{ vehicleType.Name }}
                          <svg v-if="vehicleType.IsPrimary" class="w-3 h-3 ml-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </span>
                        <span 
                          v-if="manufacturer.vehiclesType.length > 2"
                          class="px-2 py-1 bg-gray-200 text-gray-600 rounded-md text-xs font-medium"
                        >
                          +{{ manufacturer.vehiclesType.length - 2 }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Badge de estado -->
                <div class="pt-2 border-t border-gray-100">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <div class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginación responsiva -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8 lg:mt-12">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-200/50 w-full lg:w-auto">
              <div class="flex items-center justify-center space-x-2">
                <!-- First page -->
                <button
                  @click="goToPage(1)"
                  :disabled="currentPageLocal === 1"
                  class="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"/>
                  </svg>
                </button>
                <!-- Previous page -->
                <button
                  @click="goToPage(currentPageLocal - 1)"
                  :disabled="currentPageLocal === 1"
                  class="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
                  </svg>
                </button>
                <!-- Page numbers -->
                <span class="px-4 py-2 text-sm font-medium text-gray-700">
                  Página {{ currentPageLocal }} de {{ totalPages }}
                </span>
                <!-- Next page -->
                <button
                  @click="goToPage(currentPageLocal + 1)"
                  :disabled="currentPageLocal === totalPages"
                  class="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
                  </svg>
                </button>
                <!-- Last page -->
                <button
                  @click="goToPage(totalPages)"
                  :disabled="currentPageLocal === totalPages"
                  class="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado vacío profesional -->
        <div v-else-if="!loading" class="text-center py-16 lg:py-20">
          <div class="max-w-md mx-auto px-4">
            <div class="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-inner">
              <svg class="w-12 h-12 lg:w-16 lg:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              {{ hasActiveFilters ? 'No se encontraron fabricantes' : 'Cargando fabricantes...' }}
            </h3>
            <p class="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
              {{ hasActiveFilters 
                ? 'Intenta ajustar los filtros de búsqueda para obtener más resultados' 
                : 'Los datos se están cargando desde el servidor' 
              }}
            </p>
            <button
              v-if="hasActiveFilters"
              @click="clearAllFilters"
              class="px-6 lg:px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              Limpiar todos los filtros
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de detalle completamente responsivo -->
    <div
      v-if="showDetail"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="showDetail = false"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <!-- Header -->
          <div class="bg-gradient-to-r from-slate-50 to-blue-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 lg:space-x-4">
                <div class="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg lg:text-xl font-bold text-gray-900 truncate">{{ selectedManufacturer?.commonName || selectedManufacturer?.legalName }}</h3>
                  <p class="text-gray-600 text-sm lg:text-base">Información detallada del fabricante</p>
                </div>
              </div>
              <button
                @click="showDetail = false"
                class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div v-if="selectedManufacturer" class="px-4 pt-5 pb-4 sm:p-6 space-y-4 lg:space-y-6">
            <!-- Información básica -->
            <div class="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-6">
              <h4 class="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Información básica
              </h4>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nombre común</label>
                  <p class="text-gray-900 font-medium text-sm lg:text-base break-words">{{ selectedManufacturer.commonName || 'No especificado' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nombre legal</label>
                  <p class="text-gray-900 font-medium text-sm lg:text-base break-words">{{ selectedManufacturer.legalName }}</p>
                </div>
                <div class="lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">País de origen</label>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p class="text-gray-900 font-medium text-sm lg:text-base">{{ formatCountry(selectedManufacturer.country) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Tipos de vehículos -->
            <div v-if="selectedManufacturer.vehiclesType && selectedManufacturer.vehiclesType.length > 0" class="bg-blue-50 rounded-xl lg:rounded-2xl p-4 lg:p-6">
              <h4 class="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Tipos de vehículos ({{ selectedManufacturer.vehiclesType.length }})
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                <div 
                  v-for="(vehicleType, idx) in selectedManufacturer.vehiclesType" 
                  :key="idx"
                  :class="vehicleType.IsPrimary ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-200'"
                  class="px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium flex items-center justify-between transition-all hover:shadow-md"
                >
                  <span class="truncate mr-2">{{ vehicleType.Name }}</span>
                  <svg v-if="vehicleType.IsPrimary" class="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div v-if="selectedManufacturer.vehiclesType.some((vt: any) => vt.IsPrimary)" class="mt-3 lg:mt-4 text-xs lg:text-sm text-gray-600 flex items-center">
                <svg class="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Los tipos marcados son los principales para este fabricante
              </div>
            </div>

            <!-- Acciones -->
            <div class="flex justify-end space-x-3 pt-3 lg:pt-4 border-t border-gray-200">
              <button
                @click="showDetail = false"
                class="px-4 lg:px-6 py-2 rounded-xl border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useManufacturersStore } from '@/stores/manufacturers'
import type { Manufacturer } from '@/stores/manufacturers'

const store = useManufacturersStore()

// Estado local reactivo
const localSearchTerm = ref('')
const localSelectedCountry = ref('')
const localSelectedVehicleType = ref('')
const currentPageLocal = ref(1)
const itemsPerPage = ref(20)
const showDetail = ref(false)
const selectedManufacturer = ref<Manufacturer | null>(null)
const sortBy = ref('name')

// Opciones de ordenamiento
const sortOptions = ref([
  { label: 'Nombre (A-Z)', value: 'name' },
  { label: 'Nombre (Z-A)', value: 'name-desc' },
  { label: 'País (A-Z)', value: 'country' },
  { label: 'País (Z-A)', value: 'country-desc' }
])

// Propiedades computadas
const manufacturers = computed(() => {
  let sorted = [...store.manufacturers]
  
  switch (sortBy.value) {
    case 'name':
      sorted.sort((a, b) => (a.commonName || a.legalName).localeCompare(b.commonName || b.legalName))
      break
    case 'name-desc':
      sorted.sort((a, b) => (b.commonName || b.legalName).localeCompare(a.commonName || a.legalName))
      break
    case 'country':
      sorted.sort((a, b) => a.country.localeCompare(b.country))
      break
    case 'country-desc':
      sorted.sort((a, b) => b.country.localeCompare(a.country))
      break
  }
  
  return sorted
})

const paginatedManufacturers = computed(() => {
  const start = (currentPageLocal.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return manufacturers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(manufacturers.value.length / itemsPerPage.value))
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const totalCount = computed(() => store.totalCount)
const totalDisplayCount = computed(() => manufacturers.value.length)

// Opciones de filtros
const countryOptions = computed(() => [
  { label: 'Todos los países', value: '' },
  ...store.availableCountries.map(country => ({
    label: `${getCountryFlag(country.value)} ${country.label}`,
    value: country.value
  }))
])

const vehicleTypeOptions = computed(() => [
  { label: 'Todos los tipos', value: '' },
  ...store.availableVehicleTypes
])

const hasActiveFilters = computed(() => 
  localSearchTerm.value.trim() !== '' || 
  localSelectedCountry.value !== '' || 
  localSelectedVehicleType.value !== ''
)

// Métodos
const handleSearchInput = () => {
  // Búsqueda en tiempo real con debounce
  clearTimeout((handleSearchInput as any).timeout)
  ;(handleSearchInput as any).timeout = setTimeout(() => {
    applyFilters()
  }, 300)
}

const handleFiltersChange = () => {
  currentPageLocal.value = 1
  applyFilters()
}

const handleSortChange = () => {
  currentPageLocal.value = 1
}

const goToPage = (page: number) => {
  currentPageLocal.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const applyFilters = () => {
  currentPageLocal.value = 1
  store.updateFilters({
    search: localSearchTerm.value,
    country: localSelectedCountry.value,
    vehicleType: localSelectedVehicleType.value
  })
}

const clearSearch = () => {
  localSearchTerm.value = ''
  applyFilters()
}

const clearAllFilters = () => {
  localSearchTerm.value = ''
  localSelectedCountry.value = ''
  localSelectedVehicleType.value = ''
  currentPageLocal.value = 1
  store.clearFilters()
}

const selectManufacturer = (manufacturer: Manufacturer) => {
  selectedManufacturer.value = manufacturer
  showDetail.value = true
}

const formatCountry = (country: string) => {
  return country
    .split(' ')
    .map(word => {
      if (word === '(USA)' || word === '(UK)') return word
      return word.charAt(0) + word.slice(1).toLowerCase()
    })
    .join(' ')
}

const getCountryLabel = (countryValue: string) => {
  const country = countryOptions.value.find(c => c.value === countryValue)
  return country?.label.replace(/🏳️|🇺🇸|🇩🇪|🇯🇵|🇮🇹|🇫🇷|🇬🇧|🇰🇷|🇸🇪|🇳🇱|🇨🇦|🇲🇽/g, '').trim() || countryValue
}

const getCountryFlag = (country: string) => {
  const flags: Record<string, string> = {
    'UNITED STATES': '🇺🇸',
    'GERMANY': '🇩🇪',
    'JAPAN': '🇯🇵',
    'ITALY': '🇮🇹',
    'FRANCE': '🇫🇷',
    'UNITED KINGDOM': '🇬🇧',
    'SOUTH KOREA': '🇰🇷',
    'SWEDEN': '🇸🇪',
    'NETHERLANDS': '🇳🇱',
    'CANADA': '🇨🇦',
    'MEXICO': '🇲🇽'
  }
  return flags[country] || '🏳️'
}

// Watchers
watch(() => store.searchTerm, (newVal) => {
  localSearchTerm.value = newVal
})

watch(() => store.selectedCountry, (newVal) => {
  localSelectedCountry.value = newVal
})

watch(() => store.selectedVehicleType, (newVal) => {
  localSelectedVehicleType.value = newVal
})

// Inicialización
onMounted(async () => {
  // Cargar todos los fabricantes al iniciar
  await store.loadAllManufacturers()
})
</script>

<style scoped>
/* Estilos mejorados para pantalla completa y responsividad */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animaciones mejoradas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.grid > div {
  animation: slideInUp 0.5s ease-out forwards;
}

.grid > div:nth-child(1) { animation-delay: 0.05s; }
.grid > div:nth-child(2) { animation-delay: 0.1s; }
.grid > div:nth-child(3) { animation-delay: 0.15s; }
.grid > div:nth-child(4) { animation-delay: 0.2s; }
.grid > div:nth-child(5) { animation-delay: 0.25s; }
.grid > div:nth-child(6) { animation-delay: 0.3s; }
.grid > div:nth-child(7) { animation-delay: 0.35s; }
.grid > div:nth-child(8) { animation-delay: 0.4s; }

/* Scroll personalizado */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive improvements específicos */
@media (max-width: 768px) {
  /* Spacing reducido en móvil */
  .space-y-6 > * + * {
    margin-top: 1rem;
  }
  
  .space-y-8 > * + * {
    margin-top: 1.5rem;
  }
  
  /* Padding reducido en tarjetas móviles */
  .grid > div {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  /* Grid de una sola columna en móviles pequeños */
  .grid {
    grid-template-columns: 1fr !important;
  }
}

/* Mejoras para pantallas muy grandes */
@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (min-width: 1920px) {
  .grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}

/* Backdrop personalizado para modal */
.backdrop-blur-custom {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Transiciones suaves */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects personalizados */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Focus states personalizados */
.focus-ring:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #3b82f6;
}

/* Glass effect */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Loading spinner personalizado */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Select custom styles */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233b82f6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}

/* Input focus effects */
input:focus,
select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Card hover effects */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Badge animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for modal */
.modal-scroll::-webkit-scrollbar {
  width: 4px;
}

.modal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.modal-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* Hide scrollbar for smaller screens */
@media (max-width: 768px) {
  .modal-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .modal-scroll::-webkit-scrollbar {
    display: none;
  }
}
</style>
