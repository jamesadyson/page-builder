<!-- src/components/SecondarySidebar.vue -->
<template>
  <div 
    class="secondary-sidebar bg-white border-r border-gray-200 shadow-sm overflow-y-auto transition-all duration-300 z-50"
    :class="{ 'sidebar-visible': visible, 'sidebar-hidden': !visible }"
  >
    <div v-if="visible">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-800">{{ sectionTitle }} Templates</h2>
        <button 
          class="p-1 rounded-full hover:bg-gray-100"
          @click="$emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-4">
        <div v-if="templates.length === 0" class="text-center py-8 text-gray-500">
          No templates available for this section type.
        </div>
        
        <div v-else class="grid grid-cols-1 gap-4">
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors cursor-pointer"
            @click="selectTemplate(template)"
          >
            <!-- Template Preview Image -->
            <div class="h-32 bg-gray-100 flex items-center justify-center">
              <div v-if="template.thumbnail" class="w-full h-full bg-cover bg-center" :style="{ backgroundImage: `url(${template.thumbnail})` }"></div>
              <div v-else class="text-gray-400 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="mt-1 text-xs">Preview not available</span>
              </div>
            </div>
            
            <!-- Template Info -->
            <div class="p-3">
              <h3 class="font-medium">{{ template.name }}</h3>
              <p class="text-xs text-gray-500 mt-1">Click to add this template</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondarySidebar',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    sectionType: {
      type: String,
      required: true
    },
    templates: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sectionTitle() {
      // Convert camelCase to Title Case with spaces
      return this.sectionType.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    }
  },
  methods: {
    selectTemplate(template) {
      this.$emit('select-template', template);
    }
  }
};
</script>

<style scoped>
.secondary-sidebar {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.sidebar-visible {
  width: 260px;
  transform: translateX(0);
  opacity: 1;
}

.sidebar-hidden {
  width: 0;
  transform: translateX(-20px);
  opacity: 0;
  pointer-events: none; /* Prevent interaction when hidden */
}

/* Ensure the secondary sidebar has proper overflow handling */
.secondary-sidebar > div {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>