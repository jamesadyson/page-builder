// src/store/modules/page-builder.js
import sectionTemplates from './section-templates';

export default {
  namespaced: true,
  state: {
    canvasElements: [],
    selectedElementIndex: null,
    showElementSelector: false,
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
    sectionTemplates
  },
  mutations: {
    SET_SHOW_ELEMENT_SELECTOR(state, value) {
      state.showElementSelector = value;
    },
    ADD_CANVAS_ELEMENT(state, element) {
      state.canvasElements.push({
        component: element.component,
        data: JSON.parse(JSON.stringify(element.data)) // Create a deep copy
      });
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
    // Add new mutation for setting the entire canvas elements array
    SET_CANVAS_ELEMENTS(state, elements) {
      state.canvasElements = elements;
    }
  },
  actions: {
    openElementSelector({ commit }) {
      commit('SET_SHOW_ELEMENT_SELECTOR', true);
    },
    closeElementSelector({ commit }) {
      commit('SET_SHOW_ELEMENT_SELECTOR', false);
    },
    addElementToCanvas({ commit, dispatch }, element) {
      commit('ADD_CANVAS_ELEMENT', element);
      dispatch('closeElementSelector');
    },
    removeElement({ commit }, index) {
      commit('REMOVE_CANVAS_ELEMENT', index);
    },
    selectElement({ commit }, index) {
      commit('SET_SELECTED_ELEMENT_INDEX', index);
    },
    updateElementData({ commit, state }, data) {
      if (state.selectedElementIndex !== null) {
        commit('UPDATE_CANVAS_ELEMENT', {
          index: state.selectedElementIndex,
          data
        });
      }
    },
    showSecondarySidebar({ commit }, sectionType) {
      // First ensure the section type is set
      commit('SET_ACTIVE_SECTION_TYPE', sectionType);
      // Then show the sidebar
      commit('SET_SHOW_SECONDARY_SIDEBAR', true);
    },
    hideSecondarySidebar({ commit }) {
      commit('SET_SHOW_SECONDARY_SIDEBAR', false);
      // Clear section type after a delay to prevent flickering
      setTimeout(() => {
        commit('SET_ACTIVE_SECTION_TYPE', null);
      }, 300); // Match the CSS transition duration
    },
    selectSectionTemplate({ commit, dispatch, state }, templateId) {
      // Check if the template is a complete object or just an ID
      let template;
      if (typeof templateId === 'object') {
        template = templateId;
      } else {
        // Find the template by ID in the active section templates
        const templates = state.sectionTemplates[state.activeSectionType] || [];
        template = templates.find(t => t.id === templateId);
      }
      
      // If template found, add it to canvas
      if (template) {
        commit('ADD_CANVAS_ELEMENT', {
          component: template.component,
          data: JSON.parse(JSON.stringify(template.data)) // Create a deep copy to avoid reference issues
        });
      }
      
      // Hide the secondary sidebar
      dispatch('hideSecondarySidebar');
    },
    // New action to update the entire canvas elements array
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
    isElementSelectorVisible: state => state.showElementSelector,
    isSecondarySidebarVisible: state => state.showSecondarySidebar,
    getActiveSectionType: state => state.activeSectionType,
    getActiveSectionTemplates: state => {
      if (!state.activeSectionType || !state.sectionTemplates[state.activeSectionType]) {
        return [];
      }
      return state.sectionTemplates[state.activeSectionType];
    }
  }
};