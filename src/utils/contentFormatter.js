/**
 * Lagos State Ministry of the Environment & Water Resources (MOE&WR)
 * Article Content Formatter & Shortcode Parser
 */

export function formatArticleContent(html) {
  if (!html) return '';

  let formatted = html;

  // 1. Convert WordPress [caption ...]...[/caption] into clean HTML5 <figure> with styled <figcaption>
  formatted = formatted.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, (match, inner) => {
    const imgMatch = inner.match(/<img[^>]+>/i);
    let imgTag = imgMatch ? imgMatch[0] : '';
    
    // Clean up img tag attributes for modern responsive display
    if (imgTag) {
      imgTag = imgTag.replace(/width=["'][^"']*["']/i, '');
      imgTag = imgTag.replace(/height=["'][^"']*["']/i, '');
      if (/class=["']/i.test(imgTag)) {
        imgTag = imgTag.replace(/class=["'][^"']*["']/i, 'class="w-full h-auto max-h-[620px] object-cover rounded-xl"');
      } else {
        imgTag = imgTag.replace(/<img/i, '<img class="w-full h-auto max-h-[620px] object-cover rounded-xl"');
      }
    }

    // Extract caption text
    const captionText = inner.replace(/<img[^>]+>/i, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    return `
      <figure class="my-8 block clear-both">
        <div class="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-50 flex items-center justify-center">
          ${imgTag}
        </div>
        ${captionText ? `<figcaption class="mt-2.5 text-xs sm:text-sm text-gray-700 font-medium italic bg-emerald-50/80 p-3.5 rounded-xl border-l-4 border-lagos-green leading-relaxed text-left">${captionText}</figcaption>` : ''}
      </figure>
    `;
  });

  // 2. Add automatic fallback to all <img src="/uploads/..."> tags so if the local file is missing, it falls back to the live server
  formatted = formatted.replace(/<img\s+([^>]*?)src=["'](\/uploads\/[^"']+)["']([^>]*?)>/gi, (m, before, src, after) => {
    const liveUrl = 'https://moelagos.gov.ng/wp-content' + src;
    return `<img ${before}src="${src}" onerror="if(!this.dataset.failed){this.dataset.failed='1';this.src='${liveUrl}';}" ${after}>`;
  });

  // 3. Convert bare paragraph-like divs to clean styled paragraphs
  formatted = formatted.replace(/<div dir="auto">\s*<\/div>/gi, '');

  return formatted;
}
