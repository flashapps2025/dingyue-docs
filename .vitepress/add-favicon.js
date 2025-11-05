import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');

// 递归查找所有 HTML 文件
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 添加 favicon 链接到 HTML 文件
function addFaviconToHtml(htmlPath) {
  if (!fs.existsSync(htmlPath)) {
    return false;
  }
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // 检查是否已经有 favicon 链接
  if (html.includes('favicon.ico')) {
    return false; // 已经存在，不需要添加
  }
  
  // 在 </head> 之前添加 favicon 链接
  if (html.includes('</head>')) {
    html = html.replace(
      '</head>',
      '    <link rel="icon" href="/favicon.ico" type="image/x-icon">\n    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n  </head>'
    );
    
    fs.writeFileSync(htmlPath, html, 'utf8');
    return true;
  }
  
  return false;
}

// 主函数
if (fs.existsSync(distDir)) {
  const htmlFiles = findHtmlFiles(distDir);
  let addedCount = 0;
  
  htmlFiles.forEach(file => {
    if (addFaviconToHtml(file)) {
      addedCount++;
      const relativePath = path.relative(distDir, file);
      console.log(`✓ Added favicon links to ${relativePath}`);
    }
  });
  
  if (addedCount === 0) {
    console.log('✓ All HTML files already have favicon links');
  } else {
    console.log(`✓ Added favicon links to ${addedCount} HTML file(s)`);
  }
} else {
  console.warn('⚠ dist directory not found');
}

