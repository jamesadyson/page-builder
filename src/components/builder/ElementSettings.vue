<template>
    <div class="p-4">
      <div class="border-b border-gray-200 pb-4 mb-4">
        <h2 class="text-lg font-medium text-gray-800">Element Settings</h2>
        <p class="text-sm text-gray-500">{{ getSectionName() }}</p>
      </div>
      
      <!-- Element specific settings -->
      <text-format-controls 
        v-if="isTextElement()"
       :element-data="element"
        :active-field="activeField"
        @update="updateElementData"
      />
    </div>
  </template>
  
  <script>
  import TextFormatControls from '@/components/TextFormatControls.vue';
  
  export default {
    name: 'ElementSettings',
    components: {
      TextFormatControls
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
  
      // Pass update event to parent
      updateElementData(data) {
        this.$emit('update', data);
      }
    }
  };
  </script>