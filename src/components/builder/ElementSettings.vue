<template>
  <div class="p-4">
    <div class="border-b border-gray-200 pb-4 mb-4">
      <h2 class="text-lg font-medium text-gray-800">Element Settings</h2>
      <p class="text-sm text-gray-500">{{ getSectionName() }}</p>
    </div>
    
    <!-- Element specific settings tabs -->
    <div class="mb-4">
      <div class="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[activeTab === tab.id ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>
    </div>
    
    <!-- Text Formatting Controls when Text tab is active -->
    <text-format-controls 
      v-if="activeTab === 'text' && isTextElement()"
      :element-data="element"
      :active-field="activeField"
      @update="updateElementData"
      @reset-field="resetFieldSelection"
    />
    
    <!-- Background Controls when Background tab is active -->
    <background-controls
      v-if="activeTab === 'background' && isSectionElement()"
      :element="element.data"
      @update="updateBackgroundSettings"
    />
  </div>
</template>

<script>
import TextFormatControls from '@/components/TextFormatControls.vue';
import BackgroundControls from '@/components/BackgroundControls.vue';

export default {
  name: 'ElementSettings',
  components: {
    TextFormatControls,
    BackgroundControls
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    elementIndex: {
      type: Number,
      required: true
    },
    activeField: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 'text',
      tabs: [
        { id: 'text', label: 'Text' },
        { id: 'background', label: 'Background' }
      ]
    };
  },
  methods: {
    // Get section name for display
    getSectionName() {
      const componentName = this.element.component;
      
      if (componentName === 'TestimonialSection') {
        return `Testimonials ${this.elementIndex + 1}`;
      } else if (componentName === 'HeroSection') {
        return `Hero ${this.elementIndex + 1}`;
      } else if (componentName === 'FeaturesSection') {
        return `Features ${this.elementIndex + 1}`;
      } else if (componentName === 'AttentionBarSection') {
        return `Attention Bar ${this.elementIndex + 1}`;
      } else {
        return `Section ${this.elementIndex + 1}`;
      }
    },

    // Helper method for Element Settings panel with better type checking
    isTextElement() {
      if (!this.element) return false;
      
      const componentName = this.element.component;
      
      // Check for section elements that contain text
      if (componentName === 'HeroSection' || 
          componentName === 'TestimonialSection' || 
          componentName === 'FeaturesSection' ||
          componentName === 'AttentionBarSection' ||
          componentName === 'CallToActionSection') {
        if (!this.element.data) return false;
        
        // If we have an active field within the section, show formatting options
        if (this.activeField) {
          return true;
        }
        
        return !!(
          this.element.data.heading || 
          this.element.data.subheading || 
          this.element.data.description ||
          this.element.data.text ||
          this.element.data.buttonText || 
          (this.element.data.testimonials && this.element.data.testimonials.length > 0)
        );
      }
      
      return false;
    },
    
    // Helper method for Background Settings panel
    isSectionElement() {
      if (!this.element) return false;
      
      const componentName = this.element.component;
      
      // Only show background settings for section elements
      return (
        componentName === 'HeroSection' || 
        componentName === 'TestimonialSection' || 
        componentName === 'FeaturesSection' ||
        componentName === 'AttentionBarSection' ||
        componentName === 'CallToActionSection'
      );
    },

    // Pass update event to parent
    updateElementData(data) {
      console.log('ElementSettings: updateElementData called with:', data);
      this.$emit('update', data);
    },
    
    // Handle background settings updates
    updateBackgroundSettings(data) {
      console.log('ElementSettings: updateBackgroundSettings called with:', data);
      this.$emit('update', { backgroundSettings: data });
    },

    resetFieldSelection() {
      this.$emit('reset-field');
    }
  }
};
</script>