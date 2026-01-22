import { useState } from "react";
import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AutoplayVideoProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

export function AutoplayVideo({ videoSrc, posterSrc, className = "" }: AutoplayVideoProps) {
  const [showSocialModal, setShowSocialModal] = useState(false);

  return (
    <>
      <div
        className={`relative cursor-pointer overflow-hidden ${className}`}
        onClick={() => setShowSocialModal(true)}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support video playback.
        </video>

        {/* Overlay hover effect */}
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-lg font-semibold text-readable">
            Urmărește-ne pe Social Media
          </span>
        </div>
      </div>

      {/* Social Media Modal */}
      <Dialog open={showSocialModal} onOpenChange={setShowSocialModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Urmărește-ne pe Social Media</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <a
                href="https://instagram.com/cristalexdent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
                Instagram @cristalexdent
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <a
                href="https://tiktok.com/@cristalexdent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTiktok className="w-5 h-5" />
                TikTok @cristalexdent
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
