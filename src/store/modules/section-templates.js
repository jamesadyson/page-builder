// src/store/modules/section-templates.js
export default {
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
      // Hero section templates will go here
    ],
    callToAction: [
      // CTA section templates will go here
    ],
    // Add more section types as needed
  };