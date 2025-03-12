<template>
    <div class="p-4">
      <div v-if="canvasElements.length === 0" class="text-center py-8">
        <p class="text-gray-500 mb-4">No sections added to your page yet</p>
        <button 
          @click="$emit('add-section')" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Section
        </button>
      </div>
      <div v-else class="space-y-2">
        <h3 class="text-sm font-medium text-gray-600 mb-3">Page Layout</h3>
        <div
          v-for="(element, index) in canvasElements"
          :key="'layout-' + index"
          class="border border-gray-200 rounded p-3 hover:border-blue-300 transition-colors cursor-pointer"
          :class="{ 'border-blue-500 bg-blue-50': selectedElementIndex === index }"
          @click="$emit('select-element', index)"
        >
          <div class="flex items-center justify-between">
            <!-- Section title based on component type -->
            <div class="flex items-center">
              <div class="h-6 w-6 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                <section-icon :type="element.component" class="h-4 w-4 text-gray-600" />
              </div>
              <span class="text-sm font-medium">{{ getSectionName(element, index) }}</span>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center space-x-1">
              <button class="p-1 text-gray-400 hover:text-gray-600" @click.stop="$emit('move-element', index, index - 1)" :disabled="index === 0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'opacity-50': index === 0 }">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
              <button class="p-1 text-gray-400 hover:text-gray-600" @click.stop="$emit('move-element', index, index + 2)" :disabled="index === canvasElements.length - 1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'opacity-50': index === canvasElements.length - 1 }">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <button class="p-1 text-gray-400 hover:text-red-600" @click.stop="$emit('remove-element', index)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Add new element button -->
        <button 
          @click="$emit('add-section')" 
          class="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Section
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import SectionIcon from '@/components/SectionIcon.vue';
  
  export default {
    name: 'LayoutSidebar',
    components: {
      SectionIcon
    },
    props: {
      canvasElements: {
        type: Array,
        required: true
      },
      selectedElementIndex: {
        type: Number,
        default: null
      }
    },
    methods: {
      // Get section name for layout view
      getSectionName(element, index) {
        if (element.component === 'TestimonialSection') {
          return `Testimonials ${index + 1}`;
        } else if (element.component === 'HeroSection') {
          return `Hero ${index + 1}`;
        } else if (element.component === 'FeaturesSection') {
          return `Features ${index + 1}`;
        } else if (element.component === 'AttentionBarSection') {
          return `Attention Bar ${index + 1}`;
        } else {
          return `Section ${index + 1}`;
        }
      }
    }
  };
  </script>