<!-- src/components/BackgroundControls.vue -->
<template>
    <div class="background-controls">
      <h3 class="text-sm font-medium text-gray-600 mb-2">Background Settings</h3>
      
      <!-- Background Type Selector -->
      <div class="mb-4">
        <div class="flex items-center bg-gray-100 rounded-lg p-1">
          <button 
            v-for="type in backgroundTypes" 
            :key="type.value"
            class="flex-1 py-2 px-3 rounded-md text-center transition-colors"
            :class="[getBackgroundType() === type.value ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
            @click="updateBackgroundType(type.value)">
            {{ type.label }}
          </button>
        </div>
      </div>
      
      <!-- Color Picker (for Solid and Gradient) -->
      <div v-if="getBackgroundType() === 'solid' || getBackgroundType() === 'gradient'" class="mb-4">
        <h4 class="text-sm font-medium text-gray-600 mb-2">
          {{ getBackgroundType() === 'solid' ? 'Background Color' : 'Gradient Start Color' }}
        </h4>
        <div class="relative">
          <button 
            class="w-full flex items-center justify-between bg-gray-100 rounded-lg p-3 hover:bg-gray-200"
            @click="showColorPicker = !showColorPicker">
            <span>Select color</span>
            <div class="h-6 w-6 rounded-full border border-gray-300" :style="{ backgroundColor: getSectionData('backgroundColor') || '#FFFFFF' }"></div>
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
                @click="updateBackgroundColor(color.value)">
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Gradient End Color (only for Gradient) -->
      <div v-if="getBackgroundType() === 'gradient'" class="mb-4">
        <h4 class="text-sm font-medium text-gray-600 mb-2">Gradient End Color</h4>
        <div class="relative">
          <button 
            class="w-full flex items-center justify-between bg-gray-100 rounded-lg p-3 hover:bg-gray-200"
            @click="showGradientEndColorPicker = !showGradientEndColorPicker">
            <span>Select color</span>
            <div class="h-6 w-6 rounded-full border border-gray-300" :style="{ backgroundColor: getSectionData('gradientEndColor') || '#4F46E5' }"></div>
          </button>
          
          <!-- Gradient End Color Picker Dropdown -->
          <div v-if="showGradientEndColorPicker" class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
            <div class="grid grid-cols-5 gap-2">
              <button 
                v-for="color in colors" 
                :key="color.value"
                class="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
                @click="updateGradientEndColor(color.value)">
              </button>
            </div>
          </div>
        </div>
        
        <!-- Gradient Preview -->
        <div class="mt-2 h-8 rounded-md" :style="getGradientPreviewStyle()"></div>
      </div>
      
      <!-- Gradient Direction (only for Gradient) -->
      <div v-if="getBackgroundType() === 'gradient'" class="mb-4">
        <h4 class="text-sm font-medium text-gray-600 mb-2">Gradient Direction</h4>
        <div class="relative">
          <select 
            :value="getSectionData('gradientDirection') || 'to-bottom'"
            class="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="updateGradientDirection($event.target.value)">
            <option v-for="direction in gradientDirections" :key="direction.value" :value="direction.value">
              {{ direction.label }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Background Image (only for Image) -->
      <div v-if="getBackgroundType() === 'image'" class="mb-4">
        <h4 class="text-sm font-medium text-gray-600 mb-2">Background Image</h4>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <div v-if="getSectionData('backgroundImage')" class="mb-2">
            <div class="bg-cover bg-center h-32 rounded" :style="{ backgroundImage: `url(${getSectionData('backgroundImage')})` }">
              <button 
                @click="removeBackgroundImage" 
                class="bg-red-500 text-white rounded-full p-1 m-2 hover:bg-red-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="mt-2 text-sm text-gray-500">Upload an image or drag and drop</p>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            class="mt-2 block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
            @change="uploadBackgroundImage"
          />
        </div>
        
        <!-- Image Overlay Color -->
        <div class="mt-2">
          <h4 class="text-sm font-medium text-gray-600 mb-2">Image Overlay Color</h4>
          <div class="relative">
            <button 
              class="w-full flex items-center justify-between bg-gray-100 rounded-lg p-3 hover:bg-gray-200"
              @click="showOverlayColorPicker = !showOverlayColorPicker">
              <span>Select overlay color</span>
              <div class="h-6 w-6 rounded-full border border-gray-300" :style="{ backgroundColor: getSectionData('overlayColor') || 'rgba(0,0,0,0.3)' }"></div>
            </button>
            
            <!-- Overlay Color Picker Dropdown -->
            <div v-if="showOverlayColorPicker" class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
              <div class="grid grid-cols-5 gap-2">
                <button 
                  v-for="color in overlayColors" 
                  :key="color.value"
                  class="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                  @click="updateOverlayColor(color.value)">
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Overlay Opacity -->
        <div class="mt-2">
          <h4 class="text-sm font-medium text-gray-600 mb-2">Overlay Opacity: {{ getSectionData('overlayOpacity') || 30 }}%</h4>
          <input 
            type="range" 
            min="0" 
            max="100" 
            :value="getSectionData('overlayOpacity') || 30" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            @input="updateOverlayOpacity($event.target.value)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BackgroundControls',
    props: {
      element: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showColorPicker: false,
        showGradientEndColorPicker: false,
        showOverlayColorPicker: false,
        backgroundTypes: [
          { label: 'Solid', value: 'solid' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Image', value: 'image' },
        ],
        gradientDirections: [
          { label: 'To Right', value: 'to-right' },
          { label: 'To Left', value: 'to-left' },
          { label: 'To Bottom', value: 'to-bottom' },
          { label: 'To Top', value: 'to-top' },
          { label: 'To Bottom Right', value: 'to-bottom-right' },
          { label: 'To Bottom Left', value: 'to-bottom-left' },
          { label: 'To Top Right', value: 'to-top-right' },
          { label: 'To Top Left', value: 'to-top-left' },
        ],
        colors: [
          { name: 'White', value: '#FFFFFF' },
          { name: 'Black', value: '#000000' },
          { name: 'Gray', value: '#9CA3AF' },
          { name: 'Red', value: '#EF4444' },
          { name: 'Orange', value: '#F97316' },
          { name: 'Yellow', value: '#F59E0B' },
          { name: 'Green', value: '#10B981' },
          { name: 'Teal', value: '#14B8A6' },
          { name: 'Blue', value: '#3B82F6' },
          { name: 'Indigo', value: '#6366F1' },
          { name: 'Purple', value: '#8B5CF6' },
          { name: 'Pink', value: '#EC4899' },
        ],
        overlayColors: [
          { name: 'Transparent', value: 'rgba(0,0,0,0)' },
          { name: 'Black (30%)', value: 'rgba(0,0,0,0.3)' },
          { name: 'Black (50%)', value: 'rgba(0,0,0,0.5)' },
          { name: 'Black (70%)', value: 'rgba(0,0,0,0.7)' },
          { name: 'White (30%)', value: 'rgba(255,255,255,0.3)' },
          { name: 'White (50%)', value: 'rgba(255,255,255,0.5)' },
          { name: 'White (70%)', value: 'rgba(255,255,255,0.7)' },
          { name: 'Blue (30%)', value: 'rgba(59,130,246,0.3)' },
          { name: 'Blue (50%)', value: 'rgba(59,130,246,0.5)' },
          { name: 'Blue (70%)', value: 'rgba(59,130,246,0.7)' },
        ]
      };
    },
    methods: {
      // Helper method to get section data with defaults
      getSectionData(property) {
        if (!this.element) return null;
        return this.element[property];
      },
      
      getBackgroundType() {
        return this.getSectionData('backgroundType') || 'solid';
      },
      
      updateBackgroundType(type) {
        // Set default values when switching types
        const updates = { backgroundType: type };
        
        if (type === 'solid' && !this.getSectionData('backgroundColor')) {
          updates.backgroundColor = '#FFFFFF';
        } else if (type === 'gradient') {
          if (!this.getSectionData('backgroundColor')) updates.backgroundColor = '#3B82F6';
          if (!this.getSectionData('gradientEndColor')) updates.gradientEndColor = '#6366F1';
          if (!this.getSectionData('gradientDirection')) updates.gradientDirection = 'to-bottom';
        }
  
        this.$emit('update', updates);
      },
      
      updateBackgroundColor(color) {
        this.$emit('update', {
          backgroundColor: color
        });
        this.showColorPicker = false;
      },
      
      updateGradientEndColor(color) {
        this.$emit('update', {
          gradientEndColor: color
        });
        this.showGradientEndColorPicker = false;
      },
      
      updateGradientDirection(direction) {
        this.$emit('update', {
          gradientDirection: direction
        });
      },
      
      updateOverlayColor(color) {
        this.$emit('update', {
          overlayColor: color
        });
        this.showOverlayColorPicker = false;
      },
      
      updateOverlayOpacity(opacity) {
        this.$emit('update', {
          overlayOpacity: parseInt(opacity)
        });
      },
      
      uploadBackgroundImage(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // In a real application, you would upload the file to a server
        // and get back a URL. For this example, we'll use a data URL.
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit('update', {
            backgroundImage: e.target.result
          });
        };
        reader.readAsDataURL(file);
      },
      
      removeBackgroundImage() {
        this.$emit('update', {
          backgroundImage: null
        });
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
      
      getGradientPreviewStyle() {
        const startColor = this.getSectionData('backgroundColor') || '#3B82F6';
        const endColor = this.getSectionData('gradientEndColor') || '#6366F1';
        const direction = this.getGradientDirection(this.getSectionData('gradientDirection') || 'to-bottom');
        
        return {
          background: `linear-gradient(${direction}, ${startColor}, ${endColor})`
        };
      }
    }
  };
  </script>