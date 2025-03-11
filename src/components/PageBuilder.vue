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
          @click="addElementToCanvas(element, activeInsertionIndex !== null ? activeInsertionIndex : null)"
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
          @click="addElementToCanvas(element, activeInsertionIndex !== null ? activeInsertionIndex : null)"
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
          @select-template="(template) => addSectionTemplate(template, activeInsertionIndex !== null ? activeInsertionIndex : null)"
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
            <div 
              class="insertion-zone w-full py-4 flex justify-center items-center"
              @mouseenter="setHoveredInsertionIndex(0)"
              @mouseleave="clearHoveredInsertionIndex"
            >
              <button
                @click="activateInsertionPoint(0)"
                class="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div v-else>
            <!-- Top insertion zone -->
            <div 
              class="insertion-zone w-full"
              :class="{'active': hoveredInsertionIndex === 0 || (isDragging && dropzoneIndex === 0)}"
              @mouseenter="setHoveredInsertionIndex(0)"
              @mouseleave="clearHoveredInsertionIndex"
              data-dropzone-index="0"
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
              
              <!-- Insertion zone after this element -->
              <div 
                class="insertion-zone w-full"
                :class="{'active': hoveredInsertionIndex === index + 1 || (isDragging && dropzoneIndex === index)}"
                @mouseenter="setHoveredInsertionIndex(index + 1)"
                @mouseleave="clearHoveredInsertionIndex"
                :data-dropzone-index="index"
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
      // Hover and insertion tracking
      hoveredInsertionIndex: null, // Track which insertion point is being hovered
      activeInsertionIndex: null, // The insertion point that was clicked
      sidebarHighlighted: false, // Track if sidebar should be highlighted
      
      // Drag and drop state
      isDragging: false,
      draggedElementIndex: null,
      dropzoneIndex: null,
      dragStartPosition: { x: 0, y: 0 },
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
      'insertElementAtIndex',
      'removeElement', 
      'selectElement',
      'updateElementData',
      'selectSectionTemplate'
    ]),

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
    
    // Add element at specific index
    addElementToCanvas(element, insertIndex = null) {
      // If we have an insertion index, use it
      if (insertIndex !== null) {
        this.$store.dispatch('pageBuilder/insertElementAtIndex', {
          element,
          index: insertIndex
        });
      } else {
        // Otherwise add to the end
        this.$store.dispatch('pageBuilder/addElementToCanvas', element);
      }
      
      // Reset insertion index
      this.activeInsertionIndex = null;
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
    
    addSectionTemplate(template, insertIndex = null) {
      // If we have an insertion index, use it
      if (insertIndex !== null) {
        this.$store.dispatch('pageBuilder/insertSectionTemplateAtIndex', {
          template,
          index: insertIndex
        });
      } else {
        this.selectSectionTemplate(template);
      }
      
      // Reset insertion index
      this.activeInsertionIndex = null;
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
      const dropzones = document.querySelectorAll('.insertion-zone');
      
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
        let index = 0; // Default to top position
        
        if (closestDropzone.dataset.dropzoneIndex !== undefined) {
          // This is a dropzone after an element
          index = parseInt(closestDropzone.dataset.dropzoneIndex, 10);
        }
        
        // Set the dropzone index - this is the index where the element will be inserted
        this.setDropzoneIndex(index);
        
        // Also update hovered index for visual feedback
        // The hoveredInsertionIndex corresponds to insertion points (between elements)
        // Dropzone 0 means insert after element 0, but hoveredInsertionIndex 0 means insert at the top
        const hoveredIndex = index === -1 ? 0 : index + 1;
        this.hoveredInsertionIndex = hoveredIndex;
      } else {
        // If no reasonable dropzone found, reset
        this.dropzoneIndex = null;
        this.hoveredInsertionIndex = null;
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
      this.hoveredInsertionIndex = null;
    },
    
    moveElement(fromIndex, toIndex) {
      // Validate indices
      if (fromIndex < 0 || fromIndex >= this.canvasElements.length) {
        return;
      }
      
      // If trying to drop at the same position, do nothing
      if (fromIndex === toIndex) {
        return;
      }
      
      // Create a new array with the elements in the new order
      const newElements = [...this.canvasElements];
      const elementToMove = {...newElements[fromIndex]};
      
      // Remove the element from its original position
      newElements.splice(fromIndex, 1);
      
      // Insert it at the new position - if toIndex is after fromIndex, 
      // we need to adjust because the removal shifted everything up
      const adjustedToIndex = toIndex > fromIndex ? toIndex - 1 : toIndex;
      
      // Insert at the adjusted position
      newElements.splice(adjustedToIndex, 0, elementToMove);
      
      // Update the store with the entire new array
      this.$store.commit('pageBuilder/SET_CANVAS_ELEMENTS', newElements);
      
      // Update selection if needed
      if (this.selectedElementIndex === fromIndex) {
        this.selectElement(adjustedToIndex);
      } else if (this.selectedElementIndex > fromIndex && this.selectedElementIndex <= adjustedToIndex) {
        this.selectElement(this.selectedElementIndex - 1);
      } else if (this.selectedElementIndex < fromIndex && this.selectedElementIndex >= adjustedToIndex) {
        this.selectElement(this.selectedElementIndex + 1);
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

/* Enhanced insertion zone styles */
.insertion-zone {
  height: 28px;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 4px 0;
  padding: 0;
  width: 100%;
}

.insertion-line {
  width: 90%;
  height: 2px;
  background-color: #d1d5db; /* gray-300 */
  transition: all 0.2s ease;
  border-radius: 1px;
  opacity: 0;
}

/* Only show the line for the specific insertion zone being hovered */
.insertion-zone:hover .insertion-line {
  opacity: 1;
  height: 2px;
  background-color: #9ca3af; /* gray-400 */
}

.insertion-zone.active .insertion-line {
  opacity: 1;
  height: 3px;
  background-color: #3b82f6; /* blue-500 */
}

.insertion-button {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  top: 50%;
  transform: translateY(-50%); /* Center vertically */
}

.insertion-zone:hover .insertion-button {
  opacity: 1;
}

.insertion-button:hover {
  transform: translateY(-50%) scale(1.2); /* Keep vertical centering while scaling */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6; /* blue-500 */
}

/* When the insertion point is active */
.insertion-zone.active .insertion-button {
  opacity: 1;
  background-color: #3b82f6; /* blue-500 */
}

.insertion-zone.active .insertion-button svg {
  color: white;
}

/* When dragging - only show the active dropzone */
.is-dragging .insertion-zone .insertion-line {
  opacity: 0; 
}

.is-dragging .insertion-zone.active .insertion-line {
  opacity: 1;
  height: 3px;
  background-color: #3b82f6; /* blue-500 */
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

/* Section item hover effect */
.section-item {
  position: relative;
  transition: all 0.2s ease;
}

.section-item:hover {
  background-color: rgba(59, 130, 246, 0.1);
}
</style>