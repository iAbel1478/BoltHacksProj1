import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { BookOpen, X } from 'lucide-react';

interface BibleStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    title: string;
    verses: string[];
    content: string;
  } | null;
}

const BibleStoryModal: React.FC<BibleStoryModalProps> = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-biblical-cream font-serif rounded-2xl shadow-2xl border-2 border-biblical-gold p-8">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="bubble-text text-2xl text-biblical-dark-brown flex items-center gap-2 font-serif">
              <BookOpen className="w-6 h-6 text-biblical-gold" />
              {story.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-biblical-gold hover:bg-wood-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-biblical-gold/20 p-3 rounded-lg border-l-4 border-biblical-gold">
            <p className="text-sm text-biblical-dark-brown font-semibold font-serif">
              Related Verses: {story.verses.join(', ')}
            </p>
          </div>
          
          <div className="prose prose-sm max-w-none font-serif">
            {story.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-biblical-dark-brown leading-relaxed mb-3 font-serif">
                  {paragraph}
                </p>
              )
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <div className="w-16 h-16 bg-biblical-gold/30 rounded-full flex items-center justify-center border-2 border-biblical-gold">
              <BookOpen className="w-8 h-8 text-biblical-gold" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BibleStoryModal;
