<template>
  <div class="page-builder flex h-screen">
    <!-- Left Sidebar for Sections -->
    <div class="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
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
          class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center"
          @click="selectSection(section)"
        >
          <div class="bg-blue-100 text-blue-500 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <component :is="section.icon" class="w-5 h-5" />
          </div>
          <span>{{ section.name }}</span>
        </div>
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
              class="dropzone w-full my-1 border-2 border-transparent"
              :class="{'border-blue-500': dropzoneIndex === -1}"
              @mouseenter="setDropzoneIndex(-1)"
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
                @select="selectElementFromCanvas(index)"
                @delete="removeElement(index)"
                @dragstart="startDrag($event, index)"
                :class="{'opacity-50': isDragging && draggedElementIndex === index}"
              />
              
              <!-- Dropzone indicator after this element -->
              <div 
                v-show="isDragging && draggedElementIndex !== index" 
                class="dropzone w-full my-1 border-2 border-transparent"
                :class="{'border-blue-500': dropzoneIndex === index}"
                @mouseenter="setDropzoneIndex(index)"
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
            We use Perspective
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
    
    <!-- Drag ghost element (follows cursor when dragging) -->
    <div 
      v-show="isDragging" 
      ref="dragGhost"
      class="fixed pointer-events-none bg-white shadow-xl border border-blue-500 rounded p-2 z-50 opacity-80"
      :style="{ top: dragGhostPosition.y + 'px', left: dragGhostPosition.x + 'px', width: '200px' }"
    >
      <div v-if="draggedElementIndex !== null && canvasElements[draggedElementIndex]" class="text-sm font-medium">
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

export default {
  name: 'PageBuilder',
  components: {
    HeadingElement,
    TextElement,
    BulletElement,
    FeatureElement,
    TextFormatControls
  },
  data() {
    return {
      showElementSelector: false,
      sidebarTitle: 'Add section',
      selectedElementIndex: null,
      canvasElements: [],
      // Drag and drop state
      isDragging: false,
      draggedElementIndex: null,
      dropzoneIndex: null,
      dragStartY: 0,
      dragGhostPosition: { x: 0, y: 0 },
      sections: [
        { name: 'Hero', icon: 'HeroIcon' },
        { name: 'Product', icon: 'ProductIcon' },
        { name: 'Call to action', icon: 'CtaIcon' },
        { name: 'About us', icon: 'AboutIcon' },
        { name: 'Quiz', icon: 'QuizIcon' },
        { name: 'Team', icon: 'TeamIcon' },
        { name: 'Testimonials', icon: 'TestimonialsIcon' },
        { name: 'Trust', icon: 'TrustIcon' }
      ],
      basicElements: [
        { 
          name: 'Heading', 
          icon: 'HeadingIcon',
          component: 'HeadingElement',
          data: { 
            text: 'Your Heading', 
            level: 1,
            fontSize: 'text-2xl',
            isBold: true,
            isItalic: false,
            isUnderline: false,
            textAlign: 'left',
            textColor: '#000000'
          } 
        },
        { 
          name: 'Text Block', 
          icon: 'TextIcon',
          component: 'TextElement',
          data: { 
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
            fontSize: 'text-base',
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textAlign: 'left',
            textColor: '#000000'
          } 
        },
        { 
          name: 'Bullet List', 
          icon: 'BulletIcon',
          component: 'BulletElement',
          data: { 
            items: ['Item 1', 'Item 2', 'Item 3'],
            fontSize: 'text-base',
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textAlign: 'left',
            textColor: '#000000'
          } 
        }
      ],
      interactiveElements: [
        { 
          name: 'Feature Block', 
          icon: 'FeatureIcon',
          component: 'FeatureElement',
          data: { 
            title: 'Feature Title', 
            description: 'Feature description goes here',
            imageUrl: '/placeholder.jpg',
            fontSize: 'text-base',
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textAlign: 'left',
            textColor: '#000000'
          } 
        }
      ]
    };
  },
  methods: {
    openElementSelector() {
      this.showElementSelector = true;
      this.sidebarTitle = 'Add elements';
    },
    selectSection(section) {
      // Logic to select a section
      console.log('Selected section:', section);
    },
    addElementToCanvas(element) {
      this.canvasElements.push({
        component: element.component,
        data: JSON.parse(JSON.stringify(element.data)) // Create a deep copy
      });
      this.showElementSelector = false;
      this.sidebarTitle = 'Add section';
    },
    selectElementFromCanvas(index) {
      this.selectedElementIndex = index;
    },
    removeElement(index) {
      this.canvasElements.splice(index, 1);
      if (this.selectedElementIndex === index) {
        this.selectedElementIndex = null;
      } else if (this.selectedElementIndex > index) {
        this.selectedElementIndex--;
      }
    },
    updateElementData(updatedData) {
      if (this.selectedElementIndex !== null) {
        this.canvasElements[this.selectedElementIndex].data = updatedData;
      }
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
        'FeatureElement': 'Feature Block'
      };
      return elementMap[componentName] || 'Element';
    },
    // Drag and drop methods
    startDrag(event, index) {
      // Save the starting position
      this.isDragging = true;
      this.draggedElementIndex = index;
      this.dragStartY = event.clientY;
      
      // Initialize the ghost element position
      this.updateDragGhostPosition(event.clientX, event.clientY);
      
      // Add event listeners for drag movement and drop
      document.addEventListener('mousemove', this.handleDragMove);
      document.addEventListener('mouseup', this.handleDragEnd);
      
      // Prevent default text selection and other browser behaviors
      event.preventDefault();
      
      // Add a class to the body to indicate dragging state
      document.body.classList.add('is-dragging');
    },
    
    handleDragMove(event) {
      if (!this.isDragging) return;
      
      // Update the visual ghost element that follows the cursor
      this.updateDragGhostPosition(event.clientX, event.clientY);
      
      // The dropzone indicators already handle their hover state through mouseenter events
    },
    
    updateDragGhostPosition(x, y) {
      // Position the ghost element slightly offset from the cursor
      this.dragGhostPosition = {
        x: x + 15,
        y: y - 15
      };
    },
    
    setDropzoneIndex(index) {
      this.dropzoneIndex = index;
    },
    
    handleDragEnd() {
      if (!this.isDragging) return;
      
      // Move the element to the new position if a dropzone was selected
      if (this.dropzoneIndex !== null) {
        this.moveElement(this.draggedElementIndex, this.dropzoneIndex);
      }
      
      // Clean up
      this.isDragging = false;
      document.body.classList.remove('is-dragging');
      
      // Remove event listeners
      document.removeEventListener('mousemove', this.handleDragMove);
      document.removeEventListener('mouseup', this.handleDragEnd);
      
      // Reset drag state
      this.draggedElementIndex = null;
      this.dropzoneIndex = null;
    },
    
    moveElement(fromIndex, toIndex) {
      // Don't move if trying to drop at the same position
      if (fromIndex === toIndex) return;
      
      // Handle the special case of dropping above the first element
      if (toIndex === -1) {
        toIndex = 0;
      } else if (fromIndex < toIndex) {
        // If moving down, we insert after the target index
        toIndex += 1;
      }
      
      // Get the element being moved
      const elementToMove = this.canvasElements[fromIndex];
      
      // Create a new array with the element moved to the correct position
      const newElements = [...this.canvasElements];
      newElements.splice(fromIndex, 1);
      newElements.splice(toIndex, 0, elementToMove);
      
      // Update the canvas elements array
      this.canvasElements = newElements;
      
      // Update selected element index if needed
      if (this.selectedElementIndex === fromIndex) {
        this.selectedElementIndex = toIndex;
      } else if (this.selectedElementIndex > fromIndex && this.selectedElementIndex <= toIndex) {
        this.selectedElementIndex--;
      } else if (this.selectedElementIndex < fromIndex && this.selectedElementIndex >= toIndex) {
        this.selectedElementIndex++;
      }
    }
  },
  mounted() {
    // No global events needed on mount - they're added when drag starts
  },
  beforeDestroy() {
    // Clean up any event listeners that might still be active
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);
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

.dropzone:hover, .dropzone.border-blue-500 {
  height: 10px;
  background-color: rgba(59, 130, 246, 0.1);
}

/* Element being dragged */
.is-dragging .element-wrapper {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.element-wrapper {
  position: relative;
}

/* Ghost element animations */
@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.6; }
}

.is-dragging + [ref="dragGhost"] {
  animation: pulse 1.5s infinite;
}

/* Improve the dragging handle appearance */
:deep(.cursor-move) {
  cursor: grab;
}

:deep(.cursor-move:active) {
  cursor: grabbing;
}
</style>