<template>
    <div class="flex-1 bg-gray-100 overflow-auto flex flex-col" @click="handleCanvasClick">
      <!-- Canvas -->
      <div class="flex-1 p-8 overflow-y-auto" ref="canvasArea">
        <div class="bg-white shadow-sm rounded-md mx-auto max-w-4xl min-h-[600px] relative canvas-container">
          <div v-if="canvasElements.length === 0" class="absolute inset-0 flex items-center justify-center">
            <!-- Initial empty state -->
            <button
              @click="handleEmptyStateClick"
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
              @mouseenter="$emit('set-hovered-insertion', 0)"
              @mouseleave="$emit('clear-hovered-insertion')"
              data-index="0"
            >
              <div class="relative flex justify-center w-full">
                <div class="insertion-line"></div>
                <button
                  v-show="hoveredInsertionIndex === 0 && !isDragging"
                  @click="$emit('activate-insertion-point', 0)"
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
              :ref="'element-' + index"
            >
              <!-- The actual element component -->
              <component
                :is="element.component"
                :element-data="element.data"
                :section-data="element.data"
                @select="$emit('select-element', index)"
                @select-field="$emit('select-field', index, $event)"
                @delete="$emit('remove-element', index)"
                @dragstart="$emit('dragstart', $event, index)"
                :class="{'opacity-50': isDragging && draggedElementIndex === index}"
              />
              
              <!-- Insertion zone after this element (index: index+1) -->
              <div 
                class="insertion-zone w-full"
                :class="{'active': hoveredInsertionIndex === index + 1}"
                @mouseenter="$emit('set-hovered-insertion', index + 1)"
                @mouseleave="$emit('clear-hovered-insertion')"
                :data-index="index + 1"
              >
                <div class="relative flex justify-center w-full">
                  <div class="insertion-line"></div>
                  <button
                    v-show="hoveredInsertionIndex === index + 1 && !isDragging"
                    @click="$emit('activate-insertion-point', index + 1)"
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
                @click="handleAddButtonClick"
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
    </div>
  </template>
  
  <script>
  export default {
    name: 'CanvasArea',
    props: {
      canvasElements: {
        type: Array,
        required: true
      },
      selectedElementIndex: {
        type: Number,
        default: null
      },
      hoveredInsertionIndex: {
        type: Number,
        default: null
      },
      isDragging: {
        type: Boolean,
        default: false
      },
      draggedElementIndex: {
        type: Number,
        default: null
      }
    },
    methods: {
      // Handle canvas click event
      handleCanvasClick(event) {
        if (event.target.classList.contains('canvas-container') ||
            event.target.closest('.canvas-container') === event.target) {
          this.$emit('canvas-click');
        }
      },
      
      // Handle empty state click
      handleEmptyStateClick() {
        this.$emit('activate-insertion-point', 0);
      },
      
      // Handle add button click
      handleAddButtonClick() {
        this.$emit('activate-insertion-point', this.canvasElements.length);
      },
      
      // Scroll to a specific element - used by parent
      scrollToElement(index) {
        const elementRef = this.$refs[`element-${index}`];
        if (elementRef && elementRef[0]) {
          const canvasEl = this.$refs.canvasArea;
          const element = elementRef[0];
          
          // Scroll with smooth behavior
          canvasEl.scrollTo({
            top: element.offsetTop - 100, // Offset to show some content above
            behavior: 'smooth'
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>