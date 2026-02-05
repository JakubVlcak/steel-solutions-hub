import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface YouTubeModalProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const YouTubeModal = ({ videoId, title, isOpen, onClose }: YouTubeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-black border-none">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative w-full aspect-video">
          {isOpen && videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubeModal;
