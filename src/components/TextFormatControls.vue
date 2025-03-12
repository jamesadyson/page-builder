<template>
  <div class="text-format-controls p-1">
    <!-- Font Size Controls -->
    <div class="mb-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Text</h3>
      <div class="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          v-for="size in ['XS', 'S', 'M', 'L', 'XL']" 
          :key="size"
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[formattableData.fontSize === sizeMap[size] ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateFontSize(sizeMap[size])">
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
            :class="[formattableData.fontSize === value ? 'bg-blue-50 text-blue-500' : 'text-gray-700']"
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
            :class="[formattableData.lineHeight === value ? 'bg-blue-50 text-blue-500' : 'text-gray-700']"
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
            :class="[formattableData.letterSpacing === value ? 'bg-blue-50 text-blue-500' : 'text-gray-700']"
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
          :class="[formattableData.isBold ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="toggleBold()">
          <span class="font-bold">B</span>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[formattableData.isItalic ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="toggleItalic()">
          <span class="italic">I</span>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
          :class="[formattableData.isUnderline ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
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
          :class="[formattableData.textAlign === 'left' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateAlignment('left')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md flex justify-center transition-colors"
          :class="[formattableData.textAlign === 'center' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
          @click="updateAlignment('center')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M7 12h10M4 18h16" />
          </svg>
        </button>
        <button 
          class="flex-1 py-2 px-3 rounded-md flex justify-center transition-colors"
          :class="[formattableData.textAlign === 'right' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
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
          <div class="h-6 w-6 rounded-full border border-gray-300" :style="{ backgroundColor: formattableData.textColor }"></div>
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
    // FIXED: Get the appropriate data object based on component type
    formattableData() {
      // Handle sections differently from basic elements
      if (!this.elementData) return {};
      
      // Basic elements already have the right structure
      if (this.elementData.fontSize !== undefined || 
          this.elementData.textAlign !== undefined ||
          this.elementData.isBold !== undefined) {
        return this.elementData;
      }
      
      // For section elements, we need to adapt them
      // This is a simplified version - you may need to extend this
      // based on which specific field within the section is being edited
      const sectionDefaults = {
        fontSize: 'text-base',
        textAlign: 'left',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        textColor: '#000000',
        lineHeight: 'leading-normal',
        letterSpacing: 'tracking-normal'
      };
      
      // Merge with section data
      return { ...sectionDefaults, ...this.elementData };
    }
  },
  methods: {
    // FIXED: All methods now use formattableData instead of directly accessing elementData
    updateFontSize(size) {
      const updatedData = { ...this.formattableData, fontSize: size };
      this.$emit('update', updatedData);
      this.showAdvancedSizes = false;
    },
    
    toggleBold() {
      const updatedData = { ...this.formattableData, isBold: !this.formattableData.isBold };
      this.$emit('update', updatedData);
    },
    
    toggleItalic() {
      const updatedData = { ...this.formattableData, isItalic: !this.formattableData.isItalic };
      this.$emit('update', updatedData);
    },
    
    toggleUnderline() {
      const updatedData = { ...this.formattableData, isUnderline: !this.formattableData.isUnderline };
      this.$emit('update', updatedData);
    },
    
    updateAlignment(align) {
      const updatedData = { ...this.formattableData, textAlign: align };
      this.$emit('update', updatedData);
    },
    
    updateTextColor(color) {
      const updatedData = { ...this.formattableData, textColor: color };
      this.$emit('update', updatedData);
      this.showColorPicker = false;
    },
    
    updateLineHeight(lineHeight) {
      const updatedData = { ...this.formattableData, lineHeight };
      this.$emit('update', updatedData);
      this.showLineHeightDropdown = false;
    },
    
    updateLetterSpacing(letterSpacing) {
      const updatedData = { ...this.formattableData, letterSpacing };
      this.$emit('update', updatedData);
      this.showLetterSpacingDropdown = false;
    },
    
    getLineHeightLabel() {
      if (!this.formattableData.lineHeight) {
        return 'Default';
      }
      return this.lineHeights[this.formattableData.lineHeight] || 'Default';
    },
    
    getLetterSpacingLabel() {
      if (!this.formattableData.letterSpacing) {
        return 'Default';
      }
      return this.letterSpacings[this.formattableData.letterSpacing] || 'Default';
    }
  }
};
</script>