// Script to create resource pages - run with: node create-resources.js
const fs = require('fs');
const path = require('path');

const template = (subject) => {
  return `<section class="page-section py-16 px-4 bg-gradient-to-b ${subject.bg} min-h-screen">
    <div class="max-w-7xl mx-auto">
        <button onclick="loadPage('${subject.back}'); return false;" class="back-btn">← Back to Subjects</button>
        
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div class="flex items-center gap-4 mb-6">
                <div class="text-6xl">${subject.icon}</div>
                <div>
                    <h1 class="text-4xl md:text-5xl font-black bg-gradient-to-r ${subject.color} bg-clip-text text-transparent">
                        ${subject.title}
                    </h1>
                    <p class="text-gray-600 text-lg mt-2">${subject.desc}</p>
                </div>
            </div>
        </div>

        <!-- Official Syllabus -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>📋</span> Official Syllabus
            </h2>
            <div class="grid md:grid-cols-2 gap-4">
                ${subject.syllabus.map((topic, i) => `
                <div class="bg-gradient-to-r ${subject.bg} rounded-lg p-4 border-l-4 border-${subject.borderColor}-${500 + (i % 3) * 100}">
                    <h3 class="font-bold text-gray-800 mb-2">${i + 1}. ${topic.title}</h3>
                    <p class="text-sm text-gray-600">${topic.desc}</p>
                </div>`).join('')}
            </div>
        </div>

        <!-- PDF Resources -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>📄</span> PDF Resources
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${subject.pdfs.map(pdf => `
                <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-${subject.borderColor}-500 transition-all card-lift">
                    <div class="text-4xl mb-3">📄</div>
                    <h3 class="font-bold text-gray-800 mb-2">${pdf.title}</h3>
                    <p class="text-sm text-gray-600 mb-4">${pdf.desc}</p>
                    <button class="w-full bg-${subject.borderColor}-500 text-white py-2 rounded-lg font-semibold hover:bg-${subject.borderColor}-600 transition">Open PDF</button>
                </div>`).join('')}
            </div>
        </div>

        <!-- Books -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>📚</span> Recommended Books
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${subject.books.map(book => `
                <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-all card-lift">
                    <div class="text-4xl mb-3">📚</div>
                    <h3 class="font-bold text-gray-800 mb-2">${book.title}</h3>
                    <p class="text-sm text-gray-600 mb-2">Author: ${book.author}</p>
                    <p class="text-sm text-gray-600 mb-4">${book.desc}</p>
                    <button class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition">View Book</button>
                </div>`).join('')}
            </div>
        </div>

        <!-- YouTube Links -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>🎥</span> YouTube Learning Links
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${subject.videos.map(video => `
                <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-all card-lift">
                    <div class="text-4xl mb-3">🎥</div>
                    <h3 class="font-bold text-gray-800 mb-2">${video.title}</h3>
                    <p class="text-sm text-gray-600 mb-2">Duration: ${video.duration}</p>
                    <p class="text-sm text-gray-600 mb-4">${video.desc}</p>
                    <button class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition">Watch Video</button>
                </div>`).join('')}
            </div>
        </div>

        <!-- Previous Year Papers -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>📝</span> Previous Year Papers & Assessments
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${subject.papers.map(paper => `
                <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-amber-500 transition-all card-lift">
                    <div class="text-4xl mb-3">📝</div>
                    <h3 class="font-bold text-gray-800 mb-2">${paper.title}</h3>
                    <p class="text-sm text-gray-600 mb-4">${paper.desc}</p>
                    <button class="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition">Download Paper</button>
                </div>`).join('')}
            </div>
        </div>

        <!-- Study Organizers -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>📋</span> Study Organizers & Notes
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${subject.organizers.map(org => `
                <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-all card-lift">
                    <div class="text-4xl mb-3">📋</div>
                    <h3 class="font-bold text-gray-800 mb-2">${org.title}</h3>
                    <p class="text-sm text-gray-600 mb-4">${org.desc}</p>
                    <button class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">Open Organizer</button>
                </div>`).join('')}
            </div>
        </div>

        <!-- Extra Resources -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>🌟</span> Extra Resources
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${subject.extras.map(extra => `
                <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-all card-lift">
                    <div class="text-4xl mb-3">${extra.icon}</div>
                    <h3 class="font-bold text-gray-800 mb-2">${extra.title}</h3>
                    <p class="text-sm text-gray-600 mb-4">${extra.desc}</p>
                    <button class="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition">${extra.button}</button>
                </div>`).join('')}
            </div>
        </div>
    </div>
</section>`;
};

// Define all subjects with their data
const subjects = [
  {
    name: 'classes-1-5-hindi',
    title: 'Hindi - Classes 1-5',
    desc: 'Language Skills and Grammar',
    icon: '🗣️',
    color: 'from-orange-500 to-pink-500',
    bg: 'from-orange-50 to-pink-50',
    borderColor: 'orange',
    back: 'pages/subjects/classes-1-5.html',
    syllabus: [
      { title: 'वर्णमाला (Alphabet)', desc: 'Hindi alphabet recognition' },
      { title: 'शब्द निर्माण (Word Formation)', desc: 'Building vocabulary' },
      { title: 'व्याकरण (Grammar)', desc: 'Basic grammar rules' },
      { title: 'कहानियाँ (Stories)', desc: 'Reading comprehension' },
      { title: 'कविताएँ (Poems)', desc: 'Poetry and rhymes' },
      { title: 'लेखन (Writing)', desc: 'Writing skills' }
    ],
    pdfs: [
      { title: 'NCERT Hindi Textbooks', desc: 'Complete textbooks for classes 1-5' },
      { title: 'Grammar Guide', desc: 'Complete Hindi grammar rules' },
      { title: 'Vocabulary Lists', desc: 'Word lists with meanings' }
    ],
    books: [
      { title: 'NCERT Hindi', author: 'NCERT', desc: 'Official textbooks' },
      { title: 'Hindi Vyakaran', author: 'Educational Publishers', desc: 'Grammar reference' }
    ],
    videos: [
      { title: 'Hindi Grammar Lessons', duration: '25:00', desc: 'Complete grammar course' },
      { title: 'Hindi Stories for Kids', duration: '30:00', desc: 'Animated stories' }
    ],
    papers: [
      { title: 'Class 5 Final Exam 2024', desc: 'Complete question paper' },
      { title: 'Practice Test Set 1', desc: 'Sample questions' }
    ],
    organizers: [
      { title: 'Grammar Notes', desc: 'Complete grammar rules' },
      { title: 'Vocabulary Organizer', desc: 'Word lists organized' }
    ],
    extras: [
      { icon: '🔗', title: 'Hindi Learning Websites', desc: 'Interactive platforms', button: 'Visit Website' },
      { icon: '📱', title: 'Hindi Learning Apps', desc: 'Mobile applications', button: 'View Apps' }
    ]
  },
  {
    name: 'classes-1-5-evs',
    title: 'EVS - Classes 1-5',
    desc: 'Environment Studies',
    icon: '🌿',
    color: 'from-orange-500 to-pink-500',
    bg: 'from-orange-50 to-pink-50',
    borderColor: 'green',
    back: 'pages/subjects/classes-1-5.html',
    syllabus: [
      { title: 'Family & Friends', desc: 'Social relationships' },
      { title: 'Food & Health', desc: 'Nutrition and wellness' },
      { title: 'Plants & Animals', desc: 'Living things' },
      { title: 'Water & Air', desc: 'Natural resources' },
      { title: 'Our Environment', desc: 'Environmental awareness' },
      { title: 'Transport & Communication', desc: 'Modern life' }
    ],
    pdfs: [
      { title: 'NCERT EVS Textbooks', desc: 'Complete textbooks' },
      { title: 'Activity Worksheets', desc: 'Hands-on activities' },
      { title: 'Environmental Projects', desc: 'Project ideas' }
    ],
    books: [
      { title: 'NCERT EVS', author: 'NCERT', desc: 'Official textbooks' }
    ],
    videos: [
      { title: 'EVS Concepts Explained', duration: '20:00', desc: 'Visual learning' }
    ],
    papers: [
      { title: 'Class 5 EVS Exam 2024', desc: 'Question paper' }
    ],
    organizers: [
      { title: 'EVS Study Notes', desc: 'Organized notes' }
    ],
    extras: [
      { icon: '🔗', title: 'Environmental Websites', desc: 'Educational resources', button: 'Visit Website' }
    ]
  },
  {
    name: 'classes-1-5-computer',
    title: 'Computer - Classes 1-5',
    desc: 'Basic IT Skills',
    icon: '💻',
    color: 'from-orange-500 to-pink-500',
    bg: 'from-orange-50 to-pink-50',
    borderColor: 'blue',
    back: 'pages/subjects/classes-1-5.html',
    syllabus: [
      { title: 'Computer Basics', desc: 'Introduction to computers' },
      { title: 'Parts of Computer', desc: 'Hardware components' },
      { title: 'Using Mouse & Keyboard', desc: 'Basic input skills' },
      { title: 'Paint & Drawing', desc: 'Creative tools' },
      { title: 'Typing Practice', desc: 'Keyboard skills' },
      { title: 'Internet Safety', desc: 'Online safety basics' }
    ],
    pdfs: [
      { title: 'Computer Basics Guide', desc: 'Introduction to computers' },
      { title: 'Typing Practice Sheets', desc: 'Keyboard exercises' }
    ],
    books: [
      { title: 'Computer Masti', author: 'IIT Bombay', desc: 'Computer education' }
    ],
    videos: [
      { title: 'Computer Basics for Kids', duration: '15:00', desc: 'Introduction video' }
    ],
    papers: [
      { title: 'Class 5 Computer Test 2024', desc: 'Assessment paper' }
    ],
    organizers: [
      { title: 'Computer Basics Notes', desc: 'Study guide' }
    ],
    extras: [
      { icon: '🎮', title: 'Coding Games', desc: 'Learn programming', button: 'Play Games' }
    ]
  },
  {
    name: 'classes-1-5-arts',
    title: 'Arts & Crafts - Classes 1-5',
    desc: 'Creativity & Expression',
    icon: '🎭',
    color: 'from-orange-500 to-pink-500',
    bg: 'from-orange-50 to-pink-50',
    borderColor: 'red',
    back: 'pages/subjects/classes-1-5.html',
    syllabus: [
      { title: 'Drawing Basics', desc: 'Lines, shapes, forms' },
      { title: 'Coloring Techniques', desc: 'Color theory basics' },
      { title: 'Paper Crafts', desc: 'Origami and paper art' },
      { title: 'Painting', desc: 'Watercolor and poster colors' },
      { title: 'Clay Modeling', desc: '3D art creation' },
      { title: 'Collage Making', desc: 'Mixed media art' }
    ],
    pdfs: [
      { title: 'Art Activity Book', desc: 'Creative projects' },
      { title: 'Drawing Worksheets', desc: 'Practice sheets' }
    ],
    books: [
      { title: 'Art for Kids', author: 'Art Publishers', desc: 'Creative guide' }
    ],
    videos: [
      { title: 'Easy Art Projects', duration: '20:00', desc: 'Step-by-step tutorials' }
    ],
    papers: [
      { title: 'Art Assessment 2024', desc: 'Creative evaluation' }
    ],
    organizers: [
      { title: 'Art Techniques Guide', desc: 'Methods and tips' }
    ],
    extras: [
      { icon: '🎨', title: 'Art Websites', desc: 'Creative resources', button: 'Visit Website' }
    ]
  }
];

// Create all resource pages
subjects.forEach(subject => {
  const filePath = path.join('pages', 'resources', `${subject.name}.html`);
  fs.writeFileSync(filePath, template(subject), 'utf8');
  console.log(`Created: ${filePath}`);
});

console.log(`\n✅ Created ${subjects.length} resource pages!`);
