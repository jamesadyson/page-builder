<!-- src/components/PageBuilder.vue -->
<template>
  <div class="page-builder flex h-screen">
    <!-- Left Sidebar for Sections and Elements -->
    <div 
      class="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto relative"
      :class="{ 'sidebar-highlight': sidebarHighlighted }"
    >
      <div class="p-4">
        <h2 class="text-lg font-medium text-gray-800">Page Builder</h2>
      </div>
      
      <!-- Basic Elements -->
      <div>
        <div class="px-4 py-2 text-sm font-medium text-gray-600">Basic blocks</div>
        <div
          v-for="(element, index) in basicElements"
          :key="'basic-' + index"
          class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center"
          @click="insertElement(element, activeInsertionIndex !== null ? activeInsertionIndex : canvasElements.length)"
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
          @click="insertElement(element, activeInsertionIndex !== null ? activeInsertionIndex : canvasElements.length)"
        >
          <div class="bg-blue-100 text-blue-500 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <component :is="element.icon" class="w-5 h-5" />
          </div>
          <span>{{ element.name }}</span>
        </div>
      </div>

      <div class="sidebar-sections mt-6">
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
        
        <!-- Secondary Sidebar for Section Templates -->
        <SecondarySidebar
          :visible="showSecondarySidebar"
          :section-type="activeSectionType"
          :templates="activeSectionTemplates"
          @close="toggleSecondarySidebar(false)"
          @select-template="insertSectionTemplate"
          @mouse-leave="handleSecondarySidebarLeave"
          @mouse-enter="handleSecondarySidebarEnter"
        />
      </div>
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
            <!-- Initial empty state -->
            <button
              @click="activateInsertionPoint(0)"
              class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div v-else>
            <!-- Top insertion zone (index 0) -->
            <div 
              class="insertion-zone w-full"
              :class="{'active': hoveredInsertionIndex === 0}"
              @mouseenter="setHoveredInsertionIndex(0)"
              @mouseleave="clearHoveredInsertionIndex"
              data-index="0"
            >
              <div class="relative flex justify-center w-full">
                <div class="insertion-line"></div>
                <button
                  v-show="hoveredInsertionIndex === 0 && !isDragging"
                  @click="activateInsertionPoint(0)"
                  class="insertion-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Render each element with an insertion zone after it -->
            <div 
              v-for="(element, index) in canvasElements" 
              :key="index"
              class="element-wrapper relative"
              :class="{'opacity-50': isDragging && draggedElementIndex === index}"
            >
              <!-- The actual element component -->
              <component
                :is="element.component"
                :element-data="element.data"
                :section-data="element.data"
                @select="selectElementFromCanvas(index)"
                @delete="removeElement(index)"
                @dragstart="startDrag($event, index)"
                :class="{'opacity-50': isDragging && draggedElementIndex === index}"
              />
              
              <!-- Insertion zone after this element (index: index+1) -->
              <div 
                class="insertion-zone w-full"
                :class="{'active': hoveredInsertionIndex === index + 1}"
                @mouseenter="setHoveredInsertionIndex(index + 1)"
                @mouseleave="clearHoveredInsertionIndex"
                :data-index="index + 1"
              >
                <div class="relative flex justify-center w-full">
                  <div class="insertion-line"></div>
                  <button
                    v-show="hoveredInsertionIndex === index + 1 && !isDragging"
                    @click="activateInsertionPoint(index + 1)"
                    class="insertion-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Add element button after content -->
            <div class="py-4 flex justify-center">
              <button
                @click="activateInsertionPoint(canvasElements.length)"
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
      class="drag-ghost"
      :style="{ top: `${dragGhostPosition.y}px`, left: `${dragGhostPosition.x}px` }"
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
      // Hover and insertion tracking
      hoveredInsertionIndex: null, // Track which insertion point is being hovered
      activeInsertionIndex: null, // The insertion point that was clicked
      sidebarHighlighted: false, // Track if sidebar should be highlighted
      
      // Drag and drop state
      isDragging: false,
      draggedElementIndex: null,
      dragGhostPosition: { x: 0, y: 0 },
      
      // Hover timeouts for section selection
      hoverTimeout: null,
      hoverDelay: 300, // ms
      closeSidebarTimeout: null,
      isMouseOverSecondarySidebar: false,
      isMouseOverSectionItem: false,
      currentHoveredSection: null
    };
  },
  computed: {
    ...mapState('pageBuilder', [
      'canvasElements',
      'selectedElementIndex',
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
      'removeElement', 
      'selectElement',
      'updateElementData'
    ]),

    // Method to insert an element at a specific position
    insertElement(element, index) {
      this.$store.dispatch('pageBuilder/insertElementAtIndex', {
        element,
        index
      });
      
      // Reset active insertion index
      this.activeInsertionIndex = null;
    },
    
    // Method to insert a section template
    insertSectionTemplate(template) {
      const insertIndex = this.activeInsertionIndex !== null ? 
                          this.activeInsertionIndex : 
                          this.canvasElements.length;
                          
      this.$store.dispatch('pageBuilder/insertSectionTemplateAtIndex', {
        template,
        index: insertIndex
      });
      
      // Reset insertion index and hide the sidebar
      this.activeInsertionIndex = null;
      this.toggleSecondarySidebar(false);
    },

    // New insertion point management
    setHoveredInsertionIndex(index) {
      this.hoveredInsertionIndex = index;
    },
    
    clearHoveredInsertionIndex() {
      // Only clear if we're not dragging
      if (!this.isDragging) {
        this.hoveredInsertionIndex = null;
      }
    },
    
    activateInsertionPoint(index) {
      this.activeInsertionIndex = index;
      this.highlightSidebar();
    },
    
    // Sidebar highlight animation
    highlightSidebar() {
      this.sidebarHighlighted = true;
      setTimeout(() => {
        this.sidebarHighlighted = false;
      }, 600); // Animation duration
    },

    // Toggle secondary sidebar method
    toggleSecondarySidebar(show, sectionType = null) {
      if (show) {
        this.$store.dispatch('pageBuilder/showSecondarySidebar', sectionType);
      } else {
        this.$store.dispatch('pageBuilder/hideSecondarySidebar');
      }
    },
    
    // Handle mouse enter and leave for better hover management
    handleSecondarySidebarEnter() {
      this.isMouseOverSecondarySidebar = true;
      if (this.closeSidebarTimeout) {
        clearTimeout(this.closeSidebarTimeout);
        this.closeSidebarTimeout = null;
      }
    },
    
    handleSecondarySidebarLeave() {
      this.isMouseOverSecondarySidebar = false;
      this.scheduleCloseSidebar();
    },
    
    scheduleCloseSidebar() {
      if (!this.isMouseOverSecondarySidebar && !this.isMouseOverSectionItem) {
        if (this.closeSidebarTimeout) {
          clearTimeout(this.closeSidebarTimeout);
        }
        this.closeSidebarTimeout = setTimeout(() => {
          this.toggleSecondarySidebar(false);
        }, 300);
      }
    },
    
    handleSectionLeave() {
      // Clear any existing timeout
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
      }
      
      this.isMouseOverSectionItem = false;
      this.scheduleCloseSidebar();
    },
    
    // Section hover methods
    handleSectionHover(sectionType) {
      this.currentHoveredSection = sectionType;
      this.isMouseOverSectionItem = true;
      
      // Clear any existing timeout
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
      
      // Clear close timeout if exists
      if (this.closeSidebarTimeout) {
        clearTimeout(this.closeSidebarTimeout);
        this.closeSidebarTimeout = null;
      }
      
      // Set a new timeout to show the secondary sidebar
      this.hoverTimeout = setTimeout(() => {
        if (sectionType === 'testimonials') {
          this.toggleSecondarySidebar(true, sectionType);
        }
      }, this.hoverDelay);
    },
    
    selectSection(section) {
      // If we have templates for this section type, show them
      if (section.type === 'testimonials') {
        this.toggleSecondarySidebar(true, section.type);
      } else {
        console.log(`Selected section: ${section.name}`);
      }
    },
    
    // Helper method for Element Settings panel
    isTextElement() {
      if (this.selectedElementIndex === null) return false;
      
      const componentName = this.canvasElements[this.selectedElementIndex].component;
      return ['TextElement', 'HeadingElement', 'BulletElement'].includes(componentName);
    },
    
    // Helper for getting element name for drag ghost
    getElementName(componentName) {
      switch(componentName) {
        case 'HeadingElement': return 'Heading';
        case 'TextElement': return 'Text';
        case 'BulletElement': return 'List';
        case 'FeatureElement': return 'Feature';
        case 'TestimonialSection': return 'Testimonial';
        default: return 'Element';
      }
    },
    
    selectElementFromCanvas(index) {
      this.selectElement(index);
    },
      
    // Improved drag and drop methods
    startDrag(event, index) {
      event.preventDefault();
      
      // Set state
      this.isDragging = true;
      this.draggedElementIndex = index;
      
      // Initial positions for the drag ghost
      this.dragGhostPosition = { 
        x: event.clientX + 15, 
        y: event.clientY - 15 
      };
      
      // Add global event listeners
      window.addEventListener('mousemove', this.handleDragMove);
      window.addEventListener('mouseup', this.handleDragEnd);
      
      // Add dragging class to body
      document.body.classList.add('is-dragging');
    },
    
    // Handle mouse movement during drag
    handleDragMove(event) {
      if (!this.isDragging) return;
      
      // Update ghost position to follow cursor
      this.dragGhostPosition = {
        x: event.clientX + 15,
        y: event.clientY - 15
      };
      
      // Find dropzone under the cursor
      this.findDropzoneAtPosition(event.clientX, event.clientY);
    },
    
    // Find which dropzone is under the cursor
    findDropzoneAtPosition(x, y) {
      const dropzones = document.querySelectorAll('.insertion-zone');
      if (!dropzones.length) return;
      
      let bestDropzone = null;
      let bestDistance = Infinity;
      
      // Find the closest dropzone
      dropzones.forEach(dropzone => {
        const rect = dropzone.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(y - centerY);
        
        if (distance < bestDistance) {
          bestDistance = distance;
          bestDropzone = dropzone;
        }
      });
      
      // Only use dropzone if it's close enough
      if (bestDropzone && bestDistance < 40) {
        // Get the index of this dropzone
        const newIndex = parseInt(bestDropzone.dataset.index, 10);
        
        // Only update if it's a different zone
        if (this.hoveredInsertionIndex !== newIndex) {
          this.hoveredInsertionIndex = newIndex;
        }
      } else {
        this.hoveredInsertionIndex = null;
      }
    },
    
    // Handle end of drag operation
    handleDragEnd() {
      if (!this.isDragging) return;
      
      // If we have a valid target position and it's different from the source
      if (this.hoveredInsertionIndex !== null && 
          this.hoveredInsertionIndex !== this.draggedElementIndex && 
          this.hoveredInsertionIndex !== this.draggedElementIndex + 1) {
        
        // Execute the move
        this.moveElement(this.draggedElementIndex, this.hoveredInsertionIndex);
      }
      
      // Always clean up
      this.cleanupDragState();
    },
    
    // Clean up after drag operation
    cleanupDragState() {
      this.isDragging = false;
      this.draggedElementIndex = null;
      this.hoveredInsertionIndex = null;
      
      // Remove global listeners
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
      
      // Remove body class
      document.body.classList.remove('is-dragging');
    },
    
    // Move an element from one position to another
    moveElement(fromIndex, toIndex) {
      // Get the element being moved
      const elementToMove = {...this.canvasElements[fromIndex]};
      
      // Create a new array for the updated order
      const newElements = [...this.canvasElements];
      
      // Remove the element from its original position
      newElements.splice(fromIndex, 1);
      
      // Calculate the corrected insertion index
      // If moving down the list, account for the removed element
      let correctedToIndex = toIndex;
      if (toIndex > fromIndex) {
        correctedToIndex = toIndex - 1;
      }
      
      // Insert at the new position
      newElements.splice(correctedToIndex, 0, elementToMove);
      
      // Update the store
      this.$store.commit('pageBuilder/SET_CANVAS_ELEMENTS', newElements);
      
      // Update selection if needed
      if (this.selectedElementIndex === fromIndex) {
        this.selectElement(correctedToIndex);
      } else if (
        this.selectedElementIndex > fromIndex && 
        this.selectedElementIndex <= correctedToIndex
      ) {
        this.selectElement(this.selectedElementIndex - 1);
      } else if (
        this.selectedElementIndex < fromIndex && 
        this.selectedElementIndex >= correctedToIndex
      ) {
        this.selectElement(this.selectedElementIndex + 1);
      }
    }
  },
  beforeDestroy() {
    // Ensure all event listeners are removed when component is destroyed
    if (this.isDragging) {
      this.cleanupDragState();
    }
    
    // Clear any remaining hover timeouts
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    
    if (this.closeSidebarTimeout) {
      clearTimeout(this.closeSidebarTimeout);
    }
  }
};
</script>

<style scoped>
/* Base styles */
.page-builder {
  user-select: none; /* Prevent text selection during drag */
}

/* Make the left sidebar container relative for proper secondary sidebar positioning */
.sidebar-sections {
  position: relative;
  overflow: visible;
}

/* Simplified insertion zone styles */
.insertion-zone {
  height: 20px;
  transition: all 0.15s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
  width: 100%;
}

.insertion-line {
  width: 90%;
  height: 2px;
  background-color: #d1d5db; /* gray-300 */
  transition: all 0.15s ease;
  opacity: 0;
}

/* Show the line when hovering over the insertion zone */
.insertion-zone:hover .insertion-line {
  opacity: 1;
}

/* Active state when it's the current drop target */
.insertion-zone.active .insertion-line {
  opacity: 1;
  height: 3px;
  background-color: #3b82f6; /* blue-500 */
}

/* The plus button */
.insertion-button {
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: white;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  opacity: 0;
  top: 50%;
  transform: translateY(-50%);
}

/* Show button on hover */
.insertion-zone:hover .insertion-button {
  opacity: 1;
}

/* Button hover effect */
.insertion-button:hover {
  transform: translateY(-50%) scale(1.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6; /* blue-500 */
}

/* Active state styling */
.insertion-zone.active .insertion-button {
  opacity: 1;
  background-color: #3b82f6; /* blue-500 */
}

.insertion-zone.active .insertion-button svg {
  color: white;
}

/* When an element is being dragged */
.element-wrapper.dragging {
  opacity: 0.5;
}

/* Style for the drag ghost element */
.drag-ghost {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  background: white;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  padding: 6px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Sidebar highlight animation */
@keyframes highlight-sidebar {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(59, 130, 246, 0);
  }
  40% {
    transform: scale(1.03);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
  }
  70% {
    transform: scale(1.01);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(59, 130, 246, 0);
  }
}

.sidebar-highlight {
  animation: highlight-sidebar 0.6s ease;
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