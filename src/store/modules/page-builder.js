// src/store/modules/page-builder.js
export default {
    namespaced: true,
    state: {
      canvasElements: [],
      selectedElementIndex: null,
      showElementSelector: false,
      availableElements: {
        basic: [
          { 
            name: 'Heading', 
            icon: 'HeadingIcon',
            component: 'HeadingElement',
            data: { text: 'Your Heading', level: 1 } 
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
        { name: 'Hero', icon: 'HeroIcon' },
        { name: 'Product', icon: 'ProductIcon' },
        { name: 'Call to action', icon: 'CtaIcon' },
        { name: 'About us', icon: 'AboutIcon' },
        { name: 'Quiz', icon: 'QuizIcon' },
        { name: 'Team', icon: 'TeamIcon' },
        { name: 'Testimonials', icon: 'TestimonialsIcon' },
        { name: 'Trust', icon: 'TrustIcon' }
      ]
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
      },
      UPDATE_CANVAS_ELEMENT(state, { index, data }) {
        state.canvasElements[index].data = data;
      },
      SET_SELECTED_ELEMENT_INDEX(state, index) {
        state.selectedElementIndex = index;
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
      isElementSelectorVisible: state => state.showElementSelector
    }
  };