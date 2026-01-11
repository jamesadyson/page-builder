// src/mixins/SectionBackgroundMixin.js
export default {
    props: {
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
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
      }
    }
  };