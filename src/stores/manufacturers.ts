import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Tipos basados en la respuesta real del backend
export interface VehicleType {
  IsPrimary: boolean
  Name: string
}

export interface Manufacturer {
  country: string
  commonName: string | null
  legalName: string
  vehiclesType?: VehicleType[]
}

export interface ManufacturerResponse {
  count: number
  message: string
  manufacturers: Manufacturer[]
  pagination?: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export interface SearchParams {
  search?: string
  country?: string
  vehicleType?: string
  page?: number
  limit?: number
}

const API_BASE_URL = 'http://localhost:3001'

export const useManufacturersStore = defineStore('manufacturers', () => {
  // Estado
  const allManufacturers = ref<Manufacturer[]>([])
  const filteredManufacturers = ref<Manufacturer[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)
  const currentPage = ref(1)
  const totalPages = ref(1)
  
  // Filtros
  const searchTerm = ref('')
  const selectedCountry = ref('')
  const selectedVehicleType = ref('')

  // Computadas
  const manufacturers = computed(() => filteredManufacturers.value)
  const hasManufacturers = computed(() => manufacturers.value.length > 0)
  const isEmpty = computed(() => !loading.value && manufacturers.value.length === 0)
  
  // Obtener países únicos
  const availableCountries = computed(() => {
    const countries = [...new Set(allManufacturers.value.map(m => m.country).filter(Boolean))]
    return countries.sort().map(country => ({
      label: formatCountryName(country),
      value: country
    }))
  })
  
  // Obtener tipos de vehículos únicos
  const availableVehicleTypes = computed(() => {
    const types = new Set<string>()
    allManufacturers.value.forEach(manufacturer => {
      if (manufacturer.vehiclesType) {
        manufacturer.vehiclesType.forEach(vt => types.add(vt.Name))
      }
    })
    return Array.from(types).sort().map(type => ({
      label: type,
      value: type
    }))
  })

  // Acciones
  const loadAllManufacturers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<ManufacturerResponse>(
        `${API_BASE_URL}/manufacturers`
      )

      const data = response.data
      allManufacturers.value = data.manufacturers || []
      totalCount.value = data.count || 0
      
      // Aplicar filtros existentes
      applyFilters()

    } catch (err) {
      console.error('Error loading manufacturers:', err)
      error.value = 'Error al cargar fabricantes. Verifica que el servidor esté funcionando.'
      allManufacturers.value = []
      filteredManufacturers.value = []
      totalCount.value = 0
    } finally {
      loading.value = false
    }
  }

  const searchManufacturers = async (params: SearchParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      if (params.search) queryParams.append('search', params.search)
      if (params.country) queryParams.append('country', params.country)
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())

      const response = await axios.get<ManufacturerResponse>(
        `${API_BASE_URL}/manufacturers/filtered?${queryParams.toString()}`
      )

      const data = response.data
      filteredManufacturers.value = data.manufacturers || []
      totalCount.value = data.count || 0
      
      if (data.pagination) {
        currentPage.value = data.pagination.currentPage
        totalPages.value = data.pagination.totalPages
      }

    } catch (err) {
      console.error('Error searching manufacturers:', err)
      error.value = 'Error al buscar fabricantes.'
      filteredManufacturers.value = []
      totalCount.value = 0
    } finally {
      loading.value = false
    }
  }

  const applyFilters = () => {
    let filtered = [...allManufacturers.value]

    // Filtro por búsqueda (nombre común o legal)
    if (searchTerm.value.trim()) {
      const search = searchTerm.value.toLowerCase()
      filtered = filtered.filter(m => 
        (m.commonName && m.commonName.toLowerCase().includes(search)) ||
        m.legalName.toLowerCase().includes(search)
      )
    }

    // Filtro por país
    if (selectedCountry.value) {
      filtered = filtered.filter(m => m.country === selectedCountry.value)
    }

    // Filtro por tipo de vehículo
    if (selectedVehicleType.value) {
      filtered = filtered.filter(m => 
        m.vehiclesType && m.vehiclesType.some(vt => vt.Name === selectedVehicleType.value)
      )
    }

    filteredManufacturers.value = filtered
    totalCount.value = filtered.length
    currentPage.value = 1
    totalPages.value = Math.ceil(filtered.length / 20)
  }

  const updateFilters = (filters: {
    search?: string
    country?: string
    vehicleType?: string
  }) => {
    if (filters.search !== undefined) searchTerm.value = filters.search
    if (filters.country !== undefined) selectedCountry.value = filters.country
    if (filters.vehicleType !== undefined) selectedVehicleType.value = filters.vehicleType

    applyFilters()
  }

  const clearFilters = () => {
    searchTerm.value = ''
    selectedCountry.value = ''
    selectedVehicleType.value = ''
    filteredManufacturers.value = [...allManufacturers.value]
    totalCount.value = allManufacturers.value.length
  }

  const resetError = () => {
    error.value = null
  }

  // Función helper para formatear nombres de países
  function formatCountryName(country: string): string {
    return country
      .split(' ')
      .map(word => {
        if (word === '(USA)' || word === '(UK)') return word
        return word.charAt(0) + word.slice(1).toLowerCase()
      })
      .join(' ')
  }

  return {
    // Estado
    manufacturers,
    allManufacturers,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    searchTerm,
    selectedCountry,
    selectedVehicleType,
    
    // Computadas
    hasManufacturers,
    isEmpty,
    availableCountries,
    availableVehicleTypes,
    
    // Acciones
    loadAllManufacturers,
    searchManufacturers,
    updateFilters,
    clearFilters,
    resetError,
    applyFilters
  }
})
