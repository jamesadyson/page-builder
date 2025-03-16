<!-- src/components/sections/FeaturesSection.vue -->
<template>
    <div class="section-wrapper relative">
      <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
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
      
      <section class="py-16 group" @click.stop="selectSection">
        <div class="container px-4 mx-auto max-w-4xl">
          <div class="mb-8 max-w-3xl mx-auto">
            <h2 
              class="text-center font-bold w-full max-w-md md:max-w-2xl lg:max-w-3xl md:leading-tight lg:leading-[1.1] text-3xl md:text-4xl lg:text-5xl tracking-[-0.7px] md:tracking-[-1px] lg:tracking-[-1.3px] text-gray-950 mx-auto break-words mb-4"
              contenteditable="true"
              @blur="updateHeading"
              @focus="selectField('heading')"
              @click.stop="selectField('heading')"
              :class="getFieldClasses('heading')"
              :style="getFieldStyles('heading')">
              {{ sectionData.heading }}
            </h2>
            <p 
              class="mb-6 text-base md:text-lg text-gray-700 font-medium max-w-2xl mx-auto text-center"
              contenteditable="true"
              @blur="updateSubheading"
              @focus="selectField('subheading')"
              @click.stop="selectField('subheading')"
              :class="getFieldClasses('subheading')"
              :style="getFieldStyles('subheading')">
              {{ sectionData.subheading }}
            </p>
          </div>
          <div class="flex flex-wrap max-w-2xl w-full mx-auto">
            <div 
              v-for="(feature, index) in sectionData.features" 
              :key="index" 
              class="w-full p-4"
            >
              <div class="flex flex-wrap -m-1.5">
                <div class="w-auto p-1.5">
                  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 28.5C22.232 28.5 28.5 22.232 28.5 14.5C28.5 6.76801 22.232 0.5 14.5 0.5C6.76801 0.5 0.5 6.76801 0.5 14.5C0.5 22.232 6.76801 28.5 14.5 28.5ZM20.9874 12.2374C21.6709 11.554 21.6709 10.446 20.9874 9.76256C20.304 9.07915 19.196 9.07915 18.5126 9.76256L12.75 15.5251L10.4874 13.2626C9.80402 12.5791 8.69598 12.5791 8.01256 13.2626C7.32915 13.946 7.32915 15.054 8.01256 15.7374L11.5126 19.2374C12.196 19.9209 13.304 19.9209 13.9874 19.2374L20.9874 12.2374Z" fill="#5E27FF"></path>
                  </svg>
                </div>
                <div class="flex-1 p-1.5">
                  <h3 
                    class="mb-1 text-lg font-semibold tracking-tight"
                    contenteditable="true"
                    @blur="updateFeatureTitle(index, $event)"
                    @focus="selectField(`features.${index}.title`)"
                    @click.stop="selectField(`features.${index}.title`)"
                    :class="getFieldClasses(`features.${index}.title`)"
                    :style="getFieldStyles(`features.${index}.title`)">
                    {{ feature.title }}
                  </h3>
                  <p 
                    class="tracking-tight text-base/[1.6]"
                    contenteditable="true"
                    @blur="updateFeatureDescription(index, $event)"
                    @focus="selectField(`features.${index}.description`)"
                    @click.stop="selectField(`features.${index}.description`)"
                    :class="getFieldClasses(`features.${index}.description`)"
                    :style="getFieldStyles(`features.${index}.description`)">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FeaturesSection',
    props: {
      sectionData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        selectedField: null
      };
    },
    methods: {
      // General section selection
      selectSection() {
        this.$emit('select', this.sectionData);
        this.selectedField = null;
      },
      
      // Field-specific selection method
      selectField(fieldPath) {
        this.selectedField = fieldPath;
        
        // Emit event with field information for parent
        this.$emit('select-field', {
          fieldPath: fieldPath,
          fieldName: this.getFieldName(fieldPath),
          formatOverrides: this.getFieldFormatOverrides(fieldPath)
        });
      },
      
      // Helper to extract the field name from path
      getFieldName(fieldPath) {
        const parts = fieldPath.split('.');
        return parts[parts.length - 1];
      },
      
      // Get any format overrides for a specific field
      getFieldFormatOverrides(fieldPath) {
        // If the section has field-specific format data, return it
        const formatKey = fieldPath.replace(/\./g, '_') + 'Format';
        if (this.sectionData[formatKey]) {
          return this.sectionData[formatKey];
        }
        
        // Return field-specific default formatting
        const defaults = {
          'heading': {
            fontSize: 'text-4xl',
            isBold: true,
            textAlign: 'center'
          },
          'subheading': {
            fontSize: 'text-lg',
            textAlign: 'center'
          }
        };
        
        // Check if this is a feature title or description
        if (fieldPath.includes('features') && fieldPath.includes('title')) {
          return {
            fontSize: 'text-lg',
            isBold: true
          };
        } else if (fieldPath.includes('features') && fieldPath.includes('description')) {
          return {
            fontSize: 'text-base'
          };
        }
        
        return defaults[fieldPath] || {};
      },
      
      // Style handling for fields
      getFieldClasses(fieldName) {
  // Start with basic selection classes
  const classes = {
    'field-selected': this.selectedField === fieldName,
    'field-editable': true
  };
  
  // Add format classes from section data
  const formatKey = fieldName + 'Format';
  if (this.sectionData[formatKey]) {
    const format = this.sectionData[formatKey];
    // Add each format class if available
    if (format.fontSize) classes[format.fontSize] = true;
    if (format.textAlign) classes['text-' + format.textAlign] = true;
    if (format.isBold) classes['font-bold'] = true;
    if (format.isItalic) classes['italic'] = true;
    if (format.isUnderline) classes['underline'] = true;
    if (format.lineHeight) classes[format.lineHeight] = true;
    if (format.letterSpacing) classes[format.letterSpacing] = true;
  }
  
  return classes;
},
  
      getFieldStyles(fieldPath) {
        const styles = {};
        
        // Add text color if available
        const formatKey = fieldPath.replace(/\./g, '_') + 'Format';
        if (this.sectionData[formatKey] && this.sectionData[formatKey].textColor) {
          styles.color = this.sectionData[formatKey].textColor;
        }
        
        return styles;
      },
      
      // Update methods for each field
      updateHeading(event) {
        this.sectionData.heading = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateSubheading(event) {
        this.sectionData.subheading = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateFeatureTitle(index, event) {
        this.sectionData.features[index].title = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateFeatureDescription(index, event) {
        this.sectionData.features[index].description = event.target.textContent;
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
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    border-radius: 4px;
  }
  
  [contenteditable]:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
    border-radius: 4px;
  }
  
  .field-selected {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.6), 0 0 0 4px rgba(59, 130, 246, 0.2);
    border-radius: 4px;
    background-color: rgba(59, 130, 246, 0.05);
  }
  </style>