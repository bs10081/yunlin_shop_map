import { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  showProgress?: boolean;
  autoplay?: boolean;
}

export default function AudioPlayer({ src, showProgress = true, autoplay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOverlayClick = async () => {
    if (!hasInteracted && audioRef.current) {
      try {
        await audioRef.current.play();
        setHasInteracted(true);
        setShowOverlay(false);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  const togglePlayPause = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
        if (!hasInteracted) {
          setHasInteracted(true);
          setShowOverlay(false);
        }
      }
    } catch (error) {
      console.error('Failed to toggle play/pause:', error);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasInteracted || !audioRef.current) return;

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Tap Overlay */}
      {showOverlay && !hasInteracted && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[99999] cursor-pointer animate-fade-in"
          onClick={handleOverlayClick}
        >
          <div className="text-white text-2xl px-8 py-6 bg-white bg-opacity-15 rounded-full backdrop-blur-md shadow-2xl text-center animate-pulse pointer-events-none">
            點擊任意位置開始播放
          </div>
        </div>
      )}

      {/* Audio Player */}
      <div className="bg-primary-50 rounded-2xl p-6 my-6">
        <div className="flex items-center space-x-4 max-w-2xl mx-auto">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 min-w-[3.5rem] rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 active:scale-95 transition-all shadow-lg hover:shadow-xl"
            aria-label={isPlaying ? '暫停' : '播放'}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-xl`} aria-hidden="true"></i>
          </button>

          {showProgress && (
            <>
              {/* Current Time */}
              <span className="text-sm text-gray-700 font-medium min-w-[3rem]">
                {formatTime(currentTime)}
              </span>

              {/* Progress Bar */}
              <div
                className="flex-1 h-1.5 bg-primary-200 rounded-full cursor-pointer relative overflow-hidden group"
                onClick={handleProgressClick}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-600 to-primary-700 rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Duration */}
              <span className="text-sm text-gray-700 font-medium min-w-[3rem] text-right">
                {formatTime(duration)}
              </span>
            </>
          )}
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={src} preload="auto" className="hidden" />
      </div>
    </>
  );
}
