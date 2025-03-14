<!-- src/components/sections/CallToActionSection.vue -->
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
      
      <section class="text-center py-16 px-8 lg:px-0 max-w-3xl mx-auto rounded-[20px] mb-20 border rounded-xl group" @click.stop="selectSection">
        <div class="text-center max-w-5xl mx-auto">
          <h2 
            class="text-center font-bold w-full max-w-md md:max-w-2xl lg:max-w-3xl md:leading-tight lg:leading-[1.1] text-3xl md:text-4xl lg:text-5xl tracking-[-0.7px] md:tracking-[-1px] lg:tracking-[-1.3px] text-gray-950 mx-auto break-words mb-2 md:mb-3"
            contenteditable="true"
            @blur="updateHeading"
            @focus="selectField('heading')"
            @click.stop="selectField('heading')"
            :class="getFieldClasses('heading')"
            :style="getFieldStyles('heading')">
            {{ sectionData.heading }}
          </h2>
          <p 
            class="mb-6 text-lg md:text-xl text-gray-700 font-medium max-w-xl mx-auto"
            contenteditable="true"
            @blur="updateDescription"
            @focus="selectField('description')"
            @click.stop="selectField('description')"
            :class="getFieldClasses('description')"
            :style="getFieldStyles('description')">
            {{ sectionData.description }}
          </p>
        </div>
        
        <div class="w-full max-w-3xl mx-auto text-center bg-white">
          <p class="mb-1">
            <span 
              class="text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-gray-400"
              contenteditable="true"
              @blur="updateRegularPrice"
              @focus="selectField('regularPrice')"
              @click.stop="selectField('regularPrice')"
              :class="getFieldClasses('regularPrice')"
              :style="getFieldStyles('regularPrice')">
              {{ sectionData.regularPrice }}
            </span>
          </p>
          <p class="font-bold mb-6 text-indigo-600">
            <span 
              class="text-3xl md:text-4xl leading-tight tracking-tight"
              contenteditable="true"
              @blur="updateSalePrice"
              @focus="selectField('salePrice')"
              @click.stop="selectField('salePrice')"
              :class="getFieldClasses('salePrice')"
              :style="getFieldStyles('salePrice')">
              {{ sectionData.salePrice }}
            </span>
          </p>
          
          <div class="mb-2 inline-block w-96">
            <button 
              class="text-2xl py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" 
              type="button"
              @click.stop="selectField('buttonText')">
              <span 
                contenteditable="true" 
                @blur="updateButtonText"
                @focus="selectField('buttonText')"
                :class="getFieldClasses('buttonText')"
                :style="getFieldStyles('buttonText')">
                {{ sectionData.buttonText }}
              </span>
            </button>
          </div>
          
          <p 
            class="text-gray-500 text-sm mt-1 mb-3 w-96 mx-auto"
            contenteditable="true"
            @blur="updateDisclaimerText"
            @focus="selectField('disclaimerText')"
            @click.stop="selectField('disclaimerText')"
            :class="getFieldClasses('disclaimerText')"
            :style="getFieldStyles('disclaimerText')">
            {{ sectionData.disclaimerText }}
          </p>
          
          <div class="">
            <button class="py-4 px-6 w-full text-gray-500 transition ease-in-out duration-200 underline" type="button" @click.stop="selectField('noThanksText')">
              <span 
                contenteditable="true" 
                @blur="updateNoThanksText"
                @focus="selectField('noThanksText')"
                :class="getFieldClasses('noThanksText')"
                :style="getFieldStyles('noThanksText')">
                {{ sectionData.noThanksText }}
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CallToActionSection',
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
      selectField(fieldName) {
        this.selectedField = fieldName;
        
        // Emit event with field information for parent
        this.$emit('select-field', {
          fieldPath: fieldName,
          fieldName: fieldName,
          // Optional formatting overrides can be passed here
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
          heading: {
            fontSize: 'text-4xl',
            isBold: true
          },
          description: {
            fontSize: 'text-lg'
          },
          regularPrice: {
            fontSize: 'text-2xl',
            textColor: '#9CA3AF'
          },
          salePrice: {
            fontSize: 'text-3xl',
            isBold: true,
            textColor: '#4F46E5'
          },
          buttonText: {
            fontSize: 'text-xl',
            isBold: true
          },
          disclaimerText: {
            fontSize: 'text-sm',
            textColor: '#6B7280'
          },
          noThanksText: {
            textColor: '#6B7280'
          }
        };
        
        return defaults[fieldName] || {};
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
      updateHeading(event) {
        this.sectionData.heading = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateDescription(event) {
        this.sectionData.description = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateRegularPrice(event) {
        this.sectionData.regularPrice = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateSalePrice(event) {
        this.sectionData.salePrice = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateButtonText(event) {
        this.sectionData.buttonText = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateDisclaimerText(event) {
        this.sectionData.disclaimerText = event.target.textContent;
        this.$emit('select', this.sectionData);
      },
      
      updateNoThanksText(event) {
        this.sectionData.noThanksText = event.target.textContent;
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