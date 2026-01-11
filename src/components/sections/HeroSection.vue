<!-- src/components/sections/HeroSection.vue -->
 <!-- Background overlay for image backgrounds -->
<div 
v-if="sectionData.backgroundType === 'image' && sectionData.backgroundImage"
class="section-overlay"
:style="getOverlayStyle()">
</div>

<!-- Wrap the existing content in a div with section-content class -->
<div class="section-content">
<!-- Existing content goes here -->
</div>
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
    
    <section 
  class="bg-white overflow-hidden pb-10 group" 
  :class="{'selected-section': isSelected}"
  :style="getSectionBackgroundStyle()"
  @click.stop="selectSection">

      <div class="container px-4 mx-auto">
        <p 
          class="text-center mb-2 text-lg md:text-xl font-semibold max-w-2xl mx-auto"
          contenteditable="true"
          @blur="updateSubheading"
          @focus="selectField('subheading')"
          @click.stop="selectField('subheading')"
          :class="getFieldClasses('subheading')"
          :style="getFieldStyles('subheading')">
          {{ sectionData.subheading }}
        </p>
        <div class="text-center max-w-6xl mx-auto">
          <h2 
  class="text-center font-bold w-full md:max-w-2xl lg:max-w-6xl leading-[1.2] md:leading-[1.1] lg:leading-[1.1] tracking-[-0.7px] md:tracking-[-1px] lg:tracking-[-1.3px] text-gray-950 mx-auto break-words mb-4"
  contenteditable="true"
  @blur="updateHeading"
  @focus="selectField('heading')"
  @click.stop="selectField('heading')"
  :class="getFieldClasses('heading')"
  :style="getFieldStyles('heading')">
  {{ sectionData.heading }}
</h2>
          <p 
            class="mb-6 text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto"
            contenteditable="true"
            @blur="updateDescription"
            @focus="selectField('description')"
            @click.stop="selectField('description')"
            :class="getFieldClasses('description')"
            :style="getFieldStyles('description')">
            {{ sectionData.description }}
          </p>
          
          <div class="wistia-video rounded-lg overflow-hidden mb-10 mt-8 max-w-4xl mx-auto">
            <div class="relative" style="padding-top: 56.25%;">
              <div class="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-2 inline-block w-96">
            <button 
              class="text-xl py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
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
      </div>
    </section>
  </div>
</template>

<script>
import SectionBackgroundMixin from '@/mixins/SectionBackgroundMixin';

export default {
  name: 'HeroSection',
  mixins: [SectionBackgroundMixin],
  props: {
    sectionData: {
      type: Object,
      required: true
    },
    isSelected: {
  type: Boolean,
  default: false
},
  },
  data() {
  return {
    selectedField: null,
    lastFormatUpdate: Date.now()
  };
},

watch: {
  sectionData: {
    deep: true,
    handler() {
      console.log('HeroSection: sectionData changed');
      this.lastFormatUpdate = Date.now();
    }
  }
},
  methods: {
    // Add this to the methods section in HeroSection.vue
getOverlayStyle() {
  if (this.sectionData.backgroundType !== 'image' || !this.sectionData.backgroundImage) {
    return {};
  }
  
  const opacity = this.sectionData.overlayOpacity !== undefined 
    ? this.sectionData.overlayOpacity / 100 
    : 0.3;
    
  const overlayColor = this.sectionData.overlayColor || 'rgba(0,0,0,0.3)';
  
  // If an rgba color is provided, we need to adjust its opacity
  if (overlayColor.startsWith('rgba')) {
    // Extract the rgb part and add our own opacity
    const rgbPart = overlayColor.substring(0, overlayColor.lastIndexOf(','));
    return {
      backgroundColor: `${rgbPart}, ${opacity})`
    };
  }
  
  // For hex or named colors, convert to rgba
  return {
    backgroundColor: this.hexToRgba(overlayColor, opacity)
  };
},

// Convert hex or named color to rgba
hexToRgba(hex, alpha = 1) {
  // Simple named colors to rgb mapping
  const namedColors = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    yellow: [255, 255, 0],
    purple: [128, 0, 128],
    gray: [128, 128, 128],
    orange: [255, 165, 0],
    pink: [255, 192, 203]
  };
  
  // Check if it's a named color
  if (namedColors[hex.toLowerCase()]) {
    const [r, g, b] = namedColors[hex.toLowerCase()];
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Handle hex color
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${alpha})`;
  }
  
  // Default fallback
  return `rgba(0, 0, 0, ${alpha})`;
},
    getSectionBackgroundStyle() {
  const styles = {};
  
  // Check background type
  const backgroundType = this.sectionData.backgroundType || 'solid';
  
  if (backgroundType === 'solid') {
    // Apply solid background color
    if (this.sectionData.backgroundColor) {
      styles.backgroundColor = this.sectionData.backgroundColor;
    }
  } 
  else if (backgroundType === 'gradient') {
    // Apply gradient background
    const startColor = this.sectionData.backgroundColor || '#3B82F6';
    const endColor = this.sectionData.gradientEndColor || '#6366F1';
    const direction = this.getGradientDirection(this.sectionData.gradientDirection || 'to-bottom');
    
    styles.background = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
  } 
  else if (backgroundType === 'image') {
    // Apply image background
    if (this.sectionData.backgroundImage) {
      styles.backgroundImage = `url('${this.sectionData.backgroundImage}')`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
      styles.position = 'relative';
    }
  }
  
  return styles;
},

getGradientDirection(directionValue) {
  const directionMap = {
    'to-right': '90deg',
    'to-left': '270deg',
    'to-bottom': '180deg',
    'to-top': '0deg',
    'to-bottom-right': '135deg',
    'to-bottom-left': '225deg',
    'to-top-right': '45deg',
    'to-top-left': '315deg'
  };
  
  return directionMap[directionValue] || '180deg';
},
    // Add this helper method to HeroSection.vue
getFieldName(fieldPath) {
  const parts = fieldPath.split('.');
  return parts[parts.length - 1];
},
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
    
    // Get any format overrides for a specific field
    getFieldFormatOverrides(fieldName) {
      // If the section has field-specific format data, return it
      if (this.sectionData[`${fieldName}Format`]) {
        return this.sectionData[`${fieldName}Format`];
      }
      
      // Return field-specific default formatting
      const defaults = {
        heading: {
          fontSize: 'text-6xl',
          isBold: true
        },
        subheading: {
          fontSize: 'text-xl'
        },
        description: {
          fontSize: 'text-lg'
        },
        buttonText: {
          isBold: true
        },
        disclaimerText: {
          fontSize: 'text-sm'
        }
      };
      
      return defaults[fieldName] || {};
    },
    
    // NEW: Updated getFieldClasses to include format classes
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
  
  // For debugging
  console.log(`Getting classes for ${fieldName}, format key: ${formatKey}`);
  console.log('Section data:', JSON.stringify(this.sectionData));
  
  if (this.sectionData && this.sectionData[formatKey]) {
    const format = this.sectionData[formatKey];
    console.log(`Format data found:`, format);
    
    // Add default font size if none exists yet
    if (!format.hasOwnProperty('fontSize')) {
      if (fieldName === 'heading') {
        classes['text-4xl'] = true;
      } else if (fieldName === 'subheading') {
        classes['text-xl'] = true;
      } else if (fieldName === 'description') {
        classes['text-lg'] = true;
      } else {
        classes['text-base'] = true;
      }
    } else {
      // Apply the stored font size
      classes[format.fontSize] = true;
      console.log(`Applied font size: ${format.fontSize}`);
    }
    
    // Check if format properties exist and apply them
    if (format.hasOwnProperty('textAlign')) classes['text-' + format.textAlign] = true;
    if (format.hasOwnProperty('isBold') && format.isBold) classes['font-bold'] = true;
    if (format.hasOwnProperty('isItalic') && format.isItalic) classes['italic'] = true;
    if (format.hasOwnProperty('isUnderline') && format.isUnderline) classes['underline'] = true;
    if (format.hasOwnProperty('lineHeight')) classes[format.lineHeight] = true;
    if (format.hasOwnProperty('letterSpacing')) classes[format.letterSpacing] = true;
  } else {
    // Apply default styles if no format data exists
    console.log(`No format data found for ${formatKey}, applying defaults`);
    if (fieldName === 'heading') {
      classes['text-6xl'] = true;
    } else if (fieldName === 'subheading') {
      classes['text-xl'] = true;
    } else if (fieldName === 'description') {
      classes['text-lg'] = true;
    } else {
      classes['text-base'] = true;
    }
  }
  
  console.log(`Final classes for ${fieldName}:`, classes);
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
    updateSubheading(event) {
      this.sectionData.subheading = event.target.textContent;
      this.$emit('select', this.sectionData);
    },
    
    updateHeading(event) {
      this.sectionData.heading = event.target.textContent;
      this.$emit('select', this.sectionData);
    },
    
    updateDescription(event) {
      this.sectionData.description = event.target.textContent;
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

.selected-section {
  position: relative;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.8);
  border-radius: 4px;
  outline: 2px solid transparent;
}

.selected-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid rgba(59, 130, 246, 0.8);
  border-radius: 4px;
  pointer-events: none;
  z-index: 10;
}

/* For background image overlays */
.section-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

/* Ensure content shows above overlay */
.section-content {
  position: relative;
  z-index: 1;
}
</style>