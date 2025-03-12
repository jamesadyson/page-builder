<!-- src/components/PageBuilder.vue -->
<template>
<div class="page-builder flex flex-col h-screen">
    <!-- Full-width header with Layout and Add buttons -->
    <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <button 
          class="px-3 py-1.5 text-sm rounded hover:bg-gray-100 flex items-center"
          @click="toggleSidebarView('layout')"
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
      <!-- Left Sidebar without the title and navigation buttons -->
      <div 
        class="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto relative"
        :class="{ 'sidebar-highlight': sidebarHighlighted }"
      >
        <!-- Layout View - Shows sections already added to the page -->
        <div v-if="currentSidebarView === 'layout'">
          <div class="p-4">
            <div v-if="canvasElements.length === 0" class="text-center py-8">
              <p class="text-gray-500 mb-4">No sections added to your page yet</p>
              <button 
                @click="toggleSidebarView('elements')" 
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
                @click="selectElementFromCanvas(index)"
              >
                <div class="flex items-center justify-between">
                  <!-- Section title based on component type -->
                  <div class="flex items-center">
                    <div class="h-6 w-6 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                      <SectionIcon :type="element.component" class="h-4 w-4 text-gray-600" />
                    </div>
                    <span class="text-sm font-medium">{{ getSectionName(element, index) }}</span>
                  </div>
                  
                  <!-- Actions -->
                  <div class="flex items-center space-x-1">
                    <button class="p-1 text-gray-400 hover:text-gray-600" @click.stop="moveElement(index, index - 1)" :disabled="index === 0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'opacity-50': index === 0 }">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                    <button class="p-1 text-gray-400 hover:text-gray-600" @click.stop="moveElement(index, index + 2)" :disabled="index === canvasElements.length - 1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'opacity-50': index === canvasElements.length - 1 }">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                    <button class="p-1 text-gray-400 hover:text-red-600" @click.stop="removeElement(index)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Add new element button -->
              <button 
                @click="toggleSidebarView('elements')" 
                class="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-300 hover:text-blue-600 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Section
              </button>
            </div>
          </div>
        </div>
      
        
        <!-- Elements View - Shows available elements and sections to add -->
        <div v-if="currentSidebarView === 'elements'">
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
      </div>

      <!-- Main Canvas Area - now without its own header -->
      <div class="flex-1 bg-gray-100 overflow-auto flex flex-col" @click="handleCanvasClick">
        <!-- Canvas -->
        <div class="flex-1 p-8 overflow-y-auto" ref="canvasArea">
          <div class="bg-white shadow-sm rounded-md mx-auto max-w-4xl min-h-[600px] relative canvas-container">
            <div v-if="canvasElements.length === 0" class="absolute inset-0 flex items-center justify-center">
              <!-- Initial empty state -->
              <button
                @click="activateInsertionPoint(0); toggleSidebarView('elements')"
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
                    @click="activateInsertionPoint(0); toggleSidebarView('elements')"
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
                      @click="activateInsertionPoint(index + 1); toggleSidebarView('elements')"
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
                  @click="activateInsertionPoint(canvasElements.length); toggleSidebarView('elements')"
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
import HeroSection from '@/components/sections/HeroSection.vue';
import SecondarySidebar from '@/components/SecondarySidebar.vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import SectionIcon from '@/components/SectionIcon.vue';

export default {
  name: 'PageBuilder',
  components: {
    HeadingElement,
    TextElement,
    BulletElement,
    FeatureElement,
    TextFormatControls,
    TestimonialSection,
    HeroSection,
    SecondarySidebar,
    SectionIcon
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

    // Toggle between layout and elements views
    toggleSidebarView(view) {
      this.currentSidebarView = view;
      if (view === 'elements') {
        this.highlightSidebar();
      }
    },
    
    // Handle click on canvas - switch to layout view
    handleCanvasClick(event) {
      // Only switch if we're in elements view and clicking on the canvas background
      // (not on an element or insertion point)
      if (this.currentSidebarView === 'elements' && 
          event.target.classList.contains('canvas-container') ||
          event.target.closest('.canvas-container') === event.target) {
        this.currentSidebarView = 'layout';
      }
    },
    
    // Get section name for layout view
    getSectionName(element, index) {
      if (element.component === 'TestimonialSection') {
        return `Testimonials ${index + 1}`;
      } else if (element.component === 'HeroSection') {
        return `Hero ${index + 1}`;
      } else if (element.component === 'HeadingElement') {
        return `Heading: ${element.data.text.substring(0, 15)}${element.data.text.length > 15 ? '...' : ''}`;
      } else if (element.component === 'TextElement') {
        return `Text Block ${index + 1}`;
      } else if (element.component === 'BulletElement') {
        return `List Block ${index + 1}`;
      } else if (element.component === 'FeatureElement') {
        return `Feature: ${element.data.title.substring(0, 15)}${element.data.title.length > 15 ? '...' : ''}`;
      } else {
        return `Section ${index + 1}`;
      }
    },
    
    // Method to insert an element at a specific position
    insertElement(element, index) {
      this.$store.dispatch('pageBuilder/insertElementAtIndex', {
        element,
        index
      });
      
      // Reset active insertion index and switch to layout view
      this.activeInsertionIndex = null;
      this.currentSidebarView = 'layout';
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
      
      // Reset insertion index, hide the sidebar, and switch to layout view
      this.activeInsertionIndex = null;
      this.toggleSecondarySidebar(false);
      this.currentSidebarView = 'layout';
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
        if (sectionType === 'testimonials' || sectionType === 'hero') {
          this.toggleSecondarySidebar(true, sectionType);
        }
      }, this.hoverDelay);
    },
    
    selectSection(section) {
      // If we have templates for this section type, show them
      if (section.type === 'testimonials' || section.type === 'hero') {
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
        case 'HeroSection': return 'Hero';
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
    // When the page first loads, check if we should switch to elements view
    // If no elements on the canvas, stay in layout view to show empty state
    // Otherwise you could auto-switch to elements if needed:
    // if (this.canvasElements.length === 0) {
    //   this.toggleSidebarView('elements');
    // }
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