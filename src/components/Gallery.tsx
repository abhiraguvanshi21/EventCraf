import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const galleryImages = [
  // same image objects as before...
  {
    id: 1,
    src: 'https://www.lolavalentina.com/wp-content/uploads/2022/02/MicrosoftTeams-image-38.jpg',
    category: 'Wedding',
    title: 'Elegant Garden Wedding',
    description: 'Beautiful outdoor ceremony with floral arrangements'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    title: 'Traditional Wedding Setup',
    description: 'Classic indoor wedding with premium decorations'
  },
  {
    id: 3,
    src: 'https://img.freepik.com/premium-photo/indian-couples-shows-engagement-rings_14349-1188.jpg',
    category: 'Engagement',
    title: 'Romantic Engagement Party',
    description: 'Intimate engagement celebration with candlelit ambiance'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Birthday',
    title: 'Birthday Celebration',
    description: 'Colorful birthday party with themed decorations'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    title: 'Corporate Event',
    description: 'Professional corporate gathering with modern setup'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Anniversary',
    title: 'Anniversary Celebration',
    description: 'Golden anniversary with elegant table settings'
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    title: 'Reception Dinner',
    description: 'Luxurious wedding reception with gourmet dining'
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Engagement',
    title: 'Ring Ceremony',
    description: 'Traditional ring ceremony with family gathering'
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    title: 'Mandap Decoration',
    description: 'Traditional Indian wedding mandap with marigold flowers'
  },
  {
    id: 10,
    src: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Birthday',
    title: 'Kids Birthday Party',
    description: 'Colorful children\'s birthday party with balloon decorations'
  },
  {
    id: 11,
    src: 'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    title: 'Business Conference',
    description: 'Professional conference setup with modern AV equipment'
  },
  {
    id: 12,
    src: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Anniversary',
    title: 'Silver Anniversary',
    description: '25th anniversary celebration with silver theme decorations'
  },
  {
    id: 13,
    src: 'https://static.wixstatic.com/media/b63811_3b35f33a71e84b018d53c267ec90a4e1~mv2.jpg/v1/fill/w_568,h_378,al_c,lg_1,q_80,enc_avif,quality_auto/b63811_3b35f33a71e84b018d53c267ec90a4e1~mv2.jpg',
    category: 'Engagement',
    title: 'Haldi Ceremony',
    description: 'Traditional haldi ceremony with yellow decorations'
  },
  {
    id: 14,
    src: 'https://bigelowlimo.com/wp-content/uploads/2019/06/phoenix-party-bus-rental-2.jpg',
    category: 'Birthday',
    title: 'Adult Birthday Party',
    description: 'Elegant adult birthday celebration with sophisticated decor'
  },
  {
    id: 15,
    src: 'https://images.pexels.com/photos/1181407/pexels-photo-1181407.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    title: 'Product Launch',
    description: 'Modern product launch event with stage lighting'
  },
  {
    id: 16,
    src: 'https://www.shutterstock.com/image-photo/mehndi-artist-making-design-women-260nw-1182411799.jpg',
    category: 'Wedding',
    title: 'Mehendi Ceremony',
    description: 'Colorful mehendi ceremony with traditional decorations'
  },
  {
    id: 17,
    src: 'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Anniversary',
    title: 'Ruby Anniversary',
    description: '40th anniversary celebration with red theme'
  },
  {
    id: 18,
    src: 'https://cdn0.weddingwire.in/vendor/1408/3_2/960/jpg/tilak-events-khushisoftvision-11_15_51408.jpeg',
    category: 'Engagement',
    title: 'Tilak Ceremony',
    description: 'Traditional tilak ceremony with religious decorations'
  },
  {
    id: 19,
    src: 'https://images.wedmegood.com/wp-content/uploads/2015/08/1438845728_Wedding_0059.jpg',
    category: 'Birthday',
    title: 'Theme Birthday Party',
    description: 'Superhero themed birthday party for kids'
  },
  {
    id: 20,
    src: 'https://badhaihoevents.in/wp-content/uploads/2023/06/Corporate-Event-Planner-in-Noida.jpeg',
    category: 'Corporate',
    title: 'Annual Meeting',
    description: 'Corporate annual meeting with professional setup'
  }
];

const categories = ['All', 'Wedding', 'Engagement', 'Birthday', 'Corporate', 'Anniversary'];

type GalleryImage = typeof galleryImages[number];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: typeof galleryImages[number], index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-800 dark:text-white mb-4">Event Gallery</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Explore our portfolio of beautifully executed events.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-purple-50 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              data-aos="zoom-in"
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 shadow hover:shadow-xl cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <img src={image.src} alt={image.title} className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-full object-contain rounded-lg" />
              <button onClick={closeLightbox} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white"><X /></button>
              <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white"><ChevronLeft /></button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white"><ChevronRight /></button>
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm p-4 text-white rounded">
                <h3 className="font-bold text-xl mb-1">{selectedImage.title}</h3>
                <p className="text-sm text-gray-200">{selectedImage.description}</p>
                <span className="inline-block mt-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{selectedImage.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;