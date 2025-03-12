// src/store/modules/section-templates.js
export default {
  attentionBars: [
    {
      id: 'attention-bar-warning',
      name: 'Warning Bar',
      thumbnail: '/thumbnails/attention-bar-warning.jpg',
      component: 'AttentionBarSection',
      data: {
        text: 'ATTENTION! You Must Watch This Video To Complete Your Order...',
        type: 'warning',
        backgroundColor: 'bg-red-500',
        textColor: 'text-white'
      }
    }
  ],
  testimonials: [
    {
      id: 'testimonial-simple-2-column',
      name: 'Simple 2-Column',
      thumbnail: '/thumbnails/testimonial-simple.jpg',
      component: 'TestimonialSection',
      data: {
        subheading: 'Over 195 users have shared their love',
        heading: 'Don\'t just take our word for it',
        testimonials: [
          {
            author: 'Jacob Jones',
            handle: '@brooklysim',
            quote: 'If you haven\'t tried out this app yet, I would definitely recommend it for both designers and developers 🤙🏻',
            company: 'Acme Inc.'
          },
          {
            author: 'Emma Wilson',
            handle: '@emmawilson',
            quote: 'The tools and features provided have completely changed my workflow. Highly recommended!',
            company: 'XYZ Corp'
          }
        ]
      }
    },
    {
      id: 'testimonial-cards',
      name: 'Card Grid',
      thumbnail: '/thumbnails/testimonial-cards.jpg',
      component: 'TestimonialSection',
      data: {
        subheading: 'Trusted by thousands',
        heading: 'See what our customers are saying',
        testimonials: [
          {
            author: 'Michael Brown',
            handle: '@michaelb',
            quote: 'This platform has saved me countless hours of work. The interface is intuitive and powerful.',
            company: 'Tech Solutions'
          },
          {
            author: 'Sarah Parker',
            handle: '@sarahp',
            quote: 'I was skeptical at first, but after trying it for a week I was completely convinced. Amazing product!',
            company: 'Design Studio'
          }
        ]
      }
    },
    {
      id: 'testimonial-carousel',
      name: 'Carousel',
      thumbnail: '/thumbnails/testimonial-carousel.jpg',
      component: 'TestimonialSection',
      data: {
        subheading: 'Customer testimonials',
        heading: 'Hear from our satisfied clients',
        testimonials: [
          {
            author: 'David Chen',
            handle: '@davidc',
            quote: 'The support team is incredible. They responded to my questions within minutes and helped me solve my issue right away.',
            company: 'StartUp Co.'
          },
          {
            author: 'Rachel Kim',
            handle: '@rachelk',
            quote: 'I\'ve tried many similar tools, but this one stands out for its ease of use and powerful features.',
            company: 'Creative Agency'
          }
        ]
      }
    }
  ],
  hero: [
    {
      id: 'hero-upsell-1',
      name: 'Upsell Hero 1',
      thumbnail: '/thumbnails/hero-upsell.jpg',
      component: 'HeroSection',
      data: {
        subheading: 'Special One-Time Upgrade',
        heading: 'Discover the \'Secret Formula\' for Turning Your Course Idea into Revenue in Record Time',
        description: 'Discover the proven blueprint for building an influential presence on LinkedIn without wasting your valuable time and effort',
        buttonText: 'Add to my Order (Just $97)',
        disclaimerText: 'By clicking the button above you agree to be charged $200 now and $200 every year until cancelled',
        noThanksText: 'No thanks, please do not add this offer to my purchase',
        videoEmbed: {
          scriptSrc1: 'https://fast.wistia.com/embed/medias/zfzx106j3e.jsonp',
          scriptSrc2: 'https://fast.wistia.com/assets/external/E-v1.js',
          videoId: 'zfzx106j3e'
        }
      }
    }
  ],
  features: [
    {
      id: 'features-checklist',
      name: 'Features Checklist',
      thumbnail: '/thumbnails/features-checklist.jpg',
      component: 'FeaturesSection',
      data: {
        heading: 'Everything that\'s included in this special offer',
        subheading: 'Here\'s just a small sample of what you\'ll be getting with this special upgrade',
        features: [
          {
            title: 'Profitable Course Idea Formula ($599 Value)',
            description: 'How to validate your course ideas quickly, ensuring market demand and profitability before you invest time and money.'
          },
          {
            title: 'Simple Course Creation Blueprint ($299 Value)',
            description: 'A step-by-step guide to planning, structuring, and recording high-quality lessons that your audience will love—even if you\'re new to teaching.'
          },
          {
            title: 'Tech Made Easy ($99 Value)',
            description: 'Clear, jargon-free walkthroughs on choosing the right tech stack, including platforms, software, and video hosting, without feeling overwhelmed.'
          },
          {
            title: 'Pricing and Selling Strategies 2.0 ($99 Value)',
            description: 'Proven pricing models and sales techniques that boost your course\'s value, attract the right audience, and increase your revenue potential.'
          },
          {
            title: 'Effortless Course Marketing ($99 Value)',
            description: 'Practical marketing methods to build your audience, drive enrolments, and launch successfully, even without a large following or marketing experience.'
          }
        ]
      }
    }
  ],
  callToAction: [
    // CTA section templates will go here
  ],
  // Add more section types as needed
};