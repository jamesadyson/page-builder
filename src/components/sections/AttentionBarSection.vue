<!-- src/components/sections/AttentionBarSection.vue -->
<template>
    <div class="section-wrapper relative">
      <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex">
        <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded" @click.stop="$emit('delete')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded ml-1 cursor-move" @mousedown.stop="$emit('dragstart', $event)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>
      
      <section 
        class="text-center py-4 px-4 font-bold flex items-center justify-center w-full text-lg group" 
        :class="[sectionData.backgroundColor || 'bg-red-500', sectionData.textColor || 'text-white']"
        @click.stop="selectSection"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span 
  contenteditable="true"
  @blur="updateText"
  @focus="selectField('text')"
  @click.stop="selectField('text')"
  :class="getFieldClasses('text')"
  :style="getFieldStyles('text')"
  :data-debug="JSON.stringify(getFieldClasses('text'))"
>
  {{ sectionData.text }}
</span>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AttentionBarSection',
    props: {
      sectionData: {
        type: Object,
        required: true
      }
    },
    data() {
  return {
    selectedField: null,
    // Add this to help track format updates
    lastFormatUpdate: Date.now()
  };
},

watch: {
  'sectionData.textFormat': {
    deep: true,
    immediate: true,
    handler(newValue) {
      console.log('AttentionBarSection: textFormat changed:', newValue);
      this.lastFormatUpdate = Date.now();
    }
  },
  sectionData: {
    deep: true,
    handler() {
      console.log('AttentionBarSection: sectionData changed');
      this.lastFormatUpdate = Date.now();
    }
  }
},

    methods: {
      // General section selection
      selectSection() {
        this.$emit('select', this.sectionData);
        this.selectedField = null;
      },
      
      // Field-specific selection method
      selectField(fieldName) {
        this.selectedField = fieldName;
        
        // Emit event with field information for parent
        this.$emit('select-field', {
          fieldPath: fieldName,
          fieldName: fieldName,
          formatOverrides: this.getFieldFormatOverrides(fieldName)
        });
      },
      
      // Get any format overrides for a specific field
      getFieldFormatOverrides(fieldName) {
        // If the section has field-specific format data, return it
        if (this.sectionData[`${fieldName}Format`]) {
          return this.sectionData[`${fieldName}Format`];
        }
        
        // Return field-specific default formatting
        const defaults = {
          text: {
            fontSize: 'text-lg',
            isBold: true
          }
        };
        
        return defaults[fieldName] || {};
      },
      
      // Style handling for fields
      getFieldClasses(fieldName) {
  // Force reactivity updates
  const timestamp = this.lastFormatUpdate;
  
  // Start with basic selection classes
  const classes = {
    'field-selected': this.selectedField === fieldName,
    'field-editable': true
  };
  
  // Add format classes from section data
  const formatKey = fieldName + 'Format';
  
  // Log the actual data to see what's happening
  console.log('AttentionBarSection formats:', JSON.stringify(this.sectionData));
  
  if (this.sectionData && this.sectionData[formatKey]) {
    const format = this.sectionData[formatKey];
    
    // Check if format is a reactive object and handle it accordingly
    if (format.hasOwnProperty('fontSize')) classes[format.fontSize] = true;
    if (format.hasOwnProperty('textAlign')) classes['text-' + format.textAlign] = true;
    if (format.hasOwnProperty('isBold') && format.isBold) classes['font-bold'] = true;
    if (format.hasOwnProperty('isItalic') && format.isItalic) classes['italic'] = true;
    if (format.hasOwnProperty('isUnderline') && format.isUnderline) classes['underline'] = true;
    if (format.hasOwnProperty('lineHeight')) classes[format.lineHeight] = true;
    if (format.hasOwnProperty('letterSpacing')) classes[format.letterSpacing] = true;
  }
  
  console.log('Returning classes:', classes);
  return classes;
},
  
      getFieldStyles(fieldName) {
        const styles = {};
        
        // Add text color if available
        const formatKey = fieldName + 'Format';
        if (this.sectionData[formatKey] && this.sectionData[formatKey].textColor) {
          styles.color = this.sectionData[formatKey].textColor;
        }
        
        return styles;
      },
      
      // Update methods for each field
      updateText(event) {
        this.sectionData.text = event.target.textContent;
        this.$emit('select', this.sectionData);
      }
    }
  };
  </script>
  
  <style scoped>
  .section-wrapper {
    position: relative;
  }
  
  [contenteditable] {
    outline: none;
  }
  
  [contenteditable]:hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  
  [contenteditable]:focus {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }
  
  .field-selected {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7), 0 0 0 4px rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  </style>