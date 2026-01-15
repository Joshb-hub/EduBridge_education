// Script to update all subject pages with embedded resources
// Run with: node update-subject-pages.js

const fs = require('fs');
const path = require('path');

// This script will be used to update subject pages
// For now, we'll manually update key pages following the pattern
console.log('To update all subject pages, follow the pattern established in classes-1-5.html');
console.log('Each subject should have:');
console.log('1. Expandable section with toggle button');
console.log('2. All 7 resource types embedded:');
console.log('   - Official Syllabus');
console.log('   - PDF Resources');
console.log('   - Recommended Books');
console.log('   - YouTube Learning Links');
console.log('   - Previous Year Papers & Assessments');
console.log('   - Study Organizers & Notes');
console.log('   - Extra Resources');
console.log('\nThe toggleSubject() function is already in assets/js/navigation.js');
