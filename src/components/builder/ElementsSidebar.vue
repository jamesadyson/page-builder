<template>
    <div class="sidebar-sections">
      <div class="px-4 py-2 text-sm font-medium text-gray-600">Sections</div>
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center section-item relative"
        @mouseenter="$emit('section-hover', section.type)"
        @mouseleave="$emit('section-leave')"
        @click="$emit('select-section', section)"
      >
        <div class="bg-blue-100 text-blue-500 w-8 h-8 rounded-md flex items-center justify-center mr-3">
          <component :is="section.icon" class="w-5 h-5" />
        </div>
        <span>{{ section.name }}</span>
        <div class="absolute right-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      <!-- Secondary Sidebar for Section Templates -->
      <secondary-sidebar
        :visible="showSecondarySidebar"
        :section-type="activeSectionType"
        :templates="activeSectionTemplates"
        @close="$emit('close-secondary')"
        @select-template="$emit('select-template', $event)"
        @mouse-leave="$emit('secondary-sidebar-leave')"
        @mouse-enter="$emit('secondary-sidebar-enter')"
      />
    </div>
  </template>
  
  <script>
  import SecondarySidebar from '@/components/SecondarySidebar.vue';
  
  export default {
    name: 'ElementsSidebar',
    components: {
      SecondarySidebar
    },
    props: {
      sections: {
        type: Array,
        required: true
      },
      activeSectionType: {
        type: String,
        default: null
      },
      activeSectionTemplates: {
        type: Array,
        default: () => []
      },
      showSecondarySidebar: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  
  <style scoped>
  /* Make the section sidebar container relative for proper secondary sidebar positioning */
  .sidebar-sections {
    position: relative;
    overflow: visible;
  }
  
  /* Section item hover effect */
  .section-item {
    position: relative;
    transition: all 0.2s ease;
  }
  
  .section-item:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }
  </style>