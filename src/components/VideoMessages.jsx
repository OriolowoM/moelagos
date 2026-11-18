import React from 'react';
import { Video, Play, ExternalLink } from 'lucide-react';

export default function VideoMessages() {
  const videos = [
    {
      id: 'flood-free',
      title: 'Flood Free Lagos — Strategic Drainage Operations',
      desc: 'Inside the ongoing primary drainage dredging, clearing of blocked collector canals, and infrastructure defenses to protect communities across Lagos.',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', // Standard responsive embed container
      tag: 'Drainage & Flood Mitigation'
    },
    {
      id: 'food-safety',
      title: 'Food Safety, Market Sanitation & Public Health',
      desc: 'Sensitization of food handlers, abattoir operators, and market leaders on hygiene standards, vector control, and public health compliance.',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
      tag: 'Environmental Health'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-lagos-darkGreen text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Video className="w-3.5 h-3.5 text-lagos-green" />
            <span>Public Education Broadcasts</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Messages from the Ministry
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Watch official policy statements, environmental documentaries, and grassroots hygiene guidelines.
          </p>
        </div>

        {/* 2-Column Responsive Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200 flex flex-col justify-between">
              {/* Responsive 16:9 Video Embed */}
              <div className="relative pb-[56.25%] h-0 bg-black overflow-hidden">
                <iframe
                  src={vid.embedUrl}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-6 space-y-3">
                <span className="inline-block bg-green-50 text-lagos-green font-bold text-xs px-2.5 py-1 rounded-full">
                  {vid.tag}
                </span>
                <h3 className="font-heading font-bold text-lg text-gray-900 leading-snug">
                  {vid.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {vid.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
