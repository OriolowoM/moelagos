import React from 'react';
import { Video, ExternalLink } from 'lucide-react';

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function VideoMessages() {
  const videos = [
    {
      id: 'flood-free-lagos',
      title: 'Flood Free Lagos',
      channelName: 'Ministry Environment Lagos',
      videoId: 'kuMLNYp7A5U',
      embedUrl: 'https://www.youtube.com/embed/kuMLNYp7A5U?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=kuMLNYp7A5U',
      channelUrl: 'https://www.youtube.com/channel/UCNVjraoL_yu6ftQsgXDU6qg',
      tag: 'Drainage & Flood Mitigation',
      desc: 'Inside the ongoing primary drainage dredging and infrastructure defenses protecting communities across Lagos.'
    },
    {
      id: 'flood-safety',
      title: 'Flood Safety',
      channelName: 'Ministry of Environment & Water Resources Lagos',
      videoId: 'TnGeWR4kYcU',
      embedUrl: 'https://www.youtube.com/embed/TnGeWR4kYcU?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=TnGeWR4kYcU',
      channelUrl: 'https://www.youtube.com/channel/UC1hSRTPrOXI8lD8fdUbpnmw',
      tag: 'Flood Safety & Preparedness',
      desc: 'Critical emergency safety guidelines, early warning awareness, and precautions during heavy rainstorms.'
    },
    {
      id: 'waste-disposal-management',
      title: 'Waste Disposal Management',
      channelName: 'Ministry of Environment & Water Resources Lagos',
      videoId: '2nmBVU54okk',
      embedUrl: 'https://www.youtube.com/embed/2nmBVU54okk?rel=0',
      watchUrl: 'https://www.youtube.com/watch?v=2nmBVU54okk',
      channelUrl: 'https://www.youtube.com/channel/UC1hSRTPrOXI8lD8fdUbpnmw',
      tag: 'Waste Management & Sanitation',
      desc: 'Sensitization on proper domestic waste segregation, bagging, containerization, and curbing illegal dumping.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200" id="messages-from-ministry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-lagos-darkGreen text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-emerald-200">
              <Video className="w-3.5 h-3.5 text-lagos-green" />
              <span>Public Education Broadcasts</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Messages from the Ministry
            </h2>
            <p className="text-sm text-gray-600 mt-1.5 max-w-2xl">
              Official video briefings, public health guidelines, and flood management advisories from the Lagos State Ministry of the Environment and Water Resources.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.youtube.com/channel/UC1hSRTPrOXI8lD8fdUbpnmw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm hover:shadow"
            >
              <YouTubeIcon className="w-4 h-4" />
              <span>Official YouTube Channel</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* 3-Column Responsive Grid matching moelagos.gov.ng */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col justify-between group"
            >
              {/* 16:9 Video Frame */}
              <div className="relative pb-[56.25%] h-0 bg-black overflow-hidden">
                <iframe
                  src={vid.embedUrl}
                  title={`${vid.title} - ${vid.channelName}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>

              {/* Video Meta Info */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block bg-emerald-50 text-lagos-darkGreen border border-emerald-100 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                      {vid.tag}
                    </span>
                    <a
                      href={vid.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition"
                      title="Watch on YouTube"
                    >
                      <YouTubeIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-lagos-green transition leading-snug">
                    <a href={vid.watchUrl} target="_blank" rel="noopener noreferrer">
                      {vid.title}
                    </a>
                  </h3>

                  <p className="text-xs text-gray-500 font-medium mt-1">
                    Channel:{' '}
                    <a
                      href={vid.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lagos-green hover:underline font-semibold"
                    >
                      {vid.channelName}
                    </a>
                  </p>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {vid.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <a
                    href={vid.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-red-600 transition"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={vid.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lagos-green hover:underline font-medium"
                  >
                    Visit Channel →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
