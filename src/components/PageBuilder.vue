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
      <div class="flex-1 p-8 overflow-y-auto">
        <div class="bg-white shadow-sm rounded-md mx-auto max-w-4xl min-h-[600px] relative">
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
            <!-- Render canvas elements -->
            <component
              v-for="(element, index) in canvasElements"
              :key="index"
              :is="element.component"
              :element-data="element.data"
              @select="selectElementFromCanvas(index)"
              @delete="removeElement(index)"
            />
            
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
            fontSize: null,
            isBold: false,
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
    }
  }
};
</script>

<style scoped>
/* Optional: Add smooth transitions for a better UX */
.page-builder .fade-enter-active, 
.page-builder .fade-leave-active {
  transition: opacity 0.3s;
}
.page-builder .fade-enter, 
.page-builder .fade-leave-to {
  opacity: 0;
}
</style>