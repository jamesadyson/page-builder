<template>
  <div class="page-builder flex flex-col h-screen">
    <!-- Full-width header with Layout and Add buttons -->
    <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <button 
          class="px-3 py-1.5 text-sm rounded hover:bg-gray-100 flex items-center"
          @click="showLayoutView"
          :class="{ 'bg-blue-100 text-blue-600': currentSidebarView === 'layout' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Layout
        </button>
        <button 
          class="px-3 py-1.5 text-sm rounded hover:bg-gray-100 flex items-center"
          @click="toggleSidebarView('elements')"
          :class="{ 'bg-blue-100 text-blue-600': currentSidebarView === 'elements' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
      <div class="flex space-x-2">
        <button class="px-3 py-1 border border-gray-300 rounded text-sm">Preview</button>
        <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">Publish</button>
      </div>
    </div>
      
    <!-- Main content area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <div 
        class="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto relative"
        :class="{ 'sidebar-highlight': sidebarHighlighted }"
      >
        <!-- Layout Sidebar -->
        <layout-sidebar 
          v-if="currentSidebarView === 'layout' && selectedElementIndex === null"
          :canvas-elements="canvasElements"
          :selected-element-index="selectedElementIndex"
          @select-element="selectElementAndScroll"
          @remove-element="removeElement"
          @move-element="moveElement"
          @add-section="toggleSidebarView('elements')"
        />
          
        <!-- Elements Sidebar -->
        <elements-sidebar
          v-if="currentSidebarView === 'elements'"
          :sections="sections"
          :active-section-type="activeSectionType"
          :active-section-templates="activeSectionTemplates"
          :show-secondary-sidebar="showSecondarySidebar"
          @select-section="selectSection"
          @section-hover="handleSectionHover"
          @section-leave="handleSectionLeave"
          @secondary-sidebar-enter="handleSecondarySidebarEnter"
          @secondary-sidebar-leave="handleSecondarySidebarLeave"
          @close-secondary="toggleSecondarySidebar(false)"
          @select-template="insertSectionTemplate"
        />
  
        <!-- Element Settings -->
  <element-settings
  v-if="selectedElementIndex !== null && currentSidebarView === 'layout'"
  :element="canvasElements[selectedElementIndex]"
  :element-index="selectedElementIndex"
  :active-field="activeFieldForEditing"
  @update="handleFormatUpdate"
  @reset-field="activeFieldForEditing = null"
/>
      </div>

      <!-- Main Canvas Area -->
      <canvas-area
        :canvas-elements="canvasElements"
        :selected-element-index="selectedElementIndex"
        :hovered-insertion-index="hoveredInsertionIndex"
        :is-dragging="isDragging"
        :dragged-element-index="draggedElementIndex"
        @canvas-click="handleCanvasClick"
        @select-element="selectElementFromCanvas"
        @select-field="selectFieldFromCanvas"
        @remove-element="removeElement"
        @dragstart="startDrag"
        @set-hovered-insertion="setHoveredInsertionIndex"
        @clear-hovered-insertion="clearHoveredInsertionIndex"
        @activate-insertion-point="activateInsertionPoint"
        ref="canvasArea"
      />
        
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
  </div>
</template>
  
<script>
import { LayoutSidebar, ElementsSidebar, ElementSettings, CanvasArea } from '@/components/builder';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageBuilder',
  components: {
    LayoutSidebar,
    ElementsSidebar,
    ElementSettings,
    CanvasArea
  },
  data() {
    return {
      // Sidebar view management
      currentSidebarView: 'layout', // 'layout' or 'elements'
      
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
      currentHoveredSection: null,

      // Track which field within a section is being edited
      activeFieldForEditing: null
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
      'getAvailableSections',
      'getActiveSectionTemplates',
      'getCurrentSidebarView'
    ]),
    sections() {
      return this.getAvailableSections || [];
    },
    activeSectionTemplates() {
      return this.getActiveSectionTemplates || [];
    }
  },
  watch: {
    // Watch for store sidebar view changes to keep component in sync
    getCurrentSidebarView: {
      handler(newView) {
        if (newView !== this.currentSidebarView) {
          this.currentSidebarView = newView;
        }
      },
      immediate: true
    }
  },
  methods: {
  ...mapActions('pageBuilder', [
    'removeElement', 
    'selectElement',
    'updateElementData',
    'setSidebarView'
  ]),
  
  // Add this new method
  handleFormatUpdate(data) {
  console.log('PageBuilder: Format update:', data.formatProperty, data.formatValue);
  
  // Use the direct update method
  this.$store.dispatch('pageBuilder/updateFieldFormat', {
    formatProperty: data.formatProperty,
    formatValue: data.formatValue
  });
},

    toggleSidebarView(view) {
      // First update the local state
      this.currentSidebarView = view;
      // Then sync with the store state
      this.setSidebarView(view);
      
      if (view === 'elements') {
        this.highlightSidebar();
      }

      // For layout view, ensure we reset field selection
      if (view === 'layout') {
        this.activeFieldForEditing = null;
      }
    },
    
    showLayoutView() {
      // Always deselect the element when clicking the Layout button in the header
      this.$store.commit('pageBuilder/SET_SELECTED_ELEMENT_INDEX', null);
      this.activeFieldForEditing = null;
      this.toggleSidebarView('layout');
    },
    
    // Deselect the current element and go back to layout view
    deselectElement() {
      this.$store.commit('pageBuilder/SET_SELECTED_ELEMENT_INDEX', null);
      this.activeFieldForEditing = null;
      this.toggleSidebarView('layout');
    },
    
    // Select an element and scroll to it in the canvas
    selectElementAndScroll(index) {
      this.selectElement(index);
      // Reset field selection
      this.activeFieldForEditing = null;
      // Make sure we're in layout view to see settings
      this.toggleSidebarView('layout');
      
      this.$nextTick(() => {
        this.scrollToElement(index);
      });
    },
    
    // Scroll to a specific element
    scrollToElement(index) {
      this.$refs.canvasArea.scrollToElement(index);
    },
    
    // Handle click on canvas - switch to layout view
    handleCanvasClick() {
      if (this.currentSidebarView === 'elements') {
        this.toggleSidebarView('layout');
      }
    },
    
    // Helper for getting element name for drag ghost
    getElementName(componentName) {
      switch(componentName) {
        case 'TestimonialSection': return 'Testimonial';
        case 'HeroSection': return 'Hero';
        case 'FeaturesSection': return 'Features';
        case 'AttentionBarSection': return 'Attention Bar';
        default: return 'Section';
      }
    },
    
    // Select an element from the canvas
    selectElementFromCanvas(index) {
      // First select the element in the store
      this.selectElement(index);
      
      // Reset the active field selection since we're selecting the whole element
      this.activeFieldForEditing = null;
      
      // Then explicitly switch to layout view to show settings
      this.toggleSidebarView('layout');
    },

    // Method to handle selection of a specific field within a section
    selectFieldFromCanvas(index, fieldInfo) {
  console.log('PageBuilder: Field selected:', index, fieldInfo);
  
  // First select the element (section) in the store
  this.selectElement(index);
  
  // Set the active field in the store
  this.$store.dispatch('pageBuilder/setCurrentEditingField', fieldInfo);
  
  // Also keep a local copy for the UI
  this.activeFieldForEditing = fieldInfo;
  
  // Switch to layout view to show settings
  this.toggleSidebarView('layout');
},
        
    // FIXED: Improved method to insert a section template
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
      
      // Reset the active field
      this.activeFieldForEditing = null;
      
      // Force a timeout to ensure DOM updates before changing views
      setTimeout(() => {
        this.toggleSidebarView('layout');
      }, 100);
    },

    // Sidebar highlight animation
    highlightSidebar() {
      this.sidebarHighlighted = true;
      setTimeout(() => {
        this.sidebarHighlighted = false;
      }, 600); // Animation duration
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

    // Toggle secondary sidebar method
    toggleSecondarySidebar(show, sectionType = null) {
      if (show) {
        this.$store.dispatch('pageBuilder/showSecondarySidebar', sectionType);
      } else {
        this.$store.dispatch('pageBuilder/hideSecondarySidebar');
      }
    },
    
    // Section selection methods
    selectSection(section) {
      if (section.type === 'testimonials' || section.type === 'hero' || section.type === 'features' || section.type === 'attentionBars') {
        this.toggleSecondarySidebar(true, section.type);
      } else {
        console.log(`Selected section: ${section.name}`);
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
    if (sectionType === 'testimonials' || 
        sectionType === 'hero' || 
        sectionType === 'features' || 
        sectionType === 'attentionBars' ||
        sectionType === 'callToAction') {
      this.toggleSecondarySidebar(true, sectionType);
    }
  }, this.hoverDelay);
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
      // For up/down arrows in layout view
      if (toIndex < 0 || toIndex > this.canvasElements.length) {
        return; // Invalid target position
      }
      
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
  mounted() {
    // Use the store's sidebar view if already set
    if (this.getCurrentSidebarView) {
      this.currentSidebarView = this.getCurrentSidebarView;
    } else {
      // Otherwise init the store with our default
      this.setSidebarView(this.currentSidebarView);
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
</style>