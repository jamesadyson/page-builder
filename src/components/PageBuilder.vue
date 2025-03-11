<!-- src/components/PageBuilder.vue -->
<template>
  <div class="page-builder flex h-screen">
    <!-- Left Sidebar for Sections -->
    <div class="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto relative">
      <div class="p-4">
        <h2 class="text-lg font-medium text-gray-800">{{ sidebarTitle }}</h2>
      </div>
      <div v-if="showElementSelector">
        <div class="px-4 py-2 text-sm font-medium text-gray-600">Basic blocks</div>
        <div
          v-for="(element, index) in basicElements"
          :key="'basic-' + index"
          class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center"
          @click="addElementToCanvas(element)"
        >
          <div class="bg-blue-100 text-blue-500 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <component :is="element.icon" class="w-5 h-5" />
          </div>
          <span>{{ element.name }}</span>
        </div>

        <div class="px-4 py-2 text-sm font-medium text-gray-600 mt-4">Interactive blocks</div>
        <div
          v-for="(element, index) in interactiveElements"
          :key="'interactive-' + index"
          class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center"
          @click="addElementToCanvas(element)"
        >
          <div class="bg-blue-100 text-blue-500 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <component :is="element.icon" class="w-5 h-5" />
          </div>
          <span>{{ element.name }}</span>
        </div>
      </div>

      <div v-if="!showElementSelector">
        <div class="px-4 py-2 text-sm font-medium text-gray-600">Sections</div>
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center section-item relative"
          @mouseenter="handleSectionHover(section.type)"
          @mouseleave="handleSectionLeave"
          @click="selectSection(section)"
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
      </div>
      
      <!-- Secondary Sidebar for Section Templates -->
      <SecondarySidebar
        :visible="showSecondarySidebar"
        :section-type="activeSectionType"
        :templates="activeSectionTemplates"
        @close="hideSecondarySidebar"
        @select-template="addSectionTemplate"
      />
    </div>

    <!-- Main Canvas Area -->
    <div class="flex-1 bg-gray-100 overflow-auto flex flex-col">
      <!-- Toolbar -->
      <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div class="flex space-x-4">
          <button class="p-2 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-lg font-medium">Blank</h1>
        </div>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-300 rounded text-sm">Preview</button>
          <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">Publish</button>
        </div>
      </div>

      <!-- Canvas -->
      <div class="flex-1 p-8 overflow-y-auto" ref="canvasArea">
        <div class="bg-white shadow-sm rounded-md mx-auto max-w-4xl min-h-[600px] relative canvas-container">
          <div v-if="canvasElements.length === 0" class="absolute inset-0 flex items-center justify-center">
            <button
              @click="openElementSelector"
              class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div v-else>
            <!-- Dropzone indicator for the top position -->
            <div 
              v-show="isDragging" 
              class="dropzone w-full"
              :class="{'border-blue-500': dropzoneIndex === -1}"
              @dragover.prevent="setDropzoneIndex(-1)"
            ></div>
            
            <!-- Render canvas elements -->
            <div 
              v-for="(element, index) in canvasElements" 
              :key="index"
              class="element-wrapper relative"
              :class="{'shadow-lg': draggedElementIndex === index}"
              :data-element-index="index"
            >
              <component
                :is="element.component"
                :element-data="element.data"
                :section-data="element.data"
                @select="selectElementFromCanvas(index)"
                @delete="removeElement(index)"
                @dragstart="startDrag($event, index)"
                :class="{'opacity-50': isDragging && draggedElementIndex === index}"
              />
              
              <!-- Dropzone indicator after this element -->
              <div 
                v-show="isDragging && draggedElementIndex !== index" 
                class="dropzone w-full"
                :class="{'border-blue-500': dropzoneIndex === index}"
                @dragover.prevent="setDropzoneIndex(index)"
                :data-dropzone-index="index"
              ></div>
            </div>
            
            <!-- Add element button after content -->
            <div class="py-4 flex justify-center">
              <button
                @click="openElementSelector"
                class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-white border-t border-gray-200 p-2 text-center text-xs text-gray-500">
        <div class="flex justify-center space-x-3">
          <span>Terms of use</span>
          <span>Privacy policy</span>
          <span>Manage Cookies</span>
        </div>
        <div class="mt-2 flex justify-center items-center">
          <span class="flex items-center">
            <svg class="h-4 w-4 mr-1 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2z" />
            </svg>
            Page Builder
          </span>
        </div>
      </div>
    </div>

    <!-- Right Sidebar for Options -->
    <div v-if="selectedElementIndex !== null" class="w-64 bg-white border-l border-gray-200 shadow-sm overflow-y-auto">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-800">Element Settings</h2>
      </div>
      <div class="p-4">
        <!-- Element specific settings -->
        <TextFormatControls 
          v-if="isTextElement()"
          :element-data="canvasElements[selectedElementIndex].data"
          @update="updateElementData"
        />
      </div>
    </div>
    
    <!-- Drag ghost element - This follows the cursor during drag -->
    <div 
      v-if="isDragging && draggedElementIndex !== null" 
      class="fixed pointer-events-none bg-white shadow-lg border border-blue-500 rounded p-2 z-50 opacity-75"
      :style="{ top: `${dragGhostPosition.y}px`, left: `${dragGhostPosition.x}px`, width: '200px' }"
    >
      <div class="text-sm font-medium truncate">
        Moving: {{ getElementName(canvasElements[draggedElementIndex].component) }}
      </div>
    </div>
  </div>
</template>

<script>
// Import element components
import HeadingElement from '@/components/elements/HeadingElement.vue';
import TextElement from '@/components/elements/TextElement.vue';
import BulletElement from '@/components/elements/BulletElement.vue';
import FeatureElement from '@/components/elements/FeatureElement.vue';
import TextFormatControls from '@/components/TextFormatControls.vue';
import TestimonialSection from '@/components/sections/TestimonialSection.vue';
import SecondarySidebar from '@/components/SecondarySidebar.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageBuilder',
  components: {
    HeadingElement,
    TextElement,
    BulletElement,
    FeatureElement,
    TextFormatControls,
    TestimonialSection,
    SecondarySidebar
  },
  data() {
    return {
      sidebarTitle: 'Add section',
      // Drag and drop state
      isDragging: false,
      draggedElementIndex: null,
      dropzoneIndex: null,
      dragStartPosition: { x: 0, y: 0 },
      dragGhostPosition: { x: 0, y: 0 },
      // Hover timeouts for section selection
      hoverTimeout: null,
      hoverDelay: 300 // ms
    };
  },
  computed: {
    ...mapState('pageBuilder', [
      'canvasElements',
      'selectedElementIndex',
      'showElementSelector',
      'activeSectionType',
      'showSecondarySidebar'
    ]),
    ...mapGetters('pageBuilder', [
      'getAvailableElements',
      'getAvailableSections',
      'getActiveSectionTemplates'
    ]),
    basicElements() {
      return this.getAvailableElements.basic || [];
    },
    interactiveElements() {
      return this.getAvailableElements.interactive || [];
    },
    sections() {
      return this.getAvailableSections || [];
    },
    activeSectionTemplates() {
      return this.getActiveSectionTemplates || [];
    }
  },
  methods: {
    ...mapActions('pageBuilder', [
      'openElementSelector',
      'closeElementSelector',
      'addElementToCanvas',
      'removeElement',
      'selectElement',
      'updateElementData',
      'showSecondarySidebar',
      'hideSecondarySidebar',
      'selectSectionTemplate'
    ]),
    selectElementFromCanvas(index) {
      this.selectElement(index);
    },
    isTextElement() {
      if (this.selectedElementIndex === null) return false;
      
      const componentName = this.canvasElements[this.selectedElementIndex].component;
      return ['TextElement', 'HeadingElement', 'BulletElement', 'FeatureElement'].includes(componentName);
    },
    getElementName(componentName) {
      const elementMap = {
        'HeadingElement': 'Heading',
        'TextElement': 'Text Block',
        'BulletElement': 'Bullet List',
        'FeatureElement': 'Feature Block',
        'TestimonialSection': 'Testimonial'
      };
      return elementMap[componentName] || 'Element';
    },
    
    // Handle section selection and hover events
    handleSectionHover(sectionType) {
      // Clear any existing timeout
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
      
      // Set a new timeout to show the secondary sidebar
      this.hoverTimeout = setTimeout(() => {
        // Check if we have templates for this section type before showing
        if (sectionType === 'testimonials' && 
            this.$store.state.pageBuilder.sectionTemplates.testimonials && 
            this.$store.state.pageBuilder.sectionTemplates.testimonials.length > 0) {
          
          console.log('Showing sidebar for testimonials');
          this.showSecondarySidebar(sectionType);
        }
      }, this.hoverDelay);
    },
    
    handleSectionLeave() {
      // Clear the timeout if the mouse leaves before it triggers
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
      }
    },
    
    selectSection(section) {
      // If we have templates for this section type, show them
      if (section.type === 'testimonials' && this.$store.state.pageBuilder.sectionTemplates.testimonials) {
        this.showSecondarySidebar(section.type);
      } else {
        console.log(`Selected section: ${section.name}`);
      }
    },
    
    hideSecondarySidebar() {
      this.hideSecondarySidebar();
    },
    
    addSectionTemplate(template) {
      this.selectSectionTemplate(template);
    },
    
    // Improved drag and drop methods
    startDrag(event, index) {
      // Prevent default to avoid text selection
      event.preventDefault();
      
      // Set dragging state
      this.isDragging = true;
      this.draggedElementIndex = index;
      
      // Initialize the drag positions
      this.dragStartPosition = { x: event.clientX, y: event.clientY };
      this.dragGhostPosition = { x: event.clientX + 15, y: event.clientY - 15 };
      
      // Add global event listeners
      window.addEventListener('mousemove', this.handleDragMove);
      window.addEventListener('mouseup', this.handleDragEnd);
      
      // Add a class to document body to indicate dragging state
      document.body.classList.add('is-dragging');
    },
    
    handleDragMove(event) {
      if (!this.isDragging) return;
      
      // Update ghost position
      this.dragGhostPosition = {
        x: event.clientX + 15,
        y: event.clientY - 15
      };
      
      // Find the dropzone under the cursor by calculating positions
      this.findDropzoneAtPosition(event.clientX, event.clientY);
    },
    
    findDropzoneAtPosition(x, y) {
      // Get all dropzone elements (including the top one and those between elements)
      const dropzones = document.querySelectorAll('.dropzone');
      
      // If no dropzones are found, exit early
      if (dropzones.length === 0) {
        return;
      }
      
      // Convert to array for easier processing
      const dropzonesArray = Array.from(dropzones);
      
      // Find the closest dropzone by vertical distance
      let closestDropzone = null;
      let closestDistance = Infinity;
      
      for (let i = 0; i < dropzonesArray.length; i++) {
        const dropzone = dropzonesArray[i];
        const rect = dropzone.getBoundingClientRect();
        
        // Calculate the center Y of the dropzone
        const dropzoneY = rect.top + (rect.height / 2);
        
        // Calculate vertical distance from cursor to dropzone center
        const distance = Math.abs(y - dropzoneY);
        
        // If this is closer than our current closest, update
        if (distance < closestDistance) {
          closestDistance = distance;
          closestDropzone = dropzone;
        }
      }
      
      // If we found a close dropzone within a reasonable distance
      if (closestDropzone && closestDistance < 50) {
        // Get the index from the dropzone
        let index = -1;
        if (closestDropzone.dataset.dropzoneIndex !== undefined) {
          index = parseInt(closestDropzone.dataset.dropzoneIndex, 10);
        }
        this.setDropzoneIndex(index);
      } else {
        // If no reasonable dropzone found, reset
        this.dropzoneIndex = null;
      }
    },
    
    setDropzoneIndex(index) {
      if (this.dropzoneIndex !== index) {
        this.dropzoneIndex = index;
      }
    },
    
    handleDragEnd() {
      if (!this.isDragging) return;
      
      try {
        // Move the element if a valid dropzone was targeted
        if (this.dropzoneIndex !== null) {
          this.moveElement(this.draggedElementIndex, this.dropzoneIndex);
        }
      } finally {
        // Always clean up regardless of success/failure
        this.cleanupDragState();
      }
    },
    
    cleanupDragState() {
      // Clean up dragging state
      this.isDragging = false;
      document.body.classList.remove('is-dragging');
      
      // Remove global event listeners
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
      
      // Reset drag-related state
      this.draggedElementIndex = null;
      this.dropzoneIndex = null;
    },
    
    moveElement(fromIndex, toIndex) {
      // Validate indices
      if (fromIndex === toIndex || fromIndex < 0 || fromIndex >= this.canvasElements.length) {
        return;
      }
      
      // Handle the special case of dropping at the top
      if (toIndex === -1) {
        toIndex = 0;
      } else if (fromIndex < toIndex) {
        // If moving down, adjust target index
        toIndex += 1;
      }
      
      // Ensure toIndex is valid
      toIndex = Math.max(0, Math.min(this.canvasElements.length, toIndex));
      
      // Get the element to move
      const elementToMove = JSON.parse(JSON.stringify(this.canvasElements[fromIndex]));
      
      // Create a new array with the element moved
      const newElements = [...this.canvasElements];
      newElements.splice(fromIndex, 1);
      newElements.splice(toIndex, 0, elementToMove);
      
      // Update the state using the removeElement and addElementToCanvas actions
      // We need to handle the selected element index separately
      const wasSelected = this.selectedElementIndex === fromIndex;
      
      this.removeElement(fromIndex);
      
      // Insert at the correct index
      this.$store.commit('pageBuilder/ADD_CANVAS_ELEMENT', elementToMove);
      
      // Now move to the correct position if needed
      if (toIndex !== newElements.length - 1) {
        for (let i = newElements.length - 1; i > toIndex; i--) {
          this.moveElement(i, i - 1);
        }
      }
      
      // Restore selection if needed
      if (wasSelected) {
        this.selectElement(toIndex);
      }
    }
  },
  beforeDestroy() {
    // Ensure all event listeners are removed when component is destroyed
    this.cleanupDragState();
    
    // Clear any remaining hover timeouts
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }
};
</script>

<style scoped>
/* Base styles */
.page-builder {
  user-select: none; /* Prevent text selection during drag */
}

/* Dropzone styling */
.dropzone {
  height: 6px;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.dropzone.border-blue-500 {
  height: 10px;
  background-color: rgba(59, 130, 246, 0.1);
}

/* Subtle animation for the drag ghost */
@keyframes pulse {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 0.6; }
}

.fixed.pointer-events-none {
  animation: pulse 1.5s infinite;
}

/* Improve cursor appearance */
:deep(.cursor-move) {
  cursor: grab;
}

:deep(.cursor-move:active) {
  cursor: grabbing;
}

/* Make dropzones more subtle by default */
.is-dragging .dropzone {
  height: 2px;
  margin: 1px 0;
  border: none;
  transition: all 0.2s ease;
}

/* Only show the dropzone when the cursor is near or over it */
.is-dragging .dropzone.border-blue-500 {
  height: 4px;
  background-color: #3b82f6;
  margin: 2px 0;
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