// src/store/modules/page-builder.js
import Vue from 'vue';
import sectionTemplates from './section-templates';

export default {
  namespaced: true,
  state: {
    canvasElements: [],
    selectedElementIndex: null,
    activeSectionType: null,
    showSecondarySidebar: false,
    availableSections: [
      { name: 'Attention Bar', icon: 'AttentionIcon', type: 'attentionBars' },
      { name: 'Hero', icon: 'HeroIcon', type: 'hero' },
      { name: 'Features', icon: 'FeaturesIcon', type: 'features' },
      { name: 'Product', icon: 'ProductIcon', type: 'product' },
      { name: 'Call to action', icon: 'CtaIcon', type: 'callToAction' },
      { name: 'About us', icon: 'AboutIcon', type: 'aboutUs' },
      { name: 'Quiz', icon: 'QuizIcon', type: 'quiz' },
      { name: 'Team', icon: 'TeamIcon', type: 'team' },
      { name: 'Testimonials', icon: 'TestimonialsIcon', type: 'testimonials' },
      { name: 'Trust', icon: 'TrustIcon', type: 'trust' }
    ],
    sectionTemplates,
    sidebarView: 'layout', // Track the current sidebar view
      currentEditingField: null, // Add this line
  },
  mutations: {
    SET_CURRENT_EDITING_FIELD(state, fieldInfo) {
      state.currentEditingField = fieldInfo;
    },
    ADD_CANVAS_ELEMENT(state, element) {
      state.canvasElements.push({
        component: element.component,
        data: JSON.parse(JSON.stringify(element.data)) // Create a deep copy
      });
    },
    INSERT_CANVAS_ELEMENT(state, { element, index }) {
      const newElement = {
        component: element.component,
        data: JSON.parse(JSON.stringify(element.data)) // Create a deep copy
      };
      
      // Ensure index is within bounds
      const insertIndex = Math.max(0, Math.min(state.canvasElements.length, index));
      
      // Insert at specific index
      state.canvasElements.splice(insertIndex, 0, newElement);
      
      // Adjust the selected element index if necessary
      if (state.selectedElementIndex !== null && state.selectedElementIndex >= insertIndex) {
        state.selectedElementIndex++;
      }
    },
    REMOVE_CANVAS_ELEMENT(state, index) {
      state.canvasElements.splice(index, 1);
      // Reset selected element if it was the one removed
      if (state.selectedElementIndex === index) {
        state.selectedElementIndex = null;
      } else if (state.selectedElementIndex > index) {
        // Adjust index for elements that shifted up
        state.selectedElementIndex--;
      }
    },
    UPDATE_CANVAS_ELEMENT(state, { index, data }) {
      state.canvasElements[index].data = data;
    },
    SET_SELECTED_ELEMENT_INDEX(state, index) {
      state.selectedElementIndex = index;
    },
    SET_ACTIVE_SECTION_TYPE(state, type) {
      state.activeSectionType = type;
    },
    SET_SHOW_SECONDARY_SIDEBAR(state, value) {
      state.showSecondarySidebar = value;
    },
    SET_CANVAS_ELEMENTS(state, elements) {
      state.canvasElements = elements;
    },
    SET_SIDEBAR_VIEW(state, view) {
      state.sidebarView = view;
    },
    UPDATE_FIELD_FORMAT(state, { index, fieldPath, formatData }) {
      console.log(`Store: Updating format for field ${fieldPath}:`, formatData);
      
      if (index === null || index >= state.canvasElements.length) return;
      
      const element = state.canvasElements[index];
      console.log('Element before update:', JSON.parse(JSON.stringify(element)));
      
      // Ensure element data exists
      if (!element.data) {
        element.data = {};
      }
      
      // For section components, we need to store format data differently
      if (element.component === 'HeroSection' || 
          element.component === 'TestimonialSection' || 
          element.component === 'FeaturesSection' ||
          element.component === 'AttentionBarSection' ||
          element.component === 'CallToActionSection') {
        // For sections, store format under fieldNameFormat
        const formatKey = fieldPath.replace(/\./g, '_') + 'Format';
        
        // Initialize or update the format object
        if (!element.data[formatKey]) {
          element.data[formatKey] = {};
        }
        
        // Update with new format data
        element.data[formatKey] = {
          ...element.data[formatKey],
          ...formatData
        };
        
        console.log(`Store: Updated ${formatKey} to:`, element.data[formatKey]);
        console.log('Element after update:', JSON.parse(JSON.stringify(element)));
        return;
      }
      
      // For basic elements, update normally
      element.data = {
        ...element.data,
        ...formatData
      };
      
      // Handle nested fields (e.g., testimonials.0.author)
      // Split the path into parts
      const pathParts = fieldPath.split('.');
      let target = element.data;
      
      // Navigate to the parent object
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        
        if (!target[part]) {
          // Create the path if it doesn't exist
          if (!isNaN(Number(pathParts[i + 1]))) {
            // If next part is a number, create an array
            target[part] = [];
          } else {
            // Otherwise create an object
            target[part] = {};
          }
        }
        
        target = target[part];
      }
      
      // Get the final property name
      const finalProp = pathParts[pathParts.length - 1];
      
      // Update the format data for this specific field
      if (!target[finalProp + 'Format']) {
        target[finalProp + 'Format'] = {};
      }
      
      target[finalProp + 'Format'] = {
        ...target[finalProp + 'Format'],
        ...formatData
      };
    },

    UPDATE_SECTION_BACKGROUND(state, { index, backgroundSettings }) {
      if (index === null || index >= state.canvasElements.length) return;
      
      const element = state.canvasElements[index];
      
      if (!element.data) {
        Vue.set(element, 'data', {});
      }
      
      // Update the section's background settings
      // Use Vue.set to ensure reactivity
      Object.keys(backgroundSettings).forEach(key => {
        Vue.set(element.data, key, backgroundSettings[key]);
      });
      
      console.log(`Store: Updated background settings for element ${index}:`, backgroundSettings);
    },
    
    // Add these to the actions section in src/store/modules/page-builder.js
    
    updateSectionBackground({ commit, state }, backgroundSettings) {
      if (state.selectedElementIndex === null) return;
      
      commit('UPDATE_SECTION_BACKGROUND', {
        index: state.selectedElementIndex,
        backgroundSettings
      });
    },
    
UPDATE_FIELD_FORMAT_DIRECT(state, { formatProperty, formatValue }) {
  if (!state.currentEditingField || state.selectedElementIndex === null) return;
  
  const element = state.canvasElements[state.selectedElementIndex];
  const fieldPath = state.currentEditingField.fieldPath;
  
  if (!element || !element.data) return;
  
  // Create format key based on field path
  const formatKey = fieldPath + 'Format';
  
  console.log('Store: Directly updating format for', formatKey, formatProperty, formatValue);
  console.log('Element data before:', JSON.stringify(element.data));
  
  // Ensure the format key object exists
  if (!element.data[formatKey]) {
    // Create a new object with Vue.set to ensure reactivity
    Vue.set(element.data, formatKey, {});
  }
  
  // Update the specific property
  Vue.set(element.data[formatKey], formatProperty, formatValue);
  
  console.log('Element data after:', JSON.stringify(element.data));
  
  // Force a reactivity update by creating a new object
  // This is important to ensure Vue detects the change
  const updatedElement = { ...element };
  Vue.set(state.canvasElements, state.selectedElementIndex, updatedElement);
},
  },
  actions: {
    setCurrentEditingField({ commit }, fieldInfo) {
      commit('SET_CURRENT_EDITING_FIELD', fieldInfo);
    },
    
    updateFieldFormat({ commit }, { formatProperty, formatValue }) {
      commit('UPDATE_FIELD_FORMAT_DIRECT', { formatProperty, formatValue });
    },
    // Set the sidebar view
    setSidebarView({ commit }, view) {
      commit('SET_SIDEBAR_VIEW', view);
    },
    
    // Insert an element at a specific index
    insertElementAtIndex({ commit }, { element, index }) {
      commit('INSERT_CANVAS_ELEMENT', { element, index });
      
      // After inserting, switch sidebar to layout view
      commit('SET_SIDEBAR_VIEW', 'layout');
    },
    
    // Add an element to the end of the canvas
    addElementToCanvas({ commit }, element) {
      commit('ADD_CANVAS_ELEMENT', element);
      
      // After adding, switch sidebar to layout view
      commit('SET_SIDEBAR_VIEW', 'layout');
    },
    
    // Remove an element at the specified index
    removeElement({ commit }, index) {
      commit('REMOVE_CANVAS_ELEMENT', index);
    },
    
    // Select an element at the specified index
    selectElement({ commit }, index) {
      commit('SET_SELECTED_ELEMENT_INDEX', index);
      
      // When an element is selected, ensure we're in layout view
      commit('SET_SIDEBAR_VIEW', 'layout');
    },
    
    updateElementData({ commit, state }, updateData) {
      console.log('Store: updateElementData called with:', updateData);
      
      if (state.selectedElementIndex === null) return;
      
      // Handle updating specific field within a section
      if (updateData && updateData.activeField) {
        const { formatProperty, formatValue } = updateData;
        
        if (formatProperty && formatValue !== undefined) {
          console.log(`Store: Updating field format: ${formatProperty} to ${formatValue}`);
          
          // Use the direct update mutation for better reactivity
          commit('UPDATE_FIELD_FORMAT_DIRECT', { 
            formatProperty, 
            formatValue 
          });
        }
        return;
      }
      
      // For regular element updates
      commit('UPDATE_CANVAS_ELEMENT', {
        index: state.selectedElementIndex,
        data: updateData
      });
    },
    
    // Show the secondary sidebar for a specific section type
    showSecondarySidebar({ commit }, sectionType) {
      // First ensure the section type is set
      commit('SET_ACTIVE_SECTION_TYPE', sectionType);
      // Then show the sidebar
      commit('SET_SHOW_SECONDARY_SIDEBAR', true);
    },
    
    // Hide the secondary sidebar
    hideSecondarySidebar({ commit }) {
      commit('SET_SHOW_SECONDARY_SIDEBAR', false);
      // Clear section type after a delay to prevent flickering
      setTimeout(() => {
        commit('SET_ACTIVE_SECTION_TYPE', null);
      }, 300); // Match the CSS transition duration
    },
    
    selectSectionTemplate({ commit, dispatch, state }, template) {
      let actualTemplate;
      
      // Check if the template is a complete object or just an ID
      if (typeof template === 'string') {
        // Find the template by ID in the active section templates
        const templates = state.sectionTemplates[state.activeSectionType] || [];
        actualTemplate = templates.find(t => t.id === template);
      } else {
        actualTemplate = template;
      }
      
      // If template found, add it to canvas
      if (actualTemplate) {
        commit('ADD_CANVAS_ELEMENT', {
          component: actualTemplate.component,
          data: JSON.parse(JSON.stringify(actualTemplate.data)) // Create a deep copy to avoid reference issues
        });
        
        // Hide the secondary sidebar
        dispatch('hideSecondarySidebar');
        
        // Change sidebar view to layout - this is critical
        commit('SET_SIDEBAR_VIEW', 'layout');
        
        // After adding a section, deselect any previously selected element
        commit('SET_SELECTED_ELEMENT_INDEX', null);
      } else {
        // Hide the secondary sidebar even if no template was found
        dispatch('hideSecondarySidebar');
      }
    },
    
    insertSectionTemplateAtIndex({ commit, dispatch, state }, { template, index }) {
      let actualTemplate;
      
      // Check if the template is a complete object or just an ID
      if (typeof template === 'string') {
        // Find the template by ID in the active section templates
        const templates = state.sectionTemplates[state.activeSectionType] || [];
        actualTemplate = templates.find(t => t.id === template);
      } else {
        actualTemplate = template;
      }
      
      // If template found, insert at the specified index
      if (actualTemplate) {
        commit('INSERT_CANVAS_ELEMENT', {
          element: {
            component: actualTemplate.component,
            data: JSON.parse(JSON.stringify(actualTemplate.data))
          },
          index
        });
        
        // Hide the secondary sidebar
        dispatch('hideSecondarySidebar');
        
        // IMPORTANT: Change sidebar view to layout - must be here for state sync
        commit('SET_SIDEBAR_VIEW', 'layout');
        
        // IMPORTANT: After inserting a section, deselect any previously selected element
        commit('SET_SELECTED_ELEMENT_INDEX', null);
      } else {
        // Hide the secondary sidebar even if no template was found
        dispatch('hideSecondarySidebar');
      }
    },
    
    // Set the entire canvas elements array
    setCanvasElements({ commit }, elements) {
      commit('SET_CANVAS_ELEMENTS', elements);
    }
  },
  getters: {
    getCurrentEditingField: state => state.currentEditingField,
    getCanvasElements: state => state.canvasElements,
    getSelectedElement: state => {
      if (state.selectedElementIndex !== null) {
        return state.canvasElements[state.selectedElementIndex];
      }
      return null;
    },
    getAvailableSections: state => state.availableSections,
    isSecondarySidebarVisible: state => state.showSecondarySidebar,
    getActiveSectionType: state => state.activeSectionType,
    getActiveSectionTemplates: state => {
      if (!state.activeSectionType || !state.sectionTemplates[state.activeSectionType]) {
        return [];
      }
      return state.sectionTemplates[state.activeSectionType];
    },
    getCurrentSidebarView: state => state.sidebarView
  }
};