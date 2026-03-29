import { motion, AnimatePresence } from 'motion/react';
import { VideoEmbed } from './VideoEmbed';

interface VideoPlayerModalProps {
  url: string | null;
  onClose: () => void;
}

export default function VideoPlayerModal({ url, onClose }: VideoPlayerModalProps) {
  return (
    <AnimatePresence>
      {url && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 size-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-full aspect-video bg-black">
              <VideoEmbed url={url} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
