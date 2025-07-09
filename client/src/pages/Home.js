import React, { useState, useEffect, useContext } from 'react';
import { Camera, Image, MapPin, Mountain, Users, Plus, Send, Star, Clock, Heart, Share2, Eye, ArrowRight, Play } from 'lucide-react';
import p1Image from '../assets/p1.png';
import p2Image from '../assets/p2.png';
import p3Image from '../assets/p3.png';
import p4Image from '../assets/p4.png';
import p5Image from '../assets/p5.png';
import p6Image from '../assets/p6.png';

// Mock data for tourist attractions
const touristAttractions = [
  {
    id: 1,
    name: "ถ้ำเชียงดาว",
    description: "ถ้ำธรรมชาติที่งดงามที่สุดของภาคเหนือ มีหินงอกหินย้อยที่สวยงาม",
    image: p1Image,
    category: "ธรรมชาติ",
    rating: 4.8,
    visitors: "2.3K",
    highlights: ["หินงอกหินย้อย", "ถ้ำขนาดใหญ่", "ประวัติศาสตร์"],
    distance: "5 กม."
  },
  {
    id: 2,
    name: "ดอยเชียงดาว",
    description: "ยอดเขาที่สูงที่สุดในจังหวัดเชียงใหม่ มีทิวทัศน์ที่สวยงาม",
    image: p2Image,
    category: "ภูเขา",
    rating: 4.9,
    visitors: "1.8K",
    highlights: ["ทิวทัศน์สวยงาม", "อากาศบริสุทธิ์", "ดูพระอาทิตย์ขึ้น"],
    distance: "12 กม."
  },
  {
    id: 3,
    name: "น้ำตกแม่อาย",
    description: "น้ำตกขนาดใหญ่ที่มีน้ำใสเย็น เหมาะสำหรับพักผ่อนและเล่นน้ำ",
    image: p3Image,
    category: "น้ำตก",
    rating: 4.7,
    visitors: "1.5K",
    highlights: ["น้ำใสเย็น", "บรรยากาศร่มรื่น", "เล่นน้ำได้"],
    distance: "8 กม."
  },
  {
    id: 4,
    name: "วัดถ้ำผาปล้อง",
    description: "วัดบนเขาที่เงียบสงบ มีบันไดนาค 500 ขั้นนำไปสู่พระพุทธรูปและวิวทิวทัศน์",
    image: p4Image,
    category: "วัด",
    rating: 4.6,
    visitors: "1.2K",
    highlights: ["บันไดนาค", "ความสงบ", "วิวธรรมชาติ"],
    distance: "6 กม."
  },
  {
    id: 5,
    name: "ปางช้างแม่สา",
    description: "ค่ายช้างที่เน้นการอนุรักษ์ ได้เรียนรู้วิถีชีวิตช้างไทย",
    image: p5Image,
    category: "สัตว์",
    rating: 4.8,
    visitors: "2.1K",
    highlights: ["ช้างไทย", "การอนุรักษ์", "ประสบการณ์ใหม่"],
    distance: "10 กม."
  },
  {
    id: 6,
    name: "สถานีวิจัยเกษตรที่สูงสันป่าเกี๊ยะ",
    description: "สถานีวิจัยเกษตรที่สูงสันป่าเกี๊ยะ อยู่ในทำเลที่มองเห็นเทือกดอยหลวงเชียงดาวได้อย่างชัดเจนและสวยงาม",
    image: p6Image,
    category: "ธรรมชาติ",
    rating: 4.5,
    visitors: "900",
    highlights: ["สถานีวิจัย", "บรรยากาศเงียบสงบ", "ธรรมชาติ"],
    distance: "15 กม."
  }
];

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = ['ทั้งหมด', 'ธรรมชาติ', 'ภูเขา', 'น้ำตก', 'วัด', 'สัตว์', 'วัฒนธรรม'];

  const filteredAttractions = selectedCategory === 'ทั้งหมด' 
    ? touristAttractions 
    : touristAttractions.filter(attraction => attraction.category === selectedCategory);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % touristAttractions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'ธรรมชาติ': 'bg-green-500',
      'ภูเขา': 'bg-blue-500',
      'น้ำตก': 'bg-cyan-500',
      'วัด': 'bg-orange-500',
      'สัตว์': 'bg-purple-500',
      'วัฒนธรรม': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section with Background Slideshow - Changed from h-screen to h-96 */}
      <div className="relative h-96 text-white overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {touristAttractions.map((attraction, index) => (
            <div
              key={`bg-${attraction.id}`}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-transparent to-green-600 opacity-40"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-32 h-32  opacity-5 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-10 left-1/4 w-16 h-16  opacity-10 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-300 to-green-300 opacity-20 rounded-full animate-bounce delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto h-full flex items-center justify-center px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mountain className="w-12 h-12 mr-3 text-yellow-300 animate-pulse" />
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 via-white to-green-200 bg-clip-text text-transparent">
                เชียงดาว
              </h1>
            </div>
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-semibold text-blue-100">
                ประตูสู่ธรรมชาติอันงดงาม
              </p>
              <p className="text-sm md:text-base text-blue-200 max-w-2xl mx-auto">
                ค้นพบความมหัศจรรย์ของธรรมชาติ ถ้ำที่งดงาม ภูเขาสูงชัน และวัฒนธรรมท้องถิ่นที่น่าหลงใหล
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs md:text-sm">
              <div className="flex items-center bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>อำเภอเชียงดาว</span>
              </div>
              <div className="flex items-center  bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>500+ สมาชิก</span>
              </div>
              <div className="flex items-center  bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 mr-1" />
                <span>4.8 ดาว</span>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {touristAttractions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white' : 'bg-white opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-blue-500">
            <Mountain className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">15+</div>
            <div className="text-sm text-gray-600">สถานที่ท่องเที่ยว</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-green-500">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">500+</div>
            <div className="text-sm text-gray-600">สมาชิก</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-purple-500">
            <Image className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">1K+</div>
            <div className="text-sm text-gray-600">รูปภาพ</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-orange-500">
            <Star className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">4.8</div>
            <div className="text-sm text-gray-600">คะแนนรีวิว</div>
          </div>
        </div>

        {/* Tourist Attractions Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              สถานที่ท่องเที่ยวยอดนิยม
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ค้นพบสถานที่ท่องเที่ยวที่น่าสนใจและงดงามที่สุดในอำเภอเชียงดาว
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Attractions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="relative">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(attraction.category)}`}>
                      {attraction.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleFavorite(attraction.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        favorites.has(attraction.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(attraction.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white bg-opacity-90 text-blue-600 p-2 rounded-full hover:bg-opacity-100 transition-all duration-300">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{attraction.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{attraction.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{attraction.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{attraction.visitors}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{attraction.distance}</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium">ดูเพิ่มเติม</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl p-8 mb-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4">พร้อมเริ่มต้นการผจญภัย?</h2>
            <p className="text-lg mb-6 text-blue-100">
              ร่วมเป็นส่วนหนึ่งของชุมชนนักท่องเที่ยวเชียงดาว แบ่งปันประสบการณ์ ค้นพบสถานที่ใหม่ๆ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                เริ่มต้นการท่องเที่ยว
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                ดูแผนที่
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;