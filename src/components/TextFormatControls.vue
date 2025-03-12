<template>
  <div class="text-format-controls p-1">
    <!-- Field selection for sections -->
    <div v-if="isSectionElement && activeField" class="mb-6">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Editing Field</h3>
      <div class="py-2 px-3 bg-blue-50 text-blue-700 rounded-md border border-blue-200 flex items-center justify-between">
        <div>
          <span class="font-medium">{{ getFieldLabel() }}</span>
        </div>
        <button 
          @click="resetFieldSelection"
          class="p-1 hover:bg-blue-100 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Font Size Controls -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Text</h3>
      <div class="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          v-for="size in ['XS', 'S', 'M', 'L', 'XL']" 
          :key="size"
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[getFieldFormatValue('fontSize') === sizeMap[size] ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateFontSize(sizeMap[size])"
        >
          {{ size }}
        </button>
        <button class="flex-1 py-2 px-3 rounded-md text-center text-gray-500 hover:bg-gray-200" @click="showAdvancedSizes = !showAdvancedSizes">
          ...
        </button>
      </div>
      
      <!-- Advanced Font Sizes Dropdown -->
      <div v-if="showAdvancedSizes" class="mt-2 p-2 bg-white border border-gray-200 rounded-md shadow-sm">
        <div class="grid grid-cols-3 gap-1">
          <button 
            v-for="(label, value) in advancedSizes" 
            :key="value"
            class="py-1 px-2 text-sm rounded hover:bg-gray-100 text-center"
            :class="[getFieldFormatValue('fontSize') === value ? 'bg-blue-50 text-blue-500' : 'text-gray-700']"
            @click="updateFontSize(value)">
            {{ label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Line Height Controls -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Line Height</h3>
      <div class="relative">
        <button 
          class="w-full flex items-center justify-between bg-gray-100 rounded-lg p-3 hover:bg-gray-200"
          @click="showLineHeightDropdown = !showLineHeightDropdown">
          <span>{{ getLineHeightLabel() }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <!-- Line Height Dropdown -->
        <div v-if="showLineHeightDropdown" class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
          <button 
            v-for="(label, value) in lineHeights" 
            :key="value"
            class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors"
            :class="[getFieldFormatValue('lineHeight') === value ? 'bg-blue-50 text-blue-500' : 'text-gray-700']"
            @click="updateLineHeight(value)">
            {{ label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Letter Spacing Controls -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Letter Spacing</h3>
      <div class="relative">
        <button 
          class="w-full flex items-center justify-between bg-gray-100 rounded-lg p-3 hover:bg-gray-200"
          @click="showLetterSpacingDropdown = !showLetterSpacingDropdown">
          <span>{{ getLetterSpacingLabel() }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <!-- Letter Spacing Dropdown -->
        <div v-if="showLetterSpacingDropdown" class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
          <button 
            v-for="(label, value) in letterSpacings" 
            :key="value"
            class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors"
            :class="[getFieldFormatValue('letterSpacing') === value ? 'bg-blue-50 text-blue-500' : 'text-gray-700']"
            @click="updateLetterSpacing(value)">
            {{ label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Text Formatting Controls -->
    <div class="mb-4">
      <div class="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[getFieldFormatValue('isBold') ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="toggleBold()">
          <span class="font-bold">B</span>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[getFieldFormatValue('isItalic') ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="toggleItalic()">
          <span class="italic">I</span>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[getFieldFormatValue('isUnderline') ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="toggleUnderline()">
          <span class="underline">U</span>
        </button>
      </div>
    </div>

    <!-- Text Alignment Controls -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Alignment</h3>
      <div class="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          class="flex-1 py-2 px-3 rounded-md flex justify-center transition-colors"
          :class="[getFieldFormatValue('textAlign') === 'left' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateAlignment('left')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md flex justify-center transition-colors"
          :class="[getFieldFormatValue('textAlign') === 'center' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateAlignment('center')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M7 12h10M4 18h16" />
          </svg>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md flex justify-center transition-colors"
          :class="[getFieldFormatValue('textAlign') === 'right' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateAlignment('right')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Text Color Picker -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Text Color</h3>
      <div class="relative">
        <button 
          class="w-full flex items-center justify-between bg-gray-100 rounded-lg p-3 hover:bg-gray-200"
          @click="showColorPicker = !showColorPicker">
          <span>Select color</span>
          <div class="h-6 w-6 rounded-full border border-gray-300" :style="{ backgroundColor: getFieldFormatValue('textColor') }"></div>
        </button>
        
        <!-- Color Picker Dropdown -->
        <div v-if="showColorPicker" class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
          <div class="grid grid-cols-5 gap-2">
            <button 
              v-for="color in colors" 
              :key="color.value"
              class="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :style="{ backgroundColor: color.value }"
              :title="color.name"
              @click="updateTextColor(color.value)">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextFormatControls',
  props: {
    elementData: {
      type: Object,
      required: true
    },
    activeField: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showAdvancedSizes: false,
      showColorPicker: false,
      showLineHeightDropdown: false,
      showLetterSpacingDropdown: false,
      sizeMap: {
        'XS': 'text-xs',
        'S': 'text-sm',
        'M': 'text-base',
        'L': 'text-lg',
        'XL': 'text-xl'
      },
      advancedSizes: {
        'text-xs': 'XS',
        'text-sm': 'S',
        'text-base': 'M',
        'text-lg': 'L',
        'text-xl': 'XL',
        'text-2xl': '2XL',
        'text-3xl': '3XL',
        'text-4xl': '4XL',
        'text-5xl': '5XL',
        'text-6xl': '6XL',
      },
      lineHeights: {
        'leading-none': 'None (1)',
        'leading-tight': 'Tight (1.25)',
        'leading-snug': 'Snug (1.375)',
        'leading-normal': 'Normal (1.5)',
        'leading-relaxed': 'Relaxed (1.625)',
        'leading-loose': 'Loose (2)',
      },
      letterSpacings: {
        'tracking-tighter': 'Tighter (-0.05em)',
        'tracking-tight': 'Tight (-0.025em)',
        'tracking-normal': 'Normal (0)',
        'tracking-wide': 'Wide (0.025em)',
        'tracking-wider': 'Wider (0.05em)',
        'tracking-widest': 'Widest (0.1em)',
      },
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Gray', value: '#6B7280' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Yellow', value: '#F59E0B' },
        { name: 'Green', value: '#10B981' },
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'White', value: '#FFFFFF' },
      ]
    };
  },
  computed: {
    // Determine if we're dealing with a section element
    isSectionElement() {
      if (!this.elementData) return false;
      
      // Check if it's one of our section components
      return this.elementData.component === 'HeroSection' || 
             this.elementData.component === 'TestimonialSection' || 
             (this.elementData.data && 
              (this.elementData.data.subheading !== undefined || 
               this.elementData.data.heading !== undefined));
    },

    // Get the appropriate format settings based on type of element
    baseFormatData() {
      if (!this.elementData) return {};
      
      // For basic elements, use their data directly
      if (this.elementData.fontSize !== undefined || 
          this.elementData.textAlign !== undefined ||
          this.elementData.isBold !== undefined) {
        return this.elementData;
      }
      
      // For section elements when no specific field is selected,
      // return default format values
      return {
        fontSize: 'text-base',
        textAlign: 'left',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        textColor: '#000000',
        lineHeight: 'leading-normal',
        letterSpacing: 'tracking-normal'
      };
    },

    // Get the field-specific format data or use section defaults
    fieldFormatData() {
      if (!this.activeField) return this.baseFormatData;
      
      // If we have a field selected, and that field has format data, use it
      const fieldPath = this.activeField.fieldPath;
      const fieldName = this.activeField.fieldName;
      
      // Handle formatting for specific field
      if (fieldPath && this.elementData && this.elementData.data) {
        // Get target object based on the field path
        let targetData = this.elementData.data;
        const pathParts = fieldPath.split('.');
        
        // Navigate to the correct object within the data structure
        for (let i = 0; i < pathParts.length; i++) {
          if (targetData[pathParts[i]] !== undefined) {
            targetData = targetData[pathParts[i]];
          } else {
            // Path not found - use defaults
            return this.baseFormatData;
          }
        }
        
        // Check if this is an object with formatting properties
        // or a direct text value
        if (typeof targetData === 'object' && targetData !== null) {
          // If the object has format properties, use them
          if (targetData.format) {
            return targetData.format;
          }
          
          // If field name is provided, try to get format for that specific field
          if (fieldName && targetData[fieldName] && targetData[fieldName].format) {
            return targetData[fieldName].format;
          }
        }
      }
      
      // If no format data is found for this field, use default format values
      // or section-level format values if available
      const sectionFormatData = {
        fontSize: this.elementData.data.fontSize || 'text-base',
        textAlign: this.elementData.data.textAlign || 'left',
        isBold: this.elementData.data.isBold || false,
        isItalic: this.elementData.data.isItalic || false,
        isUnderline: this.elementData.data.isUnderline || false,
        textColor: this.elementData.data.textColor || '#000000',
        lineHeight: this.elementData.data.lineHeight || 'leading-normal',
        letterSpacing: this.elementData.data.letterSpacing || 'tracking-normal'
      };

      return sectionFormatData;
    }
  },
  methods: {
    // Method to get the format value for a specific field
    getFieldFormatValue(formatProp) {
      // Allow direct override from field object if available
      if (this.activeField && this.activeField.formatOverrides && this.activeField.formatOverrides[formatProp] !== undefined) {
        return this.activeField.formatOverrides[formatProp];
      }
      
      // Otherwise, use the computed field format data
      if (this.fieldFormatData && this.fieldFormatData[formatProp] !== undefined) {
        return this.fieldFormatData[formatProp];
      }
      
      // Fallback defaults
      const defaults = {
        fontSize: 'text-base',
        textAlign: 'left',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        textColor: '#000000',
        lineHeight: 'leading-normal',
        letterSpacing: 'tracking-normal'
      };
      
      return defaults[formatProp];
    },
    
    // Reset the active field selection
    resetFieldSelection() {
      this.$emit('reset-field');
    },
    
    // Format methods that correctly handle fields
    updateFontSize(size) {
      this.updateFormatProperty('fontSize', size);
      this.showAdvancedSizes = false;
    },
    
    toggleBold() {
      this.updateFormatProperty('isBold', !this.getFieldFormatValue('isBold'));
    },
    
    toggleItalic() {
      this.updateFormatProperty('isItalic', !this.getFieldFormatValue('isItalic'));
    },
    
    toggleUnderline() {
      this.updateFormatProperty('isUnderline', !this.getFieldFormatValue('isUnderline'));
    },
    
    updateAlignment(align) {
      this.updateFormatProperty('textAlign', align);
    },
    
    updateTextColor(color) {
      this.updateFormatProperty('textColor', color);
      this.showColorPicker = false;
    },
    
    updateLineHeight(lineHeight) {
      this.updateFormatProperty('lineHeight', lineHeight);
      this.showLineHeightDropdown = false;
    },
    
    updateLetterSpacing(letterSpacing) {
      this.updateFormatProperty('letterSpacing', letterSpacing);
      this.showLetterSpacingDropdown = false;
    },
    
    // Central method to update format properties
    updateFormatProperty(property, value) {
      // Prepare the update object
      let updateData;
      
      if (this.activeField) {
        // For a specific field in a section
        updateData = {
          elementData: this.elementData,
          activeField: this.activeField,
          formatProperty: property,
          formatValue: value
        };
      } else {
        // For regular elements or section-wide changes
        const formatData = { ...this.fieldFormatData };
        formatData[property] = value;
        
        updateData = formatData;
      }
      
      // Update via parent component
      this.$emit('update', updateData);
    },
    
    // Helper labels and status methods
    getLineHeightLabel() {
      const lineHeight = this.getFieldFormatValue('lineHeight');
      if (!lineHeight) {
        return 'Default';
      }
      return this.lineHeights[lineHeight] || 'Default';
    },
    
    getLetterSpacingLabel() {
      const letterSpacing = this.getFieldFormatValue('letterSpacing');
      if (!letterSpacing) {
        return 'Default';
      }
      return this.letterSpacings[letterSpacing] || 'Default';
    },
    
    // Get a human-readable label for the currently active field
    getFieldLabel() {
      if (!this.activeField) return 'None';
      
      // Map field paths to human-readable labels
      const fieldLabels = {
        'heading': 'Heading',
        'subheading': 'Subheading',
        'description': 'Description',
        'buttonText': 'Button Text',
        'testimonials.0.author': 'Testimonial 1 Author',
        'testimonials.0.quote': 'Testimonial 1 Quote',
        'testimonials.1.author': 'Testimonial 2 Author',
        'testimonials.1.quote': 'Testimonial 2 Quote',
      };
      
      // Return the label if available, otherwise use field path
      return fieldLabels[this.activeField.fieldPath] || this.activeField.fieldPath;
    }
  }
};
</script>