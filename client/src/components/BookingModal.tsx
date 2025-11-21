import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

interface BookingModalProps {
  trigger?: React.ReactNode;
  buttonText?: string;
  buttonClassName?: string;
}

export function BookingModal({ trigger, buttonText = "Programare Online", buttonClassName }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <div onClick={() => setIsOpen(true)} data-testid="button-open-booking">
          {trigger}
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          className={buttonClassName}
          data-testid="button-open-booking"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      )}
      
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-900">Programare Online - CristAlex Dent</DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Închide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>
        <div className="w-full flex-1 overflow-hidden">
          <iframe
            src="https://my.businessdent.md/online-register.php?inst=1718966&ln=ro"
            title="Programare Online CristAlex Dent"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            loading="lazy"
            referrerPolicy="no-referrer"
            data-testid="iframe-booking"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
