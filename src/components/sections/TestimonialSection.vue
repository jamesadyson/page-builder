<!-- src/components/sections/TestimonialSection.vue -->
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
    
    <section class="relative pt-24 pb-32 bg-white overflow-hidden group" @click.stop="selectSection">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50 opacity-50 w-[500px] h-[500px] rounded-full"></div>
      <div class="relative z-10 container px-4 mx-auto">
        <p 
          class="mb-4 text-lg text-gray-900 font-medium text-center"
          contenteditable="true"
          @blur="updateSubheading"
          @focus="selectField('subheading')"
          @click.stop="selectField('subheading')"
          :class="getFieldClasses('subheading')"
          :style="getFieldStyles('subheading')">
          {{ sectionData.subheading }}
        </p>
        <h2 
          class="mb-24 text-4xl md:text-5xl font-bold text-center tracking-tight leading-tight"
          contenteditable="true"
          @blur="updateHeading"
          @focus="selectField('heading')"
          @click.stop="selectField('heading')"
          :class="getFieldClasses('heading')"
          :style="getFieldStyles('heading')">
          {{ sectionData.heading }}
        </h2>
        <div class="flex flex-wrap -m-8">
          <div class="w-full md:flex-1 p-8">
            <div class="flex flex-col items-center max-w-lg mx-auto">
              <div class="flex flex-wrap -m-1.5 mb-7">
                <div class="w-auto p-1.5">
                  <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div class="w-auto p-1.5">
                  <h3 
                    class="font-semibold"
                    contenteditable="true"
                    @blur="updateTestimonial(0, 'author')"
                    @focus="selectField('testimonials.0.author')"
                    @click.stop="selectField('testimonials.0.author')"
                    :class="getFieldClasses('testimonials.0.author')"
                    :style="getFieldStyles('testimonials.0.author')">
                    {{ sectionData.testimonials[0].author }}
                  </h3>
                  <p 
                    class="text-gray-500"
                    contenteditable="true"
                    @blur="updateTestimonial(0, 'handle')"
                    @focus="selectField('testimonials.0.handle')"
                    @click.stop="selectField('testimonials.0.handle')"
                    :class="getFieldClasses('testimonials.0.handle')"
                    :style="getFieldStyles('testimonials.0.handle')">
                    {{ sectionData.testimonials[0].handle }}
                  </p>
                </div>
              </div>
              <p 
                class="mb-8 text-xl font-medium text-center"
                contenteditable="true"
                @blur="updateTestimonial(0, 'quote')"
                @focus="selectField('testimonials.0.quote')"
                @click.stop="selectField('testimonials.0.quote')"
                :class="getFieldClasses('testimonials.0.quote')"
                :style="getFieldStyles('testimonials.0.quote')">
                {{ sectionData.testimonials[0].quote }}
              </p>
              <div class="h-8 flex items-center justify-center">
                <span 
                  class="text-sm text-gray-500"
                  contenteditable="true"
                  @blur="updateTestimonial(0, 'company')"
                  @focus="selectField('testimonials.0.company')"
                  @click.stop="selectField('testimonials.0.company')"
                  :class="getFieldClasses('testimonials.0.company')"
                  :style="getFieldStyles('testimonials.0.company')">
                  {{ sectionData.testimonials[0].company }}
                </span>
              </div>
            </div>
          </div>
          <div class="hidden md:flex md:items-center md:w-auto">
            <div class="w-px h-28 bg-gray-200"></div>
          </div>
          <div class="w-full md:flex-1 p-8">
            <div class="flex flex-col items-center max-w-lg mx-auto">
              <div class="flex flex-wrap -m-1.5 mb-7">
                <div class="w-auto p-1.5">
                  <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div class="w-auto p-1.5">
                  <h3 
                    class="font-semibold"
                    contenteditable="true"
                    @blur="updateTestimonial(1, 'author')"
                    @focus="selectField('testimonials.1.author')"
                    @click.stop="selectField('testimonials.1.author')"
                    :class="getFieldClasses('testimonials.1.author')"
                    :style="getFieldStyles('testimonials.1.author')">
                    {{ sectionData.testimonials[1].author }}
                  </h3>
                  <p 
                    class="text-gray-500"
                    contenteditable="true"
                    @blur="updateTestimonial(1, 'handle')"
                    @focus="selectField('testimonials.1.handle')"
                    @click.stop="selectField('testimonials.1.handle')"
                    :class="getFieldClasses('testimonials.1.handle')"
                    :style="getFieldStyles('testimonials.1.handle')">
                    {{ sectionData.testimonials[1].handle }}
                  </p>
                </div>
              </div>
              <p 
                class="mb-8 text-xl font-medium text-center"
                contenteditable="true"
                @blur="updateTestimonial(1, 'quote')"
                @focus="selectField('testimonials.1.quote')"
                @click.stop="selectField('testimonials.1.quote')"
                :class="getFieldClasses('testimonials.1.quote')"
                :style="getFieldStyles('testimonials.1.quote')">
                {{ sectionData.testimonials[1].quote }}
              </p>
              <div class="h-8 flex items-center justify-center">
                <span 
                  class="text-sm text-gray-500"
                  contenteditable="true"
                  @blur="updateTestimonial(1, 'company')"
                  @focus="selectField('testimonials.1.company')"
                  @click.stop="selectField('testimonials.1.company')"
                  :class="getFieldClasses('testimonials.1.company')"
                  :style="getFieldStyles('testimonials.1.company')">
                  {{ sectionData.testimonials[1].company }}
                </span>
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
  name: 'TestimonialSection',
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
        // Optional formatting overrides can be passed here
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
        },
        'testimonials.0.quote': {
          fontSize: 'text-xl',
          textAlign: 'center'
        },
        'testimonials.1.quote': {
          fontSize: 'text-xl',
          textAlign: 'center'
        },
        'testimonials.0.author': {
          isBold: true
        },
        'testimonials.1.author': {
          isBold: true
        },
        'testimonials.0.handle': {
          fontSize: 'text-sm',
          textColor: '#6B7280'
        },
        'testimonials.1.handle': {
          fontSize: 'text-sm',
          textColor: '#6B7280'
        },
        'testimonials.0.company': {
          fontSize: 'text-sm',
          textColor: '#6B7280'
        },
        'testimonials.1.company': {
          fontSize: 'text-sm',
          textColor: '#6B7280'
        }
      };
      
      return defaults[fieldPath] || {};
    },
    
    // NEW: Updated getFieldClasses to include format classes
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
    updateSubheading(event) {
      this.sectionData.subheading = event.target.textContent;
      this.$emit('select', this.sectionData);
    },
    
    updateHeading(event) {
      this.sectionData.heading = event.target.textContent;
      this.$emit('select', this.sectionData);
    },
    
    // Updated testimonial update method
    updateTestimonial(index, field) {
      return function(event) {
        this.sectionData.testimonials[index][field] = event.target.textContent;
        this.$emit('select', this.sectionData);
      }.bind(this);
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