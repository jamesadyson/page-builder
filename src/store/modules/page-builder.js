// src/store/modules/page-builder.js
import sectionTemplates from './section-templates';

export default {
  namespaced: true,
  state: {
    canvasElements: [],
    selectedElementIndex: null,
    activeSectionType: null,
    showSecondarySidebar: false,
    availableElements: {
      basic: [
        { 
          name: 'Heading', 
          icon: 'HeadingIcon',
          component: 'HeadingElement',
          data: { 
            text: 'Your Heading', 
            level: 1, 
            fontSize: 'text-3xl', 
            isBold: true, 
            textAlign: 'center' 
          } 
        },
        { 
          name: 'Text Block', 
          icon: 'TextIcon',
          component: 'TextElement',
          data: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.' } 
        },
        { 
          name: 'Bullet List', 
          icon: 'BulletIcon',
          component: 'BulletElement',
          data: { items: ['Item 1', 'Item 2', 'Item 3'] } 
        }
      ],
      interactive: [
        { 
          name: 'Feature Block', 
          icon: 'FeatureIcon',
          component: 'FeatureElement',
          data: { 
            title: 'Feature Title', 
            description: 'Feature description goes here',
            imageUrl: '/placeholder.jpg'
          } 
        }
      ]
    },
    availableSections: [
      { name: 'Hero', icon: 'HeroIcon', type: 'hero' },
      { name: 'Product', icon: 'ProductIcon', type: 'product' },
      { name: 'Call to action', icon: 'CtaIcon', type: 'callToAction' },
      { name: 'About us', icon: 'AboutIcon', type: 'aboutUs' },
      { name: 'Quiz', icon: 'QuizIcon', type: 'quiz' },
      { name: 'Team', icon: 'TeamIcon', type: 'team' },
      { name: 'Testimonials', icon: 'TestimonialsIcon', type: 'testimonials' },
      { name: 'Trust', icon: 'TrustIcon', type: 'trust' }
    ],
    sectionTemplates,
    sidebarView: 'layout', // New property to track the current sidebar view
  },
  mutations: {
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
    }
  },
  actions: {
    // Set the sidebar view
    setSidebarView({ commit }, view) {
      commit('SET_SIDEBAR_VIEW', view);
    },
    
    // Insert an element at a specific index
    insertElementAtIndex({ commit }, { element, index }) {
      commit('INSERT_CANVAS_ELEMENT', { element, index });
    },
    
    // Add an element to the end of the canvas
    addElementToCanvas({ commit }, element) {
      commit('ADD_CANVAS_ELEMENT', element);
    },
    
    // Remove an element at the specified index
    removeElement({ commit }, index) {
      commit('REMOVE_CANVAS_ELEMENT', index);
    },
    
    // Select an element at the specified index
    selectElement({ commit }, index) {
      commit('SET_SELECTED_ELEMENT_INDEX', index);
    },
    
    // Update the data of the currently selected element
    updateElementData({ commit, state }, data) {
      if (state.selectedElementIndex !== null) {
        commit('UPDATE_CANVAS_ELEMENT', {
          index: state.selectedElementIndex,
          data
        });
      }
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
    
    // Add a section template to the end of the canvas
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
      }
      
      // Hide the secondary sidebar
      dispatch('hideSecondarySidebar');
      
      // Change sidebar view to layout
      commit('SET_SIDEBAR_VIEW', 'layout');
    },
    
    // Insert a section template at a specific index
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
      }
      
      // Hide the secondary sidebar
      dispatch('hideSecondarySidebar');
      
      // Change sidebar view to layout
      commit('SET_SIDEBAR_VIEW', 'layout');
    },
    
    // Set the entire canvas elements array
    setCanvasElements({ commit }, elements) {
      commit('SET_CANVAS_ELEMENTS', elements);
    }
  },
  getters: {
    getCanvasElements: state => state.canvasElements,
    getSelectedElement: state => {
      if (state.selectedElementIndex !== null) {
        return state.canvasElements[state.selectedElementIndex];
      }
      return null;
    },
    getAvailableElements: state => state.availableElements,
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