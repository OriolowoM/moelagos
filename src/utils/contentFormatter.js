/**
 * Lagos State Ministry of the Environment & Water Resources (MOE&WR)
 * Master Article & Page Content Formatter & Shortcode Engine
 */

export function formatArticleContent(html) {
  if (!html) return '';

  let formatted = html;

  // 1. Remove WordPress page-builder artifacts / raw shortcodes that shouldn't render as text
  formatted = formatted.replace(/\[\/?(?:dropcap|hr_dotted|vc_[^\]]*|g1_[^\]]*|elementor-[^\]]*|tablep[^\]]*)\]/gi, '');
  formatted = formatted.replace(/\[file content end\]/gi, '');
  formatted = formatted.replace(/\[table id=[^\]]*\]/gi, '');

  // 2. Convert WordPress [caption ...]...[/caption] into clean semantic HTML5 <figure> with styled <figcaption>
  formatted = formatted.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, (match, inner) => {
    const imgMatch = inner.match(/<img[^>]+>/i);
    let imgTag = imgMatch ? imgMatch[0] : '';
    
    // Clean up img tag attributes for responsive, zero-overflow rendering
    if (imgTag) {
      // Remove hardcoded width and height
      imgTag = imgTag.replace(/\s+(?:width|height)=["']\d+["']/gi, '');
      if (/class=["']/i.test(imgTag)) {
        imgTag = imgTag.replace(/class=["'][^"']*["']/i, 'class="w-full h-auto max-h-[640px] object-cover rounded-xl shadow-xs"');
      } else {
        imgTag = imgTag.replace(/<img/i, '<img class="w-full h-auto max-h-[640px] object-cover rounded-xl shadow-xs"');
      }
      // Add loading="lazy" and decoding="async"
      if (!/loading=/i.test(imgTag)) {
        imgTag = imgTag.replace(/<img/i, '<img loading="lazy" decoding="async"');
      }
    }

    // Extract caption text
    const captionText = inner
      .replace(/<img[^>]+>/i, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return `
      <figure class="my-8 block clear-both">
        <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
          ${imgTag}
        </div>
        ${captionText ? `<figcaption class="mt-2.5 text-xs sm:text-sm text-gray-700 font-medium italic bg-emerald-50/90 p-3.5 rounded-xl border-l-4 border-lagos-green leading-relaxed text-left">${captionText}</figcaption>` : ''}
      </figure>
    `;
  });

  // 3. Fallback for standalone <img ...> tags: ensure responsive classes and online fallback
  formatted = formatted.replace(/<img\s+([^>]*?)src=["'](\/uploads\/[^"']+)["']([^>]*?)>/gi, (m, before, src, after) => {
    const liveUrl = 'https://moelagos.gov.ng/wp-content' + src;
    let cleanBefore = before.replace(/\s+(?:width|height)=["']\d+["']/gi, '');
    let cleanAfter = after.replace(/\s+(?:width|height)=["']\d+["']/gi, '');
    return `<img ${cleanBefore}src="${src}" onerror="if(!this.dataset.failed){this.dataset.failed='1';this.src='${liveUrl}';}" loading="lazy" decoding="async" class="w-full h-auto max-h-[640px] object-cover rounded-xl my-4" ${cleanAfter}>`;
  });

  // 4. Wrap tables in responsive horizontal scroll containers if not already wrapped
  formatted = formatted.replace(/<table([\s\S]*?)<\/table>/gi, (match) => {
    // Clean table border / cell attributes for modern Tailwind styling
    let styledTable = match.replace(/<table/i, '<table class="w-full text-left text-xs sm:text-sm border-collapse divide-y divide-gray-200"');
    styledTable = styledTable.replace(/<th/gi, '<th class="py-3 px-4 bg-emerald-50 text-lagos-darkGreen font-bold border border-emerald-100"');
    styledTable = styledTable.replace(/<td/gi, '<td class="py-3 px-4 border border-gray-200 text-gray-700"');
    return `
      <div class="my-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-xs bg-white">
        ${styledTable}
      </div>
    `;
  });

  // 5. Clean empty divs and extra breaks
  formatted = formatted.replace(/<div dir="auto">\s*<\/div>/gi, '');
  formatted = formatted.replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '');

  return formatted;
}
